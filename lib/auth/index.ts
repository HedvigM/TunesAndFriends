/**
 * Auth utilities index
 * 
 * Re-exports all authentication utilities for easy importing
 */

// App Router utilities (Server Components)
export {
  getAuthSession,
  requireAuth,
  requireAuthWithUser,
  getAuthenticatedUserId,
  getAuthenticatedUserEmail,
} from "./app-router";

// Types
export type { DatabaseUser, AuthWithUser } from "./app-router";

// Data fetching utilities (convenience wrappers)
export {
  getAuthenticatedUserId as getAuthenticatedUserIdForDataFetching,
  getUserIdOrNull,
  getAuthenticatedSession,
} from "./data-fetching";

