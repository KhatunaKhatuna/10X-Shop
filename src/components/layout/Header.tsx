import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks";
// Direct sibling imports within the layout module (avoids circular dependency with "@/components/layout" barrel)
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Memoize closeMenu with useCallback to ensure a stable reference for MobileMenu's effect dependencies
  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
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
            {/* Desktop Navigation Links (DRY Shared Component) */}
            <NavLinks variant="desktop" />

            {/* Desktop Theme Toggle Button (hidden on mobile, min-w 44px per PRD O3) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden md:inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Mobile Hamburger Button (44px touch target per PRD O3: w-11 h-11) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <X
                  className={`w-6 h-6 absolute transition-all duration-200 ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 rotate-90 scale-75 pointer-events-none"
                  }`}
                />
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-200 ${
                    isMobileMenuOpen
                      ? "opacity-0 -rotate-90 scale-75 pointer-events-none"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Component */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMenu} />
    </>
  );
}
