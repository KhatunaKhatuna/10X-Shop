export interface ProductDetailsSkeletonProps {
  className?: string;
}

function PulseBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/70 dark:bg-slate-800/60 ${className}`}
    />
  );
}

export default function ProductDetailsSkeleton({
  className = "",
}: ProductDetailsSkeletonProps) {
  return (
    <section
      aria-label="Loading product details"
      aria-busy="true"
      data-testid="product-details-skeleton"
      className={`space-y-8 ${className}`}
    >
      <span className="sr-only">Loading product details, please wait...</span>

      {/* Back to catalog breadcrumb skeleton */}
      <PulseBlock className="h-9 w-36 rounded-xl" />

      {/* 2-column layout (gallery | product info) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery Skeleton */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-slate-200/70 dark:bg-slate-800/60 rounded-3xl animate-pulse" />
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <PulseBlock key={i} className="w-20 h-20 rounded-2xl shrink-0" />
            ))}
          </div>
        </div>

        {/* Right Column: Product Info Skeleton */}
        <div className="space-y-6">
          {/* Category & Brand pill */}
          <PulseBlock className="h-6 w-40 rounded-full" />

          {/* Title */}
          <div className="space-y-2">
            <PulseBlock className="h-9 w-4/5 rounded-xl" />
            <PulseBlock className="h-9 w-3/5 rounded-xl" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <PulseBlock className="h-6 w-32 rounded-lg" />
            <PulseBlock className="h-5 w-20 rounded-lg" />
          </div>

          {/* Price Block */}
          <div className="p-5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <PulseBlock className="h-10 w-44 rounded-xl" />
            <PulseBlock className="h-4 w-32 rounded-lg" />
          </div>

          {/* Stock Indicator */}
          <PulseBlock className="h-7 w-28 rounded-full" />

          {/* Description */}
          <div className="space-y-2 pt-2">
            <PulseBlock className="h-4 w-full rounded" />
            <PulseBlock className="h-4 w-11/12 rounded" />
            <PulseBlock className="h-4 w-3/4 rounded" />
          </div>

          {/* Actions: Stepper + Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <PulseBlock className="h-12 w-32 rounded-xl" />
            <PulseBlock className="h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
