import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Check,
  ExternalLink, PackageCheck, AlertCircle, ArrowUpRight
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
    <div className="bg-fog min-h-screen text-ink py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Toast feedback banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-ink text-accent px-5 py-3.5 rounded-xs shadow-elevated border border-white/10 flex items-center gap-3 text-xs font-bold tracking-wide animate-fade-in">
            <Check className="w-4 h-4 text-accent flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-border gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-new text-[9px]">Private Vault</span>
              <span className="text-xs uppercase font-bold tracking-widest text-muted">
                {savedCount} {savedCount === 1 ? 'Creation' : 'Creations'} Saved
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink uppercase tracking-tight">
              Saved Vault
            </h1>
            <p className="text-xs sm:text-sm text-ink/70 mt-2 max-w-xl leading-relaxed font-light">
              Your personal curation of heirloom full-grain leather silhouettes and statement accessories.
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-border bg-paper text-xs text-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition-colors uppercase tracking-wider font-bold rounded-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
              <Link
                to="/cart"
                className="btn-primary py-2.5 px-5 text-xs font-black tracking-widest"
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
            <div className="w-20 h-20 mx-auto mb-6 rounded-xs bg-paper border border-border shadow-subtle flex items-center justify-center text-muted">
              <Heart className="w-9 h-9 stroke-[1.2]" />
            </div>
            <h2 className="font-display text-3xl font-bold text-ink mb-3 uppercase">
              Your Vault is Empty
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed mb-8">
              Explore our master-crafted full-grain leather drops and click the heart icon on any piece to save it to your private vault.
            </p>
            <Link
              to="/products"
              className="btn-primary px-8 py-4 text-xs font-black tracking-widest"
            >
              <span>EXPLORE DROPS</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Saved Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {savedItems.map((product) => {
              const mainImg =
                Array.isArray(product.images) && product.images[0]
                  ? product.images[0]
                  : 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80';
              const isMoving = movingId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-paper border border-border rounded-xs shadow-subtle overflow-hidden flex flex-col group transition-all duration-300 hover:border-ink/30"
                >
                  {/* Image Viewport */}
                  <div className="relative aspect-[3/4] bg-fog overflow-hidden">
                    <Link to={`/products/${product.slug}`} className="block w-full h-full">
                      <img
                        src={mainImg}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none">
                      {product.discount > 0 && (
                        <span className="badge-sale">−{product.discount}%</span>
                      )}
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => handleRemove(product)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 bg-paper/90 backdrop-blur-sm rounded-xs flex items-center justify-center text-muted hover:text-red-600 transition-colors shadow-subtle"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-accent-mid font-extrabold truncate">
                        {product.gender} · {product.category}
                      </p>
                      <Link to={`/products/${product.slug}`}>
                        <h3 className="font-sans text-sm font-bold text-ink hover:text-accent-mid transition-colors mt-0.5 line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 mt-1">
                        <StarRating rating={product.rating || 4.8} />
                        <span className="text-[10px] text-muted font-medium">({product.reviewCount || 0})</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="pt-3 border-t border-border space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="font-black text-sm text-ink">
                          {BRAND_CONFIG.currency}{product.price?.toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice > product.price && (
                          <span className="text-xs text-muted line-through">
                            {BRAND_CONFIG.currency}{product.compareAtPrice?.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleMoveToBag(product)}
                        disabled={isMoving}
                        className={`w-full py-2.5 px-3 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 rounded-xs transition-all ${
                          isMoving
                            ? 'bg-accent-dark text-accent'
                            : 'bg-ink text-accent hover:bg-[#1a1a1a]'
                        }`}
                      >
                        {isMoving ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Moved to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Move to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default SavedItemsPage;
