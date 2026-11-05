import { Link } from "react-router-dom";
import { PackageOpen, type LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  icon?: LucideIcon;
  className?: string;
}

export default function EmptyState({
  title = "No items found",
  message = "We couldn't find anything matching your request.",
  actionLabel,
  onAction,
  actionHref,
  icon: Icon = PackageOpen,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs max-w-xl mx-auto my-8 ${className}`}
    >
      <div
        className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4"
        aria-hidden="true"
      >
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
        {title}
      </h3>

      {message && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          {message}
        </p>
      )}

      {actionLabel && actionHref && (
        <Link to={actionHref} className="mt-6 btn-primary">
          {actionLabel}
        </Link>
      )}

      {actionLabel && !actionHref && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
