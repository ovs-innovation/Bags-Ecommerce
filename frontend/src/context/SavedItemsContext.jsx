import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { PRODUCTS } from '../data/mockData';
import authService from '../services/authService';

const SAVED_ITEMS_KEY = 'kosha_saved_items';

const SavedItemsContext = createContext(null);

/**
 * Ensures any item (whether full object or ID string) resolves to full product details
 */
const resolveProduct = (item) => {
  if (!item) return null;
  const id = typeof item === 'string' ? item : (item.id || item.slug);
  const catalogProduct = PRODUCTS.find(
    (p) => String(p.id) === String(id) || p.slug === String(id)
  );

  if (catalogProduct) {
    return {
      ...catalogProduct,
      savedAt: item.savedAt || new Date().toISOString(),
    };
  }

  if (typeof item === 'object' && item.name) {
    return item;
  }

  return null;
};

export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const stored = localStorage.getItem(SAVED_ITEMS_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map(resolveProduct).filter(Boolean);
      }
      return [];
    } catch {
      return [];
    }
  });

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Sync with localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems));
    } catch (err) {
      console.error('[SavedItems] Failed to persist to localStorage:', err);
    }
  }, [savedItems]);

  // Sync with backend on login
  useEffect(() => {
    if (isAuthenticated) {
      // First fetch user's saved items from backend
      authService
        .getSaved()
        .then((res) => {
          const backendIds = res?.data?.savedItems || [];
          if (backendIds.length > 0) {
            setSavedItems((current) => {
              const currentIds = current.map((c) => String(c.id));
              const newIds = backendIds.filter((id) => !currentIds.includes(String(id)));
              const resolvedNew = newIds.map(resolveProduct).filter(Boolean);
              return [...current, ...resolvedNew];
            });
          }
        })
        .catch(() => {});

      // Sync existing local items to backend
      if (savedItems.length > 0) {
        const ids = savedItems.map((item) => String(item.id));
        authService.syncSaved(ids).catch(() => {});
      }
    }
  }, [isAuthenticated]);

  /**
   * Check if a product is saved
   */
  const isSaved = useCallback(
    (productId) => {
      if (!productId) return false;
      const targetId = String(productId);
      return savedItems.some(
        (item) => String(item.id) === targetId || String(item.slug) === targetId
      );
    },
    [savedItems]
  );

  /**
   * Toggle save state for a product
   */
  const toggleSave = useCallback(
    (product) => {
      if (!product || (!product.id && !product.slug)) return false;

      const productId = String(product.id || product.slug);
      const exists = savedItems.some(
        (item) => String(item.id) === productId || String(item.slug) === productId
      );

      let updated;
      if (exists) {
        updated = savedItems.filter(
          (item) => String(item.id) !== productId && String(item.slug) !== productId
        );
      } else {
        const resolved = resolveProduct(product) || {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice || product.compareAtPrice,
          discount: product.discount || 0,
          images: product.images || ['/leather-bag-placeholder.jpg'],
          category: product.category || 'leather-goods',
          gender: product.gender || 'unisex',
          stock: product.stock ?? 10,
          rating: product.rating ?? 5.0,
          reviewCount: product.reviewCount ?? 0,
          color: product.color || 'Cognac',
          savedAt: new Date().toISOString(),
        };
        updated = [resolved, ...savedItems];
      }

      setSavedItems(updated);

      // Backend sync for logged-in patrons
      if (isAuthenticated) {
        authService.toggleSaved(productId).catch(() => {});
      }

      return !exists;
    },
    [savedItems, isAuthenticated]
  );

  /**
   * Explicitly add to saved items
   */
  const addToSaved = useCallback(
    (product) => {
      if (!isSaved(product.id || product.slug)) {
        toggleSave(product);
      }
    },
    [isSaved, toggleSave]
  );

  /**
   * Remove item by ID
   */
  const removeFromSaved = useCallback(
    (productId) => {
      if (!productId) return;
      const targetId = String(productId);
      setSavedItems((prev) =>
        prev.filter((item) => String(item.id) !== targetId && String(item.slug) !== targetId)
      );

      if (isAuthenticated) {
        authService.toggleSaved(targetId).catch(() => {});
      }
    },
    [isAuthenticated]
  );

  /**
   * Clear all saved items
   */
  const clearSaved = useCallback(() => {
    setSavedItems([]);
    try {
      localStorage.removeItem(SAVED_ITEMS_KEY);
    } catch {
      // Ignored
    }
  }, []);

  /**
   * Move item from saved items directly into shopping bag
   */
  const moveToCart = useCallback(
    (product) => {
      if (!product) return;
      addToCart(product);
      removeFromSaved(product.id || product.slug);
    },
    [addToCart, removeFromSaved]
  );

  const value = {
    savedItems,
    savedCount: savedItems.length,
    isSaved,
    toggleSave,
    addToSaved,
    removeFromSaved,
    clearSaved,
    moveToCart,
  };

  return <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>;
};

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
};

export default SavedItemsContext;
