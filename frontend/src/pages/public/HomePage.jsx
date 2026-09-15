import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, Truck, RotateCcw, ShieldCheck, Award,
  ChevronLeft, ChevronRight, Quote,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import {
  getFeaturedProducts, getBestSellers, getNewArrivals, TESTIMONIALS,
} from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';
import StarRating from '../../components/common/StarRating';

const HERO_SLIDES = [
  {
    title: 'Heirloom Leather,',
    italic: 'Crafted For Generations.',
    sub: 'Full-grain vegetable-tanned purses, handbags, and wallets — bench-made by artisan hands in India.',
    cta: 'Shop Women',
    ctaLink: '/category/women',
    cta2: 'Shop Men',
    cta2Link: '/category/men',
    bg: 'from-[#2C1810] via-[#3D2415] to-[#1A1208]',
    accent: 'text-gold-400',
  },
  {
    title: 'The Atlas Briefcase',
    italic: 'Commands Every Room.',
    sub: 'Heavyweight harness leather. Antique brass hardware. Engineered for the professional who values craftsmanship.',
    cta: 'Shop Men',
    ctaLink: '/category/men',
    cta2: 'View All',
    cta2Link: '/products',
    bg: 'from-[#1A1715] via-[#2C2420] to-[#0E0D0C]',
    accent: 'text-brand-300',
  },
];

