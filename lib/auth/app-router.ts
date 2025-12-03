/**
 * Auth utilities for App Router
 * 
 * These utilities work in Server Components and Route Handlers.
 * They use getSession() from @auth0/nextjs-auth0 with cookies from next/headers.
 */

import { getSession } from "@auth0/nextjs-auth0";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Session } from "@auth0/nextjs-auth0";

/**
 * Get the current session without redirecting.
 * Returns null if user is not authenticated.
 * 
 * Use this when you want to conditionally render based on auth status.
 * 
 * @example
 * ```tsx
 * const session = await getAuthSession();
 * if (session) {
 *   return <AuthenticatedContent user={session.user} />;
 * }
 * return <PublicContent />;
 * ```
 */
export async function getAuthSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const headersList = await headers();
    
    // Build cookie header string in the format: "name1=value1; name2=value2"
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    
    // Check if we have the appSession cookie (Auth0's main session cookie)
    const appSessionCookie = cookieStore.get("appSession");
    
    if (!appSessionCookie) {
      // No Auth0 session cookie found
      return null;
    }
    
    // Get the current URL from headers
    const host = headersList.get("host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const pathname = headersList.get("x-pathname") || "/";
    const url = `${protocol}://${host}${pathname}`;
    
    // Create a request object that getSession expects
    // Auth0's getSession expects a Node.js-like request object
    const req = {
      method: "GET",
      url: url,
      headers: {
        get: (name: string) => {
          const lowerName = name.toLowerCase();
          if (lowerName === "cookie") {
            return cookieHeader;
          }
          // Return other headers
          const headerValue = headersList.get(name);
          if (headerValue) return headerValue;
          // Try lowercase
          return headersList.get(lowerName) || undefined;
        },
        // Some Auth0 versions might access headers directly
        cookie: cookieHeader,
      },
      // Additional properties that might be needed
      connection: {},
      socket: {},
    } as any;
    
    // Create a minimal response object
    // getSession might try to set cookies, so we need these methods
    const res = {
      setHeader: (_name: string, _value: string) => {},
      getHeader: (_name: string) => undefined,
      writeHead: (_status: number) => {},
      end: () => {},
    } as any;
    
    // Call getSession with the request and response objects
    const session = await getSession(req, res);
    
    if (!session) {
      console.log("getSession returned null despite having appSession cookie");
      console.log("Cookie header length:", cookieHeader.length);
      console.log("Request URL:", req.url);
      // Try to see what getSession is actually receiving
      console.log("Cookie header preview:", cookieHeader.substring(0, 100));
    } else {
      console.log("Session found! User:", session.user?.sub);
    }
    
    return session || null;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Require authentication - redirects to login if not authenticated.
 * Returns the session if authenticated.
 * 
 * Use this when the page requires authentication.
 * 
 * @example
 * ```tsx
 * const session = await requireAuth();
 * // User is guaranteed to be authenticated here
 * const userId = session.user.sub;
 * ```
 */
export async function requireAuth(): Promise<Session> {
  const session = await getAuthSession();
  
  if (!session || !session.user) {
    redirect("/api/auth/login");
  }
  
  return session;
}

/**
 * Get the authenticated user's Auth0 ID.
 * Redirects to login if not authenticated.
 * 
 * @example
 * ```tsx
 * const userId = await getAuthenticatedUserId();
 * const userData = await fetchUserData(userId);
 * ```
 */
export async function getAuthenticatedUserId(): Promise<string> {
  const session = await requireAuth();
  return session.user.sub;
}

/**
 * Get the authenticated user's email.
 * Redirects to login if not authenticated.
 * 
 * @example
 * ```tsx
 * const email = await getAuthenticatedUserEmail();
 * ```
 */
export async function getAuthenticatedUserEmail(): Promise<string | undefined> {
  const session = await requireAuth();
  return session.user.email;
}

