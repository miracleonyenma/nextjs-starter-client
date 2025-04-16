import { createSession } from "@/app/lib/session";
import { serverLoginUser } from "@/utils/auth/loginUser";
import { logger } from "@untools/logger";
import { cookies } from "next/headers";

const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const data = await serverLoginUser({ ...body });
    logger.log("🚀 ~ file: route.ts ~ line 13 ~ POST ~ data", data);

    // create session here
    if (data?.login.user) {
      logger.info("Creating session for user:", data?.login.user);
      await createSession(data?.login.user);
    }

    if (data?.login.accessToken)
      (await cookies()).set("accessToken", data?.login.accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 3 days
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    if (data?.login.refreshToken)
      (await cookies()).set("refreshToken", data?.login.refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    if (data?.login.user)
      (await cookies()).set("user", JSON.stringify(data?.login.user), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 3 days
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

    return Response.json(data);
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
};

export { POST };
