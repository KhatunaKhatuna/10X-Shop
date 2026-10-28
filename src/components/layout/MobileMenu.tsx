import { useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu and unlock scroll if window is resized to desktop width (>= 768px) or user navigates back/forward
  useEffect(() => {
    if (!isOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        onClose();
      }
    };

    const handlePopState = () => {
      onClose();
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when the full-screen mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // WAI-ARIA Focus Management: initial focus, keyboard focus trap (Tab/Shift+Tab), Escape key, and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    const menuEl = menuRef.current;
    if (!menuEl) return;

    // 1. Capture previously focused element (e.g., Hamburger button) to restore upon closing
    const previousActiveElement = document.activeElement as HTMLElement | null;

    // Helper to find all interactive elements inside the menu dialog
    const getFocusableElements = () => {
      return menuEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
    };

    // 2. Set initial focus to the first interactive element inside the menu
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      requestAnimationFrame(() => {
        focusable[0]?.focus();
      });
    }

    // 3. Trap focus within dialog and handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const elements = getFocusableElements();
        if (elements.length === 0) return;

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: if focused on first element, wrap focus to last element
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: if focused on last element, wrap focus to first element
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // 4. Restore focus to the invoking trigger when the menu closes
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (
        previousActiveElement &&
        typeof previousActiveElement.focus === "function"
      ) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      tabIndex={-1}
      className={`fixed top-16 inset-x-0 bottom-0 md:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl px-6 py-6 flex flex-col justify-between z-50 overflow-y-auto outline-hidden transition-all duration-300 ease-out ${
        isOpen
          ? "opacity-100 translate-y-0 visible pointer-events-auto"
          : "opacity-0 -translate-y-4 invisible pointer-events-none"
      }`}
    >
      {/* Navigation Links (DRY Shared Component) */}
      <NavLinks variant="mobile" onItemClick={onClose} />

      {/* Bottom Actions: Theme Toggle (Touch target >= 44px per PRD O3) */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 pb-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-11"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <span className="flex items-center gap-3">
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            )}
            <span className="text-sm">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
