# 📋 10X Shop — Development Implementation Plan (PLAN-eng.md)

> **Project:** "10X Shop" — Modern E-commerce SPA Platform  
> **Student:** Khatuna Chitishvili  
> **Tech Stack:** React 19, TypeScript (Strict), Tailwind CSS v4, Vite, React Router, DummyJSON API  
> **Version:** 1.1 · Class of 2026  
> **Final Submission Deadline:** November 06, 2026, 23:59 (GMT+4)  
> **Theoretical Exam:** November 05, 2026 · **Project Defense:** November 07–08, 2026

---

## 1. Project Objectives and Scope (Scope by Modules)

The goal of this project is to build a high-performance, resilient, and fully typed E-commerce Single Page Application (SPA) powered by the **DummyJSON API**.  
**Guiding Principle:** **CORE** functionality must be executed first (with 100% stability and compliance), followed by **FULL / BONUS** modules.

| Module                   | CORE Scope (Mandatory Baseline)                                                                                                                                                              | FULL / BONUS Scope (Advanced High-Score Tier)                                                                                                                                                                         |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**                | Functional components, Props & `children`, `useState`/`useEffect`, `map()` + stable `key`, React Router, `AuthContext`, `CartContext`, Controlled Login & Checkout forms.                    | Custom hooks (`useDebounce`, `useFetch`, `useLocalStorage`), `useReducer` for Cart, Formik + Yup (Login), Reviews, Related Products, Promo code (`10X10`), Orders & Profile pages.                                    |
| **TypeScript**           | `"strict": true`, `tsc --noEmit` (0 errors), `no-explicit-any`, complete typing of CORE models (`Product`, `CartItem`, `AuthUser`, `ShippingInfo`) and Props/State.                          | Generics (`AsyncState<T>`, `StorageService<T>`), Discriminated Unions (`CartAction`), Type Guards (`isApiError`, `isProduct`), Utility Types (`Pick`/`Omit`), OOP classes (`ApiClient`, `ApiError`, `Cart`, `Order`). |
| **Tailwind CSS**         | Tailwind v4 integration (`@tailwindcss/vite`), Utility-first styling, Flexbox/Grid, Mobile-first (from 375px without horizontal scroll), `hover:`, `focus:`, `disabled:` interactive states. | Custom design tokens (`@theme`), `@utility` / `@layer`, Dark / Light theme toggle (`ThemeContext` + `shop_theme`).                                                                                                    |
| **Optimization & QA**    | Responsive on 3 breakpoints, Loading/Error/Empty states, class-based `ErrorBoundary`, `DEBUG-LOG.md` (min. 3 bugs), image `alt` and `loading="lazy"`.                                        | Route-level `React.lazy` & `Suspense`, `AbortController` on search, sensible memoization (`React.memo`, `useMemo`), Lighthouse audit (Before/After screenshots), `COMPATIBILITY.md`, `DEBUG-LOG.md` (5 bugs).         |
| **Process (Git & Docs)** | Public repository, `PLAN.md`, `README.md` (EN), `REPORT.md`, meaningful Git history, Live Deploy (Vercel/Netlify) with SPA rewrites.                                                         | GitHub Projects board, 20+ Issues (labeled), 8+ PRs, 40+ commits (across 15 distinct days), 3 weekly progress notes (`docs/progress/`), 2–3 min demo video.                                                           |

---

## 2. Three-Week Timeline and Work Breakdown (WBS Summary)

| Week       | Period          | Focus and Key Deliverables                                                                                                                                                                                                                | Hours       |
| :--------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| **Week 1** | Oct 17 – Oct 23 | **CORE Foundation:** Setup, `PLAN.md`, CORE Types, Layout/Router, `AuthContext` & Login, Catalog (`GET /products`), `ProductCard`/`ProductGrid`. _(progress/week-1.md)_                                                                   | ~20 hrs     |
| **Week 2** | Oct 24 – Oct 30 | **CORE Transactions + FULL Architecture:** Product Details, `CartContext` (`shop_cart`), Cart Page, Checkout & Confirmation. Then: OOP classes, Search/Filter/Sort/Pagination, Reviews & Promo. _(progress/week-2.md)_                    | ~24 hrs     |
| **Week 3** | Oct 31 – Nov 06 | **FULL Pages, Optimization and Hand-off:** Orders, Profile, Formik+Yup, Theme, Responsive polish, `ErrorBoundary`, Lazy Loading, Lighthouse, `DEBUG-LOG.md`, `COMPATIBILITY.md`, Deploy, `README.md`, `REPORT.md`. _(progress/week-3.md)_ | ~24 hrs     |
| **Total**  | **3 Weeks**     | **Complete CORE + FULL Functionality**                                                                                                                                                                                                    | **~68 hrs** |

