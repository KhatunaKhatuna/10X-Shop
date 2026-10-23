# 📋 10X Shop — სამუშაო პროცესის გეგმა (PLAN.md)

> **პროექტი:** „10X Shop“ — თანამედროვე ელექტრონული კომერციის SPA პლატფორმა  
> **სტუდენტი:** ხათუნა ჩიტიშვილი (Khatuna Chitishvili)  
> **ტექნოლოგიური სტეკი:** React 19, TypeScript (Strict), Tailwind CSS v4, Vite, React Router, DummyJSON API  
> **ვერსია:** 1.1 · 2026 წლის ნაკადი  
> **საბოლოო ჩაბარების ვადა:** 2026 წლის 06 ნოემბერი, 23:59 (საქართველოს დროით)  
> **თეორიული ტესტი:** 2026 წლის 05 ნოემბერი · **პროექტის დაცვა:** 2026 წლის 07–08 ნოემბერი

---

## 1. პროექტის მიზანი და მასშტაბი (Scope by Modules)

პროექტის მიზანია სწრაფი, მდგრადი და სრულად ტიპიზებული E-commerce Single Page Application (SPA) შექმნა **DummyJSON API**-ის ბაზაზე.
**მთავარი პრინციპი:** პირველ ეტაპზე სრულდება **მხოლოდ CORE** ფუნქციონალი (100%-იანი გამართულობით), ხოლო შემდეგ ემატება **FULL / BONUS** მოდულები.

| მოდული                   | CORE Scope (სავალდებულო მინიმუმი)                                                                                                                                                           | FULL / BONUS Scope (მაღალი შეფასების ზონა)                                                                                                                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**                | ფუნქციური კომპონენტები, Props & `children`, `useState`/`useEffect`, `map()` + სტაბილური `key`, React Router, `AuthContext`, `CartContext`, Controlled Login & Checkout ფორმები.             | Custom hooks (`useDebounce`, `useFetch`, `useLocalStorage`), `useReducer` კალათისთვის, Formik + Yup (Login), Reviews, Related Products, Promo code (`10X10`), Orders & Profile გვერდები.                              |
| **TypeScript**           | `"strict": true`, `tsc --noEmit` (0 errors), `no-explicit-any`, CORE მოდელების (`Product`, `CartItem`, `AuthUser`, `ShippingInfo`) და Props/State-ის სრული ტიპიზაცია.                       | Generics (`AsyncState<T>`, `StorageService<T>`), Discriminated Unions (`CartAction`), Type Guards (`isApiError`, `isProduct`), Utility Types (`Pick`/`Omit`), OOP კლასები (`ApiClient`, `ApiError`, `Cart`, `Order`). |
| **Tailwind CSS**         | Tailwind v4 ინტეგრაცია (`@tailwindcss/vite`), Utility-first სტილიზაცია, Flexbox/Grid, Mobile-first (375px-დან ჰორიზონტალური სქროლის გარეშე), `hover:`, `focus:`, `disabled:` მდგომარეობები. | Custom design tokens (`@theme`), `@utility` / `@layer`, Dark / Light თემის გადამრთველი (`ThemeContext` + `shop_theme`).                                                                                               |
| **ოპტიმიზაცია & QA**     | Responsive 3 breakpoint-ზე, Loading/Error/Empty მდგომარეობები, კლასური `ErrorBoundary`, `DEBUG-LOG.md` (მინ. 3 ბაგი), სურათებზე `alt` და `loading="lazy"`.                                  | Route-level `React.lazy` & `Suspense`, `AbortController` ძებნაზე, გონივრული მემოიზაცია (`React.memo`, `useMemo`), Lighthouse აუდიტი (Before/After სქრინებით), `COMPATIBILITY.md`, `DEBUG-LOG.md` (5 ბაგი).            |
| **პროცესი (Git & Docs)** | საჯარო რეპოზიტორია, `PLAN.md`, `README.md` (EN), `REPORT.md`, შინაარსიანი Git ისტორია, Live Deploy (Vercel/Netlify) SPA rewrite-ით.                                                         | GitHub Projects დაფა, 20+ Issue (ლეიბლებით), 8+ PR, 40+ commit (15 სხვადასხვა დღეს), 3 ყოველკვირეული progress note (`docs/progress/`), 2-3 წთ დემო ვიდეო.                                                             |

