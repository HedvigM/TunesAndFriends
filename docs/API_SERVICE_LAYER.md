# API Service Layer Documentation

## 📋 Overview

The API Service Layer provides a centralized, type-safe client for all backend communication. It replaces scattered `fetch()` calls throughout the application with a consistent, maintainable API.

**Status:** ✅ Implemented  
**Location:** `lib/api/`  
**Date:** October 26, 2025

---

## 🎯 Features

- ✅ **Automatic Retry Logic** - Failed requests are automatically retried with exponential backoff
- ✅ **Type-Safe Responses** - Full TypeScript support with strict typing
- ✅ **Consistent Error Handling** - Standardized error format across all endpoints
- ✅ **Centralized Configuration** - Single source of truth for API communication
- ✅ **Better Developer Experience** - Simple, intuitive API with autocomplete

---

## 📁 File Structure

```
lib/api/
├── client.ts           # Base API client with retry logic
├── types.ts            # Shared TypeScript types
├── users.ts            # User-related endpoints
├── tunes.ts            # Tune-related endpoints
├── relations.ts        # Relation-related endpoints (follow/unfollow)
├── auth.ts             # Authentication endpoints
└── index.ts            # Main export file
```

---

## 🚀 Usage Examples

### **Basic Usage**

```typescript
import { getUserByAuth0Id, listUsers, getTunes } from "lib/api";

// Get a user
const result = await getUserByAuth0Id(auth0UserId);
if (result.success) {
  console.log(result.data); // Type-safe user data
} else {
  console.error(result.error); // Error message
}
```

### **Response Format**

All API functions return a discriminated union type:

```typescript
type ApiResult<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; statusCode?: number; message?: string };
```

This allows for type-safe error handling:

```typescript
const result = await getUserByAuth0Id(userId);

if (result.success) {
  // TypeScript knows result.data is available
  const user = result.data;
} else {
  // TypeScript knows result.error is available
  console.error(result.error);
}
```

---

## 📚 Available Functions

### **User API** (`lib/api/users.ts`)

```typescript
// List all users
const users = await listUsers();

// List users that know a specific tune
const users = await listUsersWithTune(tuneId);

// Get user by Auth0 ID
const user = await getUserByAuth0Id(auth0UserId);

// Get user by internal ID
const user = await getUserById(id);

// Create a new user
const user = await createUser(userProfile);

// Update user profile
const user = await updateUser({ email, town, profileText });

// Get or create user (convenience function)
const user = await getOrCreateUser(userProfile);
```

### **Tune API** (`lib/api/tunes.ts`)

```typescript
// Get a single tune
const tune = await getTune(sessionId);

// Create or update a tune
const tune = await saveTune({ sessionId, name, type, userId });

// Get multiple tunes (fetches in parallel)
const tunes = await getTunes([sessionId1, sessionId2, sessionId3]);
```

### **Relations API** (`lib/api/relations.ts`)

```typescript
// Get relations for a user
const relations = await getRelations(userId);

// Follow a user
const relation = await followUser(followerId, followingId);

// Unfollow a user
const result = await unfollowUser(followerId, followingId);
```

### **Auth API** (`lib/api/auth.ts`)

```typescript
// Get current authenticated user
const currentUser = await getCurrentUser();

// Check if user is authenticated
const isAuth = await isAuthenticated();
```

---

## 🔧 Configuration

### **Retry Logic**

By default, the client retries failed requests up to 3 times with exponential backoff:

```typescript
const result = await getUserByAuth0Id(userId, {
  retries: 5, // Override default (3)
  retryDelay: 2000, // Override default (1000ms)
});
```

### **Custom Headers**

```typescript
const result = await getUserByAuth0Id(userId, {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

---

## 🔄 Migration Guide

### **Before (Old Pattern)**

```typescript
import { getUser, addUser } from "services/local";

// Scattered fetch calls with inconsistent error handling
const user = await getUser(auth0UserId);
if (user.success) {
  // ...
}
```

### **After (New Pattern)**

```typescript
import { getUserByAuth0Id, getOrCreateUser } from "lib/api";

// Centralized, type-safe API calls
const result = await getOrCreateUser(userProfile);
if (result.success) {
  const userData = result.data; // Fully typed!
} else {
  console.error(result.error); // Consistent error handling
}
```

---

## 🎨 Type Definitions

### **User**

```typescript
interface User {
  id: number;
  createdAt: Date | string;
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
```

### **Tune**

```typescript
interface Tune {
  id: number;
  sessionId: number;
  name: string;
  type: string;
  createdAt: Date | string;
  users?: User[];
}
```

### **Relation**

```typescript
interface Relation {
  followerId: number;
  followingId: number;
  follower?: User;
  following?: User;
}
```

---

## 🐛 Error Handling

### **Network Errors**

Network failures are automatically retried:

```typescript
const result = await getUserByAuth0Id(userId);

if (!result.success) {
  if (result.error === "Network error") {
    // Handle network failure
  }
}
```

### **HTTP Errors**

HTTP errors include status codes:

```typescript
const result = await getUserByAuth0Id(userId);

if (!result.success) {
  if (result.statusCode === 404) {
    // User not found
  } else if (result.statusCode === 500) {
    // Server error (will have been retried)
  }
}
```

---

## 📈 Performance

- **Parallel Requests**: Use `getTunes()` to fetch multiple items in parallel
- **Automatic Retries**: Failed requests are retried automatically (5xx errors only)
- **Exponential Backoff**: Retry delays increase with each attempt (1s, 2s, 3s...)

---

## 🔍 Testing

The API service layer is easy to mock for testing:

```typescript
import * as api from "lib/api";

// Mock the entire module
jest.mock("lib/api");

// Mock a specific function
jest.spyOn(api, "getUserByAuth0Id").mockResolvedValue({
  success: true,
  data: mockUser,
});
```

---

## ⚠️ Deprecation Notice

The old `services/local.tsx` file is now deprecated and will be removed in a future version. Please migrate to the new API service layer:

```typescript
// ❌ Old (deprecated)
import { getUser, addUser } from "services/local";

// ✅ New (recommended)
import { getUserByAuth0Id, getOrCreateUser } from "lib/api";
```

---

## 🚧 Future Enhancements

Planned improvements for the API service layer:

1. **Request Caching** - Cache GET requests to reduce server load
2. **Request Deduplication** - Prevent duplicate simultaneous requests
3. **Loading States** - Built-in loading state management with React hooks
4. **Optimistic Updates** - Update UI before server confirmation
5. **Websocket Support** - Real-time updates via websockets
6. **GraphQL Support** - Add GraphQL client if needed

---

## 📞 Support

If you encounter any issues with the API service layer:

1. Check the console for error messages
2. Verify your `.env.local` configuration
3. Ensure the backend API is running
4. Check network connectivity

---

**Last Updated:** October 26, 2025  
**Version:** 1.0.0  
**Maintainer:** TunesAndFriends Development Team
