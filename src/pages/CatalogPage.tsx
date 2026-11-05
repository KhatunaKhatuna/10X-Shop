import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product, ProductsResponse } from "@/types";
import { fetchProducts } from "@/api";
import { useFetch } from "@/hooks";
import { ErrorState, EmptyState, Pagination } from "@/components/ui";
import { ProductGrid, ProductGridSkeleton } from "@/components/product";

const LIMIT = 12;

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const skip = (currentPage - 1) * LIMIT;

  const fetchCatalog = useCallback(
    (signal?: AbortSignal) => fetchProducts(LIMIT, skip, signal),
    [skip],
  );

  const { data, isLoading, error, refetch } =
    useFetch<ProductsResponse>(fetchCatalog);

  const products: Product[] = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const startItem = total === 0 ? 0 : skip + 1;
  const endItem = Math.min(skip + products.length, total);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newPage <= 1) {
        next.delete("page");
      } else {
        next.set("page", String(newPage));
      }
      return next;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            Discover handpicked premium tech, fashion, and everyday essentials
            with verified customer reviews, exclusive discounts, and express
            delivery.
          </p>
        </div>
        <div
          className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Header and Results Counter */}
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Catalog
        </h1>
        {!isLoading && !error && products.length > 0 && (
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing {startItem}–{endItem} of {total}
          </span>
        )}
      </div>

      {/* Conditional Rendering for Loading, Error, Empty, and Success states */}
      {isLoading && <ProductGridSkeleton count={LIMIT} />}

      {!isLoading && error && (
        <ErrorState
          title="Unable to load catalog"
          message={error}
          onRetry={refetch}
        />
      )}

      {!isLoading && !error && products.length === 0 && (
        <EmptyState
          title="No products found."
          message="We couldn't find any products in the catalog right now."
        />
      )}

      {!isLoading && !error && products.length > 0 && (
        <>
          <ProductGrid products={products} onAdd={handleAddToCart} />
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