---

## 2. სამკვირიანი განრიგი და დროითი შეფასება (WBS Summary)

| კვირა       | პერიოდი         | ფოკუსი და ძირითადი მიწოდებადი შედეგები (Deliverables)                                                                                                                                                                                         | საათები    |
| :---------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| **კვირა 1** | 17–23 ოქტომბერი | **CORE ფუნდამენტი:** Setup, `PLAN.md`, CORE Types, Layout/Router, `AuthContext` & Login, Catalog (`GET /products`), `ProductCard`/`ProductGrid`. _(progress/week-1.md)_                                                                       | ~20 სთ     |
| **კვირა 2** | 24–30 ოქტომბერი | **CORE ტრანზაქციები + FULL არქიტექტურა:** Product Details, `CartContext` (`shop_cart`), Cart გვერდი, Checkout & Confirmation. შემდეგ: OOP კლასები, Search/Filter/Sort/Pagination, Reviews & Promo. _(progress/week-2.md)_                     | ~24 სთ     |
| **კვირა 3** | 31 ოქტ – 06 ნოე | **FULL გვერდები, ოპტიმიზაცია და ჩაბარება:** Orders, Profile, Formik+Yup, Theme, Responsive დასრულება, `ErrorBoundary`, Lazy Loading, Lighthouse, `DEBUG-LOG.md`, `COMPATIBILITY.md`, Deploy, `README.md`, `REPORT.md`. _(progress/week-3.md)_ | ~24 სთ     |
| **სულ**     | **3 კვირა**     | **სრული CORE + FULL ფუნქციონალი**                                                                                                                                                                                                             | **~68 სთ** |

---

## 3. დეტალური სამუშაო გეგმა (Checklist by Epics)

### 🟢 ფაზა 1: CORE ფუნქციონალი (უმაღლესი პრიორიტეტი)

#### Epic 1: გარემოს გამართვა და ინფრასტრუქტურა (Setup & Tooling)

_შეფასება: 3 სთ · კვირა 1 · დონე: CORE (PRD ნაბიჯები: 1, 2)_

- [x] **1.1. პროექტის ინიციალიზაცია:** Vite + React 19 + TypeScript შაბლონი; Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";`).
- [x] **1.2. კონფიგურაცია და სკრიპტები:** `tsconfig.app.json`-ში `"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`. ESLint-ში `@typescript-eslint/no-explicit-any: error`. სკრიპტები: `dev`, `build`, `preview`, `lint`, `typecheck` (`tsc --noEmit`).
- [x] **1.3. CORE ფოლდერების სტრუქტურა:** `src/api/`, `src/components/` (`ui/`, `layout/`, `product/`, `cart/`), `src/context/`, `src/hooks/`, `src/models/`, `src/pages/`, `src/routes/`, `src/types/`, `src/utils/`.

#### Epic 2: CORE მონაცემთა მოდელები და საბაზისო API

_შეფასება: 3 სთ · კვირა 1 · დონე: CORE (PRD ნაბიჯი: 3)_

- [x] **2.1. CORE TypeScript ინტერფეისები (`src/types/`):**
  - `api.ts`: `AsyncState`.
  - `product.ts`: `Product`, `ProductsResponse` (`products`, `total`, `skip`, `limit`), `Category`.
  - `user.ts`: `AuthUser` (`username: string`, `isLoggedIn: boolean`), `LoginFormValues`.
  - `cart.ts`: `CartItem` (`productId`, `title`, `thumbnail`, `price`, `discountPercentage`, `stock`, `quantity`), `CartState` (`items: CartItem[]`).
  - `order.ts`: `ShippingInfo` (`fullName`, `email`, `address`, `city`),`OrderStatus`,`Order`.
