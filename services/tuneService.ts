/**
 * Tune Service
 * Handles all tune-related business logic
 */

import { Tune } from "@prisma/client";
import { tuneBasicSelect } from "lib/prisma/selects";
import { BaseService, ServiceResult } from "./base/BaseService";

export interface SaveTuneInput {
  sessionId: number;
  email: string;
  knowOrLearn: "know" | "learn";
}

export class TuneService extends BaseService {
  /**
   * Get tune by ID
   */
  async getTuneById(id: number): Promise<ServiceResult<Tune>> {
    return this.execute(async () => {
      const tune = await this.prisma.tune.findUnique({
        where: { id },
        select: tuneBasicSelect,
      });

      if (!tune) {
        throw new Error("Tune not found");
      }

      return tune;
    }, "Failed to get tune");
  }

  /**
   * Get tune by session ID
   */
  async getTuneBySessionId(sessionId: number): Promise<ServiceResult<Tune>> {
    return this.execute(async () => {
      const tune = await this.prisma.tune.findUnique({
        where: { sessionId },
        select: tuneBasicSelect,
      });

      if (!tune) {
        throw new Error("Tune not found");
      }

      return tune;
    }, "Failed to get tune by session ID");
  }

  /**
   * Save tune for user (know or star)
   */
  async saveTune(input: SaveTuneInput): Promise<ServiceResult<Tune>> {
    return this.execute(async () => {
      // Find or create tune
      let tune = await this.prisma.tune.findUnique({
        where: { sessionId: input.sessionId },
      });

      if (!tune) {
        tune = await this.prisma.tune.create({
          data: { sessionId: input.sessionId },
        });
      }

      // Find user
      const user = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Connect tune to user based on type
      if (input.knowOrLearn === "know") {
        await this.prisma.user.update({
          where: { email: input.email },
          data: {
            knowTunes: {
              connect: { id: tune.id },
            },
          },
        });
      } else {
        await this.prisma.user.update({
          where: { email: input.email },
          data: {
            starredTunes: {
              connect: { id: tune.id },
            },
          },
        });
      }

      return tune;
    }, "Failed to save tune");
  }

  /**
   * Get users who know a tune
   */
  async getUsersWhoKnowTune(tuneId: number): Promise<ServiceResult<any[]>> {
    return this.execute(async () => {
      const tune = await this.prisma.tune.findUnique({
        where: { id: tuneId },
        include: {
          knowedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
            take: 50,
          },
        },
      });

      return tune?.knowedBy || [];
    }, "Failed to get users who know tune");
  }
}

/* async function getUsersTunes(userId: number): Promise<Tune[]> {
  const tunes = await prisma.tune.findMany({
    where: { knowedBy: { some: { id: userId } } },
  });
  return tunes || [];
} */

// Export singleton instance
export const tuneService = new TuneService();

