// dal.ts
import "server-only";

import { cookies, headers } from "next/headers";
import { decrypt } from "@/lib/session"; // Remove deleteSession import
import { cache } from "react";
import { redirect } from "next/navigation";
import { gqlServerClient } from "@/lib/gqlClient";
import { Query } from "@/types/gql/graphql";
import { ME_QUERY } from "@/utils/auth/me";
import { logger } from "@untools/logger";

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

export const getUser = cache(async () => {
  const session = await verifySession();
  const currentPath = (await headers()).get("x-pathname");

  if (currentPath?.includes("logout")) {
    return null;
  }

  if (!session?.isAuth) return null;

  try {
    const user = await gqlServerClient.executeGraphQL()<
      { me: Query["me"] },
      undefined
    >({
      query: ME_QUERY,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return user;
  } catch (error) {
    logger.error("Error getting user:", error);

    return null;
  }
});
