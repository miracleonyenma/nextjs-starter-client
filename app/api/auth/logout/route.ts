// ./app/api/auth/logout/route.ts

import { deleteSession } from "@/app/lib/session";

export async function GET() {
  try {
    const { deleteCookies } = await deleteSession();
    await deleteCookies(); // Call the deleteCookies function here

    return Response.json({ success: true });
  } catch (error) {
    console.log("🚨🚨🚨🚨🚨🚨 ~ error", error);
    return new Response((error as Error).message, { status: 500 });
  }
}
