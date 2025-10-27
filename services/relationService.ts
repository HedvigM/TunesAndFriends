/**
 * Relation Service
 * Handles user following/follower relationships
 */

import { BaseService, ServiceResult } from "./base/BaseService";

export interface CreateRelationInput {
  followerId: number;
  followingId: number;
}

export class RelationService extends BaseService {
  /**
   * Follow a user
   */
  async followUser(
    input: CreateRelationInput
  ): Promise<ServiceResult<boolean>> {
    return this.execute(async () => {
      // Business rule: Can't follow yourself
      if (input.followerId === input.followingId) {
        throw new Error("Cannot follow yourself");
      }

      // Business rule: Check if already following
      const existing = await this.prisma.user.findFirst({
        where: {
          id: input.followerId,
          following: {
            some: { id: input.followingId },
          },
        },
      });

      if (existing) {
        throw new Error("Already following this user");
      }

      // Create follow relationship
      await this.prisma.user.update({
        where: { id: input.followerId },
        data: {
          following: {
            connect: { id: input.followingId },
          },
        },
      });

      return true;
    }, "Failed to follow user");
  }

  /**
   * Unfollow a user
   */
  async unfollowUser(
    input: CreateRelationInput
  ): Promise<ServiceResult<boolean>> {
    return this.execute(async () => {
      await this.prisma.user.update({
        where: { id: input.followerId },
        data: {
          following: {
            disconnect: { id: input.followingId },
          },
        },
      });

      return true;
    }, "Failed to unfollow user");
  }

  /**
   * Get followers for a user
   */
  async getFollowers(userId: number): Promise<ServiceResult<any[]>> {
    return this.execute(async () => {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          followedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
            take: 100,
          },
        },
      });

      return user?.followedBy || [];
    }, "Failed to get followers");
  }

  /**
   * Get following for a user
   */
  async getFollowing(userId: number): Promise<ServiceResult<any[]>> {
    return this.execute(async () => {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          following: {
            select: {
              id: true,
              name: true,
              email: true,
            },
            take: 100,
          },
        },
      });

      return user?.following || [];
    }, "Failed to get following");
  }
}

// Export singleton instance
export const relationService = new RelationService();

