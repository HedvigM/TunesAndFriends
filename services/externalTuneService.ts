import { cache } from "react";

const TUNE_BASE_URL = "https://thesession.org/tunes";
const POPULAR_URL = "https://thesession.org/tunes/popular";

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
  tunes: PopularTune[];
  pagination: {
    page: number;
    per_page: number;
    pages: number;
    total: number;
  };
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

