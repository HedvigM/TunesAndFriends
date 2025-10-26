/**
 * Base API Client
 * 
 * Provides a centralized, type-safe API client with:
 * - Automatic retry logic with exponential backoff
 * - Consistent error handling
 * - Type-safe responses
 */

export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

interface RequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestOptions = {},
    attempt: number = 1
  ): Promise<ApiResult<T>> {
    const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        if (!response.ok) {
          return {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
            statusCode: response.status,
          };
        }
      }

      const data = await response.json();

      if (!response.ok) {
        // Retry on 5xx errors
        if (response.status >= 500 && attempt < retries) {
          console.warn(
            `Retrying request to ${url} (attempt ${attempt + 1}/${retries})`
          );
          await this.sleep(retryDelay * attempt);
          return this.fetchWithRetry<T>(url, options, attempt + 1);
        }

        return {
          success: false,
          error: data.message || data.error || "Request failed",
          message: data.message,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      // Retry on network errors
      if (attempt < retries) {
        console.warn(
          `Network error, retrying ${url} (attempt ${attempt + 1}/${retries})`
        );
        await this.sleep(retryDelay * attempt);
        return this.fetchWithRetry<T>(url, options, attempt + 1);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, { ...options, method: "GET" });
  }

  async post<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResult<T>> {
    return this.fetchWithRetry<T>(url, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();

