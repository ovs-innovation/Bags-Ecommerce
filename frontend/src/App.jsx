import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SavedItemsProvider } from './context/SavedItemsContext';
import { AuthPromptProvider } from './context/AuthPromptContext';
import AuthPromptModal from './components/auth/AuthPromptModal';
import GlobalToast from './components/common/GlobalToast';
import ScrollToTop from './components/common/ScrollToTop';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <SavedItemsProvider>
            <AuthPromptProvider>
              <AppRoutes />
              <AuthPromptModal />
              <GlobalToast />
            </AuthPromptProvider>
          </SavedItemsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
