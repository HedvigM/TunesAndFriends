/**
 * User Service
 * Handles all user-related business logic
 */

import { UserProfile } from "@auth0/nextjs-auth0";
import {
  userWithRelationsSelect,
  userListSelect,
  userWithTuneSelect,
} from "lib/prisma/selects";
import { BaseService, ServiceResult } from "./base/BaseService";

export interface CreateUserInput {
  name: string;
  email: string;
  auth0UserId: string;
}

export interface UpdateUserInput {
  town?: string | null;
  profileText?: string | null;
}

export class UserService extends BaseService {
  /**
   * Get user by internal ID
   */
  async getUserById(id: number): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: userWithRelationsSelect,
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }, "Failed to get user by ID");
  }

  /**
   * Get user by Auth0 ID
   */
  async getUserByAuth0Id(auth0UserId: string): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      const user = await this.prisma.user.findUnique({
        where: { auth0UserId },
        select: userWithRelationsSelect,
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }, "Failed to get user by Auth0 ID");
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      return this.prisma.user.findUnique({
        where: { email },
        select: userWithRelationsSelect,
      });
    }, "Failed to get user by email");
  }

  /**
   * List all users with pagination
   */
  async listUsers(
    limit: number = 100,
    offset: number = 0
  ): Promise<ServiceResult<any[]>> {
    return this.execute(async () => {
      return this.prisma.user.findMany({
        select: userListSelect,
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
      });
    }, "Failed to list users");
  }

  /**
   * List users who know a specific tune
   */
  async listUsersWithTune(
    tuneId: number,
    limit: number = 50
  ): Promise<ServiceResult<any[]>> {
    return this.execute(async () => {
      return this.prisma.user.findMany({
        where: {
          knowTunes: {
            some: { sessionId: tuneId },
          },
        },
        select: userWithTuneSelect(tuneId),
        take: limit,
        orderBy: { createdAt: "desc" },
      });
    }, "Failed to list users with tune");
  }

  /**
   * Create a new user
   */
  async createUser(input: CreateUserInput): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      // Business rule: Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create user
      return this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          auth0UserId: input.auth0UserId,
        },
      });
    }, "Failed to create user");
  }

  /**
   * Create user from Auth0 profile
   */
  async createUserFromAuth0(
    profile: UserProfile
  ): Promise<ServiceResult<any>> {
    return this.createUser({
      name: profile.name || "",
      email: profile.email || "",
      auth0UserId: profile.sub || "",
    });
  }

  /**
   * Get or create user (for login flow)
   */
  async getOrCreateUser(profile: UserProfile): Promise<ServiceResult<any>> {
    // Try to get existing user
    const existingUser = await this.getUserByAuth0Id(profile.sub!);

    if (existingUser.success) {
      return existingUser;
    }

    // User doesn't exist, create new one
    return this.createUserFromAuth0(profile);
  }

  /**
   * Update user profile
   */
  async updateUser(
    email: string,
    input: UpdateUserInput
  ): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      return this.prisma.user.update({
        where: { email },
        data: input,
      });
    }, "Failed to update user");
  }

  /**
   * Delete user
   */
  async deleteUser(id: number): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      // Business rule: Cannot delete admin users
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { role: true },
      });

      if (user?.role === "ADMIN") {
        throw new Error("Cannot delete admin users");
      }

      return this.prisma.user.delete({
        where: { id },
      });
    }, "Failed to delete user");
  }
}

// Export singleton instance
export const userService = new UserService();

