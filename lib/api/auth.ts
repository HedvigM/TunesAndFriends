/**
 * Auth API Module
 *
 * Handles authentication-related API calls
 */

import { apiClient, ApiResult } from "./client";
import { User } from "./types";

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<ApiResult<User>> {
  return apiClient.get<User>("/api/auth/me");
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const result = await getCurrentUser();
  return result.success;
}



