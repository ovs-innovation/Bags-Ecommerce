import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SavedItemsProvider } from './context/SavedItemsContext';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <SavedItemsProvider>
            <AppRoutes />
          </SavedItemsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
