import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Truck, RotateCcw, ShieldCheck, Award, Quote,
  Sparkles, Zap, Flame, Compass, Shirt, Sofa, Smartphone, Gift, ShoppingCart,
  ArrowUpRight, Star, CheckCircle2
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { TESTIMONIALS } from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';
import StarRating from '../../components/common/StarRating';
import { productService } from '../../services/api';
import BrandLogo from '../../components/common/BrandLogo';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedVibe, setSelectedVibe] = useState('all');

  useEffect(() => {
    let isMounted = true;
    productService
      .getProducts()
      .then((data) => {
        if (isMounted && data.products && Array.isArray(data.products)) {
          setProducts(
            data.products.map((p) => ({
              ...p,
              id: p._id || p.id,
              images:
                Array.isArray(p.images) && p.images.length > 0
                  ? p.images
                  : ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'],
            }))
          );
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch home products:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter based on Gen-Z aesthetic vibes
  const filteredProducts = products.filter((p) => {
    if (selectedVibe === 'all') return true;
    if (selectedVibe === 'clean-girl') return p.category === 'tote' || p.category === 'clutch';
    if (selectedVibe === 'commuter') return p.category === 'briefcase' || p.category === 'sling';
    if (selectedVibe === 'vintage')
      return p.color === 'Cognac' || p.color === 'Dark Mahogany' || p.color === 'Tan';
    if (selectedVibe === 'minimalist') return p.category === 'wallet' || p.price < 3000;
    return true;
  });

  const featured = products.filter((p) => p.featured);
  const displayFeatured = featured.length > 0 ? featured : products;
  const newArrivals = products.filter((p) => p.newArrival);
  const displayNewArrivals = newArrivals.length > 0 ? newArrivals : products;
  const bestSellers =
    products.filter((p) => p.bestSeller).length > 0
      ? products.filter((p) => p.bestSeller)
      : products.slice(0, 4);

  return (
    <div className="bg-fog text-ink selection:bg-accent selection:text-ink">

      {/* ═══════════════════════════════════════════════════════════════
          1. EDITORIAL HIGH-IMPACT HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-paper overflow-hidden border-b border-border">
        {/* Visual Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/kosha-hero-banner.jpg"
            alt="Avya Store Gen-Z Luxury Handcrafted Leather Goods"
            className="w-full h-full object-cover object-[72%_center] lg:object-[80%_center] xl:object-right filter brightness-[0.98] contrast-[1.02]"
          />

          {/* Desktop Mask for crisp editorial typography */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #FAFAF8 0%, #FAFAF8 32%, rgba(250, 250, 248, 0.94) 42%, rgba(250, 250, 248, 0.65) 54%, rgba(250, 250, 248, 0) 70%)',
            }}
          />

          {/* Mobile Overlay */}
          <div
            className="md:hidden absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(250, 250, 248, 0.97) 0%, rgba(250, 250, 248, 0.90) 70%, rgba(250, 250, 248, 0.45) 100%)',
            }}
          />

          {/* Decorative Sparkle */}
          <div className="hidden lg:block absolute bottom-10 right-20 pointer-events-none select-none text-accent text-5xl font-serif">
            ✦
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-20 lg:py-24 min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
          <div className="max-w-[640px] animate-fade-up">

            {/* Gen-Z Community Proof Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-accent text-[11px] font-bold uppercase tracking-wider mb-5 rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>18K+ STYLE CURATORS</span>
              <span className="text-white/40">•</span>
              <span className="text-white tracking-widest font-normal">DROP 04 LIVE</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-ink uppercase leading-[0.92] mb-4">
              YOUR STYLE.<br />
              <span className="text-accent-mid">YOUR ERA.</span>
            </h1>

            {/* Sub-headline & Slogan */}
            <p className="font-serif italic text-base sm:text-xl text-ink/75 mb-4">
              "Trends Today • Trends Tomorrow • Old Is Gold"
            </p>

            <p className="text-sm sm:text-base text-ink/65 leading-relaxed mb-8 max-w-[500px] font-normal">
              Curated luxury handcrafted from 100% ethical full-grain vegetable-tanned leather. Built for the generation who prioritize timeless substance over disposable hype.
            </p>

            {/* High-Contrast Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/products"
                className="btn-accent px-8 py-4 text-xs font-black tracking-[0.16em] inline-flex items-center gap-2 shadow-sm hover:shadow-glow transition-all"
              >
                <span>EXPLORE THE VAULT</span>
                <Zap className="w-4 h-4" />
              </Link>

              <Link
                to="/about"
                className="btn-outline px-7 py-4 text-xs font-bold tracking-[0.16em] inline-flex items-center gap-2 bg-paper/80 backdrop-blur-xs"
              >
                <span>OUR PHILOSOPHY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 mt-9 pt-6 border-t border-border text-xs font-semibold text-ink/80">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span>Viral Silhouettes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent-mid flex-shrink-0" />
                <span>100% Eco Veg-Tan Hide</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-ink flex-shrink-0" />
                <span>Free Express Shipping</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. LIFESTYLE CAPSULE STRIP (FASHION, HOME, GADGETS, LIFESTYLE)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-paper border-b border-border py-6 px-4">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {[
              { label: 'Fashion', sub: 'Totes & Slings', icon: <Shirt className="w-4 h-4" />, link: '/products' },
              { label: 'Home', sub: 'Desk & Living', icon: <Sofa className="w-4 h-4" />, link: '/category/women' },
              { label: 'Gadgets', sub: 'Laptop Folios', icon: <Smartphone className="w-4 h-4" />, link: '/category/men' },
              { label: 'Lifestyle', sub: 'Cardholders & Wallets', icon: <Gift className="w-4 h-4" />, link: '/products' },
              { label: 'Archive', sub: 'Curated Vault', icon: <ShoppingCart className="w-4 h-4" />, link: '/products' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="group p-3.5 bg-fog hover:bg-paper border border-border/80 hover:border-ink/40 transition-all flex items-center gap-3 rounded-xs"
              >
                <div className="w-9 h-9 bg-paper group-hover:bg-accent text-ink rounded-xs flex items-center justify-center border border-border/60 transition-colors flex-shrink-0">
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-ink group-hover:text-accent-dark transition-colors truncate">
                    {cat.label}
                  </p>
                  <p className="text-[10.5px] text-muted truncate">{cat.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. DUAL EDITORIAL CAPSULES: WOMEN'S EDIT & MEN'S EDIT
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          
          {/* Women */}
          <Link
            to="/category/women"
            className="relative group overflow-hidden block bg-ink rounded-xs h-[300px] sm:h-[360px] md:h-[400px] shadow-sm hover:shadow-elevated transition-all duration-300"
          >
            <img
              src="/women-category.jpg"
              alt="Women's Edit"
              className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="badge-new text-[9px] mb-2 inline-block">Capsule 01</span>
              <h2 className="font-display text-4xl sm:text-5xl text-paper tracking-wide uppercase leading-none mb-1">
                Women's Edit
              </h2>
              <p className="text-xs sm:text-sm text-fog/75 max-w-sm mb-4 line-clamp-2">
                Sculpted totes, effortless crossbodys, and evening clutches tailored for modern grace.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-accent group-hover:underline">
                Explore Edit <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link
            to="/category/men"
            className="relative group overflow-hidden block bg-ink rounded-xs h-[300px] sm:h-[360px] md:h-[400px] shadow-sm hover:shadow-elevated transition-all duration-300"
          >
            <img
              src="/men-category.jpg"
              alt="Men's Edit"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="badge-new text-[9px] mb-2 inline-block">Capsule 02</span>
              <h2 className="font-display text-4xl sm:text-5xl text-paper tracking-wide uppercase leading-none mb-1">
                Men's Edit
              </h2>
              <p className="text-xs sm:text-sm text-fog/75 max-w-sm mb-4 line-clamp-2">
                Heritage briefcases, slim bifold wallets, and urban slings engineered to outlast the hype.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-accent group-hover:underline">
                Explore Edit <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. PRODUCT DISCOVERY: CURATED DROPS WITH GEN-Z VIBE CHIPS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-paper border-y border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="section-label mb-2">
                <span>✦</span> TRENDS TODAY • OLD IS GOLD
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink uppercase tracking-tight leading-none">
                Curated Drops & Vault Silhouettes
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-black uppercase tracking-widest text-ink hover:text-accent-dark flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>View All 12 Creations</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vibe Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
            {[
              { id: 'all', label: '⚡ All Drops' },
              { id: 'clean-girl', label: '✨ Clean Girl' },
              { id: 'commuter', label: '💼 Downtown Commuter' },
              { id: 'vintage', label: '🌿 Old Is Gold Vault' },
              { id: 'minimalist', label: '🎯 Minimalist' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setSelectedVibe(chip.id)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-150 rounded-xs ${
                  selectedVibe === chip.id
                    ? 'bg-ink text-accent shadow-xs'
                    : 'bg-fog border border-border text-ink/70 hover:text-ink hover:border-ink/40'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. EDITORIAL CAMPAIGN: THE BAG COLLECTIVE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-fog py-12 sm:py-16 border-b border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="relative overflow-hidden bg-paper border border-border rounded-xs shadow-subtle group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[400px] lg:min-h-[460px]">

              {/* Editorial Copy */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 z-10 flex flex-col justify-center">
                <span className="badge-new text-[9px] w-fit mb-4">Spring / Summer Capsule</span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight uppercase leading-[0.95] mb-4">
                  The Bag Collective
                </h2>
                <p className="text-sm sm:text-[15px] text-ink/70 leading-relaxed max-w-md mb-8">
                  Architectural silhouettes engineered with single-hide continuous construction. Heirloom grade, modern in cadence.
                </p>
                <div>
                  <Link
                    to="/products"
                    className="btn-primary px-8 py-3.5 text-xs font-black tracking-widest inline-flex items-center gap-2"
                  >
                    <span>DISCOVER DROP</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Editorial Photography */}
              <div className="lg:col-span-7 relative h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden">
                <img
                  src="/bag-collective-editorial.jpg"
                  alt="The Bag Collective"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div
                  className="hidden lg:block absolute inset-y-0 left-0 w-24 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, #FAFAF8 0%, rgba(250, 250, 248, 0) 100%)',
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. HIGH-CONTRAST BEST SELLERS (DEEP INK THEME)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-ink py-16 sm:py-24 text-fog">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-accent font-bold mb-2">
                ✦ Most Cherished Icons
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-none">
                Best Sellers
              </h2>
            </div>
            <Link
              to="/products?filter=bestseller"
              className="text-xs uppercase tracking-widest font-black text-accent hover:underline flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>View All Classics</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. BRAND MANIFESTO & OLD IS GOLD PHILOSOPHY
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-paper border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 flex justify-center">
            <BrandLogo variant="badge" />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent-mid font-bold mb-3">
            OLD IS GOLD • MORE THAN TRENDS
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink uppercase tracking-tight leading-none mb-6">
            Drip Built To Outlast<br />The Fast-Fashion Hype
          </h2>
          <p className="text-sm sm:text-base text-ink/75 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            In an era of hyper-disposable fast fashion, Avya Store was founded with a rebellious conviction: <strong className="text-ink">true style gets better with time</strong>. Crafted using 100% full-grain, vegetable-tanned leather that breathes and develops a personal, rich patina unique to your journey.
          </p>
          <Link
            to="/about"
            className="btn-primary px-8 py-3.5 text-xs font-black tracking-widest"
          >
            <span>READ OUR MANIFESTO</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          8. CLIENT CHRONICLES (TESTIMONIALS)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-fog border-b border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Verified Patron Reviews</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-none">
              Client Chronicles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-paper p-6 sm:p-7 border border-border/80 flex flex-col justify-between rounded-xs"
              >
                <div>
                  <Quote className="w-5 h-5 text-accent-mid mb-4 opacity-80" />
                  <p className="text-sm text-ink/80 leading-relaxed italic mb-6">"{t.text}"</p>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <StarRating rating={t.rating} />
                  <div className="flex items-center gap-1.5 mt-2">
                    <p className="text-xs font-bold text-ink">{t.name}</p>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-mid" />
                  </div>
                  <p className="text-[11px] text-muted">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          9. VIP DROP ALERTS (NEWSLETTER)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="badge-new text-[9px] mb-3 inline-block">Private Access</span>
          <h2 className="font-display text-4xl sm:text-5xl text-ink uppercase tracking-tight leading-none mb-3">
            Join the Inner Circle
          </h2>
          <p className="text-xs sm:text-sm text-ink/70 mb-8 leading-relaxed">
            Get confidential drop coordinates, private vault access, and archival previews straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="enter your email address"
              className="input text-xs py-3.5"
            />
            <button
              type="submit"
              className="btn-primary py-3.5 px-6 whitespace-nowrap text-xs font-black"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-[10px] text-muted mt-3">Zero spam. Pure signal. Unsubscribe whenever.</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
