// ./app/api/proxy/route.ts

import { logger } from "@untools/logger";
import { NextRequest } from "next/server";

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

/**
 * Helper function to filter out hop-by-hop headers
 */
function filterAndForwardHeaders(headers: Headers) {
  const filteredHeaders: Record<string, string> = {};
  headers.forEach((value, key) => {
    if (!hopByHopHeaders.has(key?.toLowerCase())) {
      filteredHeaders[key] = value;
    }
  });

  return filteredHeaders;
}

/**
 * Main handler function for all HTTP methods
 */
async function handler(req: NextRequest) {
  try {
    // Extract the target URL from the request body or query parameters
    let targetUrl: string | null = null;

    targetUrl = req.nextUrl.searchParams.get("url");

    // For GET and HEAD requests, use query parameter
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      // Remove the url parameter from forwarded query params
      const forwardParams = new URLSearchParams(req.nextUrl.searchParams);
      forwardParams.delete("url");

      // If we have a target URL and additional query params, append them
      if (targetUrl && forwardParams.toString()) {
        const hasQueryParams = targetUrl.includes("?");
        targetUrl += hasQueryParams
          ? `&${forwardParams.toString()}`
          : `?${forwardParams.toString()}`;
      }
    }
    // For requests with body (POST, PUT, PATCH), get URL from body
    else {
      try {
        const body = await req.json();
        targetUrl = targetUrl || body.url;

        // Remove the url property from the forwarded body
        const restBody = body;
        req = new NextRequest(req.url, {
          method: req.method,
          headers: req.headers,
          body: JSON.stringify(restBody),
        });
      } catch (error) {
        logger.error("Error parsing request body:", error);
        // If body parsing fails, check if URL is in query params as fallback
        targetUrl = req.nextUrl.searchParams.get("url");
      }
    }

    // Validate that target URL exists
    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Target URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ensure the target URL is properly formed
    try {
      new URL(targetUrl);
    } catch (error) {
      logger.error("Invalid target URL:", error);
      return new Response(
        JSON.stringify({ error: "Invalid target URL format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Prepare the fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: filterAndForwardHeaders(req.headers),
      // Only include body for methods that typically have one
      ...(["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && {
        body: await req.text(),
      }),
    };

    // Forward the request to the target URL
    const response = await fetch(targetUrl, fetchOptions);

    // Get the response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      // Don't forward hop-by-hop headers in the response either
      if (!hopByHopHeaders.has(key?.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });

    // Create the response with the appropriate status and headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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
