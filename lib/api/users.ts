/**
 * User API Module
 * 
 * Handles all user-related API calls
 */

import { apiClient, ApiResult } from "./client";
import { User, CreateUserRequest, UpdateUserRequest } from "./types";
import { UserProfile } from "@auth0/nextjs-auth0";

/**
 * Get all users
 */
export async function listUsers(): Promise<ApiResult<User[]>> {
  return apiClient.get<User[]>("/api/users");
}

/**
 * Get users that know a specific tune
 */
export async function listUsersWithTune(
  tuneId: number
): Promise<ApiResult<User[]>> {
  return apiClient.get<User[]>(`/api/users?tuneId=${tuneId}`);
}

/**
 * Get user by Auth0 ID
 */
export async function getUserByAuth0Id(
  auth0UserId: string
): Promise<ApiResult<User>> {
  return apiClient.get<User>(`/api/users/${encodeURIComponent(auth0UserId)}`);
}

/**
 * Get user by internal ID
 */
export async function getUserById(id: number): Promise<ApiResult<User>> {
  return apiClient.get<User>(`/api/user/${id}`);
}

/**
 * Create a new user
 */
export async function createUser(user: UserProfile): Promise<ApiResult<User>> {
  const userData: CreateUserRequest = {
    name: user.name || "",
    email: user.email || "",
    auth0UserId: user.sub || "",
  };
  return apiClient.post<User>("/api/users", userData);
}

/**
 * Update user profile
 */
export async function updateUser(
  data: UpdateUserRequest
): Promise<ApiResult<User>> {
  return apiClient.patch<User>("/api/users", data);
}

/**
 * Get or create user (convenience function)
 * 
 * First attempts to get the user by Auth0 ID.
 * If the user doesn't exist (404), creates a new user.
 */
export async function getOrCreateUser(
  user: UserProfile
): Promise<ApiResult<User>> {
  // First try to get the user
  const result = await getUserByAuth0Id(user.sub!);

  if (result.success) {
    return result;
  }

  // If user doesn't exist, create them
  if (result.statusCode === 404 || result.error?.includes("not found")) {
    console.log("User not found, creating new user...");
    return createUser(user);
  }

  // Return the error if it's not a 404
  return result;
}

