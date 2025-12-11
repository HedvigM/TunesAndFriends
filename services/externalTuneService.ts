import { cache } from "react";

const TUNE_BASE_URL = "https://thesession.org/tunes";
const POPULAR_URL = "https://thesession.org/tunes/popular";
const SEARCH_URL = "https://thesession.org/tunes/search";

export interface ExternalTuneDetails {
  id: string;
  name: string;
  type: string;
  settings?: Array<{ abc: string }>;
}

export interface PopularTune {
  id: number;
  name: string;
  url: string;
  member: { id: number; name: string; url: string };
  date: string;
  type: string;
  tunebooks: number;
}

export interface PopularTunesResponse {
  format: string;
  page: number;
  pages: number;
  total: number;
  tunes: PopularTune[];
}

/**
 * Fetch a single tune from TheSession.org
 * Uses React's cache() for request deduplication within the same render
 */
export const getTuneDetails = cache(
  async (sessionId: number): Promise<ExternalTuneDetails | null> => {
    try {
      const response = await fetch(`${TUNE_BASE_URL}/${sessionId}?format=json`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        console.error(`Failed to fetch tune ${sessionId}: ${response.statusText}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching tune ${sessionId}:`, error);
      return null;
    }
  }
);

/**
 * Fetch multiple tunes in parallel with automatic deduplication
 */
export async function getTunesDetails(
  sessionIds: number[]
): Promise<Map<number, ExternalTuneDetails>> {
  const results = await Promise.all(
    sessionIds.map(async (id) => {
      const tune = await getTuneDetails(id);
      return [id, tune] as const;
    })
  );

  const tuneMap = new Map<number, ExternalTuneDetails>();
  for (const [id, tune] of results) {
    if (tune) {
      tuneMap.set(id, tune);
    }
  }

  return tuneMap;
}

/**
 * Fetch popular tunes from TheSession.org
 * 
 * API Response format:
 * {
 *   format: "json",
 *   pages: 2276,      // Total pages
 *   page: 1,          // Current page
 *   total: 22755,     // Total tunes
 *   tunes: [...]      // Tune array
 * }
 */
export const getPopularTunes = cache(
  async (page: number = 1): Promise<PopularTunesResponse | null> => {
    try {
      const response = await fetch(`${POPULAR_URL}?format=json&page=${page}`, {
        next: { revalidate: 300 }, // Cache for 5 minutes (popular list changes often)
      });

      if (!response.ok) {
        console.error(`Failed to fetch popular tunes: ${response.statusText}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error("Error fetching popular tunes:", error);
      return null;
    }
  }
);

/**
 * Get basic tune info (name + id) for display
 */
export async function getTuneBasicInfo(
  sessionId: number
): Promise<{ name: string; id: number } | null> {
  const tune = await getTuneDetails(sessionId);
  if (!tune) return null;
  return { name: tune.name, id: sessionId };
}

/**
 * Get basic info for multiple tunes
 */
export async function getTunesBasicInfo(
  sessionIds: number[]
): Promise<{ name: string; id: number }[]> {
  const tuneMap = await getTunesDetails(sessionIds);
  
  return sessionIds
    .map((id) => {
      const tune = tuneMap.get(id);
      return tune ? { name: tune.name, id } : null;
    })
    .filter((t): t is { name: string; id: number } => t !== null);
}

// ============================================
// SEARCH API
// ============================================

/**
 * Search result tune from TheSession.org
 * Similar to PopularTune but returned from search endpoint
 */
export interface SearchTune {
  id: number;
  name: string;
  type: string;
  url: string;
  tunebooks: number;
  recordings: number;
  date: string;
}

/**
 * Search response from TheSession.org
 * 
 * API Response format:
 * {
 *   format: "json",
 *   q: "morrison",     // The search query
 *   pages: 2,          // Total pages of results
 *   page: 1,           // Current page
 *   total: 12,         // Total matching tunes
 *   tunes: [...]       // Tune array
 * }
 */
export interface SearchResponse {
  format: string;
  q: string;
  page: number;
  pages: number;
  total: number;
  tunes: SearchTune[];
}

/**
 * Search for tunes on TheSession.org
 * 
 * @param query - Search query (minimum 2 characters)
 * @param page - Page number (default 1)
 * @returns Search results or null if error/invalid query
 * 
 * @example
 * const results = await searchTunes("morrison", 1);
 * // Returns tunes matching "morrison"
 */
export const searchTunes = cache(
  async (query: string, page: number = 1): Promise<SearchResponse | null> => {
    try {
      // Validate query - must be at least 2 characters
      const trimmedQuery = query?.trim();
      if (!trimmedQuery || trimmedQuery.length < 2) {
        return null;
      }

      const encodedQuery = encodeURIComponent(trimmedQuery);
      const response = await fetch(
        `${SEARCH_URL}?q=${encodedQuery}&format=json&page=${page}`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      );

      if (!response.ok) {
        console.error(`Failed to search tunes for "${query}": ${response.statusText}`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error(`Error searching tunes for "${query}":`, error);
      return null;
    }
  }
);

