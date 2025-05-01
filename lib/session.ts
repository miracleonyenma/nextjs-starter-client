// ./app/lib/session.ts

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { User } from "@/types/gql/graphql";
import { logger } from "@untools/logger";
import { cookies } from "next/headers";
import { refreshTokenAction } from "@/app/actions";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
export const expiresAt = {
  threeDays: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
  sevenDays: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  thirtyDays: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
};

export async function encrypt(payload: User) {
  return new SignJWT({ id: payload.id, role: payload.roles })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return null;
  logger.debug("Decrypting session:", session);
  logger.debug("Secret key:", secretKey);
  logger.debug("Encoded key:", encodedKey);
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    logger.debug("Payload:", payload);
    return payload;
  } catch (error) {
    logger.error("Error decrypting session:", error);
    return null;
  }
}

export async function createSession({
  user,
  accessToken,
  refreshToken,
}: {
  user: User;
  accessToken?: string;
  refreshToken?: string;
}) {
  const session = await encrypt(user);
  const cookieStore = await cookies();

  // logger.debug("Creating session:", session);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt.sevenDays,
    sameSite: "lax",
    path: "/",
  });

  if (accessToken)
    (await cookies()).set("accessToken", accessToken, {
      expires: expiresAt.threeDays, // 3 days
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  if (refreshToken)
    (await cookies()).set("refreshToken", refreshToken, {
      expires: expiresAt.sevenDays, // 7 days
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

  // created cookie
  // logger.debug("Created cookie:", cookieStore.get("session")?.value);
}

export async function updateSession() {
  // Since updateSession might be called from various contexts,
  // delegate the actual work to the server action
  try {
    const result = await refreshTokenAction();
    return result.success;
  } catch (error) {
    logger.error("Failed to update session:", error);
    return false;
  }
}

export async function deleteSession() {
  // This function should only be called from a Server Action or Route Handler
  logger.warn("Deleting session");

  // Return the cookie operations so they can be used in a Server Action or Route Handler
  return {
    deleteCookies: async () => {
      const cookieStore = await cookies();
      cookieStore.delete("session");
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("user");
    },
  };
}
