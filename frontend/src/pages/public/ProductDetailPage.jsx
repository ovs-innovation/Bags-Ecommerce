import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ShoppingBag, Heart, ChevronLeft, ChevronRight,
  Check, Truck, RotateCcw, ShieldCheck, Minus, Plus, Package,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '../../data/mockData';
import { BRAND_CONFIG } from '../../constants/config';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import StarRating from '../../components/common/StarRating';
import ProductCard from '../../components/product/ProductCard';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const { addToCart } = useCart();
  const { isSaved, toggleSave } = useSavedItems();
  const product = getProductBySlug(slug);

  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty]       = useState(1);
  const [added, setAdded]   = useState(false);
  const [tab, setTab]       = useState('description');
  const saved = isSaved(product?.id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Package className="w-16 h-16 text-brand-200 mb-4" />
        <h1 className="font-serif text-2xl font-bold text-[#1A1715] mb-2">Product Not Found</h1>
        <p className="text-sm text-stone-500 mb-6">This item may no longer be available.</p>
        <Link to="/products" className="btn-primary text-sm px-6 py-2.5">
          <ArrowLeft className="w-4 h-4" /> Back to Collections
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const savings = product.compareAtPrice - product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-brand-800">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-800">Products</Link>
          <span>/</span>
          <span className="capitalize text-brand-700">{product.gender}</span>
          <span>/</span>
          <span className="text-[#1A1715] font-medium truncate max-w-[150px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-cream-dark">
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Prev / Next */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-card hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#1A1715]" />
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-card hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#1A1715]" />
                  </button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.newArrival  && <span className="badge-new">New Arrival</span>}
                {product.bestSeller  && <span className="badge-bestseller">Best Seller</span>}
                {product.discount > 0 && <span className="badge-sale">−{product.discount}% Off</span>}
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all ${
                      imgIdx === i ? 'border-brand-800' : 'border-transparent hover:border-brand-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="space-y-6">
            {/* Category + rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-700">
                {product.gender}'s · {product.category.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size="md" />
                <span className="text-xs text-stone-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1715] leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-stone-600 mt-2">{product.shortDescription}</p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="font-serif text-3xl font-bold text-[#1A1715]">
                {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-xl text-stone-400 line-through pb-0.5">
                    {BRAND_CONFIG.currency}{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold text-cognac-600 pb-0.5">
                    Save {BRAND_CONFIG.currency}{savings.toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Details chips: Color, Price, Materials, Size, Category */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Category', val: product.category.replace('-', ' ') },
                { label: 'Color', val: product.color },
                { label: 'Price', val: `₹${product.price.toLocaleString('en-IN')}` },
                { label: 'Materials', val: product.material.split(' ').slice(0, 3).join(' ') },
                { label: 'Size', val: product.dimensions },
              ].map((d) => (
                <div key={d.label} className="px-3 py-1.5 bg-[#FAF7F2] border border-[#EDE6DC] text-xs">
                  <span className="text-stone-500 font-medium">{d.label}: </span>
                  <span className="text-[#1A1715] font-semibold capitalize">{d.val}</span>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 text-xs font-semibold ${product.stock > 5 ? 'text-emerald-700' : 'text-cognac-600'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : 'bg-cognac-500'}`} />
              {product.stock > 5 ? `In Stock (${product.stock} available)` : product.stock > 0 ? `Only ${product.stock} left — order soon!` : 'Out of Stock'}
            </div>

            {/* Qty + Add to Cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-200 bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-3 text-stone-700 hover:bg-brand-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-3 text-stone-700 hover:bg-brand-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-stone-500">Max {product.stock} per order</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary py-4"
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  {added ? 'Added to Bag!' : 'Add to Bag'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 btn-secondary py-4"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleSave(product)}
                  className="w-14 border border-brand-200 bg-white flex items-center justify-center hover:bg-brand-50 active:scale-95 transition-all"
                  aria-label={saved ? 'Remove from saved items' : 'Save item to atelier vault'}
                  title={saved ? 'Saved in Atelier Vault' : 'Save to Atelier Vault'}
                >
                  <Heart className={`w-5 h-5 transition-colors ${saved ? 'text-red-500 fill-red-500' : 'text-stone-500 hover:text-red-500'}`} />
                </button>
              </div>
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-brand-100">
              <div className="text-center">
                <Truck className="w-5 h-5 text-brand-700 mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-stone-700">Free Shipping</p>
                <p className="text-[10px] text-stone-500">above ₹1,999</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 text-brand-700 mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-stone-700">14-Day Return</p>
                <p className="text-[10px] text-stone-500">Easy exchanges</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-5 h-5 text-brand-700 mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-stone-700">1-Year Warranty</p>
                <p className="text-[10px] text-stone-500">Stitch guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Features / Care ── */}
        <div className="mt-16">
          <div className="flex border-b border-brand-200">
            {['description', 'features', 'care'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  tab === t ? 'border-brand-800 text-[#1A1715]' : 'border-transparent text-stone-500 hover:text-[#1A1715]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="py-8 max-w-xl">
            {tab === 'description' && (
              <p className="text-sm text-stone-700 leading-relaxed">{product.description}</p>
            )}
            {tab === 'features' && (
              <div className="bg-white border border-[#EDE6DC] rounded-sm divide-y divide-[#EDE6DC] shadow-subtle overflow-hidden">
                <div className="flex items-center justify-between py-3.5 px-5 text-xs">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px]">Color</span>
                  <span className="font-semibold text-[#1A1612]">{product.color}</span>
                </div>
                <div className="flex items-center justify-between py-3.5 px-5 text-xs">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px]">Price</span>
                  <span className="font-semibold text-[#1A1612]">₹{product.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between py-3.5 px-5 text-xs">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px]">Materials</span>
                  <span className="font-semibold text-[#1A1612]">{product.material}</span>
                </div>
                <div className="flex items-center justify-between py-3.5 px-5 text-xs">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px]">Size</span>
                  <span className="font-semibold text-[#1A1612]">{product.dimensions}</span>
                </div>
                <div className="flex items-center justify-between py-3.5 px-5 text-xs">
                  <span className="font-semibold text-stone-500 uppercase tracking-wider text-[11px]">Category</span>
                  <span className="font-semibold text-[#1A1612] capitalize">{product.category.replace('-', ' ')}</span>
                </div>
              </div>
            )}
            {tab === 'care' && (
              <div className="space-y-3 text-sm text-stone-700">
                <p>• Wipe with a soft dry cloth after use.</p>
                <p>• Apply leather conditioner every 3–6 months to maintain suppleness.</p>
                <p>• Keep away from prolonged direct sunlight and moisture.</p>
                <p>• Store in the provided dust bag when not in use.</p>
                <p>• Treat scuffs immediately with a leather repair balm.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
