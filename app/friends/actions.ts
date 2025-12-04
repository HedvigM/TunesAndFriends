"use server";

import { requireAuth } from "lib/auth/app-router";
import { relationService } from "services/relationService";
import { userService } from "services/userService";

export interface AddRelationResult {
  success: boolean;
  error?: string;
}

export async function addRelationAction(
  followingId: number
): Promise<AddRelationResult> {
  try {
    const session = await requireAuth();

    if (!session.user?.email) {
      return {
        success: false,
        error: "User email not found",
      };
    }

    const currentUserResult = await userService.getUserByEmail(session.user.email);
    if (!currentUserResult.success || !currentUserResult.data) {
      return {
        success: false,
        error: currentUserResult.error || "User not found",
      };
    }

    const followerId = currentUserResult.data.id;

    const result = await relationService.followUser({
      followerId,
      followingId,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to add relation",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in addRelationAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add relation",
    };
  }
}