---

## 3. Detailed Action Plan (Checklist by Epics)

### 🟢 Phase 1: CORE Functionality (Top Priority)

#### Epic 1: Environment Setup and Tooling

_Estimate: 3 hrs · Week 1 · Tier: CORE (PRD Steps: 1, 2)_

- [x] **1.1. Project Initialization:** Vite + React 19 + TypeScript template; Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`).
- [x] **1.2. Configuration and Scripts:** In `tsconfig.app.json`: `"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`. ESLint: `@typescript-eslint/no-explicit-any: error`. Scripts: `dev`, `build`, `preview`, `lint`, `typecheck` (`tsc --noEmit`).
- [x] **1.3. CORE Directory Structure:** `src/api/`, `src/components/` (`ui/`, `layout/`, `product/`, `cart/`), `src/context/`, `src/hooks/`, `src/models/`, `src/pages/`, `src/routes/`, `src/types/`, `src/utils/`.

#### Epic 2: CORE Data Models and Basic API

_Estimate: 3 hrs · Week 1 · Tier: CORE (PRD Step: 3)_

- [x] **2.1. CORE TypeScript Interfaces (`src/types/`):**
- `api.ts`: `AsyncState`.
- `product.ts`: `Product` , `ProductsResponse` (`products`, `total`, `skip`, `limit`), `Category`.
- `user.ts`: `AuthUser` (`username: string`, `isLoggedIn: boolean`), `LoginFormValues`.
- `cart.ts`: `CartItem` (`productId`, `title`, `thumbnail`, `price`, `discountPercentage`, `stock`, `quantity`), `CartState` (`items: CartItem[]`).
- `order.ts`: `ShippingInfo` (`fullName`, `email`, `address`, `city`),`OrderStatus`,`Order`.
- [ ] **2.2. Helper Utilities (`src/utils/format.ts`):**
  - `discountedPrice(price, discountPercentage)` — Formula: $price \times (1 - discountPercentage / 100)$.
  - `formatPrice(amount)` — `Intl.NumberFormat` (`$1,299.00`).
- [ ] **2.3. Baseline Products API (`src/api/products.api.ts`):**
  - `fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse>`
  - `fetchProductById(id: number): Promise<Product>`

#### Epic 3: Routing, Layout and Global Components (P0)

_Estimate: 4 hrs · Week 1 · Tier: CORE (PRD Step: 4)_

- [ ] **3.1. Routing Setup (`src/routes/AppRoutes.tsx`):** Single `BrowserRouter` and shared `Layout` (with `<Outlet />`). Routes: `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`.
- [ ] **3.2. `ScrollToTop` Component:** `useLocation` + `useEffect` -> `window.scrollTo(0, 0)` on route changes.
- [ ] **3.3. `Header` and `Footer` (`src/components/layout/`):**
  - Brand logo "10X Shop" (`/`), `NavLink` with active states (`Catalog`, `Cart`).
  - Cart badge displaying `Σ quantity` (hidden when count is 0).
  - Login / Logout button and mobile-friendly menu (for screens ≤ 480px).
- [ ] **3.4. Reusable UI Component with `children`:** e.g., `Container` or `CardWrapper` (`PropsWithChildren`) to fulfill the React composition criteria.
- [ ] **3.5. `NotFoundPage` (`*`):** Title "Page not found", text "The page you are looking for does not exist.", button "Go to catalog" (`/`).

#### Epic 4: Auth Simulation and Protected Route (P1)

_Estimate: 3 hrs · Week 1 · Tier: CORE (PRD Steps: 5, 6)_

- [ ] **4.1. `AuthContext` (`src/context/AuthContext.tsx`):** `user` state, `login(username)` and `logout()` (Logout preserves cart items and redirects to `/`).
- [ ] **4.2. `LoginPage` (`/login`):**
  - Controlled form (`useState`, `onChange`, `onSubmit` + `preventDefault`).
  - Strict validation: empty input -> `Username is required`, password (< 6 chars) -> `Password is required` / `Password must be at least 6 characters`.
  - Link "← Back to catalog" (`/`).