export const HomePage = () => {
  const [slide, setSlide] = useState(0);
  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const s = HERO_SLIDES[slide];

  return (
    <div>
      {/* ──────── HERO ──────── */}
      <section className={`relative min-h-[88vh] bg-gradient-to-br ${s.bg} flex items-center overflow-hidden transition-all duration-1000`}>
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />

        {/* Hero image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 opacity-40 lg:opacity-55">
          <img
            src="/hero.jpg"
            alt="KOSHA leather bags"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] via-transparent to-transparent lg:from-[#2C1810] lg:via-[#2C1810]/40 lg:to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                Artisanal Heritage · Made in India
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-white mb-3">
              {s.title}
            </h1>
            <h1 className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-bold italic leading-[1.05] mb-6 ${s.accent}`}>
              {s.italic}
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-lg">
              {s.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={s.ctaLink} className="btn-gold text-base px-8 py-4">
                {s.cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to={s.cta2Link} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all">
                {s.cta2}
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/15">
              <div>
                <p className="font-serif text-3xl font-bold text-white">2,400+</p>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Happy Customers</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-white">100%</p>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Genuine Leather</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-white">1 Yr</p>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-gold-400' : 'w-3 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* ──────── SHOP MEN / WOMEN ──────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Women */}
          <Link to="/category/women" className="relative group overflow-hidden aspect-[4/5] block">
            <img
              src="/women-category.jpg"
              alt="Shop Women"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-2">Collection</p>
              <h2 className="font-serif text-3xl font-bold text-white mb-3">Women's Edit</h2>
              <p className="text-sm text-white/70 mb-4 max-w-xs">Totes, crossbodys, clutches and slings for the modern Indian woman.</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 group-hover:text-white transition-colors">
                Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link to="/category/men" className="relative group overflow-hidden aspect-[4/5] block">
            <img
              src="/men-category.jpg"
              alt="Shop Men"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-2">Collection</p>
              <h2 className="font-serif text-3xl font-bold text-white mb-3">Men's Edit</h2>
              <p className="text-sm text-white/70 mb-4 max-w-xs">Briefcases, messenger bags, wallets and card holders for the discerning man.</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-300 group-hover:text-white transition-colors">
                Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────── FEATURED PRODUCTS ──────── */}
      <section className="bg-cream-dark py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="section-label mb-2"><span className="w-6 h-px bg-brand-500 inline-block" /> Featured Pieces</p>
              <h2 className="section-heading">Handpicked For You</h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-brand-800 hover:text-[#1A1715] flex items-center gap-1.5 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── NEW ARRIVALS ──────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="section-label mb-2"><span className="w-6 h-px bg-brand-500 inline-block" /> Fresh In</p>
            <h2 className="section-heading">New Arrivals</h2>
          </div>
          <Link to="/products?filter=new" className="text-sm font-semibold text-brand-800 hover:text-[#1A1715] flex items-center gap-1.5 transition-colors">
            See All New <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ──────── BEST SELLERS ──────── */}
      <section className="bg-[#1A1715] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-px bg-gold-500 inline-block" /> Most Loved
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Best Sellers
              </h2>
            </div>
            <Link to="/products?filter=bestseller" className="text-sm font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CRAFTSMANSHIP BANNER ──────── */}
      <section className="py-20 lg:py-28 bg-leather-texture bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-12 h-12 text-brand-700 mx-auto mb-6 animate-float" />
          <p className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-brand-500" /> The KOSHA Difference <span className="w-6 h-px bg-brand-500" />
          </p>
          <h2 className="section-heading mb-6">
            Every Stitch Tells<br />a Story
          </h2>
          <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto mb-10">
            We work exclusively with heritage tanneries that use vegetable-tanning — a 200-year-old process using tree bark and natural salts. The leather that emerges is denser, more supple, and develops a deeper patina than anything chrome-tanned leather can produce.
          </p>
          <Link to="/about" className="btn-primary">
            Our Leather Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ──────── WHY CHOOSE US ──────── */}
      <section className="bg-brand-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Award className="w-8 h-8" />, title: 'Full-Grain Leather', sub: 'Ethically sourced top-grade hides only' },
              { icon: <Truck className="w-8 h-8" />, title: 'Pan-India Delivery', sub: 'Free shipping on orders over ₹1,999' },
              { icon: <RotateCcw className="w-8 h-8" />, title: `${BRAND_CONFIG.policy.returnDays}-Day Returns`, sub: 'Hassle-free exchange policy' },
              { icon: <ShieldCheck className="w-8 h-8" />, title: '1-Year Warranty', sub: 'Artisanal stitching guarantee' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="text-gold-400">{item.icon}</div>
                <h4 className="text-sm font-bold text-white tracking-wide">{item.title}</h4>
                <p className="text-xs text-brand-300/70 leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── PROMO BANNER ──────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cognac-600 via-cognac-700 to-brand-900 py-14">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`, backgroundSize: '30px 30px' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-bold mb-3">Limited Time</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Up to 30% Off<br />Selected Styles
          </h2>
          <p className="text-sm text-white/70 mb-8">
            End-of-season offer on our most loved bags. Hurry — limited stock at these prices.
          </p>
          <Link to="/products" className="btn-gold text-base px-10 py-4">
            Shop the Sale <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ──────── TESTIMONIALS ──────── */}
      <section className="py-16 lg:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label justify-center mb-3">
              <span className="w-6 h-px bg-brand-500" /> Real Customers <span className="w-6 h-px bg-brand-500" />
            </p>
            <h2 className="section-heading">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-6 shadow-card flex flex-col gap-4">
                <div className="text-gold-400"><Quote className="w-6 h-6 fill-gold-400/30" /></div>
                <p className="text-sm text-stone-700 leading-relaxed flex-1">"{t.text}"</p>
                <div>
                  <StarRating rating={t.rating} />
                  <p className="text-xs font-semibold text-brand-800 mt-1">{t.product}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-brand-100">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-[#1A1715]">{t.name}</p>
                    <p className="text-[10px] text-stone-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── NEWSLETTER ──────── */}
      <section className="bg-brand-900 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Join the Artisan Circle
          </h2>
          <p className="text-sm text-brand-200/70 mb-8 leading-relaxed">
            Get early access to new launches, leather care guides, exclusive styling tips, and private sale invitations.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button type="submit" className="btn-gold px-6 py-3.5 whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-brand-300/40 mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
