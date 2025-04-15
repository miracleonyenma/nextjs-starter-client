import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { gqlServerClient } from "@/lib/gqlClient";
import { Query } from "@/types/gql/graphql";
import { ME_QUERY } from "@/utils/auth/me";
import { logger } from "@untools/logger";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!session?.userId || !accessToken) {
    redirect("/auth/login");
  }

  return { isAuth: true, user: session, accessToken };
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