- [ ] **2.2. დამხმარე ფუნქციები (`src/utils/format.ts`):**
  - `discountedPrice(price, discountPercentage)` — ფორმულა: $price \times (1 - discountPercentage / 100)$.
  - `formatPrice(amount)` — `Intl.NumberFormat` (`$1,299.00`).
- [ ] **2.3. პროდუქტების საბაზისო API (`src/api/products.api.ts`):**
  - `fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse>`
  - `fetchProductById(id: number): Promise<Product>`

#### Epic 3: Routing, Layout და გლობალური კომპონენტები (P0)

_შეფასება: 4 სთ · კვირა 1 · დონე: CORE (PRD ნაბიჯი: 4)_

- [x] **3.1. მარშრუტიზაცია (`src/routes/AppRoutes.tsx`):** ერთი `BrowserRouter` და საერთო `Layout` (`<Outlet />`-ით). მარშრუტები: `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, `*`.
- [x] **3.2. `ScrollToTop` კომპონენტი:** `useLocation` + `useEffect` -> `window.scrollTo(0, 0)` მარშრუტის შეცვლისას.
- [x] **3.3. `Header` და `Footer` (`src/components/layout/`):**
  - ბრენდის ლოგო „10X Shop“ (`/`), `NavLink` აქტიური სტილით (`Catalog`, `Cart`).
  - კალათის ბეჯი (`Σ quantity`, 0-ზე იმალება).
  - Login / Logout ღილაკი და მობილურზე (≤ 480px) ადაპტირებული მენიუ.
- [x] **3.4. Reusable UI კომპონენტი `children`-ით:** მაგ. `Container` ან `CardWrapper` (`PropsWithChildren`) React კომპოზიციის მოთხოვნის დასაკმაყოფილებლად.
- [x] **3.5. `NotFoundPage` (`*`):** სათაური „Page not found“, ტექსტი „The page you are looking for does not exist.“, ღილაკი „Go to catalog“ (`/`).

#### Epic 4: ავტორიზაციის სიმულაცია და დაცული მარშრუტი (P1)

_შეფასება: 3 სთ · კვირა 1 · დონე: CORE (PRD ნაბიჯები: 5, 6)_

- [ ] **4.1. `AuthContext` (`src/context/AuthContext.tsx`):** `user` state, `login(username)` და `logout()` (Logout არ შლის კალათას და აბრუნებს `/`-ზე).
- [ ] **4.2. `LoginPage` (`/login`):**
  - Controlled form (`useState`, `onChange`, `onSubmit` + `preventDefault`).
  - ზუსტი ვალიდაცია: ცარიელ ველზე `Username is required`, პაროლზე (< 6 სიმბოლო) `Password is required` / `Password must be at least 6 characters`.
  - ბმული „← Back to catalog“ (`/`).
- [ ] **4.3. `ProtectedRoute` (`/checkout`-ისთვის):** სტუმრის გადამისამართება `/login`-ზე (`state={{ from: location }}`), ხოლო შესვლის შემდეგ უკან `/checkout`-ზე დაბრუნება.

#### Epic 5: კატალოგი და პროდუქტის ბარათი (P2 - CORE)

_შეფასება: 5 სთ · კვირა 1 · დონე: CORE (PRD ნაბიჯები: 7, 8)_

- [ ] **5.1. `CatalogPage` (`/`):** `useEffect`-ით 12 პროდუქტის ჩამოტვირთვა; Loading, Error და Empty (`No products found.`) მდგომარეობების conditional rendering.
- [ ] **5.2. `ProductCard` (`src/components/product/ProductCard.tsx`):**
  - სურათი (`loading="lazy"`, `width`, `height`, `alt`), სათაური, კატეგორია · ბრენდი, რეიტინგი (`★ 4.7`).
  - ფასდაკლებული ფასი + საწყისი გადახაზული + ბეჯი `-X%` (თუ `discountPercentage >= 1`).
  - მარაგის სტატუსი: `In stock` (>5), `Only N left!` (1–5, ნარინჯისფერი), `Out of stock` (0, წითელი + disabled ღილაკი).
  - ღილაკი „Add to cart“ და ბარათზე კლიკით გადასვლა `/products/:id`-ზე.
- [ ] **5.3. `ProductGrid`:** `map()` და `key={product.id}`, Tailwind responsive grid (Mobile: 1 სვეტი, Tablet: 2–3, Desktop: 4).

#### Epic 6: პროდუქტის დეტალური გვერდი (P3 - CORE)

_შეფასება: 4 სთ · კვირა 2 · დონე: CORE (PRD ნაბიჯები: 10, 11)_

- [ ] **6.1. `ProductPage` (`/products/:id`):**
  - `useParams()`-ის წაკითხვა; თუ `id` არაა დადებითი მთელი რიცხვი (`/products/abc`) ან API აბრუნებს 404-ს (`/products/999999`) -> `NotFoundPage` აპლიკაციის დაქრაშვის გარეშე.
  - `useEffect` dependency-ში `[id]`-ის აუცილებელი მითითება.
- [ ] **6.2. გალერეა და ინტერაქცია:**
  - მთავარი ფოტოს შეცვლა thumbnail-ზე დაჭერით (`useState`).
  - რაოდენობის stepper (`-` / `+`) საზღვრებით `1 <= qty <= stock`.
  - „Add to cart“ ღილაკი inline დადასტურებით და ბმული „← Back to catalog“ (`navigate(-1)`).

#### Epic 7: კალათის სისტემა და Cart გვერდი (P4 - CORE)

_შეფასება: 5 სთ · კვირა 2 · დონე: CORE (PRD ნაბიჯები: 12, 13)_

- [ ] **7.1. `CartContext` (`src/context/CartContext.tsx`):**
  - Immutable ოპერაციები: `addItem`, `removeItem`, `updateQuantity` (`1 <= qty <= stock`), `clearCart`.
  - სინქრონიზაცია `localStorage`-თან (`shop_cart` გასაღებით).
- [ ] **7.2. `CartPage` (`/cart`):**
  - ნივთების სია: ფოტო, სათაური (ბმულით პროდუქტზე), ერთეულის ფასდაკლებული ფასი, stepper, ხაზის ჯამი, `Remove` და `Clear cart` (დადასტურებით).
  - Order Summary: Subtotal, Total და ღილაკი „Proceed to checkout“ (`/checkout`).
  - ცარიელი კალათა: „Your cart is empty.“ + ბმული „Browse products“ (`/`).

#### Epic 8: Checkout და შეკვეთის დადასტურება (P5 - CORE)

_შეფასება: 4 სთ · კვირა 2 · დონე: CORE (PRD ნაბიჯები: 14, 15, 16)_

- [ ] **8.1. `CheckoutPage` (`/checkout`):** ცარიელი კალათის შემთხვევაში გადამისამართება `/cart`-ზე.
- [ ] **8.2. Controlled Shipping Form და ვალიდაცია:**
  - 4 სავალდებულო ველი (`useState`):
    - `Full name` (მინ. 3 სიმბოლო -> `Full name must be at least 3 characters`)
    - `Email` (ფორმატის შემოწმება -> `Please enter a valid email address`)
    - `Address` (მინ. 5 სიმბოლო -> `Address must be at least 5 characters`)
    - `City` (სავალდებულო -> `City is required`)
- [ ] **8.3. შეკვეთის სიმულაცია:**
  - ვალიდურ submit-ზე „Place order“ ღილაკის დაბლოკვა (ორმაგი კლიკის თავიდან ასაცილებლად).
  - ეკრანზე „Thank you! Your order has been placed.“ + შეკვეთის ჯამისა და დეტალების ჩვენება.
  - კალათის გასუფთავება (`clearCart()`).

#### Epic 9: Tailwind CSS v4, Responsive, Error Boundary და Debugging (O2, O3, TW)

_შეფასება: 5 სთ · კვირა 3 · დონე: CORE (PRD ნაბიჯები: 19, 20, 21, 22)_

- [ ] **9.1. Responsive & Interactive States:** 375px-დან 1440px-მდე ტესტირება (0 ჰორიზონტალური სქროლი, ღილაკები ≥ 44px); ყველა ინტერაქტიულ ელემენტზე `hover:`, `focus-visible:`, `disabled:`.
- [ ] **9.2. კლასური `ErrorBoundary` (`src/components/common/ErrorBoundary.tsx`):** `getDerivedStateFromError` + `componentDidCatch`, fallback UI: „Something went wrong.“ + ღილაკი „Reload“.
- [ ] **9.3. `DEBUG-LOG.md` (CORE მინიმუმ 3 ბაგი):** რეალური ხარვეზების აღწერა ფორმატით: _სიმპტომი → რეპროდუქცია → ინსტრუმენტი → მიზეზი → ფიქსი (commit) → რა ვისწავლე_.

#### Epic 10: Build, Deploy და CORE დოკუმენტაცია (D2, D3)

_შეფასება: 4 სთ · კვირა 3 · დონე: CORE (PRD ნაბიჯები: 23, 24, 25, 28)_

- [ ] **10.1. სრული შემოწმება:** `npm run typecheck` (0 შეცდომა), `npm run lint` (0 `any`, 0 `console.log`), `npm run build`.
- [ ] **10.2. Deployment & SPA Rewrite:** Vercel (`vercel.json`) ან Netlify (`public/_redirects`), რათა `/products/5` პირდაპირ refresh-ზე არ აბრუნებდეს 404-ს.
- [ ] **10.3. დოკუმენტაცია:** `README.md` (ინგლისურად) და `REPORT.md`.

---

### 🚀 ფაზა 2: FULL და BONUS ფუნქციონალი (მაღალი ქულის ზონა — CORE-ის დასრულების შემდეგ)

#### Epic 11: TypeScript OOP არქიტექტურა, Generics და Custom Hooks (T2–T4)

_შეფასება: 6 სთ · კვირა 2–3 · დონე: FULL (PRD ნაბიჯი: 27)_

- [ ] **11.1. OOP კლასები (`src/api/`, `src/models/`):**
  - `ApiError extends Error` (სტატუს კოდით და მესიჯით).
  - `ApiClient` (`private readonly baseUrl`, generic `get<T>(path, signal)` და `post<T, B>()`).
  - `StorageService<T>` (`get()`, `set()`, `remove()` `try/catch`-ით `localStorage`-ისთვის).
  - `Cart implements ICart` (ფასდაკლების, უფასო მიწოდების `FREE_SHIPPING_FROM = 100` და ჯამების კალკულაცია).
  - `Order` კლასი (`static create()`, `getStatus(now)`).
- [ ] **11.2. Advanced Types & Guards:**
  - Discriminated unions: `AsyncState<T>` და `CartAction` (`never` exhaustive check-ით `cartReducer`-ში).
  - Type Guards: `isApiError(e: unknown): e is ApiError`, `isProduct(x: unknown): x is Product`.
  - Utility Types: `Pick` / `Omit` / `Partial` და `STORAGE_KEYS` (`as const`).
- [ ] **11.3. Custom Hooks (`src/hooks/`):** `useDebounce<T>(value, 400)`, `useLocalStorage<T>`, `useFetch<T>`.

#### Epic 12: გაფართოებული კატალოგი, პროდუქტი და კალათა (P2–P4 FULL)

_შეფასება: 7 სთ · კვირა 2–3 · დონე: FULL (PRD ნაბიჯები: 9, 17)_

- [ ] **12.1. კატალოგის Toolbar და URL State (`useSearchParams`):**
  - ძებნა (`?q=...`, 400ms debounce + `AbortController` useEffect cleanup-ში).
  - კატეგორიების ფილტრი (`GET /products/categories`, `?category=slug`, ძებნა და კატეგორია ურთიერთგამომრიცხავია).
  - სორტირება 5 ვარიანტით (`price-asc`, `price-desc`, `rating-desc`, `title-asc`).
  - პაგინაცია (`?page=N`, `limit=12`, ტექსტი „Showing 13–24 of 194“).
  - Skeleton ჩატვირთვის ბარათები და `Retry` ღილაკი შეცდომისას.
- [ ] **12.2. Product Reviews & Related Products (`P3.4`, `P3.5`):**
  - ტაბები Description / Reviews; შეფასების დამატების ფორმა (Rating 1–5, Comment მინ. 10 სიმბოლო) -> შენახვა `shop_reviews`-ში + საშუალო რეიტინგის გადათვლა `useMemo`-თი.
  - Related Products: იგივე კატეგორიის 4 პროდუქტის ჩვენება იგივე `ProductCard` კომპონენტით.
- [ ] **12.3. Promo Code & Cart Reducer (`P4.2`, `P4.4`):**
  - `cartReducer` (`ADD_ITEM`, `SET_QTY`, `REMOVE_ITEM`, `CLEAR`, `APPLY_PROMO`, `REMOVE_PROMO`).
  - პრომო კოდი `10X10` (case-insensitive, -10% ფასდაკლება) და შეცდომა `Invalid promo code`.

#### Epic 13: Orders, Profile, Formik+Yup და Dark Mode (P1, P6, P7, TW5–TW6)

_შეფასება: 7 სთ · კვირა 3 · დონე: FULL / BONUS (PRD ნაბიჯი: 18)_

- [ ] **13.1. Login-ის გაფართოება Formik + Yup-ით (`P1 FULL`):** `useFormik` და `Yup.object()` სქემა `username` და `password` (მინ. 6 სიმბოლო) ვალიდაციისთვის.
- [ ] **13.2. Orders გვერდები (`/orders`, `/orders/:id`):**
  - შეკვეთების შენახვა `shop_orders`-ში (`#10X-00001`).
  - დროზე დაფუძნებული სტატუსის სიმულაცია (`<1 წთ` Processing -> `1–3 წთ` Shipped -> `>3 წთ` Delivered) 30-წამიანი `setInterval`-ით და cleanup-ით.
  - ღილაკი `Reorder` (ნივთების კალათაში დაბრუნება).
