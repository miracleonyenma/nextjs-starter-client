// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import {
  isProtectedRoute,
  isAuthRoute,
  AUTH_EXCEPTIONS,
} from "@/utils/routePatterns";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Get and decrypt session
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = !!session?.id;

  // Handle authentication redirects
  if (isProtectedRoute(path) && !isAuthenticated) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // Only redirect to dashboard for auth pages that aren't in the exceptions list
  if (isAuthRoute(path) && isAuthenticated && !AUTH_EXCEPTIONS.includes(path)) {
    // Redirect to dashboard if already authenticated and trying to access auth pages (except logout)
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Add path to request headers
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
