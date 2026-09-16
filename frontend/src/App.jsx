import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/common/ScrollToTop';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
