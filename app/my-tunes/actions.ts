"use server";

import { requireAuth } from "lib/auth/app-router";
import { tuneService } from "services/tuneService";
import { userService } from "services/userService";

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
    const session = await requireAuth();

    if (!tuneId || !tagName || tagName.trim().length === 0) {
      return {
        success: false,
        error: "Tune ID and tag name are required",
      };
    }

    if (!session.user?.email) {
      return {
        success: false,
        error: "User email not found",
      };
    }

    // Get the database user to get the user ID
    const userResult = await userService.getUserByEmail(session.user.email);
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        error: userResult.error || "User not found",
      };
    }

    const result = await tuneService.newAddTagToTune(tuneId, tagName.trim(), userResult.data.id);

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

export async function newAddTagToTuneAction(
  tuneId: number,
  tagName: string
): Promise<AddTagResult> {
  try {
    const session = await requireAuth();

    if (!tuneId || !tagName || tagName.trim().length === 0) {
      return {
        success: false,
        error: "Tune ID and tag name are required",
      };
    }

    if (!session.user?.email) {
      return {
        success: false,
        error: "User email not found",
      };
    }

    // Get the database user to get the user ID
    const userResult = await userService.getUserByEmail(session.user.email);
    if (!userResult.success || !userResult.data) {
      return {
        success: false,
        error: userResult.error || "User not found",
      };
    }

    const result = await tuneService.newAddTagToTune(tuneId, tagName.trim(), userResult.data.id);

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
    console.error("Error in newAddTagToTuneAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add tag",
    };
  }
}



