"use server";

import { requireAuth } from "lib/auth/app-router";
import { tuneService } from "services/tuneService";

export interface AddTagResult {
  success: boolean;
  error?: string;
  tag?: { id: number; name: string };
}

export async function addTagToTuneAction(
  tuneId: number,
  tagName: string
): Promise<AddTagResult> {
  try {
    await requireAuth();

    if (!tuneId || !tagName || tagName.trim().length === 0) {
      return {
        success: false,
        error: "Tune ID and tag name are required",
      };
    }

    const result = await tuneService.addTagToTune(tuneId, tagName.trim());

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to add tag",
      };
    }

    return {
      success: true,
      tag: result.data?.tag,
    };
  } catch (error) {
    console.error("Error in addTagToTuneAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add tag",
    };
  }
}

