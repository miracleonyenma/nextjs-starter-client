// ./lib/gqlServerClient.ts

import { GraphQLClient } from "@untools/gql-client";
import { cookies } from "next/headers";
import { refreshTokenAction } from "@/app/actions";
import { logger } from "@untools/logger";
import { redirect } from "next/navigation";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API;
const API_KEY = process.env.API_KEY;

const gqlServerClient = new GraphQLClient({
  apiUrl: GRAPHQL_API_URL,
  apiKey: API_KEY,
});

// Create a function that gets a fresh client with current tokens
export async function getServerGqlClient() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers: Record<string, string> = {
    "x-api-key": API_KEY || "",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  return new GraphQLClient({
    apiUrl: GRAPHQL_API_URL,
    apiKey: API_KEY,
    headers,
  });
}

// Enhanced execute function with token refresh
export async function executeServerGraphQL<
  TResponse,
  TVariables extends Record<string, unknown> | undefined,
>(params: {
  query: string;
  variables?: TVariables;
  headers?: Record<string, string>;
  url?: string;
  shouldRedirectOnFailure?: boolean;
}) {
  // Get fresh client with current tokens
  const client = await getServerGqlClient();

  try {
    // First attempt with current token
    return await client.executeGraphQL()<TResponse, TVariables>(params);
  } catch (error) {
    logger.error("GraphQL error:", error);

    // Check if it's an auth error
    const errorMsg = (error as Error).message.toLowerCase();
    const isAuthError =
      errorMsg.includes("invalid token") ||
      errorMsg.includes("expired token") ||
      errorMsg.includes("unauthenticated") ||
      errorMsg.includes("unauthorized");

    if (isAuthError) {
      logger.warn("Auth error detected, attempting token refresh");

      // Try to refresh the token
      const refreshResult = await refreshTokenAction();

      if (refreshResult.success) {
        logger.log("Token refreshed successfully, retrying request");
        // Get a new client with fresh token
        const refreshedClient = await getServerGqlClient();

        // Retry with new token
        return await refreshedClient.executeGraphQL()<TResponse, TVariables>(
          params,
        );
      } else {
        logger.error("Token refresh failed:", refreshResult.error);

        // If requested, redirect to logout on refresh failure
        if (params.shouldRedirectOnFailure !== false) {
          redirect("/auth/logout");
        }

        throw new Error("Authentication failed after token refresh attempt");
      }
    }

    // Re-throw original error if not auth related or if refresh failed
    throw error;
  }
}

export { gqlServerClient };
