# 📊 10X Shop — Final Technical Report (REPORT.md)

> **Project:** "10X Shop" — E-Commerce Single Page Application (SPA)
>
> **Student:** Khatuna Chitishvili
>
> **Live Demo:** <https://10-x-shop-jade.vercel.app/>
>
> **GitHub Repository:** <https://github.com/KhatunaKhatuna/10X-Shop>
>
> **Submission Date:** November 2026

## 1. Planned vs. Delivered Functionality

During the project planning phase (`PLAN.md`), the primary priority was to deliver the **CORE** functionality with 100% stability and full compliance with the technical specification (Annex A), followed by the integration of high-priority **FULL / BONUS** modules.

### 1.1. Module Implementation Checklist

| Module / Page | Tier | Status | Comments / Implementation Details |
| :--- | :--- | :--- | :--- |
| **P0 — Global Architecture & Layout** | CORE | ✅ Delivered | `MainLayout` (`Header` + `<Outlet />` + `Footer`), `ScrollToTop`, `NotFoundPage` (404), dynamic `NavLinks` with cart badge (hidden when count is `0`). |
| **P0.4 & TW6 — Dark / Light Theme** | FULL / BONUS | ✅ Delivered | `ThemeContext` + `ThemeProvider`, synchronized with `localStorage` (`shop_theme`) and the root `data-theme` attribute. |
| **P1 — Login Page (`/login`)** | CORE + FULL | ✅ Delivered | Built with **Formik + Yup** (`loginSchema`), blocking Georgian characters, password visibility toggle, and `ProtectedRoute` redirect (returning to `/checkout`). |
| **P2 — Catalog Page (`/`) — Core** | CORE | ✅ Delivered | `GET /products`, `ProductGrid`, `ProductCard` (discount formula, rating, 3 stock states: `In stock`, `Only N left!`, `Out of stock`), Loading / Error / Empty states. |
| **P2.2 & P2.7 — Pagination, Skeleton & AbortController** | FULL | ✅ Delivered | `Pagination` component synchronized with URL `?page=` (`useSearchParams`), `ProductGridSkeleton` (12 cards), `Retry` mechanism, and `AbortController` in `useFetch`. |
| **P2.4–P2.6 — Search, Category & Sort Toolbar** | FULL | ⏸️ Not Delivered | Deferred in FULL scope (see explanation below). |
| **P3 — Product Details (`/products/:id`) — Core** | CORE + FULL | ✅ Delivered | Parameter validation (`/products/abc` and `404` -> `NotFoundPage`), interactive gallery, `ProductDetailsSkeleton`, quantity stepper, and stock limit control against cart (`availableToAdd`). |
| **P3.4 & P3.5 — Reviews & Related Products** | FULL | ⏸️ Not Delivered | Deferred in FULL scope (see explanation below). |
| **P4 — Cart Page (`/cart`) & Reducer** | CORE + FULL | ✅ Delivered | `useReducer` + Discriminated Union (`CartAction` + exhaustive `never` check), `shop_cart` persistence, Promo code `10X10` (-10%), free shipping threshold ($100), and `Clear cart` with confirmation. |
| **P5 — Checkout (`/checkout`) & Order Persistence** | CORE + FULL | ✅ Delivered | Protected route, 4-field form (`Formik + Yup`), `fullName` pre-filled from `AuthContext`, double-click prevention, Confirmation screen (`#10X-00001`), cart clearing, and order persistence in `shop_orders`. |
| **P6 & P7 — Orders (`/orders`) & Profile (`/profile`)** | FULL | ⏸️ Partial | Routes are protected via `ProtectedRoute` and orders are saved in `shop_orders`, while full UI pages remained in FULL scope. |
| **T — TypeScript (Strict Mode & Generics)** | CORE + FULL | ✅ Delivered | `"strict": true`, `tsc -b` (0 errors), 0 `any`, Generic hooks (`useFetch<T>`, `useLocalStorage<T>`), Discriminated Unions, `STORAGE_KEYS` (`as const`). |
| **TW — Tailwind CSS v4** | CORE + BONUS | ✅ Delivered | `@tailwindcss/vite`, `@utility`, `@custom-variant dark`, full responsive design (375px–1440px) with zero horizontal scroll, touch targets $\ge 44\text{px}$. |
| **O — Optimization, ErrorBoundary & Debug Log** | CORE | ✅ Delivered | Class-based `ErrorBoundary` (`getDerivedStateFromError` + `componentDidCatch`), `loading="lazy"` and `width/height` on images, `DEBUG-LOG.md` (8 real cases), Vercel deploy with SPA rewrites. |

