// ./app/server/[...slug]/route.ts

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { logger } from "@untools/logger";
import { refreshTokenAction } from "@/app/actions";

// Configure your remote API base URL
const API_URL = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.API_KEY;
const GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API;

// Define hop-by-hop headers that shouldn't be forwarded
const hopByHopHeaders = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

// Additional problematic headers that might cause encoding issues
const problematicHeaders = new Set(["content-encoding", "content-length"]);

// Helper function to forward headers while excluding problematic ones
function filterAndForwardHeaders(headers: Headers) {
  const filteredHeaders: Record<string, string> = {};
  headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (!hopByHopHeaders.has(lowerKey) && !problematicHeaders.has(lowerKey)) {
      filteredHeaders[key] = value;
    }
  });

  return filteredHeaders;
}

// Helper function to check if response contains authentication errors
function hasAuthError(responseBody: string): boolean {
  if (!responseBody) return false;

  try {
    const parsedResponse = JSON.parse(responseBody);

    // Check for GraphQL errors
    if (parsedResponse.errors && Array.isArray(parsedResponse.errors)) {
      // Look for common auth error patterns in any error message
      const errorMessages = parsedResponse.errors.map(
        (err: { message: string }) => (err.message || "").toLowerCase(),
      );

      const authErrorPatterns = [
        "unable to authenticate",
        "unauthenticated",
        "unauthorized",
        "invalid token",
        "expired token",
        "auth failed",
        "not authenticated",
        "authentication failed",
        "jwt expired",
        "invalid auth",
        "auth required",
        "not authorized",
      ];

      return errorMessages.some((message: string | string[]) =>
        authErrorPatterns.some((pattern) => message.includes(pattern)),
      );
    }

    // Check for REST API auth errors
    if (parsedResponse.message) {
      const message = parsedResponse.message.toLowerCase();
      return (
        message.includes("token") &&
        (message.includes("expired") ||
          message.includes("invalid") ||
          message.includes("auth") ||
          message.includes("unauthorized"))
      );
    }
  } catch (e) {
    logger.error("Error parsing response body:", e);
    // If it's not valid JSON, it's not a GraphQL auth error
    return false;
  }

  return false;
}

// Main handler function for all HTTP methods
async function handler(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const IS_GRAPHQL = req.nextUrl.pathname.includes("graphql");

    // Get the path from the dynamic route parameter
    const path = req.nextUrl.pathname.replace("/server/", "");

    logger.log("🚀 ~ path: ", path);

    // Construct the full URL for the remote API or GraphQL endpoint
    const url =
      IS_GRAPHQL && GRAPHQL_API
        ? new URL(GRAPHQL_API).toString()
        : new URL(path, API_URL + "/v1").toString();

    logger.log("🚀 ~ API_URL:", API_URL);
    logger.log("🚀 ~ Target URL:", url);

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    // get accessToken
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    logger.log("🚀 ~ fullUrl: ", fullUrl);

    // Clone the request to safely read its body
    const requestClone = req.clone();
    let originalBody: string | undefined;

    // Prepare headers with API key
    const headers: Record<string, string> = {
      ...filterAndForwardHeaders(req.headers),
      "x-api-key": API_KEY || "",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    // Process request body for POST, PUT, PATCH
    let body;
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      const contentType = req.headers.get("content-type");

      // Handle different content types appropriately
      if (contentType?.includes("application/json")) {
        const jsonData = await requestClone.json();
        body = JSON.stringify(jsonData);
        originalBody = body; // Store original body for potential retry
        headers["content-type"] = "application/json";
      } else {
        body = await requestClone.text();
        originalBody = body;
      }
    }

    // Prepare the fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      // Only include body for methods that typically have one
      ...(["POST", "PUT", "PATCH"].includes(req.method) && { body }),
    };

    logger.log("🚀 ~ fetchOptions: ", {
      method: fetchOptions.method,
      headers: fetchOptions.headers,
      bodyLength: body ? body.length : 0,
    });

    // Forward the request to the remote API
    let response = await fetch(fullUrl, fetchOptions);

    // Get the response content as text
    let responseText = await response.text();
    logger.log("🚀 ~ response status:", response.status);

    // Handle auth errors - both 401 status and error messages in response body
    let tokenRefreshed = false;

    if (response.status === 401 || (IS_GRAPHQL && hasAuthError(responseText))) {
      logger.warn("Authentication error detected, attempting token refresh");

      // Try to refresh the token
      if (refreshToken) {
        const refreshResult = await refreshTokenAction();

        if (refreshResult.success) {
          // Get the new access token
          tokenRefreshed = true;
          const newAccessToken = cookieStore.get("accessToken")?.value;

          if (newAccessToken) {
            logger.log(
              "Token refreshed successfully, retrying original request",
            );

            // Update headers with new token
            headers["Authorization"] = `Bearer ${newAccessToken}`;

            // Recreate fetch options with the new token
            const newFetchOptions: RequestInit = {
              method: req.method,
              headers,
              // Only include body for methods that typically have one
              ...(["POST", "PUT", "PATCH"].includes(req.method) && {
                body: originalBody,
              }),
            };

            // Retry the original request with the new token
            response = await fetch(fullUrl, newFetchOptions);
            responseText = await response.text();

            logger.log("🚀 ~ Retry response status:", response.status);
          }
        } else {
          logger.error("Token refresh failed:", refreshResult.error);
          // Add redirect logic for invalid refresh token
          if (
            refreshResult.error?.includes("Invalid refresh token") ||
            refreshResult.error?.includes("expired")
          ) {
            // Return a special response that tells the client to redirect
            return new Response(
              JSON.stringify({
                error: "Authentication failed",
                redirectTo: "/auth/logout",
              }),
              {
                status: 401,
                headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Redirect": "/auth/logout",
                },
              },
            );
          }
        }
      }
    }

    logger.log("🚀 ~ response size:", responseText.length);

    // Filter response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Don't forward problematic headers in the response
      if (!hopByHopHeaders.has(lowerKey) && !problematicHeaders.has(lowerKey)) {
        responseHeaders[key] = value;
      }
    });

    // Set content type if not already set
    if (!responseHeaders["content-type"]) {
      if (IS_GRAPHQL) {
        responseHeaders["content-type"] = "application/json";
      } else {
        // Try to infer content type or default to text/plain
        responseHeaders["content-type"] =
          response.headers.get("content-type") || "text/plain";
      }
    }

    // Add a header to indicate token was refreshed (useful for client-side handling)
    if (tokenRefreshed) {
      responseHeaders["x-token-refreshed"] = "true";
    }

    // Create the response with the appropriate status and headers
    return new Response(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    logger.error("Proxy error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: (error as Error).message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// Export the handler for different HTTP methods
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
export const OPTIONS = handler;
