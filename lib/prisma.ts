import { PrismaClient } from "@prisma/client";
import { env } from "./env";

declare global {
  var prisma: PrismaClient | undefined;
}

// Validate DATABASE_URL before creating Prisma Client
const databaseUrl = env.DATABASE_URL;

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

