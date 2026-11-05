import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { fetchProducts } from "@/api";
import { ErrorState, EmptyState } from "@/components/ui";
import { ProductGrid, ProductGridSkeleton } from "@/components/product";

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const data = await fetchProducts(12, 0, controller.signal);
        setProducts(data.products);
        setTotal(data.total);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      controller.abort();
    };
  }, [retryTrigger]);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setRetryTrigger((prev) => !prev);
  };

  const handleAddToCart = (product: Product) => {
    // TODO: Connect to CartContext.addItem(product)
    void product;
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-950 dark:via-slate-900 dark:to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-500/20">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white shadow-xs">
            ⚡ Special 10X Discounts
          </span>
          <p className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight">
            Explore Trending Tech & Lifestyle Essentials
          </p>
          <p className="text-sm text-emerald-100 dark:text-slate-300 leading-relaxed">
            Fast DummyJSON catalog with responsive filters, debounced search,
            and instant cart dispatch.
          </p>
        </div>

        <div
          className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Catalog
        </h1>
        {!isLoading && !error && products.length > 0 && (
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing 1–{products.length} of {total}
          </span>
        )}
      </div>

      {/* Conditional Rendering for Loading, Error, Empty, and Success states */}
      {isLoading && <ProductGridSkeleton count={12} />}

      {!isLoading && error && (
        <ErrorState
          title="Unable to load catalog"
          message={error}
          onRetry={handleRetry}
        />
      )}

      {!isLoading && !error && products.length === 0 && (
        <EmptyState
          title="No products found."
          message="We couldn't find any products in the catalog right now."
        />
      )}

      {!isLoading && !error && products.length > 0 && (
        <ProductGrid products={products} onAdd={handleAddToCart} />
      )}
    </div>
  );
}
