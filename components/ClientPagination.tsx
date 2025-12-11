"use client";

import styles from "./Pagination.module.scss";

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Number of pages to show on each side of current page (desktop) */
  siblingCount?: number;
}

export function ClientPagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 2,
}: ClientPaginationProps) {
  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show (Option B: Fixed Window)
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - siblingCount);
    const rangeEnd = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push("...");
    }
    
    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }
    
    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${styles.navButton} ${currentPage <= 1 ? styles.disabled : ""}`}
        aria-label="Go to previous page"
      >
        <span className={styles.navButtonText}>← Prev</span>
        <span className={styles.navButtonIcon}>←</span>
      </button>

      {/* Desktop: Page numbers (Option B) */}
      <div className={styles.pageNumbers}>
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isCurrentPage}
              className={`${styles.pageNumber} ${isCurrentPage ? styles.active : ""}`}
              aria-current={isCurrentPage ? "page" : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Mobile: Compact display (Option C) */}
      <div className={styles.compactDisplay}>
        <span className={styles.pageInfo}>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${styles.navButton} ${currentPage >= totalPages ? styles.disabled : ""}`}
        aria-label="Go to next page"
      >
        <span className={styles.navButtonText}>Next →</span>
        <span className={styles.navButtonIcon}>→</span>
      </button>
    </nav>
  );
}

export default ClientPagination;

