# API Service Layer Implementation Plan

## 📋 Overview

**Goal:** Create a consolidated, type-safe API client layer that centralizes all API calls and provides consistent error handling, retry logic, and response formatting.

**Time Estimate:** 2-3 hours  
**Priority:** High - Maintainability & Developer Experience  
**Status:** 🟡 Planning Phase

---

## 🎯 Objectives

1. ✅ Centralize all API calls in one place (`lib/api/`)
2. ✅ Provide type-safe request/response interfaces
3. ✅ Standardize error handling across all API calls
4. ✅ Add retry logic for failed requests
5. ✅ Simplify client-side API usage
6. ✅ Make API calls easily testable

---

## 📐 Current State Analysis

### Current Issues:

1. **Scattered API Calls:**

   - Direct `fetch()` calls in multiple components
   - `services/local.tsx` has some helper functions but inconsistent
   - Mix of patterns across the codebase

2. **Inconsistent Error Handling:**

   - Some functions return `{ success, data, error }`
   - Others throw errors
   - No centralized error handling

3. **No Retry Logic:**

   - Network failures aren't retried
   - No exponential backoff

4. **Type Safety Issues:**
   - Many `any` types
   - Response types not strongly typed

### Current API Endpoints:

```
GET    /api/users                    - List all users
POST   /api/users                    - Create user
PATCH  /api/users                    - Update user
GET    /api/users/[auth0UserId]      - Get user by Auth0 ID
GET    /api/user/[id]                - Get user by ID
GET    /api/tunes/tune               - Get tune
POST   /api/tunes/tune               - Create/update tune
GET    /api/relations/relations      - Get relations
POST   /api/relations/relations      - Create relation
DELETE /api/relations/relations      - Delete relation
GET    /api/auth/me                  - Get current user
```

---

## 🏗️ Proposed Architecture

```
lib/
├── api/
│   ├── client.ts           # Base API client with retry logic
│   ├── types.ts            # Shared types for API responses
│   ├── users.ts            # User-related API calls
│   ├── tunes.ts            # Tune-related API calls
│   ├── relations.ts        # Relation-related API calls
│   └── auth.ts             # Auth-related API calls
```

---

## 📝 Implementation Plan

### **Phase 1: Create Base API Client (30 min)**

**File:** `lib/api/client.ts`

**Features:**

- Base `fetch` wrapper with retry logic
- Automatic error handling
- Request/response interceptors
- Type-safe response handling

**Example:**

```typescript
// lib/api/client.ts
import { env } from "../env";

export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

interface RequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestOptions = {},
    attempt: number = 1
  ): Promise<ApiResult<T>> {
    const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        if (!response.ok) {
          return {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            statusCode: response.status,
          };
        }
      }

      const data = await response.json();

      if (!response.ok) {
        // Retry on 5xx errors
        if (response.status >= 500 && attempt < retries) {
          console.warn(
            `Retrying request to ${url} (attempt ${attempt + 1}/${retries})`
          );
          await this.sleep(retryDelay * attempt);
          return this.fetchWithRetry<T>(url, options, attempt + 1);
        }

        return {
          success: false,
          error: data.message || data.error || "Request failed",
          message: data.message,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      // Retry on network errors
      if (attempt < retries) {
        console.warn(
          `Network error, retrying ${url} (attempt ${attempt + 1}/${retries})`
        );
        await this.sleep(retryDelay * attempt);
        return this.fetchWithRetry<T>(url, options, attempt + 1);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, { ...options, method: "GET" });
  }

  async post<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
```

---

### **Phase 2: Define Shared Types (15 min)**

**File:** `lib/api/types.ts`

```typescript
// lib/api/types.ts
export interface User {
  id: number;
  createdAt: Date;
  name: string;
  auth0UserId: string;
  email: string;
  town: string | null;
  profileText: string | null;
  role: "BASIC" | "ADMIN";
  knowTunes?: Tune[];
  starredTunes?: Tune[];
  following?: User[];
  followedBy?: User[];
}

export interface Tune {
  id: number;
  sessionId: number;
  name: string;
  type: string;
  createdAt: Date;
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
```

