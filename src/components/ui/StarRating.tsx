import { Star } from "lucide-react";

export interface StarRatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
  className?: string;
}

/**
 * StarRating component.
 * Dual-mode polymorphic rating component:
 * - Read-only display mode: renders static stars colored according to value.
 * - Interactive mode: renders accessible star buttons when onChange is provided.
 */
export default function StarRating({
  value,
  max = 5,
  size = "sm",
  onChange,
  className = "",
}: StarRatingProps) {
  const isInteractive = Boolean(onChange);
  const roundedValue = Math.round(value);

  // Lookup Table
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-0.5 text-amber-500 ${className}`}
      aria-label={`Rating: ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starNumber = i + 1;
        const isFilled = starNumber <= roundedValue;

        const starIcon = (
          <Star
            key={starNumber}
            className={`${sizeClasses} ${
              isFilled
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
            } transition-colors`}
            aria-hidden="true"
          />
        );

        if (!isInteractive) {
          return starIcon;
        }

        return (
          <button
            key={starNumber}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange?.(starNumber);
            }}
            className="cursor-pointer hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xs"
            aria-label={`Rate ${starNumber} out of ${max} stars`}
          >
            {starIcon}
          </button>
        );
      })}
    </div>
  );
}
