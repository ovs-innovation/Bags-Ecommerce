import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import StarRating from '../common/StarRating';
import { BRAND_CONFIG } from '../../constants/config';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isSaved, toggleSave } = useSavedItems();
  const [added, setAdded] = useState(false);
  const saved = isSaved(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="product-card group">
      {/* Image */}
      <Link to={`/products/${product.slug}`}>
        <div className="relative overflow-hidden bg-cream-dark aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card-img group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover overlay with compact Quick Add button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end justify-center pb-3.5 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="px-3.5 py-1.5 bg-[#1A1612] text-white text-[10.5px] font-semibold tracking-wider uppercase rounded-sm hover:bg-[#2F2620] shadow-md flex items-center gap-1.5 mx-2 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3 h-3 text-[#E6C687]" />
              {added ? 'Added!' : 'Quick Add'}
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.newArrival && (
              <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#1A1612] text-white rounded-xs">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#9B784E] text-white rounded-xs">
                Best Seller
              </span>
            )}
            {product.discount > 0 && (
              <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-rose-700 text-white rounded-xs">
                −{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist / Saved Items */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(product);
            }}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all"
            aria-label={saved ? 'Remove from saved items' : 'Save item'}
            title={saved ? 'Saved in Atelier Vault' : 'Save to Atelier Vault'}
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${saved ? 'text-red-500 fill-red-500' : 'text-stone-400 hover:text-red-500'}`} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 sm:p-3.5">
        <p className="text-[9.5px] uppercase tracking-wider text-[#7F5E38] font-medium mb-1 truncate">
          {product.color} · {product.material.split(' ').slice(0, 2).join(' ')}
        </p>
        <Link to={`/products/${product.slug}`} className="block">
          <h3 className="font-serif text-[13px] sm:text-[14px] font-normal text-[#1A1612] hover:text-[#7F5E38] transition-colors leading-snug truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mt-1">
          <StarRating rating={product.rating} size="xs" />
          <span className="text-[10.5px] text-stone-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs sm:text-[13.5px] font-bold text-[#1A1612]">
            {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-[11px] text-stone-400 line-through">
              {BRAND_CONFIG.currency}{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
