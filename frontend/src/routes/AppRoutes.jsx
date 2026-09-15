import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StoreLayout from '../components/layout/StoreLayout';

// Public Pages
import HomePage          from '../pages/public/HomePage';
import ProductsPage      from '../pages/public/ProductsPage';
import ProductDetailPage from '../pages/public/ProductDetailPage';
import CategoryPage      from '../pages/public/CategoryPage';
import CartPage          from '../pages/public/CartPage';
import AboutPage         from '../pages/public/AboutPage';
import ContactPage       from '../pages/public/ContactPage';
import NotFoundPage      from '../pages/public/NotFoundPage';

// Auth Pages
import LoginPage         from '../pages/auth/LoginPage';
import RegisterPage      from '../pages/auth/RegisterPage';

export const AppRoutes = () => (
  <Routes>
    {/* Auth routes (no main layout) */}
    <Route path="/login"    element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* Store layout wrapping all public routes */}
    <Route element={<StoreLayout />}>
      <Route path="/"                    element={<HomePage />} />
      <Route path="/products"            element={<ProductsPage />} />
      <Route path="/products/:slug"      element={<ProductDetailPage />} />
      <Route path="/category/:gender"    element={<CategoryPage />} />
      <Route path="/cart"                element={<CartPage />} />
      <Route path="/about"               element={<AboutPage />} />
      <Route path="/contact"             element={<ContactPage />} />

      {/* Convenience aliases */}
      <Route path="/men"   element={<Navigate to="/category/men"   replace />} />
      <Route path="/women" element={<Navigate to="/category/women" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