### 1.2. What Was Not Delivered and Why (Scope Trade-offs)

Throughout development, I prioritized **quality over quantity** (mitigating Risk R2 from `PLAN.md`):

1. **Catalog Toolbar (Search/Category/Sort), Product Reviews/Related, and Orders/Profile UI Pages (FULL):** Time resources were dedicated to perfecting the architecture of the **CORE** user journey (Catalog $\rightarrow$ Product $\rightarrow$ Cart $\rightarrow$ Login $\rightarrow$ Checkout $\rightarrow$ Confirmation), ensuring 100/100 Accessibility (WAI-ARIA focus trap in mobile menu, semantic cards), and delivering high-impact **FULL** features such as `Formik + Yup` validation schemas, `useReducer` cart management with promo code (`10X10`), URL pagination, Skeleton loaders, and Dark/Light theme switching.

2. **Separate OOP Classes (`models/`):** Cart and storage business logic are cleanly encapsulated using functional and declarative React patterns (`cartReducer` pure function, `useLocalStorage<T>` generic hook, and `utils/storage.ts`). Consequently, introducing redundant OOP classes ("classes for the sake of classes") was unnecessary.

## 2. Project Metrics and Performance (Metrics Table)

### 2.1. Lighthouse Audit (Before vs. After)

Audits were conducted on the Production environment (Vercel) in Incognito mode using Mobile and Desktop presets:

| Metric | Before (Initial Prototype) | After (Optimized Build) | What Changed (Implemented Optimizations) |
| :--- | :--- | :--- | :--- |
| **Performance** | 78 | **94+** | Added `loading="lazy"`, `decoding="async"`, explicit image dimensions (`width={300} height={300}`), `ProductGridSkeleton`, and `ProductDetailsSkeleton`. |
| **Accessibility** | 84 | **100** | Resolved Interactive Nesting (`<article>` + `<Link>`), removed `aria-hidden` on focusable elements, added `aria-label` attributes, and implemented WAI-ARIA focus trap in the mobile menu. |
| **Best Practices** | 92 | **100** | Cleaned up console output, added class-based `ErrorBoundary`, enforced HTTPS imagery and secure external links (`rel="noopener noreferrer"`). |
| **CLS (Cumulative Layout Shift)** | 0.18 | **< 0.02** | Applied `aspect-square` and fixed proportions to all image containers alongside Skeleton placeholders during data fetching. |

### 2.2. Technical and Process Statistics

| Parameter | Metric | Details |
| :--- | :--- | :--- |
| **TypeScript Errors (`npm run typecheck`)** | **0 errors** | `"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`, 0 `any`. |
| **ESLint Errors (`npm run lint`)** | **0 errors** | Clean codebase adhering to `react-hooks/rules-of-hooks` and `exhaustive-deps`. |
| **Production Bundle Size (`npm run build`)** | **~118 kB (gzip)** | Well below the PRD's 250 kB threshold (utilizing lightweight native `Intl` APIs). |
| **Documented Bugs (`DEBUG-LOG.md`)** | **8 real cases** | Covers CSS Specifications, React Render Loops, IEEE 754 precision, A11y, and DRY architectural fixes. |
| **Time Spent (by Epics)** | **~48 hours** | Setup & Types (6 hrs), Layout & Auth (8 hrs), Catalog & Product (12 hrs), Cart & Checkout (11 hrs), QA, Debug & Docs (11 hrs). |

## 3. Three Hardest Technical Challenges and Their Solutions

Several non-trivial engineering challenges were encountered and resolved during development (see [`DEBUG-LOG.md`](DEBUG-LOG.md) for full details):

### Challenge 1: JavaScript `NaN !== NaN` Trap & React Infinite Re-render Loop (`ProductPage`)

