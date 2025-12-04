import { apiClient, ApiResult } from "./client";
import { User, CreateUserRequest, UpdateUserRequest } from "./types";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export async function listUsers(): Promise<ApiResult<User[]>> {
  return apiClient.get<User[]>("/api/users");
}

export async function listUsersWithTune(
  tuneId: number
): Promise<ApiResult<User[]>> {
  return apiClient.get<User[]>(`/api/users?tuneId=${tuneId}`);
}

export async function getUserByAuth0Id(
  auth0UserId: string
): Promise<ApiResult<User>> {
  return apiClient.get<User>(`/api/users/${encodeURIComponent(auth0UserId)}`);
}

export async function getUserById(id: number): Promise<ApiResult<User>> {
  return apiClient.get<User>(`/api/user/${id}`);
}

export async function createUser(user: UserProfile): Promise<ApiResult<User>> {
  const userData: CreateUserRequest = {
    name: user.name || "",
    email: user.email || "",
    auth0UserId: user.sub || "",
  };
  return apiClient.post<User>("/api/users", userData);
}

export async function updateUser(
  data: UpdateUserRequest
): Promise<ApiResult<User>> {
  return apiClient.patch<User>("/api/users", data);
}

export async function getOrCreateUser(
  user: UserProfile
): Promise<ApiResult<User>> {
  const result = await getUserByAuth0Id(user.sub!);

  if (result.success) {
    return result;
  }

  if (result.statusCode === 404 || result.error?.includes("not found")) {
    return createUser(user);
  }

  return result;
}

