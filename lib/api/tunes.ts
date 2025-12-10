import { apiClient, ApiResult } from "./client";
import { Tune, CreateTuneRequest } from "./types";

export async function getTune(sessionId: number): Promise<ApiResult<Tune>> {
  return apiClient.get<Tune>(`/api/tunes/tune?sessionId=${sessionId}`);
}

export async function getTunesByUserId(auth0UserId: string): Promise<ApiResult<Tune[]>> {
  return apiClient.get<Tune[]>(`/api/tunes/tune?auth0UserId=${auth0UserId}`);
}

export async function saveTune(
  data: CreateTuneRequest
): Promise<ApiResult<Tune>> {
  return apiClient.post<Tune>("/api/tunes/tune", data);
}

export async function getTunes(
  sessionIds: number[]
): Promise<ApiResult<Tune[]>> {
  const results = await Promise.all(sessionIds.map((id) => getTune(id)));

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

