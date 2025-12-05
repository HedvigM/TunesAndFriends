/**
 * Base Service Class
 * Provides common functionality for all services
 */

import { Prisma } from "@prisma/client";
import { prisma } from "lib/prisma";

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export class BaseService {
  protected prisma = prisma;

  /**
   * Wrap operations with consistent error handling
   */
  protected async execute<T>(
    operation: () => Promise<T>,
    errorMessage: string = "Operation failed"
  ): Promise<ServiceResult<T>> {
    try {
      const data = await operation();
      return { success: true, data };
    } catch (error) {
      console.error(errorMessage, error);

      // Handle Prisma-specific errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            success: false,
            error: "Record already exists",
            statusCode: 409,
          };
        }
        if (error.code === "P2025") {
          return {
            success: false,
            error: "Record not found",
            statusCode: 404,
          };
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : errorMessage,
        statusCode: 500,
      };
    }
  }
}

