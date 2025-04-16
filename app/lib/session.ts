// ./app/lib/session.ts

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { User } from "@/types/gql/graphql";
import { logger } from "@untools/logger";
import { cookies } from "next/headers";
import refreshToken from "@/utils/auth/refreshToken";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

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
    return payload;
  } catch (error) {
    logger.error("Error decrypting session:", error);
    return null;
  }
}

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(user);
  const cookieStore = await cookies();

  // logger.debug("Creating session:", session);

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // created cookie
  // logger.debug("Created cookie:", cookieStore.get("session")?.value);
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const token = (await cookies()).get("refreshToken")?.value;

  // refresh token
  if (token && session) {
    const data = await refreshToken(token);
    if (!data.refreshToken.accessToken) {
      return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
