import { createSession } from "@/lib/session";
import { serverLoginUser } from "@/utils/auth/loginUser";
import { logger } from "@untools/logger";

const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const data = await serverLoginUser({ ...body });
    logger.log("🚀 ~ file: route.ts ~ line 13 ~ POST ~ data", data);

    // create session here
    if (data?.login.user) {
      logger.info("Creating session for user:", data?.login.user);
      await createSession({
        user: data?.login.user,
        accessToken: data?.login?.accessToken || undefined,
        refreshToken: data?.login?.refreshToken || undefined,
      });
    }

    return Response.json(data);
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
};

export { POST };