* **Symptom:** Navigating to an invalid alphanumeric product route (e.g., `/products/12a`) resulted in a blank white screen instead of rendering `NotFoundPage`, throwing `Error: Maximum update depth exceeded` in the console.

* **Root Cause:** To reset the selected image index and quantity when the URL parameter changed, I compared `if (prevId !== numericId)` during the render phase. When `id` was `"12a"`, `Number("12a")` evaluated to `NaN`. Under the IEEE 754 specification, `NaN !== NaN` always evaluates to `true`, triggering synchronous `setState` calls on every render pass in an infinite loop before execution could reach the `if (!isValidId)` guard.

* **Solution:** Changed the state tracker comparison to use the raw route parameter string (`if (prevId !== id)`). Because `"12a" !== "12a"` is strictly `false`, the infinite loop was eliminated and the component safely rendered `NotFoundPage`.

### Challenge 2: CSS `backdrop-filter` Containing Block Trap on Mobile Menu

* **Symptom:** When `MobileMenu` (`position: fixed; top: 4rem; bottom: 0`) was rendered inside the `<header>` element, the overlay failed to cover the viewport and remained trapped inside the 64px (`h-16`) header height.

* **Root Cause:** According to the W3C CSS Filter Effects specification, applying `backdrop-blur-md` (`backdrop-filter`) to a parent element establishes a new Containing Block for all descendant `position: fixed` elements, causing the fixed menu to anchor to the `<header>` rather than the browser viewport.

* **Solution:** Used a React Fragment (`<>...</>`) in `Header.tsx` to extract `<MobileMenu />` outside `<header>` as a sibling element. Additionally, attached a `window.matchMedia("(min-width: 768px)")` listener to automatically close the menu and release the `body` scroll lock when resizing the window to desktop width.

### Challenge 3: Interactive Nesting & Achieving 100/100 Lighthouse Accessibility (`ProductCard`)

* **Symptom:** Wrapping the entire product card inside a `<Link>` (`<a>`) that also contained an inner `<button>Add to Cart</button>` violated the HTML5 specification (nesting interactive elements inside one another), while adding `aria-hidden="true"` to the thumbnail link lowered the Lighthouse Accessibility score.

* **Solution:** Structured the outer card container as a semantic `<article onClick={handleCardClick}>`, kept the product title as the single primary `<Link>` for keyboard navigation, and invoked `e.stopPropagation()` and `e.preventDefault()` on the "Add to Cart" button to prevent card navigation when adding items to the cart.

## 4. What I Would Do Differently

1. **Unified URL Search Params Design in the Initial Catalog Iteration:** From day one, I would design `fetchProducts` in `CatalogPage` to accept a unified `CatalogParams` object (`q`, `category`, `sortBy`, `order`, `limit`, `skip`) rather than only `limit` and `skip`. This would make extending the catalog with FULL filter controls seamless.

2. **Global Toast Notification Context from the Start:** While local `isAdded` button states provide clear immediate UX feedback when adding items to the cart, introducing a global `ToastProvider` early on would standardize notifications across cart actions, promo codes, and authentication events.

3. **Automated Unit Testing (Vitest):** Writing concise unit tests early on for pure business-logic functions like `cartReducer` and `discountedPrice` would further accelerate edge-case verification (such as stock boundary clamping).

## 5. AI Usage Summary

Throughout the project, Artificial Intelligence was used as an assistive pair-programming and code-review tool rather than an automated code generator:

* **What Was Delegated to AI:** Accelerating boilerplate Tailwind CSS skeleton layouts (`ProductGridSkeleton`, `ProductDetailsSkeleton`), verifying regular expressions for Yup validation (Georgian Unicode character ranges), auditing codebase compliance against PRD requirements, and proofreading documentation (`README.md`, `DEBUG-LOG.md`).

* **What Was Rejected and Modified:** I rejected AI suggestions to call `setState` inside `useEffect` when resetting state on product ID changes in `ProductPage` (which causes unnecessary cascading re-renders) and instead implemented React 19's recommended render-phase state reset pattern (`if (prevId !== id)`). I also rejected wrapping the entire `ProductCard` in a `<Link>` in favor of strict HTML5 semantics and WAI-ARIA compliance.

* **Outcome:** Every line of code, architectural decision, and state flow in the application is thoroughly understood, verified, and ready for defense.