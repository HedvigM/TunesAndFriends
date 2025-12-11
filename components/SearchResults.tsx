"use client";

import Link from "next/link";
import { SearchTune } from "services/externalTuneService";
import { SearchResultsSkeleton } from "components/skeletons";
import { Button } from "styles/Button";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
  /** Array of search results */
  results: SearchTune[];
  /** IDs of tunes the user already knows */
  knownTuneIds: number[];
  /** Called when user clicks Add button */
  onAddTune: (sessionId: number) => void;
  /** Whether currently loading results */
  isLoading?: boolean;
  /** The search query (for display) */
  query?: string;
  /** Total number of results (may be more than displayed) */
  total?: number;
  /** Whether a tune is being added */
  addingTuneId?: number | null;
}

/**
 * Displays search results with add buttons
 * 
 * Shows:
 * - Loading state while searching
 * - Empty state when no results found
 * - List of tunes with type badges and add buttons
 * - "Added" indicator for tunes already in collection
 */
export function SearchResults({
  results,
  knownTuneIds,
  onAddTune,
  isLoading = false,
  query = "",
  total = 0,
  addingTuneId = null,
}: SearchResultsProps) {
  // Loading state - show skeleton
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>
          Searching for &quot;{query}&quot;...
        </p>
        <SearchResultsSkeleton count={8} />
      </div>
    );
  }

  // No query entered yet
  if (!query) {
    return null;
  }

  // Empty results
  if (results.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No tunes found for &quot;{query}&quot;</p>
        <p className={styles.emptyHint}>
          Try searching for tune names like:
        </p>
        <ul className={styles.suggestions}>
          <li>morrison</li>
          <li>butterfly</li>
          <li>cooley</li>
          <li>drowsy maggie</li>
        </ul>
      </div>
    );
  }

  // Results found
  return (
    <div className={styles.results}>
      <p className={styles.resultCount}>
        Found <strong>{total.toLocaleString()}</strong> tune{total !== 1 ? "s" : ""} for &quot;{query}&quot;
      </p>

      <div className={styles.list}>
        {results.map((tune) => {
          const isKnown = knownTuneIds.includes(tune.id);
          const isAdding = addingTuneId === tune.id;

          return (
            <div key={tune.id} className={styles.item}>
              <div className={styles.info}>
                <Link href={`/tune/${tune.id}`} className={styles.name}>
                  {tune.name}
                </Link>
                <span className={styles.type}>{tune.type}</span>
              </div>

              <div className={styles.action}>
                {isKnown ? (
                  <span className={styles.added}>✓ Added</span>
                ) : isAdding ? (
                  <span className={styles.adding}>Adding...</span>
                ) : (
                  <Button onClick={() => onAddTune(tune.id)}>
                    Add
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;

