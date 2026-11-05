import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (page >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  };

  const pages = getPageNumbers();

  const handlePrev = () => {
    if (page > 1) onChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onChange(page + 1);
  };

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1 sm:gap-2 my-8 ${className}`}
    >
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={page <= 1}
        aria-label="Go to previous page"
        className="pagination-btn"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Page Numbers */}
      {pages.map((item, idx) => {
        if (item === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              aria-hidden="true"
              className="min-h-11 px-2 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold select-none"
            >
              …
            </span>
          );
        }

        const isCurrent = item === page;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={isCurrent ? "page" : undefined}
            aria-label={`Page ${item}`}
            className={`text-sm ${
              isCurrent ? "pagination-btn-active" : "pagination-btn"
            }`}
          >
            {item}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={page >= totalPages}
        aria-label="Go to next page"
        className="pagination-btn"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
