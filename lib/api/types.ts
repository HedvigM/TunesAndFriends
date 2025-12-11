/**
 * Shared TypeScript Types for API
 * 
 * Defines all data models and request/response types
 */

export interface User {
  id: number;
  createdAt: Date | string;
  name: string;
  auth0UserId: string;
  email: string;
  town: string | null;
  profileText: string | null;
  role: "BASIC" | "ADMIN";
  userTunes?: Tune[];
  following?: User[];
  followedBy?: User[];
}

export interface Tune {
  id: number;
  sessionId: number;
  name: string;
  type: string;
  createdAt: Date | string;
  users?: User[];
}

export interface Relation {
  followerId: number;
  followingId: number;
  follower?: User;
  following?: User;
}

// Request types
export interface CreateUserRequest {
  name: string;
  email: string;
  auth0UserId: string;
}

export interface UpdateUserRequest {
  email: string;
  town?: string;
  profileText?: string;
}

export interface CreateTuneRequest {
  sessionId: number;
  name: string;
  type: string;
  userId: number;
}

export interface CreateRelationRequest {
  followerId: number;
  followingId: number;
}

// Simple data types for legacy compatibility
export interface TableData {
  name: string;
  id: number;
}

