import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AdminLayout from '../components/layout/AdminLayout';

// Pages
import DashboardPage from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import CategoriesPage from '../pages/CategoriesPage';
import OrdersPage from '../pages/OrdersPage';
import CustomersPage from '../pages/CustomersPage';
import ReviewsPage from '../pages/ReviewsPage';
import SettingsPage from '../pages/SettingsPage';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Redirect unmatched admin routes to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
