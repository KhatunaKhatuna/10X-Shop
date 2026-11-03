import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, discountedPrice, formatRating } from "@/utils";
import { StarRating } from "@/components/ui";

export interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!isAdded) return;
    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAdded]);

  const hasDiscount = product.discountPercentage >= 1;
  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const reviewsCount =
    product.reviews && product.reviews.length > 0 ? product.reviews.length : 12;

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    setIsAdded(true);
    onAdd(product);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 h-full cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-800/40 overflow-hidden flex items-center justify-center p-4">
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center gap-2 z-10 pointer-events-none">
          {/* Orange Discount Badge */}
          {hasDiscount && (
            <span className="inline-flex items-center bg-orange-600 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-xs">
              −{Math.round(product.discountPercentage)}%
            </span>
          )}

          {/* Stock Status Badge*/}
          <div className="ml-auto">
            {isOutOfStock ? (
              <span className="inline-flex items-center bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Out of stock
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                Only {product.stock} left!
              </span>
            ) : (
              <span className="inline-flex items-center bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                In stock
              </span>
            )}
          </div>
        </div>

        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          decoding="async"
          width={300}
          height={300}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 truncate block">
          {product.category} {product.brand ? `· ${product.brand}` : ""}
        </span>

        {/* Product Title Link */}
        <Link
          to={`/products/${product.id}`}
          onClick={(e) => e.stopPropagation()}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
        >
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mt-0.5 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-semibold">
          <StarRating value={product.rating} />
          <span className="font-bold text-slate-700 dark:text-slate-300 ml-0.5">
            {formatRating(product.rating)}
          </span>
          <span className="text-slate-400 dark:text-slate-500 font-normal">
            {`(${reviewsCount} reviews)`}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          {/* Price Display */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              {formatPrice(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs line-through text-slate-400 dark:text-slate-500">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            aria-label={
              isOutOfStock
                ? `${product.title} is out of stock`
                : isAdded
                  ? `${product.title} added to cart`
                  : `Add ${product.title} to cart`
            }
            className={`w-full min-h-11 py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 ${
              isAdded
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white shadow-xs hover:shadow-md"
            }`}
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
