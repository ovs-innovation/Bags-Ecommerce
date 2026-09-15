import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import StarRating from '../common/StarRating';
import { BRAND_CONFIG } from '../../constants/config';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

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
        <div className="relative overflow-hidden bg-cream-dark aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card-img group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleAddToCart}
              className="btn-primary text-xs tracking-widest shadow-elevated mx-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {added ? 'Added!' : 'Quick Add'}
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && <span className="badge-new">New</span>}
            {product.bestSeller && <span className="badge-bestseller">Best Seller</span>}
            {product.discount > 0 && <span className="badge-sale">−{product.discount}%</span>}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-card hover:scale-110 transition-transform"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'text-red-500 fill-red-500' : 'text-stone-500'}`} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-brand-600 font-semibold mb-1">
          {product.color} · {product.material.split(' ').slice(0, 2).join(' ')}
        </p>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-serif text-base font-bold text-[#1A1715] hover:text-brand-800 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-stone-500">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-[#1A1715]">
            {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-sm text-stone-400 line-through">
              {BRAND_CONFIG.currency}{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
