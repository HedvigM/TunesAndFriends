/**
 * Auth utilities for data fetching in Server Components
 * 
 * These are convenience wrappers around the app-router utilities.
 * Use these when fetching data that requires authentication.
 */

import { 
  getAuthSession, 
  requireAuth, 
  getAuthenticatedUserId as getUserId,
  getAuthenticatedUserEmail as getUserEmail
} from "./app-router";
import { redirect } from "next/navigation";

/**
 * Get the authenticated user's Auth0 ID.
 * Redirects to login if not authenticated.
 * 
 * This is the main function to use when fetching user-specific data.
 * 
 * @example
 * ```tsx
 * export default async function MyPage() {
 *   const userId = await getAuthenticatedUserId();
 *   const data = await fetchUserData(userId);
 *   return <div>{data}</div>;
 * }
 * ```
 */
export async function getAuthenticatedUserId(): Promise<string> {
  return getUserId();
}

/**
 * Get the user ID if authenticated, returns null if not.
 * Does not redirect - use this for optional authentication.
 * 
 * @example
 * ```tsx
 * export default async function PublicPage() {
 *   const userId = await getUserIdOrNull();
 *   const publicData = await fetchPublicData();
 *   const userData = userId ? await fetchUserData(userId) : null;
 *   return <div>{publicData}{userData}</div>;
 * }
 * ```
 */
export async function getUserIdOrNull(): Promise<string | null> {
  const session = await getAuthSession();
  return session?.user?.sub ?? null;
}

/**
 * Get the full authenticated session.
 * Redirects to login if not authenticated.
 * 
 * @example
 * ```tsx
 * const session = await getAuthenticatedSession();
 * const userId = session.user.sub;
 * const email = session.user.email;
 * ```
 */
export async function getAuthenticatedSession() {
  return requireAuth();
}

