// src/utils/routePatterns.ts
// Simplified version
export const PROTECTED_PATTERNS = ["/dashboard", "/account"];

/**
 * Checks if a path is a protected route
 */
export function isProtectedRoute(path: string): boolean {
  return PROTECTED_PATTERNS.some(
    (pattern) => path === pattern || path.startsWith(`${pattern}/`),
  );
}

/**
 * Checks if a path is login or register
 */
export function isLoginOrRegisterRoute(path: string): boolean {
  return path === "/auth/login" || path === "/auth/register";
}
