/**
 * Tune API Module
 * 
 * Handles all tune-related API calls
 */

import { apiClient, ApiResult } from "./client";
import { Tune, CreateTuneRequest } from "./types";

/**
 * Get tune by session ID
 */
export async function getTune(sessionId: number): Promise<ApiResult<Tune>> {
  return apiClient.get<Tune>(`/api/tunes/tune?sessionId=${sessionId}`);
}

/**
 * Get tunes by user Auth0 ID
 */
export async function getTunesByUserId(auth0UserId: string): Promise<ApiResult<Tune[]>> {
  console.log("jag körs 2")
  return apiClient.get<Tune[]>(`/api/tunes/tune?auth0UserId=${auth0UserId}`);
}

/**
 * Create or update a tune
 */
export async function saveTune(
  data: CreateTuneRequest
): Promise<ApiResult<Tune>> {
  return apiClient.post<Tune>("/api/tunes/tune", data);
}

export async function getTunes(
  sessionIds: number[]
): Promise<ApiResult<Tune[]>> {
  const results = await Promise.all(sessionIds.map((id) => getTune(id)));

  // Filter successful results
  const tunes = results
    .filter((result) => result.success)
    .map((result) => (result as ApiResult<Tune> & { success: true }).data);

  if (tunes.length === 0 && results.length > 0) {
    return {
      success: false,
      error: "Failed to fetch any tunes",
    };
  }

  return {
    success: true,
    data: tunes,
  };
}

