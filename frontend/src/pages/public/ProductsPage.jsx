import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, ChevronDown, Check,
  RotateCcw, Filter, Grid2X2, Grid3X3, Loader2, ArrowUpRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';
import { productService } from '../../services/api';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'Newest Drops' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
];

const COLOR_OPTIONS = [
  { name: 'All',      hex: 'linear-gradient(135deg, #FAFAF8 0%, #0A0A0A 100%)' },
  { name: 'Cognac',   hex: '#9A3412' },
  { name: 'Black',    hex: '#0A0A0A' },
  { name: 'Brown',    hex: '#5C382A' },
  { name: 'Tan',      hex: '#B88648' },
  { name: 'Espresso', hex: '#24140D' },
];

const MATERIAL_OPTIONS = [
  { id: 'all',        label: 'All Materials' },
  { id: 'full-grain', label: 'Full-Grain Leather' },
  { id: 'veg-tanned', label: 'Vegetable-Tanned' },
  { id: 'pebbled',    label: 'Pebbled Leather' },
  { id: 'pull-up',    label: 'Pull-Up Leather' },
];

const SIZE_OPTIONS = [
  { id: 'all',    label: 'All Sizes' },
  { id: 'small',  label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large',  label: 'Large' },
];

const PRICE_PRESETS = [
  { label: 'All', max: 20000 },
  { label: 'Under ₹5k', max: 5000 },
  { label: '₹5k – ₹8k', max: 8000 },
  { label: '₹8k – ₹12k', max: 12000 },
  { label: 'Above ₹12k', max: 20000 },
];

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

  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        if (isMounted && data.products && Array.isArray(data.products)) {
          const normalized = data.products.map((p) => ({
            ...p,
            id: p._id || p.id,
            material: p.material || 'Full-Grain Leather',
            color: p.color || 'Cognac',
            rating: p.rating || 4.8,
            reviewCount: p.reviewCount || 0,
            images:
              Array.isArray(p.images) && p.images.length > 0
                ? p.images
                : ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'],
          }));
          setProducts(normalized);
        }
      } catch (err) {
        console.warn('Could not load products from API:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLiveProducts();
    return () => { isMounted = false; };
  }, []);

  // Compute facet counts
  const counts = useMemo(() => {
    const res = {
      categories: {},
      genders: { all: products.length, men: 0, women: 0, unisex: 0 },
    };
    products.forEach((p) => {
      res.categories[p.category] = (res.categories[p.category] || 0) + 1;
      const g = (p.gender || '').toLowerCase();
      if (g.includes('men') && !g.includes('women')) res.genders.men++;
      else if (g.includes('women')) res.genders.women++;
      else res.genders.unisex++;
    });
    return res;
  }, [products]);

  // Filtered and sorted products
  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.color && p.color.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    if (gender !== 'all') {
      list = list.filter((p) => p.gender === gender || p.gender === 'unisex');
    }

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (color !== 'All') {
      const colLower = color.toLowerCase();
      list = list.filter((p) => {
        const c = p.color?.toLowerCase() || '';
        if (colLower === 'black') return c.includes('black') || c.includes('onyx');
        if (colLower === 'brown') return c.includes('brown') || c.includes('chestnut') || c.includes('mahogany');
        return c.includes(colLower);
      });
    }

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

    if (size !== 'all') {
      list = list.filter((p) => getProductSizeCategory(p) === size);
    }

    list = list.filter((p) => p.price <= priceMax);

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
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, search, gender, category, color, material, size, priceMax, sort]);

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

  // Filter content
  const renderFilterContent = () => (
    <div className="space-y-6 text-xs text-ink">

      {/* ── Category ── */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-[11px] font-black uppercase tracking-widest text-ink">
            Category
          </label>
          {category !== 'all' && (
            <button
              onClick={() => setCategory('all')}
              className="text-[10px] font-bold text-accent-mid hover:text-ink underline uppercase"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          {CATEGORIES.map((c) => {
            const isSelected = category === c.id;
            const count = counts.categories[c.id] || 0;
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left rounded-xs transition-colors text-xs ${
                  isSelected
                    ? 'font-bold bg-ink text-accent'
                    : 'text-ink/70 hover:text-ink hover:bg-fog'
                }`}
              >
                <span>{c.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-accent' : 'text-muted'}`}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Price ── */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-ink">
            Price Cap
          </label>
          <span className="text-xs font-bold text-ink">
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
          className="w-full h-1.5 bg-border accent-ink rounded-lg cursor-pointer my-2"
        />
        <div className="flex justify-between text-[10px] text-muted mb-2.5">
          <span>₹1,500</span>
          <span>₹20,000</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {PRICE_PRESETS.slice(1).map((p) => (
            <button
              key={p.label}
              onClick={() => setPriceMax(p.max)}
              className={`py-1.5 px-2 text-[10.5px] rounded-xs border transition-all text-center ${
                priceMax === p.max
                  ? 'bg-ink text-accent border-ink font-bold'
                  : 'bg-paper border-border text-ink/70 hover:border-ink hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Color ── */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-[11px] font-black uppercase tracking-widest text-ink">
            Color
          </label>
          {color !== 'All' && (
            <span className="text-[10px] font-bold text-accent-mid uppercase">{color}</span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = color === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`flex items-center gap-1.5 p-1.5 rounded-xs border transition-all ${
                  isSelected
                    ? 'border-ink bg-ink text-accent font-bold'
                    : 'border-border bg-paper text-ink/70 hover:border-ink/40'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/20 flex-shrink-0"
                  style={{ background: c.hex }}
                />
                <span className="text-[10px] truncate">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Materials ── */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-ink">
            Materials
          </label>
          {material !== 'all' && (
            <button
              onClick={() => setMaterial('all')}
              className="text-[10px] font-bold text-accent-mid hover:text-ink underline uppercase"
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
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs text-left transition-colors ${
                  isSelected
                    ? 'font-bold bg-ink text-accent'
                    : 'text-ink/70 hover:text-ink hover:bg-fog'
                }`}
              >
                <span className="text-xs">{m.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Size ── */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-ink">
            Size
          </label>
          {size !== 'all' && (
            <button
              onClick={() => setSize('all')}
              className="text-[10px] font-bold text-accent-mid hover:text-ink underline uppercase"
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
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs text-left transition-colors ${
                  isSelected
                    ? 'font-bold bg-ink text-accent'
                    : 'text-ink/70 hover:text-ink hover:bg-fog'
                }`}
              >
                <span className="text-xs">{s.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Clear All Filters ── */}
      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-border">
          <button
            onClick={clearAllFilters}
            className="w-full py-2.5 px-4 border border-border bg-paper hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 rounded-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters ({activeFilterCount})</span>
          </button>
        </div>
      )}

    </div>
  );

  return (
    <div className="min-h-screen bg-fog text-ink">

      {/* ── Editorial Banner Header ── */}
      <div className="bg-ink text-fog py-12 sm:py-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <span className="badge-new text-[9px] mb-3 inline-block">Atelier Vault</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
            All Creations
          </h1>
          <p className="text-xs sm:text-sm text-fog/60 mt-3 max-w-lg mx-auto font-light leading-relaxed">
            Authentic full-grain vegetable-tanned leather silhouettes, architectural tech folios, and everyday statement accessories.
          </p>
        </div>
      </div>

      {/* ── Catalog with Left Filter Sidebar ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 xl:gap-10 items-start">

          {/* LEFT SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 sticky top-24">
            <div className="bg-paper border border-border p-5 rounded-xs shadow-subtle">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-ink" />
                  <span className="font-sans text-sm font-extrabold uppercase tracking-wider text-ink">
                    Filters
                  </span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] text-accent-mid hover:text-ink font-bold underline"
                  >
                    Clear all ({activeFilterCount})
                  </button>
                )}
              </div>

              {renderFilterContent()}
            </div>
          </aside>

          {/* MAIN PRODUCT CATALOG */}
          <main className="flex-1 min-w-0 w-full">

            {/* Top Bar: Search & Catalog Controls */}
            <div className="bg-paper border border-border shadow-subtle p-4 sm:p-5 rounded-xs mb-6 space-y-3.5">

              {/* Search Box */}
              <div className="relative group">
                <div className="relative flex items-center bg-fog border border-border focus-within:border-ink focus-within:bg-paper transition-all duration-200 rounded-xs">
                  <div className="pl-4 pr-2 text-muted group-focus-within:text-ink transition-colors pointer-events-none">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by silhouette, leather, color, or style..."
                    className="w-full py-2.5 sm:py-3 pr-24 text-xs sm:text-sm text-ink placeholder-muted bg-transparent focus:outline-none"
                  />
                  {search ? (
                    <div className="absolute right-3 flex items-center gap-2">
                      <span className="hidden sm:inline text-[11px] font-bold text-ink bg-paper border border-border px-2 py-0.5 rounded-xs">
                        {filtered.length} found
                      </span>
                      <button
                        onClick={() => setSearch('')}
                        className="w-5 h-5 rounded-full bg-border hover:bg-ink hover:text-white text-ink flex items-center justify-center transition-colors"
                        title="Clear search"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="absolute right-3 hidden sm:flex items-center text-[10.5px] text-muted tracking-widest uppercase font-bold select-none pointer-events-none">
                      <span>Instant Search</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Second Row: Filter triggers, Results, Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border">

                {/* Mobile Filter Button + Count */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-ink text-accent text-xs font-black rounded-xs uppercase tracking-wider hover:bg-[#1a1a1a] transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-accent text-ink text-[10px] font-black flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <p className="text-xs text-ink/70">
                    Showing <span className="font-extrabold text-ink">{filtered.length}</span> of{' '}
                    <span className="font-extrabold text-ink">{products.length}</span> creations
                  </p>
                </div>

                {/* Right: Grid Switcher + Sort */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="hidden xl:flex items-center border border-border rounded-xs bg-fog">
                    <button
                      onClick={() => setGridCols(2)}
                      className={`p-1.5 transition-colors ${
                        gridCols === 2 ? 'bg-paper shadow-xs text-ink font-bold' : 'text-muted hover:text-ink'
                      }`}
                      title="Larger Cards"
                    >
                      <Grid2X2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(3)}
                      className={`p-1.5 transition-colors ${
                        gridCols === 3 ? 'bg-paper shadow-xs text-ink font-bold' : 'text-muted hover:text-ink'
                      }`}
                      title="Compact Grid"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative flex items-center gap-2">
                    <span className="hidden sm:inline text-xs text-muted font-bold uppercase tracking-wider">Sort:</span>
                    <div className="relative">
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-3 py-1.5 pr-7 bg-fog border border-border text-xs font-bold text-ink rounded-xs cursor-pointer appearance-none uppercase tracking-wider focus:outline-none focus:border-ink"
                      >
                        {SORT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-5">
                <span className="text-[11px] font-bold text-muted mr-1 uppercase tracking-wider">Active:</span>

                {search && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs font-medium">
                    <span>"{search}"</span>
                    <button onClick={() => setSearch('')} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {gender !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs capitalize font-medium">
                    <span>{gender}</span>
                    <button onClick={() => setGender('all')} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs font-medium">
                    <span>{CATEGORIES.find((c) => c.id === category)?.label}</span>
                    <button onClick={() => setCategory('all')} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {color !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs font-medium">
                    <span>Color: {color}</span>
                    <button onClick={() => setColor('All')} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {material !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs font-medium">
                    <span>{MATERIAL_OPTIONS.find((m) => m.id === material)?.label}</span>
                    <button onClick={() => setMaterial('all')} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {size !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs font-medium">
                    <span>Size: {size}</span>
                    <button onClick={() => setSize('all')} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {priceMax < 20000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-paper border border-border text-xs text-ink rounded-xs font-medium">
                    <span>Under ₹{priceMax.toLocaleString('en-IN')}</span>
                    <button onClick={() => setPriceMax(20000)} className="text-muted hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="text-xs text-accent-mid hover:text-ink underline font-bold ml-1 uppercase"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Product Grid or Empty State */}
            {loading ? (
              <div className="py-24 text-center space-y-3 bg-paper border border-border rounded-xs">
                <Loader2 className="w-8 h-8 text-ink animate-spin mx-auto" />
                <p className="text-xs text-muted font-bold tracking-widest uppercase">Loading collection...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-paper border border-border p-12 text-center rounded-xs">
                <h3 className="font-display text-3xl text-ink uppercase mb-2">
                  No Matching Creations
                </h3>
                <p className="text-xs text-muted mb-6">
                  Try clearing some filter criteria to discover more products.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary px-6 py-3 text-xs font-black tracking-widest"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 gap-3.5 sm:gap-5 ${
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

      {/* Mobile Slide-Out Filter Drawer */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
          />
          <div className="relative ml-auto w-full max-w-xs bg-paper h-full shadow-elevated flex flex-col z-10 animate-slide-left">
            <div className="p-4 border-b border-border flex items-center justify-between bg-fog">
              <span className="font-sans text-sm font-extrabold uppercase tracking-wider text-ink">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-muted hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterContent()}
            </div>
            <div className="p-3 border-t border-border bg-fog flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 border border-border bg-paper text-xs font-bold uppercase text-ink"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-2.5 bg-ink text-accent text-xs font-black uppercase hover:bg-[#1a1a1a]"
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
