import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Main Layout for Customer-Facing Store Pages
 * Wraps Navbar, child view, and Footer.
 */
export const StoreLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
