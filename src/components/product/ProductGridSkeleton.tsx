export interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

function PulseBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200/50 dark:bg-slate-800/40 ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col rounded-2xl h-full"
    >
      <div className="relative w-full aspect-square bg-slate-200/50 dark:bg-slate-800/40 rounded-2xl animate-pulse" />

      <div className="flex flex-col flex-1 p-4">
        <PulseBlock className="h-3 w-24" />

        <div className="mt-2 space-y-1.5">
          <PulseBlock className="h-4 w-full" />
          <PulseBlock className="h-4 w-3/4" />
        </div>

        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <PulseBlock key={i} className="w-3.5 h-3.5 rounded-full" />
          ))}
          <PulseBlock className="ml-1 h-3 w-10" />
        </div>

        <div className="mt-auto pt-3 border-t border-slate-200/40 dark:border-slate-800/40">
          <PulseBlock className="h-6 w-20 mb-3" />
          <PulseBlock className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGridSkeleton({
  count = 12,
  className = "",
}: ProductGridSkeletonProps) {
  return (
    <section
      aria-label="Loading products"
      aria-busy="true"
      data-testid="product-grid-skeleton"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 ${className}`}
    >
      <span className="sr-only">Loading products, please wait...</span>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </section>
  );
}
