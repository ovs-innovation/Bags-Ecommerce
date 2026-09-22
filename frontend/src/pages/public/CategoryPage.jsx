import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ShieldCheck, Award, Sparkles, Filter, Loader2, ArrowUpRight } from 'lucide-react';
import ProductCard from '../../components/product/ProductCard';
import { productService } from '../../services/api';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured Collection' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Customer Rating' },
];

const CATEGORY_CONFIG = {
  men: {
    title: "Men's Leather Collection",
    subtitle: 'Heirloom Briefcases, Wallets & Messenger Bags',
    description:
      'Engineered from heavyweight full-grain vegetable-tanned hides. Built with saddle-stitched stress points, hand-burnished edges, and solid antique brass hardware designed to develop a distinguished patina over decades.',
    image: '/men-category.jpg',
    badge: "Men's Atelier Capsule · Built For Decades",
    subCategories: [
      { id: 'all', label: "All Men's" },
      { id: 'briefcase', label: 'Briefcases & Messengers' },
      { id: 'wallet', label: 'Wallets & Cardholders' },
      { id: 'sling', label: 'Slings & Totes' },
    ],
  },
  women: {
    title: "Women's Leather Collection",
    subtitle: 'Artisanal Totes, Crossbodys & Clutches',
    description:
      'Curated silhouettes crafted from buttery-soft vegetable-tanned nappa and pebbled grain hides. Designed for grace, effortless daily carry, and enduring tactile elegance.',
    image: '/women-category.jpg',
    badge: "Women's Atelier Capsule · Handcrafted Elegance",
    subCategories: [
      { id: 'all', label: "All Women's" },
      { id: 'tote', label: 'Totes & Handbags' },
      { id: 'crossbody', label: 'Crossbody & Slings' },
      { id: 'wallet', label: 'Clutches & Wallets' },
    ],
  },
};

export const CategoryPage = () => {
  const { gender = 'men' } = useParams();
  const [activeSubCat, setActiveSubCat] = useState('all');
  const [sort, setSort] = useState('featured');
  const [liveProducts, setLiveProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    productService
      .getProducts()
      .then((data) => {
        if (isMounted && data.products && Array.isArray(data.products)) {
          setLiveProducts(
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
        console.warn('CategoryPage failed to load products:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const config = CATEGORY_CONFIG[gender] || CATEGORY_CONFIG.men;

  const products = useMemo(() => {
    let list = liveProducts.filter((p) => {
      const g = (p.gender || '').toLowerCase();
      if (gender === 'men') {
        return g === 'men' || g === 'unisex';
      }
      return g === 'women' || g === 'unisex';
    });

    if (activeSubCat !== 'all') {
      const sub = activeSubCat.toLowerCase();
      if (sub === 'briefcase') {
        list = list.filter((p) => p.category === 'briefcase' || p.category === 'messenger');
      } else if (sub === 'wallet') {
        list = list.filter((p) => p.category === 'wallet' || p.category === 'cardholder' || p.category === 'clutch');
      } else if (sub === 'sling') {
        list = list.filter((p) => p.category === 'sling' || p.category === 'tote');
      } else if (sub === 'tote') {
        list = list.filter((p) => p.category === 'tote');
      } else if (sub === 'crossbody') {
        list = list.filter((p) => p.category === 'crossbody' || p.category === 'sling');
      } else {
        list = list.filter((p) => p.category === sub);
      }
    }

    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return sorted;
  }, [liveProducts, gender, activeSubCat, sort]);

  return (
    <div className="min-h-screen bg-fog text-ink">

      {/* ─── Hero Section with High-Impact Imagery ─── */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <img
            src={config.image}
            alt={config.title}
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-fog/60 tracking-wider uppercase font-bold mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-accent capitalize">{gender}</span>
          </nav>

          {/* Capsule Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-xs bg-white/10 backdrop-blur-md border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              {config.badge}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none">
            {config.title}
          </h1>

          <p className="font-serif italic text-base sm:text-xl text-fog/90 mt-2">
            "{config.subtitle}"
          </p>

          <p className="text-xs sm:text-sm text-fog/70 mt-4 max-w-2xl leading-relaxed font-light">
            {config.description}
          </p>

          {/* Highlights Bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-8 pt-6 border-t border-white/15 text-xs text-fog/80 font-semibold">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" /> 100% Full-Grain Hide
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" /> Solid Antique Hardware
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Free Express Pan-India Delivery</span>
          </div>
        </div>
      </section>

      {/* ─── Main Shop Container ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        {/* Controls & Subcategory Bar */}
        <div className="bg-paper border border-border p-4 rounded-xs shadow-subtle mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {config.subCategories.map((sub) => {
              const isActive = activeSubCat === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubCat(sub.id)}
                  className={`whitespace-nowrap px-4 py-2 text-xs font-black uppercase tracking-wider transition-all rounded-xs border ${
                    isActive
                      ? 'bg-ink text-accent border-ink'
                      : 'bg-fog text-ink/70 border-border hover:border-ink hover:text-ink'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Count & Sort */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <p className="text-xs text-ink/70 uppercase font-semibold">
              Showing <strong className="text-ink font-black">{products.length}</strong> creations
            </p>

            <div className="relative min-w-[180px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-fog border border-border text-xs text-ink font-bold py-2 pl-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:border-ink uppercase tracking-wider rounded-xs"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center bg-paper border border-border rounded-xs">
            <Loader2 className="w-8 h-8 text-ink animate-spin mx-auto mb-3" />
            <p className="text-xs text-muted font-bold tracking-widest uppercase">Loading collection...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-paper border border-border p-8 rounded-xs">
            <Filter className="w-10 h-10 text-muted mx-auto mb-3" />
            <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">No Creations Found</h3>
            <p className="text-xs text-muted mb-5">
              No products found in this subcategory.
            </p>
            <button
              onClick={() => setActiveSubCat('all')}
              className="btn-primary text-xs font-black tracking-widest px-6 py-2.5"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Artisanal Craftsmanship Assurance Strip */}
        <div className="mt-16 p-8 sm:p-12 bg-paper border border-border shadow-subtle rounded-xs relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="badge-new text-[9px] mb-3 inline-block">The Atelier Standard</span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink uppercase tracking-tight mb-3">
              Crafted by Hand. Never Mass-Produced.
            </h2>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light mb-6">
              Every hide selected for {config.title.toLowerCase()} undergoes traditional vegetable tanning using natural tree barks and oils. Our master craftsmen cut, saddle-stitch, and edge-burnish each piece with unyielding precision.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent-mid flex items-center gap-1 underline underline-offset-4"
              >
                Read our Heritage <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-muted/40">|</span>
              <Link
                to="/products"
                className="text-xs font-bold uppercase tracking-widest text-ink hover:text-accent-mid flex items-center gap-1 underline underline-offset-4"
              >
                Explore All Creations <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