- [ ] **13.3. Profile გვერდი (`/profile`):**
  - Controlled form (First name, Last name, Email, Phone) ვალიდაციით.
  - ღილაკი `Clear local data` (ასუფთავებს კალათას, შეკვეთებსა და შეფასებებს, ინარჩუნებს სესიასა და თემას).
- [ ] **13.4. Tailwind `@theme` და Dark Mode (`ThemeContext`):**
  - საკუთარი დიზაინ ტოკენების აღწერა `@theme`-ში.
  - Dark / Light გადამრთველი Header-სა და Profile-ში (`shop_theme` localStorage-ში).

#### Epic 14: წარმადობის აუდიტი, თავსებადობა და FULL პროცესი (O1, O3, D1–D3)

_შეფასება: 8 სთ · კვირა 3 · დონე: FULL (PRD ნაბიჯები: 26, 27)_

- [ ] **14.1. Code Splitting & Memoization:** ყველა გვერდის `React.lazy()` + `<Suspense>` ჩატვირთვა; `React.memo(ProductCard)` და `useCallback` პროფაილერით გადამოწმების შემდეგ.
- [ ] **14.2. Lighthouse & Compatibility:**
  - Lighthouse Mobile აუდიტი ინკოგნიტოში (Performance ≥ 85, A11y ≥ 90, Best Practices ≥ 90, CLS < 0.1); სქრინები `docs/lighthouse/before.png` და `after.png`.
  - `COMPATIBILITY.md` მატრიცა (Chrome, Firefox, Safari/Edge × Desktop/Mobile) სქრინებით `docs/compat/`-ში.
  - `DEBUG-LOG.md`-ის შევსება 5 რეალურ ბაგამდე (Network, TS, Re-render, Routing/Deploy).
