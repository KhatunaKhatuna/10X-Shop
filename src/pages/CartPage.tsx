import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
} from "lucide-react";
import { useCart } from "@/hooks";
import { discountedPrice, formatPrice } from "@/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/context";
import { EmptyState } from "@/components/ui";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    promoCode,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // If cart is empty, show EmptyState without order summary
  if (items.length === 0) {
    return (
      <div className="py-8 animate-fade-in">
        <EmptyState
          title="Your cart is empty."
          message="Looks like you haven't added anything to your cart yet. Discover great products in our catalog!"
          actionLabel="Browse products"
          actionHref="/"
          icon={ShoppingCart}
        />
      </div>
    );
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromo(promoInput);
    setPromoFeedback(result);
    if (result.success) {
      setPromoInput("");
    }
  };

  const handleRemovePromo = () => {
    removePromo();
    setPromoFeedback(null);
  };

  const handleClearCart = () => {
    if (window.confirm("Clear the cart? This cannot be undone.")) {
      clearCart();
    }
  };

  const discountedSubtotal = subtotal - discount;
  const amountForFreeShipping = Math.max(
    0,
    Math.round((FREE_SHIPPING_THRESHOLD - discountedSubtotal) * 100) / 100,
  );
  const qualifiesForFreeShipping = shipping === 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items List  */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-slate-200/70 dark:divide-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs overflow-hidden">
            {items.map((item) => {
              const unitPrice = discountedPrice(
                item.price,
                item.discountPercentage,
              );
              const lineTotal =
                Math.round(unitPrice * item.quantity * 100) / 100;
              const hasDiscount = item.discountPercentage >= 1;

              return (
                <div
                  key={item.productId}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                >
                  <Link
                    to={`/products/${item.productId}`}
                    className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 group"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Title & Unit Price */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      to={`/products/${item.productId}`}
                      className="font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>

                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {formatPrice(unitPrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(item.price)}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        each
                      </span>
                    </div>

                    {item.quantity >= item.stock && (
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        Max stock reached ({item.stock})
                      </p>
                    )}
                  </div>

                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/60">
                    {/* Stepper */}
                    <div
                      aria-label="Quantity selector"
                      className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-9 text-center font-bold text-sm text-slate-900 dark:text-white select-none">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                        className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right min-w-20">
                      <p className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.title} from cart`}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action: Clear Cart */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleClearCart}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/30"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear cart</span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-xs space-y-6">
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white pb-3 border-b border-slate-200/80 dark:border-slate-800">
              Order Summary
            </h2>

            {/* Free shipping progress hint */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                {qualifiesForFreeShipping ? (
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    You qualify for Free Shipping!
                  </span>
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">
                    Add{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {formatPrice(amountForFreeShipping)}
                    </strong>{" "}
                    more for <strong>FREE shipping</strong>!
                  </span>
                )}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {promoCode && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="inline-flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Discount ({promoCode} −10%)</span>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="ml-1 text-xs underline text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </span>
                  <span className="font-semibold">
                    −{formatPrice(discount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>
                  {qualifiesForFreeShipping ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Free
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatPrice(shipping)}
                    </span>
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    Total
                  </span>
                  <p className="text-xs text-slate-400">
                    Including all taxes & discounts
                  </p>
                </div>
                <span className="font-heading font-black text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Promo Code Input Form */}
            {!promoCode && (
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <label
                  htmlFor="promo-code"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter 10X10"
                    className="flex-1 min-h-10 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="min-h-10 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoFeedback && (
                  <p
                    className={`text-xs flex items-center gap-1 mt-1 ${
                      promoFeedback.success
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {promoFeedback.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{promoFeedback.message}</span>
                  </p>
                )}
              </form>
            )}

            {/* Proceed to checkout CTA */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed to checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Secure local checkout experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
