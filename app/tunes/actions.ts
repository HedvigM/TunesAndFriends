"use server";

import { tuneService } from "services/tuneService";

export interface AddTuneResult {
  success: boolean;
  error?: string;
}

export async function addTuneAction(
  sessionId: number,
  userId: number,
): Promise<AddTuneResult> {
  try {

    if (!userId) {
      return {
        success: false,
        error: "User ID not found",
      };
    }

    const result = await tuneService.saveNewTune({
      sessionId,
      userId: userId,
      tagName: undefined,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to add tune",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in addTuneAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add tune",
    };
  }
}

