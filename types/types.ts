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