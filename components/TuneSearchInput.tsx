"use client";

import { useState, useCallback } from "react";
import styles from "./TuneSearchInput.module.scss";

interface TuneSearchInputProps {
  /** Called when user submits search or after debounce */
  onSearch: (query: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Initial search value */
  initialValue?: string;
  /** Whether search is currently loading */
  isLoading?: boolean;
}

/**
 * Search input component for finding tunes
 * 
 * Features:
 * - Submit on Enter or button click
 * - Clear button to reset search
 * - Loading state support
 * - Minimum 2 character validation
 */
export function TuneSearchInput({
  onSearch,
  placeholder = "Search tunes...",
  initialValue = "",
  isLoading = false,
}: TuneSearchInputProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length >= 2) {
      onSearch(trimmed);
    }
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.input}
          minLength={2}
          disabled={isLoading}
          aria-label="Search tunes"
        />
        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        {isLoading && (
          <span className={styles.loadingSpinner} aria-label="Searching...">
            ⏳
          </span>
        )}
      </div>
      <button 
        type="submit" 
        className={styles.searchButton}
        disabled={isLoading || query.trim().length < 2}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default TuneSearchInput;

