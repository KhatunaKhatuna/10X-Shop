import { Link } from "react-router-dom";
import { PackageCheck, Clock, MapPin, ShoppingBag } from "lucide-react";
import { useLocalStorage } from "@/hooks";
import { EmptyState } from "@/components/ui";
import type { Order } from "@/types";
import { STORAGE_KEYS, formatPrice } from "@/utils";

export default function OrdersPage() {
  const [orders] = useLocalStorage<Order[]>(STORAGE_KEYS.ORDERS, []);

  if (orders.length === 0) {
    return (
      <div className="py-8 animate-fade-in">
        <EmptyState
          icon={PackageCheck}
          title="No orders yet"
          message="You haven't placed any orders yet. Once you complete checkout, your order history and tracking details will appear here."
          actionLabel="Explore Catalog"
          actionHref="/"
        />
      </div>
    );
  }

  // Show newest orders first
  const sortedOrders = [...orders].reverse();

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Order History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review and track all your previous purchases ({orders.length}{" "}
            {orders.length === 1 ? "order" : "orders"})
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="space-y-4">
        {sortedOrders.map((order) => (
          <div
            key={order.id}
            className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4 transition-all hover:shadow-md"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white font-heading">
                  #{order.number}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(order.placedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  ● {order.status || "Processing"}
                </span>
                <span className="font-heading font-black text-base text-slate-900 dark:text-white">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800/50 text-xs"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-11 h-11 rounded-lg object-cover bg-white dark:bg-slate-900 shrink-0 border border-slate-200/60 dark:border-slate-700/60"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Recipient */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Delivering to:{" "}
                  <strong className="text-slate-700 dark:text-slate-300">
                    {order.shipping.fullName}
                  </strong>{" "}
                  ({order.shipping.city})
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
