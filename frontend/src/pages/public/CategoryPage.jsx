import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ShieldCheck, Award, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';

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
    badge: 'Men’s Atelier Capsule · Built For Decades',
    subCategories: [
      { id: 'all', label: 'All Men’s' },
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
    badge: 'Women’s Atelier Capsule · Handcrafted Elegance',
    subCategories: [
      { id: 'all', label: 'All Women’s' },
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

  const config = CATEGORY_CONFIG[gender] || CATEGORY_CONFIG.men;

  // Filter products by gender, then subcategory, then sort
  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (gender === 'men') {
        return p.gender === 'men';
      }
      return p.gender === 'women';
    });

    // Apply sub-category filter
    if (activeSubCat !== 'all') {
      if (activeSubCat === 'briefcase') {
        list = list.filter((p) => p.category === 'briefcase' || p.category === 'messenger');
      } else if (activeSubCat === 'wallet') {
        list = list.filter((p) => p.category === 'wallet' || p.category === 'cardholder' || p.category === 'clutch');
      } else if (activeSubCat === 'sling') {
        list = list.filter((p) => p.category === 'sling' || p.category === 'tote');
      } else if (activeSubCat === 'tote') {
        list = list.filter((p) => p.category === 'tote');
      } else if (activeSubCat === 'crossbody') {
        list = list.filter((p) => p.category === 'crossbody' || p.category === 'sling');
      } else {
        list = list.filter((p) => p.category === activeSubCat);
      }
    }

    // Apply sorting
    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return sorted;
  }, [gender, activeSubCat, sort]);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* ─── Hero Section with High-Resolution Atelier Imagery ─── */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center overflow-hidden bg-[#181412]">
        {/* Background Image with warm gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={config.image}
            alt={config.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/80 via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-brand-200/75 tracking-wider uppercase font-medium mb-5">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-gold-400 capitalize">{gender}</span>
          </nav>

          {/* Capsule Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              {config.badge}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            {config.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-brand-200/90 mt-2">
            {config.subtitle}
          </p>

          <p className="text-sm sm:text-base text-stone-300/85 mt-4 max-w-2xl leading-relaxed font-light">
            {config.description}
          </p>

          {/* Luxury Highlights Bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-8 pt-6 border-t border-white/15 text-xs text-brand-100/80 font-medium">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-400" /> Certified 100% Full-Grain Hide
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" /> Solid Antique Brass Accents
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>Free Express Pan-India Delivery</span>
          </div>
        </div>
      </section>

      {/* ─── Main Shop Container ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Controls & Subcategory Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-200/80 mb-8">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {config.subCategories.map((sub) => {
              const isActive = activeSubCat === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubCat(sub.id)}
                  className={`whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#1A1715] text-white border-[#1A1715] shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-brand-400 hover:text-stone-950'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Count & Sort */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <p className="text-xs text-stone-500 tracking-wider uppercase font-medium">
              Showing <strong className="text-[#1A1715] font-bold">{products.length}</strong> pieces
            </p>

            <div className="relative min-w-[190px]">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-white border border-stone-200 text-xs text-[#1A1715] font-medium py-2.5 pl-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:border-brand-700 transition-colors uppercase tracking-wider"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ─── Product Grid ─── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white border border-stone-200/80 p-8 my-8">
            <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1A1715] mb-2">No Products Found</h3>
            <p className="text-sm text-stone-500 mb-5">
              No products found in this specific subcategory filter.
            </p>
            <button
              onClick={() => setActiveSubCat('all')}
              className="btn-primary text-xs tracking-wider uppercase px-6 py-2.5"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ─── Artisanal Craftsmanship Assurance Strip ─── */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 bg-white border border-brand-200/60 shadow-subtle relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-700 block mb-2">
              The Atelier Guarantee
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1715] mb-3">
              Crafted by Hand. Never Mass-Produced.
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-light mb-6">
              Every hide selected for {config.title.toLowerCase()} undergoes traditional vegetable tanning using natural tree barks and oils. Our master craftsmen in Old Delhi cut, stitch, and edge-burnish each piece with unyielding precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1A1715] hover:text-brand-700 transition-colors underline underline-offset-4"
              >
                Read our Leather Heritage <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-stone-300">|</span>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1A1715] hover:text-brand-700 transition-colors underline underline-offset-4"
              >
                Explore All Collections <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
