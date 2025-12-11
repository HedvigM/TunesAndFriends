import type { AppProps } from "next/app";

export interface MyAppProps extends AppProps {}

export interface SuccessResponse<T> {
    success: true;
    data: T;
  }

  export interface ErrorResponse {
    success: false;
    error: Error;
  }

  export type ResponseType<T> = SuccessResponse<T> | ErrorResponse;