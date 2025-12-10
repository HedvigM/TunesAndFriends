# 🚀 TunesAndFriends - Improvement Roadmap

This document outlines potential improvements for the TunesAndFriends project, organized by priority and impact.

---

## 🔴 **HIGH PRIORITY** (Do These First)

### 1. Fix Prisma Client Singleton ⚠️

**Time Estimate:** 5 minutes
**Impact:** High - Performance & Memory
**Status:** ✅ Completed

**Problem:**

- Terminal shows "This is the 10th instance of Prisma Client being started"
- Multiple Prisma instances cause memory leaks and connection pool exhaustion
- Can lead to "Too many connections" errors in production

**Solution:**

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
```

**Then update all files:**

- Replace `new PrismaClient()` with `import { prisma } from 'lib/prisma'`
- Files to update: `pages/api/users.tsx`, `pages/api/users/[auth0UserId].tsx`, `pages/api/user/[slug].tsx`, etc.

**Why it matters:**

- Reduces memory usage by 90%
- Prevents connection pool exhaustion
- Improves API response times
- Essential for production deployment

---

### 2. Remove Unused @auth0/auth0-react

**Time Estimate:** 1 minute
**Impact:** Medium - Bundle Size
**Status:** ✅ Completed

**Problem:**

- `@auth0/auth0-react` is installed but not used
- You're using `@auth0/nextjs-auth0` instead (correct for Next.js)
- Adds unnecessary bloat to node_modules and bundle

**Solution:**

```bash
npm uninstall @auth0/auth0-react
```

**Why it matters:**

- Reduces bundle size
- Clearer dependencies
- Faster install times

---

### 3. Add Environment Variable Validation

**Time Estimate:** 15 minutes
**Impact:** High - Developer Experience
**Status:** ✅ Completed

**Problem:**

- No validation that required env vars exist at startup
- Cryptic runtime errors when env vars are missing
- Hard to debug for new developers

**Solution:**

```typescript
// lib/env.ts
const requiredEnvVars = [
  /* "DATABASE_URL", */
  "AUTH0_SECRET",
  "AUTH0_BASE_URL",
  "AUTH0_ISSUER_BASE_URL",
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
] as const;

export function validateEnv() {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join(
        "\n"
      )}\n\nPlease check your .env.local file.`
    );
  }
}

// Call in pages/_app.tsx
if (typeof window === "undefined") {
  validateEnv();
}
```

**Why it matters:**

- Fail fast with clear error messages
- Better onboarding for new developers
- Prevents production incidents

---

### 4. Standardize API Responses (English)

**Time Estimate:** 30 minutes
**Impact:** High - API Consistency
**Status:** ✅ Completed

**Problem:**

- API returns mixed Swedish/English messages
- Examples: "Det gick bra, här är användaren", "Något gick fel..."
- Inconsistent error handling

**Solution:**

```typescript
// lib/apiResponse.ts
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string };

export const success = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const error = (error: string, code?: string): ApiResponse<never> => ({
  success: false,
  error,
  code,
});

// Usage:
return res.status(200).json(success(user));
return res.status(400).json(error("User not found", "USER_NOT_FOUND"));
```

**Files to update:**

- `pages/api/users.tsx` - Replace Swedish messages
- `pages/api/users/[auth0UserId].tsx`
- `pages/api/user/[slug].tsx`
- All other API routes

**Why it matters:**

- Professional API
- Easier debugging
- Better for internationalization
- Consistent client-side error handling

---

## 🟡 **MEDIUM PRIORITY** (Code Quality)

### 5. Enable TypeScript Strict Mode

**Time Estimate:** 1-2 hours
**Impact:** High - Type Safety
**Status:** ✅ Completed

**Problem:**

- Loose TypeScript settings allow unsafe code
- Type errors only caught at runtime
- Poor IDE autocomplete

**Solution:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Why it matters:**

- Catch bugs at compile time
- Better IDE support
- Safer refactoring
- Self-documenting code

---

### 6. Create Consolidated API Service Layer

**Time Estimate:** 2 hours
**Impact:** High - Maintainability
**Status:** ✅ Completed

**Problem:**

- API calls scattered throughout components
- Duplicate fetch logic
- Hard to test
- Inconsistent error handling

**Solution:**

