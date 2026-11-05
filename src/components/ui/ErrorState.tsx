import { AlertCircle, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export default function ErrorState({
  title = "Unable to load data",
  message = "Something went wrong while fetching data. Please check your connection and try again.",
  onRetry,
  retryLabel = "Try Again",
  className = "",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-rose-200/80 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 max-w-xl mx-auto my-8 ${className}`}
    >
      <div
        className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 shadow-xs"
        aria-hidden="true"
      >
        <AlertCircle className="w-7 h-7" />
      </div>

      <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
        {title}
      </h3>

      {message && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          {message}
        </p>
      )}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 btn-primary"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>{retryLabel}</span>
        </button>
      )}
    </div>
  );
}
