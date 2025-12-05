import { apiClient, ApiResult } from "./client";

export interface AddTagToTuneRequest {
  tuneId: number;
  tagName: string;
}

export interface Tag {
  id: number;
  name: string;
}

export async function addTagToTune(
  data: AddTagToTuneRequest
): Promise<ApiResult<Tag>> {
  return apiClient.post<Tag>("/api/tags/addTag", data);
}
