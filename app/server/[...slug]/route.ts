import { logger } from "@untools/logger";
import { NextRequest } from "next/server";

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

// Main handler function for all HTTP methods
async function handler(req: NextRequest) {
  try {
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

    logger.log("🚀 ~ fullUrl: ", fullUrl);

    // Clone the request to safely read its body
    const requestClone = req.clone();

    // Prepare headers with API key
    const headers: Record<string, string> = {
      ...filterAndForwardHeaders(req.headers),
      "x-api-key": API_KEY || "",
    };

    // Process request body for POST, PUT, PATCH
    let body;
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      const contentType = req.headers.get("content-type");

      // Handle different content types appropriately
      if (contentType?.includes("application/json")) {
        const jsonData = await requestClone.json();
        body = JSON.stringify(jsonData);
        headers["content-type"] = "application/json";
      } else {
        body = await requestClone.text();
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
    const response = await fetch(fullUrl, fetchOptions);

    logger.log("🚀 ~ response status:", response.status);
    logger.log(
      "🚀 ~ response headers:",
      Object.fromEntries(response.headers.entries())
    );

    // Get the response content as text
    const responseText = await response.text();
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
      }
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
