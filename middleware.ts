// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import {
  isLoginOrRegisterRoute,
  isProtectedRoute,
} from "./utils/routePatterns";

/**
 * Function to get the session cookie and check if the user is authenticated
 */
const checkIsAuthenticated = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = !!session?.id;
  return isAuthenticated;
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only check auth for protected routes
  if (isProtectedRoute(path)) {
    const isAuthenticated = await checkIsAuthenticated();

    if (!isAuthenticated) {
      // Redirect to login if trying to access protected route without auth
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
  }

  // If the user is authenticated and trying to access the login or register page, redirect to dashboard
  if (isLoginOrRegisterRoute(path)) {
    const isAuthenticated = await checkIsAuthenticated();

    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  // Add path to request headers for potential use elsewhere
  req.headers.set("x-pathname", path);
  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
