import { useState, useEffect } from "react";

/**
 * useDebounce - Delays updating a value until after a specified delay
 * 
 * Useful for preventing excessive API calls while user is typing.
 * The returned value only updates after the user stops changing it
 * for the specified delay period.
 * 
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState("");
 * const debouncedQuery = useDebounce(searchQuery, 300);
 * 
 * // debouncedQuery only updates 300ms after user stops typing
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     searchTunes(debouncedQuery);
 *   }
 * }, [debouncedQuery]);
 * ```
 * 
 * How it works:
 * ```
 * User types: "m" → "mo" → "mor" → "morr" → "morri"
 *              ↓     ↓      ↓       ↓        ↓
 * Timer:     start  reset  reset  reset    reset
 *                                            ↓
 *                                    (300ms pause)
 *                                            ↓
 * API call:                                  ✅ "morri"
 * 
 * Result: 1 API call instead of 5
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes before delay completes
    // This is what creates the "debounce" effect
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

