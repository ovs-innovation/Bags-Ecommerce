import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import { useAuthPrompt } from '../../context/AuthPromptContext';
import StarRating from '../common/StarRating';
import { BRAND_CONFIG } from '../../constants/config';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isSaved, toggleSave } = useSavedItems();
  const { interceptAction } = useAuthPrompt();
  const [added, setAdded]       = useState(false);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered]   = useState(false);

  const saved = isSaved(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    interceptAction({
      action: 'ADD_TO_BAG',
      product,
      onAuthenticated: () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      },
    });
  };

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    interceptAction({
      action: 'WISHLIST',
      product,
      onAuthenticated: () => {
        toggleSave(product);
      },
    });
  };

  const fallbackImg = 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80';
  const mainImg  = imgError ? fallbackImg : (Array.isArray(product.images) && product.images[0] ? product.images[0] : fallbackImg);
  const hoverImg = Array.isArray(product.images) && product.images[1] ? product.images[1] : mainImg;

  return (
    <div
      className="group relative flex flex-col h-full bg-paper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: '2px' }}
    >
      {/* ── Image Container ── */}
      <div className="relative overflow-hidden bg-fog aspect-[3/4] flex-shrink-0">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          {/* Primary image */}
          <img
            src={mainImg}
            alt={product.name}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
            style={{
              opacity: hovered && hoverImg !== mainImg ? 0 : 1,
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            loading="lazy"
          />
          {/* Secondary image on hover */}
          {hoverImg !== mainImg && (
            <img
              src={hoverImg}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out"
              style={{ opacity: hovered ? 1 : 0 }}
              loading="lazy"
            />
          )}
        </Link>

        {/* ── Badges ── */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none z-10">
          {product.newArrival && (
            <span className="badge-new text-[9px] px-2 py-0.5 font-black uppercase tracking-wider inline-block">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="badge-bestseller text-[9px] px-2 py-0.5 font-black uppercase tracking-wider inline-block">
              🔥 Hot
            </span>
          )}
          {product.discount > 0 && (
            <span className="badge-sale-legacy text-[9px] px-2 py-0.5 font-black uppercase tracking-wider inline-block">
              −{product.discount}%
            </span>
          )}
        </div>

        {/* ── Wishlist button ── */}
        <button
          type="button"
          onClick={handleToggleSave}
          className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-paper/90 backdrop-blur-sm hover:bg-paper z-10 transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ borderRadius: '2px' }}
          aria-label={saved ? 'Remove from saved' : 'Save item'}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              saved ? 'fill-red-500 text-red-500 scale-110' : 'text-ink/50 hover:text-red-500'
            }`}
          />
        </button>

        {/* ── Quick Add Overlay — always on mobile, hover on desktop ── */}
        <div
          className="absolute inset-x-0 bottom-0 p-2.5 transition-all duration-300 ease-out flex gap-1.5 z-10"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 ${
              added
                ? 'bg-accent-dark text-accent'
                : 'bg-ink text-accent hover:bg-[#1a1a1a]'
            }`}
            style={{ borderRadius: '2px' }}
          >
            {added ? (
              <><Check className="w-3 h-3" /> Added</>
            ) : (
              <><ShoppingBag className="w-3 h-3" /> Add to Bag</>
            )}
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="w-10 bg-paper/90 backdrop-blur-sm flex items-center justify-center hover:bg-paper transition-colors"
            style={{ borderRadius: '2px' }}
            title="Quick view"
          >
            <Eye className="w-3.5 h-3.5 text-ink" />
          </Link>
        </div>

        {/* Mobile quick-add (always visible) */}
        <div className="md:hidden absolute inset-x-0 bottom-0 p-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors ${
              added ? 'bg-accent-dark text-accent' : 'bg-ink text-accent'
            }`}
            style={{ borderRadius: '2px' }}
          >
            {added ? <><Check className="w-3 h-3" /> Added</> : <><ShoppingBag className="w-3 h-3" /> Add</>}
          </button>
        </div>
      </div>

      {/* ── Product Info ── */}
      <div className="pt-3 pb-1 px-0.5 flex flex-col gap-0.5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold truncate">
          {product.color || 'Leather'} · {product.category}
        </p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-sans text-sm font-bold text-ink leading-snug line-clamp-1 hover:text-accent-dark transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating rating={product.rating || 4.8} />
          <span className="text-[10px] text-muted">({product.reviewCount || 0})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1.5 pt-1.5 border-t border-border/60">
          <span className="text-sm font-extrabold text-ink">
            {BRAND_CONFIG.currency}{product.price?.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-xs text-muted line-through">
              {BRAND_CONFIG.currency}{product.compareAtPrice?.toLocaleString('en-IN')}
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-[10px] font-bold text-accent-dark ml-auto">
              {product.discount}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
