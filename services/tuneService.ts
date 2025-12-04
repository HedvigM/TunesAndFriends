import { Tune, Prisma } from "@prisma/client";
import { tuneBasicSelect } from "lib/prisma/selects";
import { BaseService, ServiceResult } from "./base/BaseService";

export interface SaveTuneInput {
  sessionId: number;
  email: string;
  knowOrLearn: "know" | "learn";
}

export class TuneService extends BaseService {
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

  async saveNewTune(input: SaveTuneInput): Promise<ServiceResult<Tune>> {
    return this.execute(async () => {
      let tune = await this.prisma.tune.findUnique({
        where: { sessionId: input.sessionId },
      });

      if (!tune) {
        tune = await this.prisma.tune.create({
          data: { sessionId: input.sessionId },
        });
      }

      const user = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

        await this.prisma.user.update({
          where: { email: input.email },
          data: {
            savedTunes: {
              connect: { id: tune.id },
            },
          },
        })
        await this.prisma.tune.update({
          where: { id: tune.id },
          data: {
            savedBy: {
              connect: { id: user.id },
            },
          },
        });

      return tune;
    }, "Failed to save tune");
  }

  async saveTune(input: SaveTuneInput): Promise<ServiceResult<Tune>> {
    return this.execute(async () => {
      let tune = await this.prisma.tune.findUnique({
        where: { sessionId: input.sessionId },
      });

      if (!tune) {
        tune = await this.prisma.tune.create({
          data: { sessionId: input.sessionId },
        });
      }

      const user = await this.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

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

  async addTagToTune(tuneId: number, tagName: string): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      const normalizedTagName = tagName.trim().toLowerCase();

      if (!normalizedTagName) {
        throw new Error("Tag name cannot be empty");
      }

      const tune = await this.prisma.tune.findUnique({
        where: { id: tuneId },
        include: { tags: true },
      });

      if (!tune) {
        throw new Error("Tune not found");
      }

      let tag = await this.prisma.tag.findUnique({
        where: { name: normalizedTagName },
      });

      if (!tag) {
        try {
          tag = await this.prisma.tag.create({
            data: { name: normalizedTagName },
          });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            tag = await this.prisma.tag.findUnique({
              where: { name: normalizedTagName },
            });
            if (!tag) {
              throw new Error("Failed to create or find tag");
            }
          } else {
            throw error;
          }
        }
      }

      const isAlreadyConnected = tune.tags.some((t) => t.id === tag!.id);

      if (isAlreadyConnected) {
        return {
          tag: tag,
          tune: tune,
        };
      }

      const updatedTune = await this.prisma.tune.update({
        where: { id: tuneId },
        data: {
          tags: {
            connect: { id: tag.id },
          },
        },
        include: {
          tags: true,
        },
      });

      return {
        tag: tag,
        tune: updatedTune,
      };
    }, "Failed to add tag to tune");
  }

  async newAddTagToTune(tuneId: number, tagName: string, userId: number): Promise<ServiceResult<any>> {
    return this.execute(async () => {
      const normalizedTagName = tagName.trim().toLowerCase();

      if (!normalizedTagName) {
        throw new Error("Tag name cannot be empty");
      }

      // Verify tune exists
      const tune = await this.prisma.tune.findUnique({
        where: { id: tuneId },
      });

      if (!tune) {
        throw new Error("Tune not found");
      }

      // Verify user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Create or find the tag
      let tag = await this.prisma.tag.findUnique({
        where: { name: normalizedTagName },
      });

      if (!tag) {
        try {
          tag = await this.prisma.tag.create({
            data: { name: normalizedTagName },
          });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            tag = await this.prisma.tag.findUnique({
              where: { name: normalizedTagName },
            });
            if (!tag) {
              throw new Error("Failed to create or find tag");
            }
          } else {
            throw error;
          }
        }
      }

      // Check if the tune already has this exact tag for this user
      const existingTagging = await this.prisma.tagging.findUnique({
        where: {
          userId_tuneId_tagId: {
            userId: userId,
            tuneId: tuneId,
            tagId: tag.id,
          },
        },
      });

      if (existingTagging) {
        throw new Error("Tune already has this tag");
      }

      // Create the Tagging record (connection between tag, user, and tune)
      const tagging = await this.prisma.tagging.create({
        data: {
          userId: userId,
          tuneId: tuneId,
          tagId: tag.id,
        },
      });

      // Also connect the tag to the tune (many-to-many relation)
      const updatedTune = await this.prisma.tune.update({
        where: { id: tuneId },
        data: {
          tags: {
            connect: { id: tag.id },
          },
        },
        include: {
          tags: true,
        },
      });

      return {
        tag: tag,
        tune: updatedTune,
        tagging: tagging,
      };
    }, "Failed to add tag to tune");
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

