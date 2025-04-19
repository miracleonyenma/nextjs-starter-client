// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { isProtectedRoute } from "./utils/routePatterns";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only check auth for protected routes
  if (isProtectedRoute(path)) {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);
    const isAuthenticated = !!session?.id;

    if (!isAuthenticated) {
      // Redirect to login if trying to access protected route without auth
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
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