- [ ] **4.3. `ProtectedRoute` (for `/checkout`):** Redirect guest users to `/login` with location state (`state={{ from: location }}`), returning to `/checkout` after login.

#### Epic 5: Catalog and Product Cards (P2 - CORE)

_Estimate: 5 hrs · Week 1 · Tier: CORE (PRD Steps: 7, 8)_

- [ ] **5.1. `CatalogPage` (`/`):** Fetch 12 products via `useEffect`; conditional rendering of Loading, Error, and Empty (`No products found.`) states.
- [ ] **5.2. `ProductCard` (`src/components/product/ProductCard.tsx`):**
  - Image (`loading="lazy"`, `width`, `height`, `alt`), title, category · brand, rating (`★ 4.7`).
  - Discounted price + struck-through original price + discount badge `-X%` (if `discountPercentage >= 1`).
  - Stock indicator: `In stock` (>5), `Only N left!` (1–5, orange badge), `Out of stock` (0, red badge + disabled button).
  - "Add to cart" button and card click navigation to `/products/:id`.
- [ ] **5.3. `ProductGrid`:** `map()` rendering with stable `key={product.id}`, Tailwind responsive grid (Mobile: 1 column, Tablet: 2–3, Desktop: 4).

#### Epic 6: Product Details Page (P3 - CORE)

_Estimate: 4 hrs · Week 2 · Tier: CORE (PRD Steps: 10, 11)_

- [ ] **6.1. `ProductPage` (`/products/:id`):**
  - Read `useParams()`; if `id` is not a positive integer (`/products/abc`) or API returns 404 (`/products/999999`) -> render `NotFoundPage` cleanly without crashing.
  - Required dependency `[id]` in `useEffect`.
- [ ] **6.2. Gallery and Interaction:**
  - Thumbnail selector to swap main image (`useState`).
  - Quantity stepper (`-` / `+`) bounded by `1 <= qty <= stock`.
  - "Add to cart" button with inline confirmation feedback and "← Back to catalog" button (`navigate(-1)`).

#### Epic 7: Cart System and Cart Page (P4 - CORE)

_Estimate: 5 hrs · Week 2 · Tier: CORE (PRD Steps: 12, 13)_

- [ ] **7.1. `CartContext` (`src/context/CartContext.tsx`):**
  - Immutable operations: `addItem`, `removeItem`, `updateQuantity` (`1 <= qty <= stock`), `clearCart`.
  - Synchronization with `localStorage` (key: `shop_cart`).
- [ ] **7.2. `CartPage` (`/cart`):**
  - Line items list: thumbnail, title (linked to product), unit discounted price, stepper, subtotal per line, `Remove` and `Clear cart` (with confirmation).
  - Order Summary: Subtotal, Total, and "Proceed to checkout" button (`/checkout`).
  - Empty cart state: "Your cart is empty." + link "Browse products" (`/`).

#### Epic 8: Checkout and Order Confirmation (P5 - CORE)

_Estimate: 4 hrs · Week 2 · Tier: CORE (PRD Steps: 14, 15, 16)_

- [ ] **8.1. `CheckoutPage` (`/checkout`):** Redirect to `/cart` if the cart is empty.
- [ ] **8.2. Controlled Shipping Form and Validation:**
  - 4 required fields (`useState`):
    - `Full name` (min. 3 chars -> `Full name must be at least 3 characters`)
    - `Email` (format verification -> `Please enter a valid email address`)
    - `Address` (min. 5 chars -> `Address must be at least 5 characters`)
    - `City` (required -> `City is required`)
- [ ] **8.3. Order Simulation:**
  - On valid submission, disable "Place order" button to prevent duplicate submissions.
  - Render confirmation screen: "Thank you! Your order has been placed." + summary of order details.
  - Clear the cart (`clearCart()`).

#### Epic 9: Tailwind CSS v4, Responsive, Error Boundary, and Debugging (O2, O3, TW)

_Estimate: 5 hrs · Week 3 · Tier: CORE (PRD Steps: 19, 20, 21, 22)_

