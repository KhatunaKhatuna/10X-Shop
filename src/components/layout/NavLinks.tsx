import { NavLink } from "react-router-dom";
import { ShoppingBag, ShoppingCart, User, type LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  end?: boolean;
  hasBadge?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = [
  { name: "Catalog", path: "/", icon: ShoppingBag, end: true },
  { name: "Cart", path: "/cart", icon: ShoppingCart, hasBadge: true },
  { name: "Login", path: "/login", icon: User },
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

  return (
    <nav
      className={isMobile ? "space-y-2" : "hidden md:flex items-center gap-1"}
      aria-label={isMobile ? "Mobile Navigation" : "Desktop Navigation"}
    >
      {NAV_ITEMS.map(({ name, path, icon: Icon, end, hasBadge }) => (
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
            {hasBadge && (
              <span
                className={`ml-1.5 font-bold rounded-full bg-orange-600 text-white text-xs ${
                  isMobile ? "px-2 py-0.5" : "px-1.5 py-0.5"
                }`}
              >
                0
              </span>
            )}
          </div>
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
