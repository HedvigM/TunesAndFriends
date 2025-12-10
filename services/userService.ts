import { UserProfile } from "@auth0/nextjs-auth0/client";
import {
  userWithRelationsSelect,
  userListSelect,
  userTuneBasicSelect,
} from "lib/prisma/selects";
import { BaseService, ServiceResult } from "./base/BaseService";

export interface CreateUserInput {
  name: string;
  email: string;
  auth0UserId: string;
  picture?: string | null;
}

export interface UpdateUserInput {
  town?: string | null;
  profileText?: string | null;
}

export class UserService extends BaseService {
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

  async getUserByAuth0Id(auth0UserId: string): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      const user = await this.prisma.user.findUnique({
        where: { auth0UserId },
        include: {
          userTunes: {
            include: {
              tune: true,
              tags: true,
            },
            take: 50,
          },
          following: true,
          followedBy: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }, "Failed to get user by Auth0 ID");
  }

  async getUserByEmail(email: string): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      return this.prisma.user.findUnique({
        where: { email },
        select: userWithRelationsSelect,
      });
    }, "Failed to get user by email");
  }

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

  async listUsersWithTune(
    sessionId: number,
    limit: number = 50
  ): Promise<ServiceResult<any[]>> {
    return this.execute(async () => {
      const users = await this.prisma.user.findMany({
        where: {
          userTunes: {
            some: {
              tune: {
                sessionId: sessionId,
              },
            },
          },
        },
        select: userTuneBasicSelect,
        take: limit,
        orderBy: { createdAt: "desc" },
      });
      return users || [];
    }, "Failed to list users with tune");
  }

  async createUser(input: CreateUserInput): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      // Business rule: Check if user already exists by email or auth0UserId
      const existingUserByEmail = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUserByEmail) {
        throw new Error("User with this email already exists");
      }

      const existingUserByAuth0Id = await this.prisma.user.findUnique({
        where: { auth0UserId: input.auth0UserId },
      });

      if (existingUserByAuth0Id) {
        throw new Error("User with this Auth0 ID already exists");
      }

      const newUser = await this.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          auth0UserId: input.auth0UserId,
          picture: input.picture || null,
        },
      });

      console.log("User created in database with ID:", newUser.id);
      return newUser;
    }, "Failed to create user");
  }

  async createUserFromAuth0(
    profile: UserProfile & { picture?: string | null }
  ): Promise<ServiceResult<any>> {
    return this.createUser({
      name: profile.name || "",
      email: profile.email || "",
      auth0UserId: profile.sub || "",
      picture: profile.picture || null,
    });
  }

  async getOrCreateUser(profile: UserProfile): Promise<ServiceResult<any>> {
    const existingUser = await this.getUserByAuth0Id(profile.sub!);

    if (existingUser.success && existingUser.data) {
      console.log("User found, returning existing user:", existingUser.data.id);
      return existingUser;
    }

    
    const createResult = await this.createUserFromAuth0(profile);
    
    if (!createResult.success) {
      console.error("Failed to create user:", createResult.error);
      console.error("Create result:", createResult);
      return createResult;
    }

    console.log("User created successfully:", createResult.data?.id);

    if (createResult.data?.auth0UserId) {
      const fetchedUser = await this.getUserByAuth0Id(createResult.data.auth0UserId);
      if (fetchedUser.success) {
        return fetchedUser;
      }
    }
    
    return createResult;
  }

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

  async deleteUser(id: number): Promise<ServiceResult<any>> {
    return this.execute(async () => {
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

export const userService = new UserService();

