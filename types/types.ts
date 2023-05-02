import { Prisma } from "@prisma/client";

  export interface SuccessResponse<T> {
    success: true;
    data: T;
  }
  
  export interface ErrorResponse {
    success: false;
    error: Error;
  }
  
  export type ResponseType<T> = SuccessResponse<T> | ErrorResponse;

  export type UserWithEverything = Prisma.UserGetPayload<{
    include: {
        knowTunes: true,
        starredTunes: true,
        following: true,
        followedBy: true,
      };
  }>;