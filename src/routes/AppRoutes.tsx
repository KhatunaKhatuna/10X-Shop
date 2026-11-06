import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, ScrollToTop } from "@/components/layout";
import { ProtectedRoute } from "./ProtectedRoute";
import {
  CatalogPage,
  ProductPage,
  CartPage,
  CheckoutPage,
  LoginPage,
  OrdersPage,
  ProfilePage,
  NotFoundPage,
} from "@/pages";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Automatically scrolls page to top on route change */}
      <ScrollToTop />
      <Routes>
        {/* Parent route with shared Layout (Header + <Outlet /> + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
