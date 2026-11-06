import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Truck,
  MapPin,
  Mail,
  User,
  ShoppingBag,
  ArrowRight,
  AlertCircle,
  PackageCheck,
} from "lucide-react";
import { useCart, useLocalStorage, useAuth } from "@/hooks";
import { checkoutSchema, type CheckoutFormValues } from "@/schemas";
import type { Order } from "@/types";
import {
  STORAGE_KEYS,
  discountedPrice,
  formatPrice,
  scrollToTop,
} from "@/utils";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, promoCode, subtotal, discount, shipping, total, clearCart } =
    useCart();

  const [orders, setOrders] = useLocalStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // If cart is empty on arrival and no order was just placed, redirect to /cart
  useEffect(() => {
    if (items.length === 0 && !placedOrder) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, placedOrder, navigate]);

  // Formik integration using Yup schema
  const { handleSubmit, getFieldProps, touched, errors, isSubmitting } =
    useFormik<CheckoutFormValues>({
      enableReinitialize: true,
      initialValues: {
        fullName: user?.username || "",
        email: "",
        address: "",
        city: "",
      },
      validationSchema: checkoutSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        // Prevent multiple simultaneous clicks
        setSubmitting(true);

        // Generate clean 5-digit sequential number (#10X-00001)
        const nextSequence = orders.length + 1;
        const orderNumber = `10X-${String(nextSequence).padStart(5, "0")}`;

        const newOrder: Order = {
          id: Date.now(),
          number: orderNumber,
          items: [...items],
          shipping: values,
          status: "Processing",
          subtotal,
          discount,
          shippingCost: shipping,
          total,
          placedAt: new Date().toISOString(),
        };

        // Persist order to localStorage via useLocalStorage
        setOrders((prevOrders) => [newOrder, ...prevOrders]);

        // Set confirmation state before clearing cart
        setPlacedOrder(newOrder);

        // Clear cart state (updates cart badge to 0 immediately)
        clearCart();
        resetForm();

        setSubmitting(false);
        scrollToTop();
      },
    });

  // View 1: Order Confirmation Screen
  if (placedOrder) {
    const formattedDate = new Date(placedOrder.placedAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    return (
      <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8 animate-fade-in">
        {/* Success Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/20 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Thank you! Your order has been placed.
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We've received your order and have begun processing it.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400">
            <span>Order #{placedOrder.number}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Details */}
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white">
              <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Shipping Information</span>
            </div>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-bold text-slate-900 dark:text-white">
                {placedOrder.shipping.fullName}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{placedOrder.shipping.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-1 shrink-0" />
                <span>
                  {placedOrder.shipping.address}, {placedOrder.shipping.city}
                </span>
              </p>
            </div>
          </div>

          {/* Payment / Status */}
          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-900 dark:text-white">
              <PackageCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Order Summary</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items ({placedOrder.items.length})</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice(placedOrder.subtotal)}
                </span>
              </div>
              {placedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount</span>
                  <span className="font-semibold">
                    −{formatPrice(placedOrder.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>
                  {placedOrder.shippingCost === 0 ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Free
                    </span>
                  ) : (
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatPrice(placedOrder.shippingCost)}
                    </span>
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-extrabold text-base text-slate-900 dark:text-white">
                <span>Total Paid</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {formatPrice(placedOrder.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items Preview */}
        <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">
            Ordered Products
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {placedOrder.items.map((item) => {
              const unitPrice = discountedPrice(
                item.price,
                item.discountPercentage,
              );
              return (
                <div
                  key={item.productId}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Qty: {item.quantity} × {formatPrice(unitPrice)}
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-sm text-slate-900 dark:text-white shrink-0">
                    {formatPrice(unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post-purchase navigation */}
        <div className="flex items-center justify-center pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  // View 2: Active Checkout Form & Order Summary
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400"
      >
        <Link
          to="/"
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link
          to="/cart"
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          Cart
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="font-semibold text-slate-900 dark:text-white">
          Checkout
        </span>
      </nav>

      {/* Page Title */}
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
          Checkout
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Please enter your delivery details to complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controlled Shipping Form */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Shipping Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Full Name */}
              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Full name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Khatuna Chitishvili"
                    {...getFieldProps("fullName")}
                    aria-invalid={Boolean(touched.fullName && errors.fullName)}
                    className={`w-full min-h-11 pl-10 pr-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                      touched.fullName && errors.fullName
                        ? "border-red-400 focus:ring-red-400/50"
                        : "border-slate-300 dark:border-slate-700 focus:ring-emerald-500"
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Email */}
              <div className="sm:col-span-2 space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...getFieldProps("email")}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    className={`w-full min-h-11 pl-10 pr-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                      touched.email && errors.email
                        ? "border-red-400 focus:ring-red-400/50"
                        : "border-slate-300 dark:border-slate-700 focus:ring-emerald-500"
                    }`}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Field 3: Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="address"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="address"
                    type="text"
                    placeholder="Rustaveli Ave 12"
                    {...getFieldProps("address")}
                    aria-invalid={Boolean(touched.address && errors.address)}
                    className={`w-full min-h-11 pl-10 pr-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                      touched.address && errors.address
                        ? "border-red-400 focus:ring-red-400/50"
                        : "border-slate-300 dark:border-slate-700 focus:ring-emerald-500"
                    }`}
                  />
                </div>
                {touched.address && errors.address && (
                  <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.address}</span>
                  </p>
                )}
              </div>

              {/* Field 4: City */}
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Tbilisi"
                  {...getFieldProps("city")}
                  aria-invalid={Boolean(touched.city && errors.city)}
                  className={`w-full min-h-11 px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 ${
                    touched.city && errors.city
                      ? "border-red-400 focus:ring-red-400/50"
                      : "border-slate-300 dark:border-slate-700 focus:ring-emerald-500"
                  }`}
                />
                {touched.city && errors.city && (
                  <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/cart"
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ← Return to Cart
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Placing Order..." : "Place order"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary Preview */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-xs space-y-6">
            <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-200/80 dark:border-slate-800">
              Order Summary ({items.length})
            </h2>

            {/* Miniature items list preview */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto custom-scrollbar pr-2">
              {items.map((item) => {
                const unitPrice = discountedPrice(
                  item.price,
                  item.discountPercentage,
                );
                return (
                  <div
                    key={item.productId}
                    className="py-2.5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="font-bold text-slate-900 dark:text-white shrink-0">
                      {formatPrice(unitPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-sm">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {promoCode && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount ({promoCode} −10%)</span>
                  <span className="font-semibold">
                    −{formatPrice(discount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
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
                  <span className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                    Total
                  </span>
                  <p className="text-xs text-slate-400">Including all taxes</p>
                </div>
                <span className="font-heading font-black text-xl text-emerald-600 dark:text-emerald-400">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Safe local simulated checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
