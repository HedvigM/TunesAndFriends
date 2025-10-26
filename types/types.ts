import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/cache";

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface SuccessResponse<T> {
    learnTunes: any;
    knowTunes: any;
    success: true;
    data: T;
  }

  export interface ErrorResponse {
    success: false;
    error: Error;
  }

  export type ResponseType<T> = SuccessResponse<T> | ErrorResponse;