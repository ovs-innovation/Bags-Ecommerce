import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import { BRAND_CONFIG } from '../../constants/config';
import ProductCard from '../../components/product/ProductCard';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'Newest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

const GENDERS = [
  { value: 'all',    label: 'All' },
  { value: 'women',  label: 'Women' },
  { value: 'men',    label: 'Men' },
  { value: 'unisex', label: 'Unisex' },
];

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('search') || '';
  const urlFilter = searchParams.get('filter');

  const [search, setSearch] = useState(urlQuery);
  const [gender, setGender] = useState('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState(() => {
    if (urlFilter === 'new') return 'newest';
    if (urlFilter === 'bestseller') return 'featured';
    return 'featured';
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(20000);

  const [prevQuery, setPrevQuery] = useState(urlQuery);
  if (urlQuery !== prevQuery) {
    setPrevQuery(urlQuery);
    setSearch(urlQuery);
  }

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.category.includes(q) ||
        p.color.toLowerCase().includes(q)
      );
    }
    if (gender !== 'all') {
      list = list.filter((p) => p.gender === gender || p.gender === 'unisex');
    }
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case 'newest':     list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)); break;
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [search, gender, category, sort, priceMax]);

  const clearFilters = () => {
    setSearch(''); setGender('all'); setCategory('all');
    setSort('featured'); setPriceMax(20000);
  };

  const hasFilters = search || gender !== 'all' || category !== 'all' || priceMax < 20000;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Page Header */}
      <div className="bg-[#1A1715] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-3">Explore</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">All Collections</h1>
          <p className="text-sm text-white/50 mt-3 max-w-xl mx-auto">
            Full-grain leather purses, handbags, wallets, and accessories — handcrafted in India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Search + Controls ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bags, wallets, colour..."
              className="form-input pl-10"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-input pr-8 appearance-none cursor-pointer w-full sm:w-auto"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden flex items-center gap-2 form-input justify-center"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* ── Gender pills ── */}
        <div className="flex gap-2 flex-wrap mb-4">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              onClick={() => setGender(g.value)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                gender === g.value
                  ? 'bg-[#1A1715] text-white border-[#1A1715]'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-brand-400'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* ── Category pills ── */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-1.5 text-xs font-medium transition-all duration-200 rounded-full border ${
                category === c.id
                  ? 'bg-brand-800 text-white border-brand-800'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-brand-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Price filter + clear */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 p-4 bg-white border border-brand-200">
          <div className="flex items-center gap-3 flex-1">
            <label className="text-xs font-semibold text-stone-700 whitespace-nowrap">
              Max Price: {BRAND_CONFIG.currency}{priceMax.toLocaleString('en-IN')}
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="flex-1 accent-brand-800"
            />
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs font-semibold text-cognac-600 hover:text-cognac-700 whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          )}
          <p className="text-xs text-stone-500 whitespace-nowrap">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* ── Product Grid ── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-brand-700" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1A1715] mb-2">No Products Found</h3>
            <p className="text-sm text-stone-500 mb-6">Try adjusting your search or filters.</p>
            <button onClick={clearFilters} className="btn-primary text-sm px-6 py-2.5">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
