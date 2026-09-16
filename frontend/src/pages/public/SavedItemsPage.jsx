import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Check,
  ExternalLink, PackageCheck, AlertCircle
} from 'lucide-react';
import { useSavedItems } from '../../context/SavedItemsContext';
import { BRAND_CONFIG } from '../../constants/config';
import StarRating from '../../components/common/StarRating';

export const SavedItemsPage = () => {
  const { savedItems, savedCount, removeFromSaved, moveToCart, clearSaved } = useSavedItems();
  const [toastMessage, setToastMessage] = useState('');
  const [movingId, setMovingId] = useState(null);

  const handleMoveToBag = (product) => {
    setMovingId(product.id);
    moveToCart(product);
    setToastMessage(`"${product.name}" moved to your Shopping Bag.`);
    setTimeout(() => {
      setMovingId(null);
      setToastMessage('');
    }, 2800);
  };

  const handleRemove = (product) => {
    removeFromSaved(product.id);
    setToastMessage(`"${product.name}" removed from saved items.`);
    setTimeout(() => setToastMessage(''), 2400);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1A1612] py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Toast feedback banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1A1612] text-white px-5 py-3.5 rounded-sm shadow-elevated border border-[#EDE6DC]/20 flex items-center gap-3 text-xs font-medium tracking-wide animate-fadeIn">
            <Check className="w-4 h-4 text-[#E6C687] flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[#EDE6DC] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7F5E38]">
                Atelier Vault
              </span>
              <span className="text-[#C8B896]">•</span>
              <span className="text-[11px] font-medium tracking-wider text-[#4A423A]">
                {savedCount} {savedCount === 1 ? 'Creation Saved' : 'Creations Saved'}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1612]">
              Saved Items
            </h1>
            <p className="text-xs sm:text-sm text-[#5C534A] mt-2 max-w-xl leading-relaxed">
              Your personal curation of heirloom full-grain leather silhouettes and artisanal accessories.
            </p>
          </div>

          {savedCount > 0 && (
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove all saved creations?')) {
                    clearSaved();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#EDE6DC] bg-white text-xs text-[#5C534A] hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition-colors uppercase tracking-wider font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#1A1612] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2F2620] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>View Bag</span>
              </Link>
            </div>
          )}
        </div>

        {/* Saved Items Content */}
        {savedCount === 0 ? (
          /* Empty Vault State */
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white border border-[#EDE6DC] shadow-subtle flex items-center justify-center text-[#9B784E]">
              <Heart className="w-9 h-9 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#1A1612] mb-3">
              Your Vault is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#5C534A] leading-relaxed mb-8">
              Explore our master-crafted full-grain leather collections and click the heart icon on any piece to save it to your private atelier vault.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/products"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#1A1612] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#2F2620] transition-all"
              >
                Explore All Creations —
              </Link>
              <Link
                to="/category/women"
                className="w-full sm:w-auto px-6 py-3.5 border border-[#EDE6DC] bg-white text-xs font-semibold tracking-[0.16em] uppercase text-[#1A1612] hover:border-[#1A1612] transition-all"
              >
                Women's Edit
              </Link>
              <Link
                to="/category/men"
                className="w-full sm:w-auto px-6 py-3.5 border border-[#EDE6DC] bg-white text-xs font-semibold tracking-[0.16em] uppercase text-[#1A1612] hover:border-[#1A1612] transition-all"
              >
                Men's Edit
              </Link>
            </div>
          </div>
        ) : (
          /* Grid of Saved Products */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#EDE6DC] shadow-subtle hover:shadow-card transition-shadow duration-300 flex flex-col justify-between group overflow-hidden rounded-sm"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <Link to={`/products/${item.slug}`} className="block w-full h-full">
                      <img
                        src={item.images?.[0] || '/leather-bag-placeholder.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </Link>

                    {/* Remove button overlay */}
                    <button
                      onClick={() => handleRemove(item)}
                      title="Remove from saved"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-stone-400 hover:text-red-600 hover:scale-110 shadow-card flex items-center justify-center transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Discount badge */}
                    {item.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-[#1A1612] text-[#E6C687] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                        −{item.discount}% Off
                      </div>
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#7F5E38] font-medium mb-1">
                      <span>{item.category?.replace('-', ' ')}</span>
                      <span className="capitalize">{item.gender}</span>
                    </div>

                    <Link to={`/products/${item.slug}`} className="block">
                      <h3 className="font-serif text-base font-normal text-[#1A1612] group-hover:text-[#7F5E38] transition-colors leading-snug line-clamp-1 mb-2">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-semibold text-base text-[#1A1612]">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-xs text-stone-400 line-through">
                          ₹{item.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{item.stock > 0 ? 'In Stock · Ready to Dispatch' : 'Made to Order'}</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="p-5 pt-0 border-t border-[#EDE6DC]/60 mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToBag(item)}
                    disabled={movingId === item.id}
                    className="flex-1 py-3 bg-[#1A1612] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#2F2620] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{movingId === item.id ? 'Moving...' : 'Move to Bag'}</span>
                  </button>

                  <Link
                    to={`/products/${item.slug}`}
                    className="p-3 border border-[#EDE6DC] text-stone-600 hover:text-black hover:border-black transition-colors"
                    title="View Product Details"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SavedItemsPage;