```typescript
// lib/api/users.ts
import type { User } from "@prisma/client";

export const userApi = {
  getById: async (id: number): Promise<User> => {
    const res = await fetch(`/api/user/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    return data.data;
  },

  getByAuth0Id: async (auth0UserId: string): Promise<User> => {
    const res = await fetch(`/api/users/${auth0UserId}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    const data = await res.json();
    return data.data;
  },

  update: async (id: number, data: Partial<User>): Promise<User> => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  list: async (): Promise<User[]> => {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    const data = await res.json();
    return data.data;
  },
};

// lib/api/tunes.ts
// lib/api/auth.ts
```

**Why it matters:**

- Single source of truth for API calls
- Easy to mock for testing
- Centralized error handling
- Type-safe API calls

---

### 7. Add React Error Boundaries

**Time Estimate:** 1 hour
**Impact:** Medium - User Experience
**Status:** ✅ Completed

**Problem:**

- App crashes completely on component errors
- Users see blank screen
- No graceful degradation

**Solution:**

```typescript
// components/ErrorBoundary.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {this.state.error?.message || "An unexpected error occurred"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </Button>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}

// Wrap in _app.tsx
<ErrorBoundary>
  <Component {...pageProps} />
</ErrorBoundary>;
```

**Why it matters:**

- Better user experience
- Graceful error handling
- Easier debugging

---

### 8. Optimize Database Queries

**Time Estimate:** 30 minutes
**Impact:** Medium - Performance
**Status:** ✅ Completed

**Problem:**

- Queries fetch unnecessary relations
- Over-fetching data from database
- Slow API responses

**Solution:**

```typescript
// ❌ Bad: Fetches everything
const user = await prisma.user.findUnique({
  where: { id },
  include: {
    knowTunes: true,
    following: true,
    followedBy: true,
    starredTunes: true,
  },
});

// ✅ Good: Fetch only what's needed
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    name: true,
    email: true,
    profileText: true,
    knowTunes: {
      select: {
        sessionId: true,
        name: true,
      },
      take: 10, // Limit results
    },
  },
});
```

**Why it matters:**

- 50-80% faster queries
- Reduced data transfer
- Better scalability

---

### 9. Separate Business Logic from API Routes

**Time Estimate:** 3 hours
**Impact:** High - Code Organization
**Status:** ⬜ Not Started

**Problem:**

- API routes contain business logic
- Hard to test
- Duplicate logic across routes
- Tight coupling

**Solution:**

```typescript
// services/userService.ts
import { prisma } from "lib/prisma";
import type { User } from "@prisma/client";

export const userService = {
  async getById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        // ... other fields
      },
    });
  },

  async getByAuth0Id(auth0UserId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { auth0UserId },
    });
  },

  async create(data: CreateUserInput): Promise<User> {
    // Validation logic
    // Business rules
    return prisma.user.create({ data });
  },

  async update(id: number, data: UpdateUserInput): Promise<User> {
    // Validation logic
    return prisma.user.update({
      where: { id },
      data,
    });
  },
};

// Then API routes become thin:
// pages/api/user/[slug].tsx
import { userService } from "services/userService";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const userId = parseInt(req.query.slug);
    const user = await userService.getById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ data: user });
  }
};
```

**Why it matters:**

- Easy to test business logic
- Reusable across routes
- Clear separation of concerns
- Better maintainability

---

## 🟢 **LOW PRIORITY** (Nice to Have)

### 10. Add Request Validation (Zod)

**Time Estimate:** 2 hours
**Impact:** Medium - API Security
**Status:** ⬜ Not Started

**Problem:**

- No validation of request bodies
- Invalid data can reach database
- Poor error messages

**Solution:**

```typescript
// lib/validation/user.ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  auth0UserId: z.string().min(1),
  town: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  profileText: z.string().max(500).optional(),
  town: z.string().optional(),
});

// Usage in API route:
const result = createUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({
    error: "Validation failed",
    details: result.error.flatten(),
  });
}
```

**Why it matters:**

- Prevent invalid data
- Better error messages
- Type safety
- Self-documenting API

---

### 11. Add Rate Limiting

**Time Estimate:** 1 hour
**Impact:** High - Security
**Status:** ⬜ Not Started

**Problem:**

- No protection against abuse
- API can be overwhelmed
- No DDoS protection

**Solution:**

```typescript
// lib/rateLimit.ts
import { LRUCache } from "lru-cache";

const rateLimit = (limit = 10, windowMs = 60000) => {
  const cache = new LRUCache({
    max: 500,
    ttl: windowMs,
  });

  return async (req, res, next) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const key = `${ip}-${req.url}`;

    const hits = (cache.get(key) as number) || 0;
    cache.set(key, hits + 1);

    if (hits >= limit) {
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: windowMs / 1000,
      });
    }

    next();
  };
};

// Apply to API routes
export default rateLimit(10, 60000); // 10 requests per minute
```

**Why it matters:**

- Prevents abuse
- Protects against DDoS
- Fair usage enforcement

---

### 12. Implement Structured Logging

**Time Estimate:** 1 hour
**Impact:** Medium - Debugging
**Status:** ⬜ Not Started

**Problem:**

- Using `console.log` everywhere
- Hard to filter logs
- No log levels
- Poor production logging

**Solution:**

```typescript
// lib/logger.ts
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

// Usage:
logger.info({ userId: 1 }, "User logged in");
logger.error({ error: err }, "Failed to fetch user");
logger.debug({ query: params }, "Database query");
```

**Why it matters:**

- Structured logs for analysis
- Better debugging
- Production-ready logging
- Log aggregation support

---

### 13. Add API Documentation (Swagger)

**Time Estimate:** 3 hours
**Impact:** Medium - Developer Experience
**Status:** ⬜ Not Started

**Solution:**

```typescript
// pages/api/swagger.json
{
  "openapi": "3.0.0",
  "info": {
    "title": "TunesAndFriends API",
    "version": "1.0.0"
  },
  "paths": {
    "/api/user/{id}": {
      "get": {
        "summary": "Get user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "200": {
            "description": "User found",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/User" }
              }
            }
          }
        }
      }
    }
  }
}
```

**Why it matters:**

- Self-documenting API
- Interactive testing
- Client code generation

---

### 14. Implement Caching Layer

**Time Estimate:** 4 hours
**Impact:** High - Performance
**Status:** ⬜ Not Started

**Problem:**

- Same data fetched repeatedly
- Database overload
- Slow response times

**Solution:**

```typescript
// lib/cache.ts
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key: string, value: any, ttl = 3600): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(value));
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },
};

// Usage:
const cachedUser = await cache.get(`user:${id}`);
if (cachedUser) return cachedUser;

const user = await prisma.user.findUnique({ where: { id } });
await cache.set(`user:${id}`, user, 300); // 5 minutes
return user;
```

**Why it matters:**

- 10x faster responses
- Reduced database load
- Better scalability

---

### 15. Add Unit & Integration Tests

**Time Estimate:** Ongoing
**Impact:** High - Code Quality
**Status:** ⬜ Not Started

**Solution:**

```typescript
// __tests__/services/userService.test.ts
import { userService } from "services/userService";
import { prisma } from "lib/prisma";

jest.mock("lib/prisma");

describe("userService", () => {
  describe("getById", () => {
    it("should return user when found", async () => {
      const mockUser = { id: 1, name: "Test", email: "test@example.com" };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.getById(1);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("should return null when not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await userService.getById(999);

      expect(result).toBeNull();
    });
  });
});
```

**Why it matters:**

- Confidence in refactoring
- Catch bugs early
- Documentation through tests

---

### 16. Optimize Bundle Size

**Time Estimate:** 2 hours
**Impact:** Medium - Performance
**Status:** ⬜ Not Started

**Solution:**

```bash
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... other config
})

# Run analysis
ANALYZE=true npm run build
```

**Why it matters:**

- Faster page loads
- Better mobile experience
- Reduced bandwidth costs

---

### 17. Database Migrations Strategy

**Time Estimate:** 30 minutes
**Impact:** High - Production Safety
**Status:** ⬜ Not Started

**Problem:**

- Using `prisma db push` (development only)
- No migration history
- Can't rollback changes
- Unsafe for production

**Solution:**

```bash
# Create first migration
npx prisma migrate dev --name init

# Create new migration
npx prisma migrate dev --name add_user_role

# Deploy to production
npx prisma migrate deploy

# Rollback (manually)
# Edit migration files or create new migration
```

**Why it matters:**

- Version control for database
- Safe production deployments
- Rollback capability
- Team collaboration

---

### 18. Session Management with Redis

**Time Estimate:** 3 hours
**Impact:** Medium - Scalability
**Status:** ⬜ Not Started

**Problem:**

- Cookie-only sessions
- Can't scale horizontally
- Limited session control

**Solution:**

```typescript
// lib/session.ts
import { Redis } from "ioredis";
import { v4 as uuidv4 } from "uuid";

const redis = new Redis(process.env.REDIS_URL);

export const session = {
  async create(userId: string, data: any): Promise<string> {
    const sessionId = uuidv4();
    await redis.setex(
      `session:${sessionId}`,
      86400, // 24 hours
      JSON.stringify({ userId, ...data })
    );
    return sessionId;
  },

  async get(sessionId: string): Promise<any> {
    const data = await redis.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  },

  async delete(sessionId: string): Promise<void> {
    await redis.del(`session:${sessionId}`);
  },
};
```

**Why it matters:**

- Horizontal scaling
- Better session control
- Forced logout capability

---

### 19. Add Monitoring & Analytics

**Time Estimate:** 1 hour
**Impact:** High - Production Monitoring
**Status:** ⬜ Not Started

**Solution:**

```bash
# Install Sentry
npm install @sentry/nextjs

# sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})

# Install Vercel Analytics
npm install @vercel/analytics

# pages/_app.tsx
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

**Why it matters:**

- Know when things break
- Performance insights
- User behavior tracking

---

### 20. Refactor Component Structure

**Time Estimate:** 4 hours
**Impact:** Medium - Code Organization
**Status:** ⬜ Not Started

**Current:**

```
components/
  Login.tsx
  Menu.tsx
  LoadingSpinner.tsx
  ...
```

**Proposed:**

```
components/
  common/              # Reusable UI components
    Button.tsx
    Card.tsx
    Input.tsx
    LoadingSpinner.tsx
  features/            # Feature-specific components
    auth/
      LoginForm.tsx
      LoginButton.tsx
    music/
      TuneCard.tsx
      TuneList.tsx
    social/
      TrendingUsers.tsx
      FriendsList.tsx
  layouts/             # Page layouts
    AppLayout.tsx
    AuthLayout.tsx
    DashboardLayout.tsx
```

**Why it matters:**

- Easier to find components
- Better reusability
- Clearer ownership
- Faster development

---✅

## 📊 **Implementation Priority Matrix**

| Task                    | Priority  | Time    | Impact | Status |
| ----------------------- | --------- | ------- | ------ | ------ |
| 1. Prisma Singleton     | 🔴 High   | 5 min   | High   | ✅     |
| 2. Remove @auth0/react  | 🔴 High   | 1 min   | Medium | ✅     |
| 3. Env Validation       | 🔴 High   | 15 min  | High   | ✅     |
| 4. API English          | 🔴 High   | 30 min  | High   | ✅     |
| 5. TypeScript Strict    | 🟡 Medium | 1-2 hrs | High   | ✅     |
| 6. API Service Layer    | 🟡 Medium | 2 hrs   | High   | ✅     |
| 7. Error Boundaries     | 🟡 Medium | 1 hr    | Medium | ✅     |
| 8. Optimize Queries     | 🟡 Medium | 30 min  | Medium | ✅     |
| 9. Business Logic       | 🟡 Medium | 3 hrs   | High   | ⬜     |
| 10. Request Validation  | 🟢 Low    | 2 hrs   | Medium | ⬜     |
| 11. Rate Limiting       | 🟢 Low    | 1 hr    | High   | ⬜     |
| 12. Structured Logging  | 🟢 Low    | 1 hr    | Medium | ⬜     |
| 13. API Docs            | 🟢 Low    | 3 hrs   | Medium | ⬜     |
| 14. Caching             | 🟢 Low    | 4 hrs   | High   | ⬜     |
| 15. Tests               | 🟢 Low    | Ongoing | High   | ⬜     |
| 16. Bundle Size         | 🟢 Low    | 2 hrs   | Medium | ⬜     |
| 17. Migrations          | 🟢 Low    | 30 min  | High   | ⬜     |
| 18. Session Store       | 🟢 Low    | 3 hrs   | Medium | ⬜     |
| 19. Monitoring          | 🟢 Low    | 1 hr    | High   | ⬜     |
| 20. Component Structure | 🟢 Low    | 4 hrs   | Medium | ⬜     |

---

## 🎯 **Recommended Implementation Order**

### Week 1: Quick Wins (High Priority)

1. **Day 1:** Prisma Singleton (5 min) + Remove @auth0/react (1 min) + Env Validation (15 min)
2. **Day 2:** Standardize API Responses to English (30 min)
3. **Day 3:** Start TypeScript Strict Mode (1-2 hours)
4. **Day 4-5:** Create API Service Layer (2 hours)

**Total Time:** ~4-5 hours
**Impact:** Fixes critical performance issue, improves DX

### Week 2: Code Quality (Medium Priority)

1. **Day 1:** Add Error Boundaries (1 hour)
2. **Day 2:** Optimize Database Queries (30 min)
3. **Day 3-5:** Separate Business Logic (3 hours)

**Total Time:** ~4.5 hours
**Impact:** Better code organization, easier testing

### Week 3+: Nice to Have (Low Priority)

Pick and choose based on project needs:

- **Security:** Rate Limiting (#11)
- **Performance:** Caching (#14)
- **Quality:** Tests (#15)
- **Production:** Monitoring (#19), Migrations (#17)

---

## 📝 **Notes**

- **Start with #1-4:** These are quick wins with high impact
- **#6 (API Layer):** Makes all future development easier
- **#9 (Business Logic):** Essential before adding tests
- **Tests (#15):** Should be ongoing, not one-time
- **Production Readiness:** Focus on #11, #14, #17, #19

---

## 🔗 **Resources**

- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

**Last Updated:** October 24, 2025
**Version:** 1.0
