import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route wrapper that prevents unauthenticated users from accessing protected views.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#1A1612] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#7F5E38] font-medium">
          Verifying Atelier Access...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
