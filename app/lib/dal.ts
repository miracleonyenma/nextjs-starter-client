// dal.ts
import "server-only";

import { cookies, headers } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { gqlServerClient } from "@/lib/gqlClient";
import { Query } from "@/types/gql/graphql";
import { ME_QUERY } from "@/utils/auth/me";
import { logger } from "@untools/logger";
import { isPublicRoute, isAuthRoute } from "@/utils/routePatterns";

export const verifySession = cache(async () => {
  const currentPath = (await headers()).get("x-pathname");
  const cookie = (await cookies()).get("session")?.value;
  logger.log("🚀 ~ cookie: ", cookie);

  if (cookie) {
    const session = await decrypt(cookie);
    const accessToken = (await cookies()).get("accessToken")?.value;

    logger.log("🚀 ~ session: ", session);
    logger.log("🚀 ~ currentPath: ", currentPath);

    if (session?.id || accessToken) {
      return { isAuth: true, user: session, accessToken };
    }
  }

  // Check if current path is a public or auth route
  if (currentPath && !isPublicRoute(currentPath) && !isAuthRoute(currentPath)) {
    redirect("/auth/login");
  }
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

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
