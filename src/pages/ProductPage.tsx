import { useCallback, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import type { Product } from "@/types";
import { fetchProductById } from "@/api";
import { useCart, useFetch } from "@/hooks";
import { StarRating, ErrorState } from "@/components/ui";
import { ProductDetailsSkeleton } from "@/components/product";
import NotFoundPage from "@/pages/NotFoundPage";
import { formatPrice, discountedPrice } from "@/utils";

export default function ProductPage() {
  const { addItem } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numericId = Number(id);
  const isValidId = Boolean(id && Number.isInteger(numericId) && numericId > 0);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Reset state during render when URL param changes (using string id avoids NaN !== NaN traps)
  const [prevId, setPrevId] = useState(id);
  if (prevId !== id) {
    setPrevId(id);
    setSelectedImageIndex(0);
    setQuantity(1);
    setIsAdded(false);
  }

  const fetchProduct = useCallback(
    (signal?: AbortSignal) => {
      if (!isValidId) {
        return Promise.reject(new Error("Invalid product ID"));
      }
      return fetchProductById(numericId, signal);
    },
    [isValidId, numericId],
  );

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useFetch<Product>(fetchProduct);

  // If ID is not a positive integer (/products/abc, /products/-5), show NotFound directly per PRD P3.2
  if (!isValidId) {
    return <NotFoundPage />;
  }

  // Loading state
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // 404 or Network Error handling
  if (error) {
    if (error.includes("404")) {
      return <NotFoundPage />;
    }
    return (
      <div className="py-12">
        <ErrorState
          title="Unable to load product"
          message={error}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  // Image gallery helpers
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];
  const activeImage = images[selectedImageIndex] ?? product.thumbnail;

  // Stock calculations
  const stock = product.stock ?? 0;
  const isOutOfStock = stock === 0;
  const isLowStock = stock >= 1 && stock <= 5;

  // Pricing calculations
  const hasDiscount = product.discountPercentage >= 1;
  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const savings = Math.max(0, product.price - finalPrice);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const reviewsCount = product.reviews ? product.reviews.length : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Navigation Breadcrumb and Back to catalog */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        {/* Breadcrumb Trail */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 overflow-x-auto pb-1 sm:pb-0"
        >
          <Link
            to="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            to="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
          >
            Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            to={`/?category=${encodeURIComponent(product.category)}`}
            className="capitalize hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-35 sm:max-w-xs shrink-0">
            {product.title}
          </span>
        </nav>

        {/* Back button */}
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer group shrink-0"
          aria-label="Back to catalog"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to catalog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <section aria-label="Product Gallery" className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-center p-6 sm:p-8">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-contain transition-all duration-300"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-rose-600 text-white shadow-sm">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails row (shown only when product has multiple images) */}
          {images.length > 1 && (
            <div
              className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none"
              aria-label="Thumbnail selection"
            >
              {images.map((imgUrl, idx) => {
                const isActive = selectedImageIndex === idx;

                return (
                  <button
                    key={`${imgUrl}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View image ${idx + 1} of ${images.length}`}
                    aria-pressed={isActive}
                    className={`relative aspect-square h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border-2 p-1 transition-all cursor-pointer bg-white dark:bg-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isActive
                        ? "border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} ${idx + 1}`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Right Column: Product Information and Actions */}
        <section aria-label="Product Information" className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
            >
              {product.category}
            </Link>
            {product.brand && (
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                by{" "}
                <strong className="text-slate-800 dark:text-slate-200">
                  {product.brand}
                </strong>
              </span>
            )}
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-3">
            <StarRating value={product.rating} size="md" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {reviewsCount} {reviewsCount === 1 ? "review" : "reviews"}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {formatPrice(finalPrice)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-slate-400 dark:text-slate-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                You save {formatPrice(savings)}{" "}
                ({Math.round(product.discountPercentage)}%)
              </p>
            )}
          </div>

          <div>
            {isOutOfStock && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                <span>Out of stock</span>
              </span>
            )}
            {isLowStock && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
                <span>Only {stock} left!</span>
              </span>
            )}
            {!isOutOfStock && !isLowStock && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>In stock</span>
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Description
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div
                aria-label="Quantity Stepper"
                className="inline-flex items-center justify-between sm:justify-start rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-xs"
              >
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isOutOfStock}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-slate-900 dark:text-white select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= stock || isOutOfStock}
                  aria-label="Increase quantity"
                  className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-emerald-500 shadow-md ${
                  isAdded
                    ? "bg-slate-800 dark:bg-emerald-700 text-white"
                    : isOutOfStock
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                      : "bg-linear-to-r from-emerald-900 to-slate-900 hover:from-slate-900 hover:to-emerald-950 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-white hover:shadow-lg active:scale-[0.99]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Trust badges and shipping info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
              <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">
                  Fast Delivery
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  {product.shippingInformation || "2–4 business days"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">
                  Warranty
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  {product.warrantyInformation || "1 Year Official"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
              <RotateCcw className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900 dark:text-white">
                  Free Returns
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  {product.returnPolicy || "30-day money back"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
