import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useCart } from './CartContext';
import { useSavedItems } from './SavedItemsContext';
import { useAuth } from './AuthContext';

const PENDING_INTENT_KEY = 'avyastore_pending_intent';

const AuthPromptContext = createContext(null);

export const AuthPromptProvider = ({ children }) => {
  const [isOpen, setIsOpen]           = useState(false);
  const [intent, setIntent]           = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const { addToCart }       = useCart();
  const { addToSaved }      = useSavedItems();
  const { isAuthenticated } = useAuth();

  // Helper to show transient toast message
  const showToast = useCallback((msg, duration = 3200) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage('');
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Trigger the authentication prompt modal for a guest user.
   * Remembers user intent in sessionStorage and in local state.
   */
  const triggerAuthPrompt = useCallback(({ action, product, qty = 1, returnUrl }) => {
    if (!product) return;

    const normalizedProduct = {
      id: product.id || product._id,
      _id: product._id || product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAtPrice: product.compareAtPrice || product.originalPrice,
      discount: product.discount || 0,
      images: Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'],
      color: product.color || 'Cognac',
      category: product.category || 'leather-goods',
      gender: product.gender || 'unisex',
    };

    const targetReturnUrl = returnUrl || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/');

    const intentData = {
      action, // 'ADD_TO_BAG' | 'BUY_NOW' | 'WISHLIST'
      product: normalizedProduct,
      qty: Math.max(1, Number(qty) || 1),
      returnUrl: targetReturnUrl,
      timestamp: Date.now(),
    };

    try {
      sessionStorage.setItem(PENDING_INTENT_KEY, JSON.stringify(intentData));
    } catch (err) {
      console.warn('[AuthPrompt] Could not store pending intent:', err);
    }

    setIntent(intentData);
    setIsOpen(true);
  }, []);

  /**
   * Dismiss the authentication prompt without navigating
   */
  const closeAuthPrompt = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Check and intercept protected actions.
   * If user is authenticated: immediately runs onAuthenticated().
   * If user is a guest: triggers auth prompt modal.
   */
  const interceptAction = useCallback(({ action, product, qty = 1, onAuthenticated, returnUrl }) => {
    if (isAuthenticated) {
      if (typeof onAuthenticated === 'function') {
        onAuthenticated();
      }
      return true;
    }

    triggerAuthPrompt({ action, product, qty, returnUrl });
    return false;
  }, [isAuthenticated, triggerAuthPrompt]);

  /**
   * Execute and resolve any pending intent after login/registration.
   * Ensures the intent is consumed ONLY ONCE.
   */
  const executePendingIntent = useCallback(() => {
    let raw = null;
    try {
      raw = sessionStorage.getItem(PENDING_INTENT_KEY);
    } catch {
      raw = null;
    }

    if (!raw) return null;

    let savedIntent = null;
    try {
      savedIntent = JSON.parse(raw);
    } catch {
      sessionStorage.removeItem(PENDING_INTENT_KEY);
      return null;
    }

    // Immediately remove from sessionStorage to guarantee single execution
    sessionStorage.removeItem(PENDING_INTENT_KEY);

    if (!savedIntent || !savedIntent.action || !savedIntent.product) {
      return null;
    }

    // Expiry check (30 minutes)
    if (Date.now() - (savedIntent.timestamp || 0) > 30 * 60 * 1000) {
      return null;
    }

    const { action, product, qty = 1, returnUrl = '/' } = savedIntent;

    if (action === 'ADD_TO_BAG') {
      addToCart(product, qty);
      showToast(`"${product.name}" added to your Shopping Bag!`);
      return { action, product, redirect: returnUrl };
    }

    if (action === 'BUY_NOW') {
      addToCart(product, qty);
      showToast(`Proceeding to checkout with "${product.name}"`);
      return { action, product, redirect: '/cart' };
    }

    if (action === 'WISHLIST') {
      addToSaved(product);
      showToast(`"${product.name}" saved to your favorites!`);
      return { action, product, redirect: returnUrl };
    }

    return null;
  }, [addToCart, addToSaved, showToast]);

  const value = {
    isOpen,
    intent,
    toastMessage,
    showToast,
    triggerAuthPrompt,
    closeAuthPrompt,
    interceptAction,
    executePendingIntent,
  };

  return (
    <AuthPromptContext.Provider value={value}>
      {children}
    </AuthPromptContext.Provider>
  );
};

export const useAuthPrompt = () => {
  const ctx = useContext(AuthPromptContext);
  if (!ctx) {
    throw new Error('useAuthPrompt must be used within an AuthPromptProvider');
  }
  return ctx;
};

export default AuthPromptContext;
