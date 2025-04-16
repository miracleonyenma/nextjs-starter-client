// src/utils/routePatterns.ts

// Define route patterns
export const PROTECTED_PATTERNS = ["/dashboard"];
export const AUTH_PATTERNS = ["/auth"];
// Special routes that don't follow the usual auth pattern rules
export const AUTH_EXCEPTIONS = ["/auth/logout"];
export const PUBLIC_PATTERNS = ["/", "/blog", "/about"]; // Add your public routes here

/**
 * Checks if a path matches any of the patterns
 */
export function matchesPattern(path: string, patterns: string[]): boolean {
  return patterns.some(
    (pattern) => path === pattern || path.startsWith(`${pattern}/`)
  );
}

/**
 * Checks if a path is a protected route
 */
export function isProtectedRoute(path: string): boolean {
  return matchesPattern(path, PROTECTED_PATTERNS);
}

/**
 * Checks if a path is an auth route (respecting exceptions)
 */
export function isAuthRoute(path: string): boolean {
  // Check if the path is in our exceptions list first
  if (AUTH_EXCEPTIONS.includes(path)) {
    return false;
  }
  return matchesPattern(path, AUTH_PATTERNS);
}

/**
 * Checks if a path is a public route
 */
export function isPublicRoute(path: string): boolean {
  return (
    matchesPattern(path, PUBLIC_PATTERNS) || AUTH_EXCEPTIONS.includes(path)
  );
}
