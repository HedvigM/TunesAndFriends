import { Tune, Prisma, User } from "@prisma/client";
import { tuneBasicSelect } from "lib/prisma/selects";
import { BaseService, ServiceResult } from "./base/BaseService";
import { getTuneDetails } from "./externalTuneService";

export interface SaveTuneInput {
  sessionId: number;
  email: string;
  tagName: string | undefined;
}

export interface NewSaveTuneInput {
  sessionId: number;
  userId: number;
  tagName: string | undefined;
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

  async saveNewTune(input: NewSaveTuneInput): Promise<ServiceResult<Tune>> {
    return this.execute(async () => {
      let tune = await this.prisma.tune.findUnique({
        where: { sessionId: input.sessionId },
      });

      if (!tune) {
        // Fetch tune details from external API and cache them
        const externalTune = await getTuneDetails(input.sessionId);
        
        tune = await this.prisma.tune.create({
          data: {
            sessionId: input.sessionId,
            name: externalTune?.name || null,
            type: externalTune?.type || null,
            lastFetched: new Date(),
          },
        });
      } else if (!tune.name) {
        // Tune exists but has no cached name - fetch and update
        const externalTune = await getTuneDetails(input.sessionId);
        
        if (externalTune) {
          tune = await this.prisma.tune.update({
            where: { id: tune.id },
            data: {
              name: externalTune.name,
              type: externalTune.type,
              lastFetched: new Date(),
            },
          });
        }
      }

      const user = await this.prisma.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Check if UserTune already exists
      const existingUserTune = await this.prisma.userTune.findUnique({
        where: {
          userId_tuneId: {
            userId: input.userId,
            tuneId: tune.id,
          },
        },
      });

      if (!existingUserTune) {
        await this.prisma.userTune.create({
          data: {
            userId: input.userId,
            tuneId: tune.id,
          },
        });
      }

      return tune;
    }, "Failed to save tune");
  }

  async getUsersWhoKnowTune(tuneId: number): Promise<ServiceResult<User[]>> {
    return this.execute(async () => {
      const userTunes = await this.prisma.userTune.findMany({
        where: { tuneId: tuneId },
        include: {
          user: true,
        },
      });

      return userTunes?.map((userTune) => userTune.user) || [];
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

      // Find the UserTune (the user's relationship to this tune)
      const userTune = await this.prisma.userTune.findFirst({
        where: {
          userId: userId,
          tuneId: tuneId,
        },
        include: {
          tags: true,
        },
      });

      if (!userTune) {
        throw new Error("You haven't saved this tune yet");
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

      // Check if the UserTune already has this tag
      const alreadyHasTag = userTune.tags.some((t) => t.id === tag!.id);

      if (alreadyHasTag) {
        throw new Error("Tune already has this tag");
      }

      // Connect the tag to the UserTune (user's personal tags for this tune)
      const updatedUserTune = await this.prisma.userTune.update({
        where: { id: userTune.id },
        data: {
          tags: {
            connect: { id: tag.id },
          },
        },
        include: {
          tags: true,
          tune: true,
        },
      });

      return {
        tag: tag,
        userTune: updatedUserTune,
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

