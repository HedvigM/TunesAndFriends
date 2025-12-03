/**
 * Auth utilities for App Router
 * 
 * These utilities work in Server Components and Route Handlers.
 * They use getSession() from @auth0/nextjs-auth0 which automatically
 * reads session cookies.
 */

import { getSession } from "@auth0/nextjs-auth0";
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
  const session = await getSession();
  return session;
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
  const session = await getSession();
  
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

