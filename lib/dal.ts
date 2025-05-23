// dal.ts
import "server-only";

import { cookies, headers } from "next/headers";
import { decrypt } from "@/lib/session"; // Remove deleteSession import
import { cache } from "react";
import { redirect } from "next/navigation";
import { Query, QueryUserArgs } from "@/types/gql/graphql";
import { ME_QUERY } from "@/utils/auth/me";
import { logger } from "@untools/logger";
import { executeServerGraphQL } from "./gqlServerClient";
import { GET_USER_QUERY } from "@/utils/user";

// Simplified route check - let middleware handle most redirects
const PROTECTED_PATTERNS = ["/dashboard"];

function isProtectedRoute(path: string | null): boolean {
  if (!path) return false;
  return PROTECTED_PATTERNS.some(
    (pattern) => path === pattern || path.startsWith(`${pattern}/`),
  );
}

export const verifySession = cache(async () => {
  const currentPath = (await headers()).get("x-pathname");
  const cookie = (await cookies()).get("session")?.value;
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (cookie) {
    logger.log("🚀 ~ cookie: ", cookie);
    const session = await decrypt(cookie);
    logger.log("🚀 ~ session: ", session);
    logger.log("🚀 ~ currentPath: ", currentPath);

    if (session?.id || accessToken) {
      return { isAuth: true, user: session, accessToken };
    }
  }

  // Only redirect from protected routes that somehow bypassed middleware
  if (currentPath && isProtectedRoute(currentPath)) {
    redirect("/auth/login");
  }

  return { isAuth: false, user: null, accessToken: null };
});

export const getUser = cache(async (variables: QueryUserArgs) => {
  const session = await verifySession();
  const currentPath = (await headers()).get("x-pathname");

  if (currentPath?.includes("logout")) {
    return null;
  }

  if (!session?.isAuth) return null;

  try {
    const user = await executeServerGraphQL<Pick<Query, "user">, QueryUserArgs>(
      {
        query: GET_USER_QUERY,
        variables,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        shouldRedirectOnFailure: true,
      },
    );

    return user;
  } catch (error) {
    logger.error("Error getting user:", error);

    return null;
  }
});

export const getMe = cache(async () => {
  const session = await verifySession();
  const currentPath = (await headers()).get("x-pathname");

  if (currentPath?.includes("logout")) {
    return null;
  }

  if (!session?.isAuth) return null;

  try {
    const user = await executeServerGraphQL<{ me: Query["me"] }, undefined>({
      query: ME_QUERY,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      shouldRedirectOnFailure: true,
    });

    return user;
  } catch (error) {
    logger.error("Error getting user:", error);

    return null;
  }
});
