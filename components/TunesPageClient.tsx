"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TuneSearchInput } from "./TuneSearchInput";
import { SearchResults } from "./SearchResults";
import { PopularTunesClient } from "./PopularTunesClient";
import { Pagination } from "./Pagination";
import { ClientPagination } from "./ClientPagination";
import { searchTunes, SearchTune, PopularTune } from "services/externalTuneService";
import { addTuneAction } from "app/tunes/actions";
import styles from "./TunesPageClient.module.scss";

interface TunesPageClientProps {
  userId: number;
  knownTuneIds: number[];
  // Popular tunes data (shown when not searching)
  popularTunes: PopularTune[];
  popularCurrentPage: number;
  popularTotalPages: number;
}

export function TunesPageClient({
  userId,
  knownTuneIds: initialKnownTuneIds,
  popularTunes,
  popularCurrentPage,
  popularTotalPages,
}: TunesPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Search state
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<SearchTune[]>([]);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Track known tune IDs (updates when user adds a tune)
  const [knownTuneIds, setKnownTuneIds] = useState<number[]>(initialKnownTuneIds);

  // Track which tune is being added
  const [addingTuneId, setAddingTuneId] = useState<number | null>(null);

  // Handle search
  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    // Clear any previous error
    setSearchError(null);

    if (!query) {
      // Clear search - show popular tunes
      setSearchQuery("");
      setSearchResults([]);
      setHasSearched(false);
      setSearchCurrentPage(1);
      setSearchTotalPages(1);
      
      // Update URL
      startTransition(() => {
        router.push("/tunes");
      });
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);

    try {
      const results = await searchTunes(query, page);
      
      if (results) {
        setSearchResults(results.tunes);
        setSearchTotal(results.total);
        setSearchCurrentPage(results.page);
        setSearchTotalPages(results.pages);
      } else {
        setSearchResults([]);
        setSearchTotal(0);
      }

      // Update URL with search query
      startTransition(() => {
        const params = new URLSearchParams();
        params.set("q", query);
        if (page > 1) params.set("page", page.toString());
        router.push(`/tunes?${params.toString()}`);
      });
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setSearchTotal(0);
      setSearchError("Failed to search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }, [router]);

  // Handle search page change
  const handleSearchPageChange = useCallback((page: number) => {
    if (searchQuery) {
      handleSearch(searchQuery, page);
    }
  }, [searchQuery, handleSearch]);

  // Handle adding a tune
  const handleAddTune = useCallback(async (sessionId: number) => {
    setAddingTuneId(sessionId);

    try {
      const result = await addTuneAction(sessionId, userId);

      if (result.success) {
        // Add to known tunes
        setKnownTuneIds((prev) => [...prev, sessionId]);
      } else {
        console.error("Failed to add tune:", result.error);
        alert(result.error || "Failed to add tune");
      }
    } catch (error) {
      console.error("Error adding tune:", error);
      alert("Failed to add tune");
    } finally {
      setAddingTuneId(null);
    }
  }, [userId]);

  const isShowingSearch = hasSearched || searchQuery;

  return (
    <div className={styles.container}>
      {/* Search Input */}
      <TuneSearchInput
        onSearch={(query) => handleSearch(query, 1)}
        initialValue={searchQuery}
        isLoading={isSearching}
        placeholder="Search for tunes..."
      />

      {/* Content: Search Results or Popular Tunes */}
      {isShowingSearch ? (
        <>
          {/* Back to popular tunes link */}
          {!isSearching && (
            <button
              onClick={() => handleSearch("")}
              className={styles.backButton}
            >
              ← Back to Popular Tunes
            </button>
          )}

          {/* Error state */}
          {searchError && (
            <div className={styles.error}>
              <p>{searchError}</p>
              <button onClick={() => handleSearch(searchQuery, 1)}>
                Try again
              </button>
            </div>
          )}

          {/* Search results */}
          {!searchError && (
            <SearchResults
              results={searchResults}
              knownTuneIds={knownTuneIds}
              onAddTune={handleAddTune}
              isLoading={isSearching}
              query={searchQuery}
              total={searchTotal}
              addingTuneId={addingTuneId}
            />
          )}

          {/* Search pagination (client-side) */}
          {!isSearching && !searchError && searchResults.length > 0 && searchTotalPages > 1 && (
            <ClientPagination
              currentPage={searchCurrentPage}
              totalPages={searchTotalPages}
              onPageChange={handleSearchPageChange}
            />
          )}
        </>
      ) : (
        <>
          {/* Popular tunes header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Tunes</h2>
            <p className={styles.sectionSubtitle}>
              Most saved tunes on TheSession.org
            </p>
          </div>

          <PopularTunesClient
            userId={userId}
            popularTunes={popularTunes}
            knownTuneIds={knownTuneIds}
          />

          {/* Popular tunes pagination (server-side via URL) */}
          {popularTotalPages > 1 && (
            <Pagination
              currentPage={popularCurrentPage}
              totalPages={popularTotalPages}
              baseUrl="/tunes"
            />
          )}
        </>
      )}
    </div>
  );
}

export default TunesPageClient;