---

### **Phase 3: Implement User API Module (30 min)**

**File:** `lib/api/users.ts`

```typescript
// lib/api/users.ts
import { apiClient, ApiResult } from "./client";
import { User, CreateUserRequest, UpdateUserRequest } from "./types";
import { UserProfile } from "@auth0/nextjs-auth0";

/**
 * Get all users
 */
export async function listUsers(): Promise<ApiResult<User[]>> {
  return apiClient.get<User[]>("/api/users");
}

/**
 * Get users that know a specific tune
 */
export async function listUsersWithTune(
  tuneId: number
): Promise<ApiResult<User[]>> {
  return apiClient.get<User[]>(`/api/users?tuneId=${tuneId}`);
}

/**
 * Get user by Auth0 ID
 */
export async function getUserByAuth0Id(
  auth0UserId: string
): Promise<ApiResult<User>> {
  return apiClient.get<User>(`/api/users/${encodeURIComponent(auth0UserId)}`);
}

/**
 * Get user by internal ID
 */
export async function getUserById(id: number): Promise<ApiResult<User>> {
  return apiClient.get<User>(`/api/user/${id}`);
}

/**
 * Create a new user
 */
export async function createUser(user: UserProfile): Promise<ApiResult<User>> {
  const userData: CreateUserRequest = {
    name: user.name || "",
    email: user.email || "",
    auth0UserId: user.sub || "",
  };
  return apiClient.post<User>("/api/users", userData);
}

/**
 * Update user profile
 */
export async function updateUser(
  data: UpdateUserRequest
): Promise<ApiResult<User>> {
  return apiClient.patch<User>("/api/users", data);
}

/**
 * Get or create user (convenience function)
 */
export async function getOrCreateUser(
  user: UserProfile
): Promise<ApiResult<User>> {
  // First try to get the user
  const result = await getUserByAuth0Id(user.sub!);

  if (result.success) {
    return result;
  }

  // If user doesn't exist, create them
  if (result.statusCode === 404 || result.error?.includes("not found")) {
    console.log("User not found, creating new user...");
    return createUser(user);
  }

  // Return the error if it's not a 404
  return result;
}
```

---

### **Phase 4: Implement Tune API Module (20 min)**

**File:** `lib/api/tunes.ts`

```typescript
// lib/api/tunes.ts
import { apiClient, ApiResult } from "./client";
import { Tune, CreateTuneRequest } from "./types";

/**
 * Get tune by session ID
 */
export async function getTune(sessionId: number): Promise<ApiResult<Tune>> {
  return apiClient.get<Tune>(`/api/tunes/tune?sessionId=${sessionId}`);
}

/**
 * Create or update a tune
 */
export async function saveTune(
  data: CreateTuneRequest
): Promise<ApiResult<Tune>> {
  return apiClient.post<Tune>("/api/tunes/tune", data);
}

/**
 * Get multiple tunes by session IDs
 */
export async function getTunes(
  sessionIds: number[]
): Promise<ApiResult<Tune[]>> {
  const results = await Promise.all(sessionIds.map((id) => getTune(id)));

  // Filter successful results
  const tunes = results
    .filter((result) => result.success)
    .map((result) => (result as any).data);

  if (tunes.length === 0 && results.length > 0) {
    return {
      success: false,
      error: "Failed to fetch any tunes",
    };
  }

  return {
    success: true,
    data: tunes,
  };
}
```

---

### **Phase 5: Implement Relations API Module (20 min)**

**File:** `lib/api/relations.ts`

```typescript
// lib/api/relations.ts
import { apiClient, ApiResult } from "./client";
import { Relation, CreateRelationRequest } from "./types";

/**
 * Get relations for a user
 */
export async function getRelations(
  userId: number
): Promise<ApiResult<Relation[]>> {
  return apiClient.get<Relation[]>(`/api/relations/relations?userId=${userId}`);
}

/**
 * Create a new relation (follow)
 */
export async function followUser(
  followerId: number,
  followingId: number
): Promise<ApiResult<Relation>> {
  const data: CreateRelationRequest = { followerId, followingId };
  return apiClient.post<Relation>("/api/relations/relations", data);
}

/**
 * Delete a relation (unfollow)
 */
export async function unfollowUser(
  followerId: number,
  followingId: number
): Promise<ApiResult<void>> {
  return apiClient.delete<void>(
    `/api/relations/relations?followerId=${followerId}&followingId=${followingId}`
  );
}
```

