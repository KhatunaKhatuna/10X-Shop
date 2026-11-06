import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  User,
  LogOut,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { useAuth, useCart } from "@/hooks";

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
  hasBadge?: boolean;
}

const BASE_NAV_ITEMS: readonly NavItem[] = [
  { name: "Catalog", path: "/", icon: ShoppingBag, end: true },
  { name: "Cart", path: "/cart", icon: ShoppingCart, hasBadge: true },
];

interface NavLinksProps {
  variant?: "desktop" | "mobile";
  onItemClick?: () => void;
}

export default function NavLinks({
  variant = "desktop",
  onItemClick,
}: NavLinksProps) {
  const isMobile = variant === "mobile";
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <nav
      className={isMobile ? "space-y-2" : "hidden md:flex items-center gap-1"}
      aria-label={isMobile ? "Mobile Navigation" : "Desktop Navigation"}
    >
      {/* Base Navigation (Catalog & Cart) */}
      {BASE_NAV_ITEMS.map(({ name, path, icon: Icon, end, hasBadge }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer min-h-11 ${
              isActive ? "nav-link-active" : "nav-link-inactive"
            } ${isMobile ? "text-base" : "text-sm"}`
          }
        >
          <div className="relative flex items-center">
            <Icon
              className={`${
                isMobile ? "w-5 h-5" : "w-4 h-4"
              } transition-colors`}
            />
            {hasBadge && totalItems > 0 && (
              <span
                aria-label={`${totalItems} items in cart`}
                className={`ml-1.5 font-bold rounded-full bg-orange-600 text-white text-xs ${
                  isMobile ? "px-2 py-0.5" : "px-1.5 py-0.5"
                }`}
              >
                {totalItems}
              </span>
            )}
          </div>
          <span>{name}</span>
        </NavLink>
      ))}

      {/* Auth State (Log in when guest, Username & Log out when authenticated) */}
      {!isLoggedIn ? (
        <NavLink
          to="/login"
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer min-h-11 ${
              isActive ? "nav-link-active" : "nav-link-inactive"
            } ${isMobile ? "text-base" : "text-sm"}`
          }
        >
          <LogIn
            className={`${
              isMobile ? "w-5 h-5" : "w-4 h-4"
            } transition-colors`}
          />
          <span>Log in</span>
        </NavLink>
      ) : isMobile ? (
        /* Mobile Authenticated Menu Item */
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-base font-bold text-slate-800 dark:text-slate-200 min-h-11">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">{user?.username}</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer min-h-11 text-base"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      ) : (
        /* Desktop Authenticated Menu Item */
        <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200 dark:border-slate-800">
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-sm font-bold text-slate-700 dark:text-slate-200 min-h-11"
            title={`Logged in as ${user?.username}`}
          >
            <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="uppercase tracking-wide">
              {user?.username?.slice(0, 2)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-sm font-semibold transition-all cursor-pointer min-h-11"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </nav>
  );
}
