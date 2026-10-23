import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout, ScrollToTop } from "../components/layout";
import {
  CatalogPage,
  ProductPage,
  CartPage,
  CheckoutPage,
  LoginPage,
  OrdersPage,
  ProfilePage,
  NotFoundPage,
} from "../pages";

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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