---

### **Phase 6: Implement Auth API Module (10 min)**

**File:** `lib/api/auth.ts`

```typescript
// lib/api/auth.ts
import { apiClient, ApiResult } from "./client";
import { User } from "./types";

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<ApiResult<User>> {
  return apiClient.get<User>("/api/auth/me");
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const result = await getCurrentUser();
  return result.success;
}
```

---

### **Phase 7: Create Index Export (5 min)**

**File:** `lib/api/index.ts`

```typescript
// lib/api/index.ts
export * from "./client";
export * from "./types";
export * from "./users";
export * from "./tunes";
export * from "./relations";
export * from "./auth";
```

---

### **Phase 8: Update Existing Code (30 min)**

#### Example: Update `pages/index.tsx`

**Before:**

```typescript
import { getUser, addUser, listUsers } from "services/local";

const fetchUserWithId = async () => {
  if (user) {
    const newUserWithId = await getUser(user?.sub as string);
    if (newUserWithId.success) {
      // ...
    } else {
      const createResult = await addUser(user);
      // ...
    }
  }
};
```

**After:**

```typescript
import { getOrCreateUser, listUsers } from "lib/api";

const fetchUserWithId = async () => {
  if (user) {
    const result = await getOrCreateUser(user);
    if (result.success) {
      const userData = result.data;
      // ...
    } else {
      console.error("Failed to get/create user:", result.error);
    }
  }
};
```

---

## 🎯 Migration Strategy

### Step 1: Implement Core (1 hour)

- [ ] Create `lib/api/client.ts` with base API client
- [ ] Create `lib/api/types.ts` with shared types
- [ ] Test retry logic and error handling

### Step 2: Implement API Modules (1 hour)

- [ ] Create `lib/api/users.ts`
- [ ] Create `lib/api/tunes.ts`
- [ ] Create `lib/api/relations.ts`
- [ ] Create `lib/api/auth.ts`
- [ ] Create `lib/api/index.ts`

### Step 3: Update Components (30 min)

- [ ] Update `pages/index.tsx`
- [ ] Update `components/Menu.tsx`
- [ ] Update other components using API calls
- [ ] Keep `services/local.tsx` as fallback (mark as deprecated)

### Step 4: Testing (30 min)

- [ ] Test all API calls work correctly
- [ ] Test retry logic with network failures
- [ ] Test error handling
- [ ] Verify type safety

---

## ✅ Benefits

1. **Centralized API Logic**

   - All API calls in one place
   - Easy to modify/update

2. **Type Safety**

   - Strong typing for requests/responses
   - Autocomplete in IDE

3. **Consistent Error Handling**

   - Standardized error format
   - Easier debugging

4. **Retry Logic**

   - Automatic retry on failures
   - Better user experience

5. **Testability**

   - Easy to mock API calls
   - Simplified testing

6. **Developer Experience**
   - Simple, intuitive API
   - Self-documenting code

---

## 📊 Success Criteria

- [ ] All API calls use the new service layer
- [ ] No direct `fetch()` calls in components
- [ ] Type-safe request/response handling
- [ ] Consistent error handling across all API calls
- [ ] Retry logic works for network failures
- [ ] Documentation is clear and complete
- [ ] Code is easier to maintain and test

---

## 🚀 Future Enhancements

1. **Request Caching**

   - Cache GET requests
   - Invalidate on mutations

2. **Request Deduplication**

   - Prevent duplicate simultaneous requests

3. **Loading States**

   - Built-in loading state management

4. **Optimistic Updates**

   - Update UI before server response

5. **GraphQL Support**
   - Add GraphQL client if needed

---

**Status:** Ready to implement
**Estimated Total Time:** 2-3 hours
**Priority:** High
**Dependencies:** None (can start immediately)
