/**
 * Next.js Middleware
 * 
 * This middleware runs on every request before the page is rendered.
 * Currently, it just passes through - Auth0 handles authentication via cookies.
 * 
 * You can add route protection here if needed, but Auth0's getSession()
 * in Server Components is usually sufficient for most use cases.
 * 
 * For more advanced use cases, you can:
 * - Add route protection logic here
 * - Redirect based on authentication status
 * - Add custom headers
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  // Currently, we let Auth0 handle authentication via cookies
  // and use getSession() in Server Components for route protection.
  // 
  // If you need to protect routes at the middleware level, you can:
  // 1. Import getSession from @auth0/nextjs-auth0
  // 2. Check authentication status
  // 3. Redirect to /api/auth/login if not authenticated
  //
  // Example:
  // const session = await getSession(request, response);
  // if (!session && request.nextUrl.pathname.startsWith('/protected')) {
  //   return NextResponse.redirect(new URL('/api/auth/login', request.url));
  // }

  return NextResponse.next();
}

// Configure which routes this middleware runs on
// By default, it runs on all routes except:
// - API routes (handled by Auth0)
// - Static files
// - _next/static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - Auth0 handles these)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

