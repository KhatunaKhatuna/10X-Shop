# 10X Shop — Modern E-Commerce SPA

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://10-x-shop-jade.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

> **Live Demo:** [https://10-x-shop-jade.vercel.app/](https://10-x-shop-jade.vercel.app/)  
> **Course:** Frontend Diploma Graduation Project 2026  
> **Author:** Khatuna Chitishvili

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Live Demo & Test Credentials](#-live-demo--test-credentials)
- [Key Features](#-key-features)
- [Architecture & Data Flow](#-architecture--data-flow)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Quality Assurance & Debugging](#-quality-assurance--debugging)
- [Author & Credits](#-author--credits)

---

## 🛍️ About the Project

**10X Shop** is a high-performance, responsive e-commerce Single Page Application (SPA) engineered with **React 19**, **TypeScript in strict mode**, and **Tailwind CSS v4**. Built as a graduation diploma project according to rigorous technical specifications (Annex A / დანართი A), the application provides a smooth, production-grade shopping journey: from product discovery and live stock indicators to persistent cart management, secure simulated authentication, and multi-step order checkout with instant confirmation.

---

## 🚀 Live Demo & Test Credentials

- **Production URL:** [https://10-x-shop-jade.vercel.app/](https://10-x-shop-jade.vercel.app/)
- **SPA Rewrites:** Fully configured (`vercel.json` & `public/_redirects`) — direct refreshes on any deep route (e.g., `/cart`, `/products/1`, `/checkout`) resolve seamlessly without 404 errors.

### 🔑 Test Authentication Credentials
The application implements client-side simulated authentication with strict validation:
- **Username:** `admin` or `khatuna` (accepts any Latin username)
- **Password:** `password123` (any string of at least 6 characters)
- *Note:* Inputs enforce Latin-only characters (`Only Latin characters are allowed`) to prevent keyboard layout conflicts.

---

## ✨ Key Features

### 🟢 CORE Features (100% Implemented)

1. **Global Architecture & Responsive Layout (`P0`):**
   - Clean application layout (`Header`, `<Outlet />`, `Footer`, `ScrollToTop`).
   - Custom 404 `NotFoundPage` with return-to-catalog routing.
   - Dynamic Header with Cart item counter badge and real-time Auth state (Username + Log out / Log in).
   - Class-based global **`ErrorBoundary`** with graceful fallback UI (`Something went wrong.`) and one-click reload.

2. **Authentication & Route Guarding (`P1` & `P0.2`):**
   - Centralized `AuthContext` with session persistence via `useLocalStorage` (`shop_user`).
   - Protected Route Guard (`ProtectedRoute`): unauthenticated visitors attempting to access `/checkout` are intercepted and redirected to `/login` with `state={{ from: location }}`.
   - Intelligent post-login redirect: returning authenticated users directly to their pending checkout.
   - Fully validated `LoginPage` powered by **Formik** and **Yup** (`loginSchema`).

3. **Product Catalog (`P2`):**
   - Live integration with DummyJSON REST API (`GET /products`).
   - High-fidelity `ProductCard`: responsive imagery (`loading="lazy"`), discount calculations, category/brand labeling, rating badges, and 3 distinct stock states (`In stock`, `Only N left!`, `Out of stock`).
   - Responsive grid (1 col mobile, 2-3 col tablet, 4 col desktop).
   - Dedicated Loading, Error (with retry), and Empty states.
   - URL-synchronized pagination (`Pagination`) preserving page index and scrolling to top smoothly.

4. **Product Details Page (`P3`):**
   - Deep route `/products/:id` with parameter validation and dedicated 404 fallback for non-existent items.
   - High-resolution image view, pricing breakdown with live discounts, and interactive quantity stepper.
   - "Add to cart" with inline feedback and stock limit enforcement.
   - Breadcrumb navigation and "← Back to catalog".

5. **Cart System (`P4`):**
   - Global `CartContext` synchronized with `localStorage` (`shop_cart`).
   - Line items with product thumbnail, title link, unit discount price, stepper, line subtotal, and removal.
   - "Clear Cart" with safety confirmation dialog (`window.confirm`).
   - Real-time Subtotal, Shipping threshold logic, and Order Total calculation.
   - Empty cart state with prominent "Browse products" call-to-action.

6. **Checkout & Order Confirmation (`P5`):**
   - Guarded checkout page preventing empty-cart direct access.
   - Controlled shipping form validated via **Yup** (`Full name`, `Email`, `Address`, `City`) with exact error messaging.
   - Double-submit prevention via `isSubmitting` button locking.
   - Sequential 5-digit order numbering (`#10X-00001`) saved to `localStorage` (`shop_orders`).
   - Comprehensive Confirmation view with itemized summary, delivery details, and "Continue Shopping" CTA.

---

## 🏗️ Architecture & Data Flow

```
10X-Shop/
├── public/
│   ├── _redirects              # Netlify SPA redirect rule (/* /index.html 200)
│   └── favicon.svg             # Custom 10X Shop SVG branding
├── src/
│   ├── api/                    # API client layer & DummyJSON endpoints
│   ├── components/
│   │   ├── common/             # ErrorBoundary, global architectural helpers
│   │   ├── layout/             # Header, Footer, MainLayout, MobileMenu, NavLinks, ScrollToTop
│   │   ├── product/            # ProductCard, ProductGrid
│   │   └── ui/                 # Container, EmptyState, ErrorState, Pagination, StarRating
│   ├── context/                # AuthContext, AuthProvider, CartContext, CartProvider, ThemeContext
│   ├── hooks/                  # useAuth, useCart, useFetch, useLocalStorage, useTheme
│   ├── pages/                  # CatalogPage, ProductPage, CartPage, CheckoutPage, LoginPage, NotFoundPage
│   ├── routes/                 # AppRoutes (React Router v7), ProtectedRoute
│   ├── schemas/                # Yup validation schemas (checkoutSchema, loginSchema)
│   ├── types/                  # Strict TypeScript models (Product, CartItem, AuthUser, Order, etc.)
│   ├── utils/                  # Storage helpers, formatting (price, dates), scroll utility
│   ├── App.tsx                 # Root component with ErrorBoundary & Context Providers
│   ├── index.css               # Tailwind CSS v4 directives & custom utilities
│   └── main.tsx                # Application DOM entry point
├── vercel.json                 # Vercel SPA routing rewrite configuration
├── package.json                # Dependencies, scripts, and build metadata
├── tsconfig.json               # TypeScript strict configuration
└── vite.config.ts              # Vite bundler configuration with @ path alias
```

### 🔄 Data Flow Summary
State flows unidirectionally in accordance with React 19 best practices:
- **Global Auth & Cart State:** Managed via React Context (`AuthProvider`, `CartProvider`) and synchronized with `localStorage` via custom generic hook `useLocalStorage<T>`.
- **Server State:** Fetched from DummyJSON via typed functions with abort controllers and loading/error discriminators.
- **Form State:** Orchestrated via `useFormik` using declarative Yup schemas (`yup.object({...})`) to decouple validation logic from rendering.
- **Route Guarding:** Intercepted at routing level using `ProtectedRoute` leveraging React Router 7's `useLocation` state to facilitate seamless return trips.

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | `^19.0.0` | UI Component rendering & Virtual DOM |
| **Language** | TypeScript | `^5.7.2` | Static typing in `"strict": true` mode |
| **Build Tool** | Vite | `^6.0.5` | Next-generation frontend tooling & HMR |
| **Styling** | Tailwind CSS | `^4.0.0` | Modern utility-first CSS engine |
| **Routing** | React Router | `^7.1.1` | Client-side declarative SPA routing |
| **Form Management** | Formik | `^2.4.9` | Controlled forms & submit lifecycle |
| **Validation** | Yup | `^1.7.1` | Schema-based object validation |
| **Icons** | Lucide React | `^0.468.0` | Accessible SVG icon suite |
| **Mock API** | DummyJSON | REST | Public e-commerce product catalog |
| **Deployment** | Vercel | Production | High-availability global edge hosting |

---

## 💻 Getting Started

### Prerequisites
- **Node.js:** `v18.0.0` or higher (recommended: LTS Node 20+)
- **Package Manager:** `npm` (included with Node.js)

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/KhatunaKhatuna/10X-Shop.git

# 2. Navigate to project root
cd 10X-Shop

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

The application will be running locally at `http://localhost:5173/`.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts local development server with instant HMR |
| `npm run build` | `tsc -b && vite build` | Type-checks code and generates optimized production build in `/dist` |
| `npm run preview` | `vite preview` | Locally serves the generated production build |
| `npm run typecheck` | `tsc -b` | Runs TypeScript compiler validation (0 errors required) |
| `npm run lint` | `eslint .` | Lints codebase for code style and unused variables |

---

## 🧪 Quality Assurance & Debugging

- **TypeScript Strictness:** Fully typed with `"noImplicitAny": true`, `"strict": true`, and 0 `any` bypasses.
- **Production Cleanliness:** 0 leftover `console.log` statements in shipping code.
- **Incident & Bug Documentation:** See [DEBUG-LOG.md](DEBUG-LOG.md) for 6 documented real-world bugs and architectural edge-cases resolved during development using the required format:
  *Symptom → Reproduction → Tool Used → Root Cause → Fix Commit → Lesson Learned*.

---

## 👩‍💻 Author & Credits

- **Developer:** Khatuna Chitishvili
- **Project Repository:** [https://github.com/KhatunaKhatuna/10X-Shop](https://github.com/KhatunaKhatuna/10X-Shop)
- **Live Application:** [https://10-x-shop-jade.vercel.app/](https://10-x-shop-jade.vercel.app/)
- **Special Thanks:** Mentors and instructors of the Frontend Advanced React Course 2026.
