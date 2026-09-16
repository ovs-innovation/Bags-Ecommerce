import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import StarRating from '../common/StarRating';
import { BRAND_CONFIG } from '../../constants/config';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isSaved, toggleSave } = useSavedItems();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const saved = isSaved(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(product);
  };

  // Fallback high-res leather image if remote image fails
  const fallbackImg = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="product-card group flex flex-col h-full bg-white rounded-none border border-stone-200/60 hover:border-brand-300/80 transition-all duration-300 shadow-sm hover:shadow-card">
      {/* Media wrapper */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
        <Link to={`/products/${product.slug}`} className="block w-full h-full" tabIndex={-1}>
          <img
            src={imgError ? fallbackImg : product.images[0]}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.newArrival && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#1A1715] text-white">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gold-600 text-white">
              Best Seller
            </span>
          )}
          {product.discount > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cognac-600 text-white">
              −{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist / Saved Button (Independent from Link) */}
        <button
          type="button"
          onClick={handleToggleSave}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-subtle hover:scale-110 active:scale-95 transition-all z-10"
          aria-label={saved ? 'Remove from saved items' : 'Save item'}
          title={saved ? 'Saved in Atelier Vault' : 'Save to Atelier Vault'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              saved ? 'text-rose-600 fill-rose-600' : 'text-stone-600 hover:text-rose-600'
            }`}
          />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10 pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 text-xs font-semibold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-elevated ${
              added
                ? 'bg-emerald-700 text-white'
                : 'bg-[#1A1715] hover:bg-brand-900 text-white active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-brand-700 font-semibold mb-1">
            {product.color} · {product.material.split(' ').slice(0, 2).join(' ')}
          </p>
          <Link to={`/products/${product.slug}`} className="group-hover:text-brand-800 transition-colors">
            <h3 className="font-serif text-base font-bold text-[#1A1715] leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1.5">
            <StarRating rating={product.rating} />
            <span className="text-[11px] text-stone-500 font-medium">({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-3 pt-2.5 border-t border-stone-100">
          <span className="text-base font-bold text-[#1A1715]">
            {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-xs text-stone-400 line-through">
              {BRAND_CONFIG.currency}{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
