// ./server/[...slug]/route.ts

import { logger } from "@untools/logger";
import { NextRequest } from "next/server";

// Configure your remote API base URL
const API_URL = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
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

// Helper function to forward headers while excluding hop-by-hop headers
function filterAndForwardHeaders(headers: Headers) {
  const filteredHeaders: Record<string, string> = {
    "x-api-key": API_KEY || "",
  };
  headers.forEach((value, key) => {
    if (!hopByHopHeaders.has(key.toLowerCase())) {
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
    // const path = IS_GRAPHQL
    //   ? req.nextUrl.pathname.replace("/server/", "")
    //   : req.nextUrl.pathname;

    logger.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ path: ", path);

    // Construct the full URL for the remote API or GraphQL endpoint
    const url =
      IS_GRAPHQL && GRAPHQL_API
        ? new URL(GRAPHQL_API).toString()
        : new URL(path, API_URL + "/v1").toString();

    logger.log(API_URL);
    logger.log(url);

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    logger.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ fullUrl: ", fullUrl);

    // Prepare the fetch options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: filterAndForwardHeaders(req.headers),
      // Only include body for methods that typically have one
      ...(["POST", "PUT", "PATCH"].includes(req.method) && {
        body: await req.text(),
      }),
    };

    // Forward the request to the remote API
    const response = await fetch(fullUrl, fetchOptions);

    // Get the response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      // Don't forward hop-by-hop headers in the response either
      if (!hopByHopHeaders.has(key.toLowerCase())) {
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
    logger.error("Proxy error:", error);
    return new Response((error as Error).message, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
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
