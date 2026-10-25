import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingBag,
  ShoppingCart,
  User,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/hooks";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // NavLink helper for active styling (uses custom Tailwind utilities)
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
      isActive ? "nav-link-active" : "nav-link-inactive"
    }`;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white font-extrabold flex items-center justify-center font-heading text-lg shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
            10X
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg leading-tight text-slate-900 dark:text-white tracking-tight">
              10X{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                SHOP
              </span>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-none">
              E-Commerce Store
            </span>
          </div>
        </Link>

        {/* Right side: Navigation Links & Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              <ShoppingBag className="w-4 h-4 transition-colors" />
              <span>Catalog</span>
            </NavLink>

            <NavLink to="/cart" className={navLinkClass}>
              <div className="relative flex items-center">
                <ShoppingCart className="w-4 h-4 transition-colors" />
                {/* Cart badge placeholder (will connect to CartContext later) */}
                <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-orange-600 text-white">
                  0
                </span>
              </div>
              <span>Cart</span>
            </NavLink>

            <NavLink to="/login" className={navLinkClass}>
              <User className="w-4 h-4 transition-colors" />
              <span>Login</span>
            </NavLink>
          </nav>

          {/* Desktop Theme Toggle Button (hidden on mobile) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden md:inline-flex items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-4 space-y-1 shadow-lg animate-in fade-in duration-150">
          <NavLink to="/" end onClick={closeMenu} className={navLinkClass}>
            <ShoppingBag className="w-4 h-4 transition-colors" />
            <span>Catalog</span>
          </NavLink>

          <NavLink to="/cart" onClick={closeMenu} className={navLinkClass}>
            <div className="relative flex items-center">
              <ShoppingCart className="w-4 h-4 transition-colors" />
              <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-orange-600 text-white">
                0
              </span>
            </div>
            <span>Cart</span>
          </NavLink>

          <NavLink to="/login" onClick={closeMenu} className={navLinkClass}>
            <User className="w-4 h-4 transition-colors" />
            <span>Login</span>
          </NavLink>

          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
