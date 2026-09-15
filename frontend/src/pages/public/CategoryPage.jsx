import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low–High' },
  { value: 'price-desc', label: 'Price: High–Low' },
  { value: 'rating',     label: 'Top Rated' },
];

const META = {
  women: {
    title: "Women's Leather Collection",
    sub: 'Totes, crossbodys, clutches, slings — handcrafted for the modern Indian woman.',
    image: '/women-category.jpg',
  },
  men: {
    title: "Men's Leather Collection",
    sub: 'Briefcases, messenger bags, wallets, and card holders — engineered for the discerning man.',
    image: '/men-category.jpg',
  },
};

export const CategoryPage = () => {
  const { gender } = useParams();
  const [sort, setSort] = useState('featured');
  const meta = META[gender] || META.women;

  const products = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => p.gender === gender || (gender === 'women' && p.gender === 'unisex')
    );
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [gender, sort]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={meta.image} alt={meta.title} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white capitalize">{gender}</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">{meta.title}</h1>
            <p className="text-sm text-white/70 mt-2 max-w-md">{meta.sub}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-stone-600">
            <strong className="text-[#1A1715]">{products.length}</strong> products
          </p>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-input pr-8 appearance-none cursor-pointer text-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Quick-filter between Men/Women */}
        <div className="flex gap-3 mb-8">
          {Object.keys(META).map((g) => (
            <Link
              key={g}
              to={`/category/${g}`}
              className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-all border ${
                gender === g
                  ? 'bg-[#1A1715] text-white border-[#1A1715]'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-brand-400'
              }`}
            >
              {g}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CTA to all products */}
        <div className="mt-14 text-center">
          <Link to="/products" className="btn-secondary inline-flex items-center gap-2 text-sm px-8 py-3.5">
            View All Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
