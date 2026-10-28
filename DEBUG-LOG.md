# 10X Shop — Edge-Case Debug & Architectural Log

This document records real-world technical challenges, CSS/React specification nuances, and architectural best practices encountered and implemented during the development of **10X Shop**. It serves as technical evidence of engineering depth for diploma defense and code audits.

---

## 1. CSS Backdrop-Filter Containing Block Trap

### Problem Description

The `<header>` element used Tailwind's `backdrop-blur-md` (`backdrop-filter: blur(...)`). When the full-screen mobile menu overlay with `fixed top-16 inset-x-0 bottom-0` was rendered inside `<header>`, the menu failed to cover the viewport and remained trapped inside the 64px (`h-16`) header bounding box.

### Root Cause (W3C CSS Filter Effects Module Level 1)

According to the W3C specification, any element with a `filter` or `backdrop-filter` property establishes a new **Containing Block** and **Stacking Context** for all descendant elements, including those with `position: fixed`. Consequently, a `fixed` child anchors to the filtered `<header>` rather than the browser viewport.

### Solution

Extracted the mobile menu outside `<header>` using a top-level React Fragment (`<> ... </>`):

```tsx
return (
  <>
    <header className="sticky top-0 z-50 backdrop-blur-md ...">
      {/* Header bar content */}
    </header>
    <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMenu} />
  </>
);
```

This allows [`MobileMenu.tsx`](src/components/layout/MobileMenu.tsx) to attach directly to the root viewport containing block without interference.

---

## 2. Window Resize & Body Overflow Scroll Lock Bug

### Problem Description

When the mobile menu opened on mobile screens, `document.body.style.overflow = "hidden"` was applied to prevent background page scrolling. If a user (or examiner using DevTools) resized the browser window to desktop width ($\ge 768\text{px}$), the menu visually disappeared due to `md:hidden`, but `isMobileMenuOpen` remained `true`, leaving the entire website scroll locked (`overflow: hidden`).

### Solution

Implemented an active `window.matchMedia("(min-width: 768px)")` listener inside [`MobileMenu.tsx`](src/components/layout/MobileMenu.tsx):

```tsx
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
```

- **Zero Overhead:** The listener is only attached when the menu is actually open (`if (!isOpen) return;`).
- As soon as the screen reaches desktop width or user hits browser Back/Forward (`popstate`), `onClose()` triggers, closing the menu and releasing `document.body.style.overflow`.

---

## 3. Accessibility & WAI-ARIA Focus Management

### Problem Description

Hiding the closed menu overlay using `aria-hidden={!isOpen}` caused browser accessibility console errors:

> `Blocked aria-hidden on an element because its descendant retained focus. The focus must not be hidden from assistive technology users.`
> Furthermore, when opening a full-screen dialog, keyboard focus must not be allowed to escape into the hidden background page (Focus Trap violation).

### Solution

1. **CSS Visibility Toggling:** Replaced `aria-hidden` with `invisible pointer-events-none` (`visibility: hidden`), which cleanly removes elements from the accessibility tree without ARIA attribute conflicts.
2. **Initial Focus:** When the menu opens, focus automatically transitions to the first interactive element (`requestAnimationFrame(() => focusable[0]?.focus())`).
3. **Keyboard Focus Trap (Tab / Shift+Tab):** Pressing `Tab` on the last element wraps back to the first element; pressing `Shift+Tab` on the first element wraps to the last. Focus is safely confined within the dialog.
4. **Escape Key Handling:** Pressing `Escape` invokes `onClose()`.
5. **Focus Restoration:** Upon closing the menu, focus automatically returns to the element that originally triggered it (the Hamburger button).

---

## 4. DRY Principle: Data & UI Navigation (Single Source of Truth)

### Problem Description

Navigation items (Catalog, Cart with badge, Login) were originally duplicated across:

1. Desktop `<nav>` in `Header.tsx`
2. Mobile `<nav>` in `MobileMenu.tsx`

Adding a new route or modifying an existing path required synchronized edits in multiple files, violating the Don't Repeat Yourself (DRY) principle.

### Solution

Created a reusable, polymorphic [`NavLinks.tsx`](src/components/layout/NavLinks.tsx) component:

- `NAV_ITEMS` array acts as the single source of truth for paths, names, icons, and badge metadata.
- Accepts `variant="desktop" | "mobile"` to adapt layout (`hidden md:flex items-center gap-1` vs `space-y-2`), typography, and icon sizes (`w-4` vs `w-5`).
- Receives optional `onItemClick` callback to trigger menu closure on mobile.
- Completely eliminated duplicate JSX and navigation data across the codebase.

---

## 5. Centralized Scroll Restoration Architecture

### Problem Description

Individual links in [`Footer.tsx`](src/components/layout/Footer.tsx) redundantly bound `onClick={scrollToTop}` handlers. Furthermore, `window.scrollTo` logic was scattered across both layout components and route listeners, with an unremoved `console.log` leaking into production.

### Solution

1. Created a unified utility function [`scrollToTop`](src/utils/scroll.ts) with optional smooth scrolling parameter (`smooth = true`).
2. Centralized route scroll restoration inside [`ScrollToTop.tsx`](src/components/layout/ScrollToTop.tsx) using instant scrolling (`scrollToTop(false)`), avoiding dizzying animations across route transitions.
3. Removed redundant `onClick` handlers from all standard footer navigation links while preserving smooth scroll exclusively for the brand logo returning to the top of the active page.

---