- [ ] **9.1. Responsive & Interactive States:** Verification across 375px to 1440px (zero horizontal scrolling, touch targets ≥ 44px); interactive states (`hover:`, `focus-visible:`, `disabled:`) on all buttons and inputs.
- [ ] **9.2. Class-based `ErrorBoundary` (`src/components/common/ErrorBoundary.tsx`):** `getDerivedStateFromError` + `componentDidCatch`, fallback UI: "Something went wrong." + "Reload" button.
- [ ] **9.3. `DEBUG-LOG.md` (CORE minimum 3 bugs):** Document real bugs using format: _Symptom → Reproduction → Tool → Root Cause → Fix (commit) → Lesson Learned_.

#### Epic 10: Build, Deploy, and CORE Documentation (D2, D3)

_Estimate: 4 hrs · Week 3 · Tier: CORE (PRD Steps: 23, 24, 25, 28)_

- [ ] **10.1. Full Verification:** `npm run typecheck` (0 errors), `npm run lint` (0 `any`, 0 `console.log`), `npm run build`.
- [ ] **10.2. Deployment & SPA Rewrites:** Deploy to Vercel (`vercel.json`) or Netlify (`public/_redirects`), ensuring direct URL refresh (`/products/5`) returns 200 rather than 404.
- [ ] **10.3. Documentation:** `README.md` (in English) and `REPORT.md`.

---

### 🚀 Phase 2: FULL and BONUS Functionality (Advanced Tier — After CORE Completion)

#### Epic 11: TypeScript OOP Architecture, Generics, and Custom Hooks (T2–T4)

_Estimate: 6 hrs · Weeks 2–3 · Tier: FULL (PRD Step: 27)_

- [ ] **11.1. OOP Classes (`src/api/`, `src/models/`):**
  - `ApiError extends Error` (with status code and message).
  - `ApiClient` (`private readonly baseUrl`, generic `get<T>(path, signal)` and `post<T, B>()`).
  - `StorageService<T>` (`get()`, `set()`, `remove()` wrapped in `try/catch` for `localStorage`).
  - `Cart implements ICart` (discount calculation, free shipping threshold `FREE_SHIPPING_FROM = 100`, total calculations).
  - `Order` class (`static create()`, `getStatus(now)`).
- [ ] **11.2. Advanced Types & Guards:**
  - Discriminated unions: `AsyncState<T>` and `CartAction` (with exhaustive `never` check in `cartReducer`).
  - Type Guards: `isApiError(e: unknown): e is ApiError`, `isProduct(x: unknown): x is Product`.
  - Utility Types: `Pick` / `Omit` / `Partial` and `STORAGE_KEYS` (`as const`).
- [ ] **11.3. Custom Hooks (`src/hooks/`):** `useDebounce<T>(value, 400)`, `useLocalStorage<T>`, `useFetch<T>`.

#### Epic 12: Advanced Catalog, Product, and Cart (P2–P4 FULL)

_Estimate: 7 hrs · Weeks 2–3 · Tier: FULL (PRD Steps: 9, 17)_

- [ ] **12.1. Catalog Toolbar and URL State (`useSearchParams`):**
  - Search query (`?q=...`, 400ms debounce + `AbortController` in useEffect cleanup).
  - Category filter (`GET /products/categories`, `?category=slug`, mutual exclusion between search & category).
  - Sorting with 5 options (`price-asc`, `price-desc`, `rating-desc`, `title-asc`).
  - Pagination (`?page=N`, `limit=12`, text indicator "Showing 13–24 of 194").
  - Skeleton loading cards and `Retry` button on error.
- [ ] **12.2. Product Reviews & Related Products (`P3.4`, `P3.5`):**
  - Description / Reviews tabs; add review form (Rating 1–5, Comment min. 10 chars) -> save to `shop_reviews` + recalculate average rating via `useMemo`.
  - Related Products: 4 items from the same category rendered using the standard `ProductCard`.
- [ ] **12.3. Promo Code & Cart Reducer (`P4.2`, `P4.4`):**
  - `cartReducer` (`ADD_ITEM`, `SET_QTY`, `REMOVE_ITEM`, `CLEAR`, `APPLY_PROMO`, `REMOVE_PROMO`).
  - Promo code `10X10` (case-insensitive, 10% discount) and error message `Invalid promo code`.

#### Epic 13: Orders, Profile, Formik+Yup, and Dark Mode (P1, P6, P7, TW5–TW6)

_Estimate: 7 hrs · Week 3 · Tier: FULL / BONUS (PRD Step: 18)_

