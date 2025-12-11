"use server";

import { requireAuth } from "lib/auth/app-router";
import { userService } from "services/userService";

export interface UpdateProfileResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to update user profile (town and profileText)
 */
export async function updateUserProfileAction(
  email: string,
  town: string,
  profileText: string
): Promise<UpdateProfileResult> {
  try {
    const session = await requireAuth();

    if (!session.user?.email || session.user.email !== email) {
      return {
        success: false,
        error: "Unauthorized: You can only update your own profile",
      };
    }

    if (!email) {
      return {
        success: false,
        error: "Email is required",
      };
    }

    const result = await userService.updateUser(email, {
      town: town || null,
      profileText: profileText || null,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to update profile",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error in updateUserProfileAction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}

