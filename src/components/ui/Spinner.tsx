import { Loader2 } from "lucide-react";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  fullPage?: boolean;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export default function Spinner({
  size = "lg",
  className = "",
  label = "Loading...",
  fullPage = true,
}: SpinnerProps) {
  const spinnerContent = (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-emerald-600 dark:text-emerald-400`}
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center py-12">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
}

