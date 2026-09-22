import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ShoppingBag, Heart, ChevronLeft, ChevronRight,
  Check, Truck, RotateCcw, ShieldCheck, Minus, Plus, Package, Loader2, Sparkles, Zap
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { useCart } from '../../context/CartContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import { useAuthPrompt } from '../../context/AuthPromptContext';
import StarRating from '../../components/common/StarRating';
import ProductCard from '../../components/product/ProductCard';
import { productService } from '../../services/api';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const { addToCart } = useCart();
  const { isSaved, toggleSave } = useSavedItems();
  const { interceptAction } = useAuthPrompt();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setProduct(null);

    const fetchProduct = async () => {
      try {
        const [data, allData] = await Promise.all([
          productService.getProductBySlug(slug),
          productService.getProducts().catch(() => ({ products: [] })),
        ]);

        if (isMounted && data && data.product) {
          const p = data.product;
          setProduct({
            ...p,
            id: p._id || p.id,
            material: p.material || 'Full-Grain Leather',
            color: p.color || 'Cognac',
            rating: p.rating || 4.8,
            reviewCount: p.reviewCount || 0,
            images:
              Array.isArray(p.images) && p.images.length > 0
                ? p.images
                : ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'],
            features:
              Array.isArray(p.features) && p.features.length > 0
                ? p.features
                : ['Handcrafted genuine leather', 'Reinforced saddle stitching', 'Solid antique hardware', 'Internal organization pockets'],
          });

          if (allData && Array.isArray(allData.products)) {
            const others = allData.products
              .filter((item) => (item._id || item.id) !== (p._id || p.id))
              .map((item) => ({
                ...item,
                id: item._id || item.id,
                images:
                  Array.isArray(item.images) && item.images.length > 0
                    ? item.images
                    : ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'],
              }));
            setRelated(others.slice(0, 4));
          }
        }
      } catch (err) {
        console.warn('Product could not be loaded from API:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => { isMounted = false; };
  }, [slug]);

  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty]       = useState(1);
  const [added, setAdded]   = useState(false);
  const [tab, setTab]       = useState('description');
  const saved = isSaved(product?.id || product?._id);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-fog">
        <Loader2 className="w-8 h-8 text-ink animate-spin mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-muted">Loading creation...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-fog">
        <Package className="w-16 h-16 text-muted mb-4" />
        <h1 className="font-display text-3xl font-bold text-ink mb-2">Creation Not Found</h1>
        <p className="text-xs text-muted mb-6">This item may no longer be available in our catalog.</p>
        <Link to="/products" className="btn-primary text-xs px-6 py-3 font-black">
          <ArrowLeft className="w-4 h-4" /> Back to Vault
        </Link>
      </div>
    );
  }

  const savings = (product.compareAtPrice || product.price) - product.price;

  const handleAddToCart = () => {
    interceptAction({
      action: 'ADD_TO_BAG',
      product,
      qty,
      onAuthenticated: () => {
        addToCart(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      },
    });
  };

  const handleBuyNow = () => {
    interceptAction({
      action: 'BUY_NOW',
      product,
      qty,
      onAuthenticated: () => {
        addToCart(product, qty);
        navigate('/cart');
      },
    });
  };

  const handleToggleSave = () => {
    interceptAction({
      action: 'WISHLIST',
      product,
      onAuthenticated: () => {
        toggleSave(product);
      },
    });
  };

  return (
    <div className="min-h-screen bg-fog text-ink">

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted uppercase font-bold tracking-wider overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link to="/" className="hover:text-ink flex-shrink-0 transition-colors">Home</Link>
          <span className="text-muted/40">/</span>
          <Link to="/products" className="hover:text-ink flex-shrink-0 transition-colors">Products</Link>
          <span className="text-muted/40">/</span>
          <span className="capitalize text-ink flex-shrink-0">{product.gender}</span>
          <span className="text-muted/40">/</span>
          <span className="text-ink font-extrabold truncate max-w-[160px] sm:max-w-[240px]">{product.name}</span>
        </nav>
      </div>

      {/* ── Product Main Showcase ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* ── Gallery Column ── */}
          <div className="space-y-3 sticky top-24">
            {/* Main Image Viewport */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-paper border border-border rounded-xs">
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Prev / Next Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-paper/90 backdrop-blur-sm rounded-xs flex items-center justify-center shadow-subtle hover:bg-paper transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 text-ink" />
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-paper/90 backdrop-blur-sm rounded-xs flex items-center justify-center shadow-subtle hover:bg-paper transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 text-ink" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                {product.newArrival && <span className="badge-new">New Arrival</span>}
                {product.bestSeller && <span className="badge-bestseller">🔥 Hot</span>}
                {product.discount > 0 && <span className="badge-sale">−{product.discount}%</span>}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-20 h-24 flex-shrink-0 overflow-hidden border-2 rounded-xs transition-all ${
                      imgIdx === i ? 'border-ink shadow-xs scale-102' : 'border-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info & Buy Column ── */}
          <div className="space-y-6 bg-paper border border-border p-6 sm:p-8 rounded-xs shadow-subtle">
            
            {/* Category + Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-accent-mid">
                {product.gender} · {product.category}
              </span>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-xs text-muted font-semibold">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-ink/70 mt-2 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-black text-ink">
                {BRAND_CONFIG.currency}{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-muted line-through">
                    {BRAND_CONFIG.currency}{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="badge-new text-[10px] ml-auto">
                    Save {BRAND_CONFIG.currency}{savings.toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: 'Color', val: product.color },
                { label: 'Leather', val: product.material.split(' ').slice(0, 2).join(' ') },
                { label: 'Dimensions', val: product.dimensions },
              ].map((d) => (
                <div key={d.label} className="p-2.5 bg-fog border border-border rounded-xs">
                  <p className="text-[9.5px] uppercase tracking-widest text-muted font-bold">{d.label}</p>
                  <p className="text-xs font-bold text-ink mt-0.5 capitalize truncate">{d.val}</p>
                </div>
              ))}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-accent-mid' : 'bg-orange-500'}`} />
              <span className={product.stock > 5 ? 'text-accent-mid' : 'text-orange-700'}>
                {product.stock > 5
                  ? `In Stock (${product.stock} pieces crafted)`
                  : product.stock > 0
                  ? `Only ${product.stock} left in atelier`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold tracking-wider text-muted">Quantity:</span>
                <div className="flex items-center border border-border bg-fog rounded-xs">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2 text-ink hover:bg-paper transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-black text-ink">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="p-2 text-ink hover:bg-paper transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag + Buy Now + Wishlist */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-xs ${
                    added ? 'bg-accent-dark text-accent' : 'bg-ink text-accent hover:bg-[#1a1a1a]'
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? 'Added to Bag!' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 btn-accent py-4 text-xs font-black tracking-widest"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleToggleSave}
                  className="w-14 border border-border bg-fog hover:bg-paper flex items-center justify-center transition-all rounded-xs flex-shrink-0"
                  aria-label={saved ? 'Remove from saved' : 'Save piece'}
                >
                  <Heart className={`w-5 h-5 transition-colors ${saved ? 'text-red-500 fill-red-500' : 'text-muted hover:text-red-500'}`} />
                </button>
              </div>
            </div>

            {/* Assurance Bar */}
            <div className="grid grid-cols-3 gap-2 pt-5 border-t border-border text-center">
              <div className="p-2">
                <Truck className="w-4 h-4 text-ink mx-auto mb-1" />
                <p className="text-[10px] font-bold text-ink uppercase tracking-wider">Free Shipping</p>
                <p className="text-[9.5px] text-muted">Over ₹1,999</p>
              </div>
              <div className="p-2">
                <RotateCcw className="w-4 h-4 text-ink mx-auto mb-1" />
                <p className="text-[10px] font-bold text-ink uppercase tracking-wider">14-Day Return</p>
                <p className="text-[9.5px] text-muted">Hassle-free</p>
              </div>
              <div className="p-2">
                <ShieldCheck className="w-4 h-4 text-ink mx-auto mb-1" />
                <p className="text-[10px] font-bold text-ink uppercase tracking-wider">1-Yr Warranty</p>
                <p className="text-[9.5px] text-muted">Stitch guarantee</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Description / Features / Care Tabs ── */}
        <div className="mt-12 sm:mt-16 bg-paper border border-border rounded-xs p-6 sm:p-8">
          <div className="flex border-b border-border gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
            {['description', 'features', 'care'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${
                  tab === t ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-mid" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 text-xs sm:text-sm text-ink/80 leading-relaxed font-light">
            {tab === 'description' && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description || product.shortDescription}</p>
                <p>
                  Every piece is individually hand-cut from continuous full-grain hides, ensuring structural integrity that improves and patinas with everyday wear.
                </p>
              </div>
            )}

            {tab === 'features' && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-mid flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {tab === 'care' && (
              <div className="space-y-3 max-w-3xl">
                <p>
                  Full-grain vegetable-tanned leather breathes naturally and absorbs organic oils from your touch.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted">
                  <li>Wipe clean with a dry, soft microfiber cloth after daily carry.</li>
                  <li>Condition lightly every 4 to 6 months with natural beeswax or leather balm.</li>
                  <li>Avoid direct soaking in water. If wet, let it dry naturally away from direct heaters.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="section-label mb-1">Curated Matches</p>
                <h2 className="font-display text-3xl sm:text-4xl text-ink uppercase tracking-tight">
                  You May Also Admire
                </h2>
              </div>
              <Link to="/products" className="text-xs font-black uppercase tracking-widest text-ink hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
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