- [ ] **14.3. GitHub Project Management & Video:**
  - GitHub Projects დაფა, 20+ Issue მოდულის ლეიბლებით, 8+ PR, 3 progress note (`docs/progress/week-1..3.md`).
  - 2–3 წუთიანი Demo Video-ს ჩაწერა და ბმულის განთავსება `README.md`-ში.

---

## 4. რისკების ანალიზი და პრევენციის ზომები (Risks & Mitigations)

| #      | რისკის აღწერა                                                       | გავლენა | პრევენცია და შემარბილებელი ზომა (Mitigation)                                                                                                   |
| :----- | :------------------------------------------------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **R1** | **DummyJSON API-ის მიუწვდომლობა ან შეფერხება დაცვის დროს**          | მაღალი  | `src/api/` ფენაში ლოკალური `mockProducts.json` fallback-ის მომზადება; ქსელური შეცდომისას ავტომატური გადართვა ან `Retry` მექანიზმის გამოყენება. |
| **R2** | **FULL ფუნქციონალზე გადაყოლა და CORE-ის დაუსრულებლობა**             | მაღალი  | მკაცრი ფაზირება: სანამ Epic 1–10 (CORE) 100%-ით არ დასრულდება და არ დაიდეპლოიდება, FULL ფუნქციების კოდირება არ იწყება.                         |
| **R3** | **SPA 404 შეცდომა პირდაპირი URL-ის (`/products/5`) გადატვირთვისას** | მაღალი  | პირველივე დეპლოიზე `vercel.json` rewrites ან `public/_redirects` ფაილის კონფიგურაცია და ლაივ გარემოში გადამოწმება.                             |
| **R4** | **Race Condition სწრაფი ძებნისა და ფილტრაციის დროს**                | საშუალო | `useDebounce(400ms)`-ისა და `AbortController`-ის გამოყენება `useEffect`-ის cleanup ფუნქციაში, რათა ძველმა რექვესთმა ახალი არ გადაფაროს.        |
| **R5** | **TypeScript Strict რეჟიმის შეცდომების დაგროვება ბილდის წინ**       | საშუალო | ყოველი კომპონენტისა და PR-ის წინ `npm run typecheck`-ის გაშვება; `any`-ის სრული აკრძალვა ESLint-ით.                                            |

---

## 5. შესრულების კრიტერიუმები (Definition of Done - DoD)

თითოეული ამოცანა (Task / Issue) ითვლება დასრულებულად მხოლოდ მაშინ, როდესაც:

1. **Acceptance Criteria:** ფუნქციონალი ზუსტად აკმაყოფილებს დანართი A-ს Measurable Outcome-სა და ვალიდაციის ტექსტებს.
2. **Type Safety:** `npm run typecheck` (`tsc --noEmit`) და `npm run lint` სრულდება **0 შეცდომით** (`any`-ის და `console.log`-ის გარეშე).
3. **Build:** `npm run build` წარმატებით გენერირებს საწარმოო პაკეტს.
4. **Responsive & A11y:** გვერდი გამართულია 375px-დან Desktop-მდე ჰორიზონტალური სქროლის გარეშე, ხოლო ინტერაქტიულ ელემენტებს აქვთ სემანტიკური ტეგები, `label`/`alt` და `hover`/`focus`/`disabled` სტილები.
5. **Git Flow:** ცვლილება ატვირთულია შინაარსიანი commit მესიჯით (`feat:`, `fix:`, `refactor:`, `docs:`) და მიბმულია შესაბამის GitHub Issue-ზე.
