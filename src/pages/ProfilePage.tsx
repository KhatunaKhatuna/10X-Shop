import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  CreditCard,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useAuth, useLocalStorage } from "@/hooks";
import type { Order } from "@/types";
import { STORAGE_KEYS, formatPrice } from "@/utils";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders] = useLocalStorage<Order[]>(STORAGE_KEYS.ORDERS, []);

  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "US";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-3xl mx-auto">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white font-heading font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20 shrink-0">
          {initials}
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
              {user?.username}
            </h1>
            <span className="inline-flex items-center self-center sm:self-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              Verified Account
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome to your 10X Shop personal customer profile
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>

      {/* Account Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Completed Orders
            </p>
            <p className="font-heading font-black text-xl text-slate-900 dark:text-white">
              {orders.length}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Total Spent
            </p>
            <p className="font-heading font-black text-xl text-slate-900 dark:text-white">
              {formatPrice(totalSpent)}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
        <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/orders"
            className="flex items-center justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  Order History
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track and inspect past orders
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              →
            </span>
          </Link>

          <Link
            to="/"
            className="flex items-center justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">
                  Browse Catalog
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore trending products
                </p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
