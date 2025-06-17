// ./app/api/auth/google/route.ts

import { NextRequest, NextResponse } from "next/server";
import { handleGetGoogleSession } from "@/utils/auth/google/server";
import { logger } from "@untools/logger";
import { createSession } from "@/lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const REDIRECT_URI = `${APP_URL}/api/auth/google`;

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const url = request.nextUrl.clone();
  const code = searchParams.get("code");
  logger.log("🪵🪵🪵🪵🪵 ~ code", code);
  logger.log("🪵🪵🪵🪵🪵 ~ API_URL", API_URL);

  if (!code) {
    url.pathname = "/auth/failure";
    url.searchParams.append("name", "google");
    url.searchParams.append("error", "No code provided");
    return NextResponse.redirect(url);
  }

  try {
    const res = await handleGetGoogleSession({
      code,
      redirect_uri: REDIRECT_URI,
    });
    logger.log("🌴🌴🌴🌴🌴 ~ res", res);

    const googleAuth = res?.googleAuth;

    // create session here
    if (googleAuth?.user) {
      logger.info("Creating session for user:", googleAuth?.user);

      // // check if user has admin or developer role
      // const isAllowed = googleAuth?.user?.roles?.some(
      //   (role) => role?.name === "admin" || role?.name === "developer",
      // );

      // if (!isAllowed) {
      //   throw new Error("User is not allowed to access site");
      // }

      await createSession({
        user: googleAuth?.user,
        accessToken: googleAuth?.accessToken || undefined,
        refreshToken: googleAuth?.refreshToken || undefined,
      });
    }

    return NextResponse.redirect(`${APP_URL}/`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error("🚨🚨🚨🚨🚨 ~ error", error);
    url.pathname = "/auth/failure";
    url.searchParams.append("name", "google");
    url.searchParams.append("error", error.message);
    return NextResponse.redirect(url);
  }
};

export { GET };
