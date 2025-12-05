/**
 * Relations API Module
 * 
 * Handles all relation-related API calls (follow/unfollow)
 */

import { apiClient, ApiResult } from "./client";
import { Relation, CreateRelationRequest } from "./types";

/**
 * Get relations for a user
 */
export async function getRelations(
  userId: number
): Promise<ApiResult<Relation[]>> {
  return apiClient.get<Relation[]>(`/api/relations/relations?userId=${userId}`);
}

/**
 * Create a new relation (follow a user)
 */
export async function followUser(
  followerId: number,
  followingId: number
): Promise<ApiResult<Relation>> {
  const data: CreateRelationRequest = { followerId, followingId };
  return apiClient.post<Relation>("/api/relations/relations", data);
}

/**
 * Delete a relation (unfollow a user)
 */
export async function unfollowUser(
  followerId: number,
  followingId: number
): Promise<ApiResult<void>> {
  return apiClient.delete<void>(
    `/api/relations/relations?followerId=${followerId}&followingId=${followingId}`
  );
}

