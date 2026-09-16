import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, ChevronDown, Check,
  RotateCcw, Filter, Grid2X2, Grid3X3
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'Newest' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

const COLOR_OPTIONS = [
  { name: 'All',      hex: 'linear-gradient(135deg, #FAF7F2 0%, #1A1612 100%)' },
  { name: 'Cognac',   hex: '#9A3412' },
  { name: 'Black',    hex: '#141413' },
  { name: 'Brown',    hex: '#6B3A2A' },
  { name: 'Tan',      hex: '#C49758' },
  { name: 'Espresso', hex: '#2E1C14' },
];

const MATERIAL_OPTIONS = [
  { id: 'all',       label: 'All Materials' },
  { id: 'full-grain', label: 'Full-Grain Leather' },
  { id: 'veg-tanned', label: 'Vegetable-Tanned' },
  { id: 'pebbled',   label: 'Pebbled Leather' },
  { id: 'pull-up',   label: 'Pull-Up Leather' },
];

const SIZE_OPTIONS = [
  { id: 'all',    label: 'All Sizes' },
  { id: 'small',  label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large',  label: 'Large' },
];

const PRICE_PRESETS = [
  { label: 'All', max: 20000 },
  { label: 'Under ₹5,000', max: 5000 },
  { label: '₹5,000 – ₹8,000', max: 8000 },
  { label: '₹8,000 – ₹12,000', max: 12000 },
  { label: 'Above ₹12,000', max: 20000 },
];

// Helper to determine product size based on category & dimensions
const getProductSizeCategory = (product) => {
  if (['wallet', 'cardholder', 'clutch'].includes(product.category)) return 'small';
  if (['crossbody', 'sling'].includes(product.category)) return 'medium';
  if (['tote', 'messenger'].includes(product.category)) return 'large';
  return 'medium';
};

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch]                     = useState(() => searchParams.get('search') || '');
  const [gender, setGender]                     = useState('all');
  const [category, setCategory]                 = useState('all');
  const [color, setColor]                       = useState('All');
  const [material, setMaterial]                 = useState('all');
  const [size, setSize]                         = useState('all');
  const [priceMax, setPriceMax]                 = useState(20000);
  const [sort, setSort]                         = useState(() => {
    const f = searchParams.get('filter');
    if (f === 'new') return 'newest';
    return 'featured';
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols]                 = useState(3);

  const urlQuery = searchParams.get('search') || '';
  const [prevQuery, setPrevQuery] = useState(urlQuery);
  if (urlQuery !== prevQuery) {
    setPrevQuery(urlQuery);
    setSearch(urlQuery);
  }

  // Dynamic counts for facet labels
  const counts = useMemo(() => {
    return {
      all: PRODUCTS.length,
      categories: CATEGORIES.reduce((acc, cat) => {
        acc[cat.id] = cat.id === 'all'
          ? PRODUCTS.length
          : PRODUCTS.filter((p) => p.category === cat.id).length;
        return acc;
      }, {}),
    };
  }, []);

  // Filtered & Sorted products
  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.color?.toLowerCase().includes(q) ||
          p.material?.toLowerCase().includes(q)
      );
    }

    // Gender filter
    if (gender !== 'all') {
      list = list.filter((p) => p.gender === gender || p.gender === 'unisex');
    }

    // Category filter
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    // Color filter
    if (color !== 'All') {
      const colLower = color.toLowerCase();
      list = list.filter((p) => {
        const c = p.color?.toLowerCase() || '';
        if (colLower === 'black') return c.includes('black') || c.includes('onyx');
        if (colLower === 'brown') return c.includes('brown') || c.includes('chestnut') || c.includes('mahogany');
        return c.includes(colLower);
      });
    }

    // Material filter
    if (material !== 'all') {
      list = list.filter((p) => {
        const m = p.material?.toLowerCase() || '';
        if (material === 'full-grain') return m.includes('full-grain');
        if (material === 'veg-tanned') return m.includes('vegetable');
        if (material === 'pebbled') return m.includes('pebbled');
        if (material === 'pull-up') return m.includes('pull-up');
        return true;
      });
    }

    // Size filter
    if (size !== 'all') {
      list = list.filter((p) => getProductSizeCategory(p) === size);
    }

    // Price filter
    list = list.filter((p) => p.price <= priceMax);

    // Sorting
    switch (sort) {
      case 'newest':
        list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [search, gender, category, color, material, size, priceMax, sort]);

  const clearAllFilters = () => {
    setSearch('');
    setGender('all');
    setCategory('all');
    setColor('All');
    setMaterial('all');
    setSize('all');
    setPriceMax(20000);
    setSort('featured');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count++;
    if (gender !== 'all') count++;
    if (category !== 'all') count++;
    if (color !== 'All') count++;
    if (material !== 'all') count++;
    if (size !== 'all') count++;
    if (priceMax < 20000) count++;
    return count;
  }, [search, gender, category, color, material, size, priceMax]);

  // Filter sidebar content with clean, simple language: Category, Price, Color, Materials, Size
  const renderFilterContent = () => (
    <div className="space-y-6 text-xs text-[#1A1612]">

      {/* ── Category ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1612]">
            Category
          </label>
          {category !== 'all' && (
            <button
              onClick={() => setCategory('all')}
              className="text-[10px] text-[#7F5E38] hover:text-black underline uppercase"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((c) => {
            const isSelected = category === c.id;
            const count = counts.categories[c.id] || 0;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left rounded-sm transition-colors text-xs ${
                  isSelected
                    ? 'font-bold bg-[#FAF7F2] text-[#1A1612] border-l-2 border-[#1A1612]'
                    : 'text-stone-600 hover:text-black hover:bg-stone-50'
                }`}
              >
                <span>{c.label}</span>
                <span className="text-[10px] text-stone-400">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Price ── */}
      <div className="pt-4 border-t border-[#EDE6DC]">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1612]">
            Price
          </label>
          <span className="text-xs font-bold text-[#1A1612]">
            Up to ₹{priceMax.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="1500"
          max="20000"
          step="500"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full h-1.5 bg-stone-200 accent-[#1A1612] rounded-lg cursor-pointer my-1.5"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mb-2">
          <span>₹1,500</span>
          <span>₹20,000</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {PRICE_PRESETS.slice(1).map((p) => (
            <button
              key={p.label}
              onClick={() => setPriceMax(p.max)}
              className={`py-1 px-2 text-[10.5px] rounded-sm border transition-all text-center ${
                priceMax === p.max
                  ? 'bg-[#1A1612] text-white border-[#1A1612] font-semibold'
                  : 'bg-white border-[#EDE6DC] text-stone-600 hover:border-black'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Color ── */}
      <div className="pt-4 border-t border-[#EDE6DC]">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1612]">
            Color
          </label>
          {color !== 'All' && (
            <span className="text-[10px] font-bold text-[#1A1612]">{color}</span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = color === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`flex items-center gap-2 p-1.5 rounded-sm border transition-all ${
                  isSelected
                    ? 'border-[#1A1612] bg-[#FAF7F2] font-bold text-[#1A1612]'
                    : 'border-[#EDE6DC] bg-white text-stone-600 hover:border-stone-400'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                  style={{ background: c.hex }}
                />
                <span className="text-[10.5px] truncate">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Materials ── */}
      <div className="pt-4 border-t border-[#EDE6DC]">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1612]">
            Materials
          </label>
          {material !== 'all' && (
            <button
              onClick={() => setMaterial('all')}
              className="text-[10px] text-[#7F5E38] hover:text-black underline uppercase"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1">
          {MATERIAL_OPTIONS.map((m) => {
            const isSelected = material === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMaterial(m.id)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-left transition-colors ${
                  isSelected
                    ? 'font-bold bg-[#FAF7F2] text-[#1A1612] border-l-2 border-[#1A1612]'
                    : 'text-stone-600 hover:text-black hover:bg-stone-50'
                }`}
              >
                <span className="text-xs">{m.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1A1612]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Size ── */}
      <div className="pt-4 border-t border-[#EDE6DC]">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1612]">
            Size
          </label>
          {size !== 'all' && (
            <button
              onClick={() => setSize('all')}
              className="text-[10px] text-[#7F5E38] hover:text-black underline uppercase"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1">
          {SIZE_OPTIONS.map((s) => {
            const isSelected = size === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-left transition-colors ${
                  isSelected
                    ? 'font-bold bg-[#FAF7F2] text-[#1A1612] border-l-2 border-[#1A1612]'
                    : 'text-stone-600 hover:text-black hover:bg-stone-50'
                }`}
              >
                <span className="text-xs">{s.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1A1612]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Clear All Filters ── */}
      {activeFilterCount > 0 && (
        <div className="pt-3 border-t border-[#EDE6DC]">
          <button
            onClick={clearAllFilters}
            className="w-full py-2.5 px-4 border border-[#EDE6DC] bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters ({activeFilterCount})</span>
          </button>
        </div>
      )}

    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1612]">
      
      {/* ── Banner Header ── */}
      <div className="bg-[#15120F] text-white py-12 sm:py-16 border-b border-[#2C241E]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#E6C687] font-semibold mb-2">
            Handcrafted Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7F2]">
            All Products
          </h1>
          <p className="text-xs sm:text-sm text-[#A89D91] mt-2 max-w-lg mx-auto">
            Explore authentic full-grain leather bags, wallets, and handcrafted accessories.
          </p>
        </div>
      </div>

      {/* ── Catalog with Left Filter Sidebar ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
          
          {/* ══════════════════════════════════════════════════════
              LEFT SIDEBAR: SIMPLE, CLEAN FILTERS
              ══════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-24">
            <div className="bg-white border border-[#EDE6DC] p-5 shadow-subtle rounded-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EDE6DC]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#7F5E38]" />
                  <span className="font-serif text-base font-semibold text-[#1A1612]">
                    Filters
                  </span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] text-[#7F5E38] hover:text-black font-semibold underline"
                  >
                    Clear all ({activeFilterCount})
                  </button>
                )}
              </div>

              {renderFilterContent()}
            </div>
          </aside>

          {/* ══════════════════════════════════════════════════════
              RIGHT MAIN PRODUCT GRID
              ══════════════════════════════════════════════════════ */}
          <main className="flex-1 min-w-0 w-full">
            
            {/* Top Bar: Search & Catalog Controls */}
            <div className="bg-white border border-[#EDE6DC] shadow-subtle p-4 sm:p-5 rounded-sm mb-6 space-y-3.5">
              
              {/* Luxury Full-Width Search Input */}
              <div className="relative group">
                <div className="relative flex items-center bg-[#FAF7F2] border border-[#EDE6DC] focus-within:border-[#1A1612] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#1A1612] transition-all duration-200 rounded-sm">
                  <div className="pl-4 pr-2 text-[#7F5E38] group-focus-within:text-[#1A1612] transition-colors pointer-events-none">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search bags by name, color, leather material, or category..."
                    className="w-full py-2.5 sm:py-3 pr-24 text-xs sm:text-sm text-[#1A1612] placeholder-stone-400 bg-transparent focus:outline-none"
                  />
                  {search ? (
                    <div className="absolute right-3 flex items-center gap-2">
                      <span className="hidden sm:inline text-[11px] font-semibold text-[#7F5E38] bg-[#FAF7F2] border border-[#EDE6DC] px-2 py-0.5 rounded-xs">
                        {filtered.length} found
                      </span>
                      <button
                        onClick={() => setSearch('')}
                        className="w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 hover:text-black flex items-center justify-center transition-colors"
                        title="Clear search"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="absolute right-3 hidden sm:flex items-center text-[10.5px] text-stone-400 tracking-wider uppercase font-medium select-none pointer-events-none">
                      <span>Search Catalog</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Second Row: Results count, Quick keywords, Sort, and Grid Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#EDE6DC]/60">
                
                {/* Left: Mobile filter button + count & popular tags */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1612] text-white text-xs font-semibold rounded-sm uppercase tracking-wider hover:bg-[#2C241E] transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#E6C687]" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#E6C687] text-[#1A1612] text-[10px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-[#5C534A]">
                    Showing <span className="font-bold text-[#1A1612]">{filtered.length}</span> of{' '}
                    <span className="font-bold text-[#1A1612]">{PRODUCTS.length}</span> products
                  </p>

                  {/* Quick trending search tags */}
                  <div className="hidden xl:flex items-center gap-1.5 ml-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Trending:</span>
                    {['Tote', 'Cognac', 'Crossbody', 'Wallet'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearch(term)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-colors ${
                          search.toLowerCase() === term.toLowerCase()
                            ? 'bg-[#1A1612] text-white border-[#1A1612] font-semibold'
                            : 'bg-[#FAF7F2] border-[#EDE6DC] text-stone-600 hover:border-stone-400 hover:text-black'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Grid Switcher + Sort Dropdown */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="hidden xl:flex items-center border border-[#EDE6DC] rounded-sm bg-[#FAF7F2]">
                    <button
                      onClick={() => setGridCols(2)}
                      className={`p-1.5 transition-colors ${
                        gridCols === 2 ? 'bg-white shadow-xs text-black font-bold' : 'text-stone-400 hover:text-black'
                      }`}
                      title="Larger Cards (3 Cols)"
                    >
                      <Grid2X2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(3)}
                      className={`p-1.5 transition-colors ${
                        gridCols === 3 ? 'bg-white shadow-xs text-black font-bold' : 'text-stone-400 hover:text-black'
                      }`}
                      title="Compact Cards (4 Cols)"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative flex items-center gap-2">
                    <span className="hidden sm:inline text-xs text-stone-500 font-medium">Sort:</span>
                    <div className="relative">
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-3 py-1.5 pr-7 bg-[#FAF7F2] border border-[#EDE6DC] text-xs font-semibold text-[#1A1612] rounded-sm cursor-pointer appearance-none uppercase tracking-wider focus:outline-none focus:border-[#1A1612]"
                      >
                        {SORT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-5">
                <span className="text-[11px] font-semibold text-stone-500 mr-1">Active:</span>

                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full">
                    <span>"{search}"</span>
                    <button onClick={() => setSearch('')} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {gender !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full capitalize">
                    <span>{gender}</span>
                    <button onClick={() => setGender('all')} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full">
                    <span>{CATEGORIES.find((c) => c.id === category)?.label}</span>
                    <button onClick={() => setCategory('all')} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {color !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full">
                    <span>Color: {color}</span>
                    <button onClick={() => setColor('All')} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {material !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full">
                    <span>{MATERIAL_OPTIONS.find((m) => m.id === material)?.label}</span>
                    <button onClick={() => setMaterial('all')} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {size !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full">
                    <span>Size: {size}</span>
                    <button onClick={() => setSize('all')} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {priceMax < 20000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EDE6DC] text-xs text-[#1A1612] rounded-full">
                    <span>Under ₹{priceMax.toLocaleString('en-IN')}</span>
                    <button onClick={() => setPriceMax(20000)} className="text-stone-400 hover:text-black">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#7F5E38] hover:text-black underline font-semibold ml-1"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Product Grid or Empty State */}
            {filtered.length === 0 ? (
              <div className="bg-white border border-[#EDE6DC] p-12 text-center rounded-sm">
                <p className="font-serif text-xl font-normal text-[#1A1612] mb-2">
                  No Products Match Your Filters
                </p>
                <p className="text-xs text-stone-500 mb-6">
                  Try clearing some filter criteria to view more products.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-[#1A1612] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2F2620]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 ${
                  gridCols === 2
                    ? 'sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                    : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
                }`}
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* ── Mobile Slide-Out Filter Drawer ── */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
            <div className="p-4 border-b border-[#EDE6DC] flex items-center justify-between bg-[#FAF7F2]">
              <span className="font-serif text-base font-bold text-[#1A1612]">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-stone-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterContent()}
            </div>
            <div className="p-3 border-t border-[#EDE6DC] bg-[#FAF7F2] flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-[#EDE6DC] bg-white text-xs font-semibold uppercase text-[#1A1612]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-2.5 bg-[#1A1612] text-white text-xs font-semibold uppercase hover:bg-[#2C241E]"
              >
                Show ({filtered.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsPage;