- [ ] **13.1. Formik + Yup Login Extension (`P1 FULL`):** `useFormik` and `Yup.object()` schema validating `username` and `password` (min. 6 characters).
- [ ] **13.2. Orders Pages (`/orders`, `/orders/:id`):**
  - Persist order history in `shop_orders` (`#10X-00001`).
  - Time-based status progression (`<1 min` Processing -> `1–3 min` Shipped -> `>3 min` Delivered) using a 30s `setInterval` with proper cleanup.
  - `Reorder` action button (re-adds items to cart).
- [ ] **13.3. Profile Page (`/profile`):**
  - Controlled form (First name, Last name, Email, Phone) with validation.
  - "Clear local data" button (clears cart, orders, and reviews, while preserving session and theme).
- [ ] **13.4. Tailwind `@theme` and Dark Mode (`ThemeContext`):**
  - Custom design tokens configured via `@theme`.
  - Dark / Light mode toggle in Header and Profile (`shop_theme` in localStorage).

#### Epic 14: Performance Audit, Compatibility, and FULL Process (O1, O3, D1–D3)

_Estimate: 8 hrs · Week 3 · Tier: FULL (PRD Steps: 26, 27)_

- [ ] **14.1. Code Splitting & Memoization:** Route-level `React.lazy()` + `<Suspense>`; `React.memo(ProductCard)` and `useCallback` verified via React Profiler.
- [ ] **14.2. Lighthouse & Compatibility:**
  - Lighthouse Mobile audit in incognito (Performance ≥ 85, A11y ≥ 90, Best Practices ≥ 90, CLS < 0.1); screenshots in `docs/lighthouse/before.png` and `after.png`.
  - `COMPATIBILITY.md` matrix (Chrome, Firefox, Safari/Edge × Desktop/Mobile) with screenshots in `docs/compat/`.
  - Populate `DEBUG-LOG.md` with 5 authentic resolved bugs (Network, TS, Re-render, Routing/Deploy).
- [ ] **14.3. GitHub Project Management & Video:**
  - GitHub Projects board, 20+ Issues with module labels, 8+ PRs, 3 progress notes (`docs/progress/week-1..3.md`).
  - 2–3 minute Demo Video recording linked in `README.md`.

---

## 4. Risk Analysis and Mitigation Strategies (Risks & Mitigations)

| #      | Risk Description                                                  | Severity | Mitigation Strategy                                                                                                                    |
| :----- | :---------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **R1** | **DummyJSON API downtime or rate limiting during defense**        | High     | Prepare local `mockProducts.json` fallback in `src/api/`; automatically switch to mock data or prompt with `Retry` on network failure. |
| **R2** | **Scope creep into FULL features leaving CORE incomplete**        | High     | Strict phased workflow: Epic 1–10 (CORE) must be 100% complete and deployed before any FULL code is introduced.                        |
| **R3** | **SPA 404 error when refreshing direct URLs (`/products/5`)**     | High     | Deploy `vercel.json` rewrites or `public/_redirects` from day one, validating route refreshing in live environments.                   |
| **R4** | **Race conditions during rapid search and filter queries**        | Medium   | Use `useDebounce(400ms)` and `AbortController` inside `useEffect` cleanup to cancel obsolete in-flight requests.                       |
| **R5** | **Accumulation of TypeScript strict errors prior to final build** | Medium   | Run `npm run typecheck` before each commit/PR; enforce strict typing and ban `any` using ESLint.                                       |

---

## 5. Definition of Done (DoD)

A task or GitHub Issue is considered complete only when:

1. **Acceptance Criteria:** Feature strictly satisfies the requirements, Measurable Outcomes, and exact validation copy in Annex A.
2. **Type Safety:** `npm run typecheck` (`tsc --noEmit`) and `npm run lint` pass with **0 errors** (no `any`, no orphaned `console.log`).
3. **Build:** `npm run build` succeeds cleanly without warnings.
4. **Responsive & A11y:** Layout renders seamlessly from 375px to Desktop without horizontal scroll; interactive elements have semantic tags, accessible labels/alt attributes, and clear `hover`/`focus`/`disabled` states.
5. **Git Flow:** Changes are recorded in a meaningful commit message (`feat:`, `fix:`, `refactor:`, `docs:`) and linked to the corresponding GitHub Issue.
