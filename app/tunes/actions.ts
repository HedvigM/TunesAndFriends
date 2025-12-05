"use server";

import { requireAuth } from "lib/auth/app-router";
import { tuneService } from "services/tuneService";

export interface AddTuneResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to add a tune to user's known tunes
 */
export async function addTuneAction(
  sessionId: number
): Promise<AddTuneResult> {
  try {
    const session = await requireAuth();

    if (!session.user.email) {
      return {
        success: false,
        error: "User email not found",
      };
    }

    if (!sessionId) {
      return {
        success: false,
        error: "Tune session ID is required",
      };
    }

    const result = await tuneService.saveNewTune({
      sessionId,
      email: session.user.email,
      knowOrLearn: "know",
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

