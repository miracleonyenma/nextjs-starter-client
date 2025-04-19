// ./app/actions.ts
"use server";

import { cookies } from "next/headers";
import { logger } from "@untools/logger";
import refreshToken from "@/utils/auth/refreshToken";
import { expiresAt } from "@/lib/session";

export async function logoutAction() {
  logger.warn("Deleting session via server action");

  // Delete cookies
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("user");

  // Return success
  return { success: true };
}

export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get("refreshToken")?.value;
  const session = cookieStore.get("session")?.value;

  if (!refreshTokenValue || !session) {
    return { success: false, error: "No refresh token or session available" };
  }

  try {
    // Get new access token using refresh token
    const data = await refreshToken(refreshTokenValue);

    if (!data.refreshToken?.accessToken) {
      return { success: false, error: "Failed to get new access token" };
    }

    // Update the access token cookie
    cookieStore.set("accessToken", data.refreshToken.accessToken, {
      expires: expiresAt.threeDays, // 3 days
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    // Extend session cookie expiry
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt.sevenDays, // 7 days,
      sameSite: "lax",
      path: "/",
    });

    return { success: true, accessToken: data.refreshToken.accessToken };
  } catch (error) {
    logger.error("Token refresh failed:", error);
    return { success: false, error: (error as Error).message };
  }
}
