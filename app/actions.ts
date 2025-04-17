// app/lib/actions.ts
"use server";

import { cookies } from "next/headers";
import { logger } from "@untools/logger";

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
