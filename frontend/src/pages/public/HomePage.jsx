import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Truck, RotateCcw, ShieldCheck, Award, Quote,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import {
  getFeaturedProducts, getBestSellers, getNewArrivals, TESTIMONIALS,
} from '../../data/mockData';
import ProductCard from '../../components/product/ProductCard';
import StarRating from '../../components/common/StarRating';

export const HomePage = () => {
  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <div className="bg-[#FAF7F2] text-[#1A1612]">
      {/* ──────── HERO SECTION WITH FULL-BLEED BACKGROUND IMAGE (MATCHING REFERENCE) ──────── */}
      <section className="relative w-full bg-[#FAF7F2] overflow-hidden">
        {/* Full-bleed background image covering right, top, bottom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/kosha-hero-banner.jpg"
            alt="KOSHA Luxury Handcrafted Leather Goods"
            className="w-full h-full object-cover object-[72%_center] lg:object-[80%_center] xl:object-right"
          />

          {/* Desktop Left-to-Right Soft Gradient:
              Keeps left area solid #FAF7F2 for crisp text legibility,
              then quickly transitions between 22% and 42% so the saddle bag and accessories
              remain vibrant, warm, and crystal clear without any hazy wash-out! */}
          <div
            className="hidden md:block absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #FAF7F2 0%, #FAF7F2 26%, rgba(250, 247, 242, 0.92) 33%, rgba(250, 247, 242, 0.55) 42%, rgba(250, 247, 242, 0) 52%)',
            }}
          />

          {/* Mobile Overlay for compact screens */}
          <div
            className="md:hidden absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(250, 247, 242, 0.96) 0%, rgba(250, 247, 242, 0.90) 65%, rgba(250, 247, 242, 0.35) 100%)',
            }}
          />

          {/* 4-point sparkle star in bottom right like in the reference image */}
          <div className="hidden lg:block absolute bottom-8 right-24 pointer-events-none select-none text-[#C8B896] text-3xl font-serif">
            ✦
          </div>
        </div>

        {/* Hero Content overlaid on the left */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-14 min-h-[450px] sm:min-h-[460px] lg:min-h-[500px] xl:min-h-[510px] flex items-center">
          <div className="max-w-[580px]">
            <h1 className="font-serif text-3xl sm:text-[38px] lg:text-[44px] xl:text-[48px] font-medium leading-[1.18] tracking-[-0.01em] mb-4 sm:mb-5">
              <span className="block text-[#9B6A38]">Heirloom Leather,</span>
              <span className="block text-[#1A1612]">Enduring Silhouettes,</span>
              <span className="block text-[#1A1612]">Crafted for Generations.</span>
            </h1>

            <p className="text-[14px] sm:text-[15.5px] text-[#4A423A] leading-[1.6] mb-6 sm:mb-7 max-w-[440px] font-normal">
              Benchmade in India by master artisans, using only full-grain, vegetable-tanned leather.
            </p>

            {/* Action Buttons with luxury interactive animations */}
            <div className="flex flex-wrap items-center gap-3.5">
              {/* Primary Button: Explore Women */}
              <Link
                to="/category/women"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-[#1A1612] text-white text-[11.5px] sm:text-[12.5px] font-semibold tracking-[0.18em] uppercase rounded-xs hover:bg-[#2A221B] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.98] transition-all duration-300"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <span className="relative z-10">EXPLORE WOMEN</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-[#E6C687]" />
              </Link>

              {/* Secondary Button: Explore Men */}
              <Link
                to="/category/men"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-transparent border border-[#AFA190] text-[#1A1612] text-[11.5px] sm:text-[12.5px] font-semibold tracking-[0.18em] uppercase rounded-xs hover:border-[#1A1612] hover:bg-[#1A1612] hover:text-white hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] transition-all duration-300"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <span className="relative z-10">EXPLORE MEN</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#E6C687]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── CERTIFICATION & MATERIAL STRIP (EXACT REFERENCE) ──────── */}
      <section className="bg-[#FAF7F2] border-y border-[#EDE6DC] py-4 px-4 text-center">
        <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.24em] text-[#3D352E] uppercase select-none">
          <span>FULL-GRAIN VACHETTA</span>
          <span className="mx-3.5 text-[#B0A395]">•</span>
          <span>TANNERY CERTIFIED</span>
          <span className="mx-3.5 text-[#B0A395]">•</span>
          <span>HAND-STITCHED</span>
        </p>
      </section>

      {/* ──────── SHOP MEN / WOMEN COLLECTIONS (COMPACT ELEGANT SIZING) ──────── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Women */}
          <Link
            to="/category/women"
            className="relative group overflow-hidden rounded-sm block shadow-subtle hover:shadow-elevated transition-all duration-300 h-[280px] sm:h-[330px] md:h-[350px]"
          >
            <img
              src="/women-category.jpg"
              alt="Shop Women"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/85 via-[#1A1612]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#E6C687] font-semibold mb-1">
                Collection
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-1.5">
                Women's Edit
              </h2>
              <p className="text-xs text-white/80 mb-3.5 max-w-xs leading-relaxed">
                Totes, crossbodys, clutches and slings for the modern discerning woman.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-[#FAF7F2] group-hover:text-[#E6C687] transition-colors">
                Explore Collection <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Men */}
          <Link
            to="/category/men"
            className="relative group overflow-hidden rounded-sm block shadow-subtle hover:shadow-elevated transition-all duration-300 h-[280px] sm:h-[330px] md:h-[350px]"
          >
            <img
              src="/men-category.jpg"
              alt="Shop Men"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/85 via-[#1A1612]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#E6C687] font-semibold mb-1">
                Collection
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-1.5">
                Men's Edit
              </h2>
              <p className="text-xs text-white/80 mb-3.5 max-w-xs leading-relaxed">
                Briefcases, messenger bags, wallets and card holders for the refined gentleman.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-[#FAF7F2] group-hover:text-[#E6C687] transition-colors">
                Explore Collection <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────── FEATURED PRODUCTS ──────── */}
      <section className="py-16 lg:py-24 bg-[#F5EFEB] border-y border-[#EDE6DC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7F5E38] mb-2">
                Handpicked Pieces
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1612]">
                Artisanal Highlights
              </h2>
            </div>
            <Link to="/products" className="text-xs font-semibold uppercase tracking-widest text-[#1A1612] hover:text-[#7F5E38] flex items-center gap-2 transition-colors">
              View All Creations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── NEW ARRIVALS ──────── */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7F5E38] mb-2">
              Fresh Off The Bench
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1612]">
              New Arrivals
            </h2>
          </div>
          <Link to="/products?filter=new" className="text-xs font-semibold uppercase tracking-widest text-[#1A1612] hover:text-[#7F5E38] flex items-center gap-2 transition-colors">
            See All New <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
          {newArrivals.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ──────── THE BAG COLLECTIVE CAMPAIGN EDITORIAL BANNER (AFTER NEW ARRIVALS) ──────── */}
      <section className="bg-[#FAF7F2] py-6 sm:py-10 border-y border-[#EDE6DC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="relative overflow-hidden bg-[#F6F3EE] border border-[#E8E1D7] rounded-sm shadow-subtle group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] lg:min-h-[440px]">

              {/* Left Column: Editorial Copy & Discover CTA matching reference */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 z-10 flex flex-col justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7F5E38] mb-3">
                  Spring / Summer Edit
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-[#1A1612] tracking-[0.08em] uppercase leading-[1.18] mb-5">
                  The Bag Collective
                </h2>
                <p className="text-sm sm:text-[15px] text-[#4A423A] leading-[1.65] font-normal max-w-md mb-8">
                  Crafted with precision, designed for life.<br className="hidden sm:inline" />
                  Your new essential everyday bags.
                </p>
                <div>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent border border-[#1A1612] text-[#1A1612] text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#1A1612] hover:text-white active:scale-[0.98] transition-all duration-200"
                  >
                    <span>DISCOVER</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: High-Fashion Editorial Photography */}
              <div className="lg:col-span-7 relative h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden">
                <img
                  src="/bag-collective-editorial.jpg"
                  alt="The Bag Collective — Handcrafted Luxury Bags"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Soft subtle left gradient edge on desktop to blend seamlessly with left copy container */}
                <div
                  className="hidden lg:block absolute inset-y-0 left-0 w-28 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, #F6F3EE 0%, rgba(246, 243, 238, 0) 100%)',
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────── BEST SELLERS ──────── */}
      <section className="bg-[#1A1612] py-20 lg:py-28 text-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#E6C687] font-semibold mb-2">
                Most Cherished
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
                Best Sellers
              </h2>
            </div>
            <Link to="/products?filter=bestseller" className="text-xs uppercase tracking-widest font-semibold text-[#E6C687] hover:text-white flex items-center gap-2 transition-colors">
              View All Classics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CRAFTSMANSHIP BANNER ──────── */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-10 h-10 text-[#9B784E] mx-auto mb-6" />
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#7F5E38] font-semibold mb-4">
            The KOSHA Atelier
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1612] mb-6 leading-tight">
            Every Stitch Tells<br />an Enduring Story
          </h2>
          <p className="text-base text-[#554C42] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            We work exclusively with heritage tanneries that use vegetable-tanning — a 200-year-old process using organic tree bark and natural oils. The leather that emerges is richer, breathes naturally, and develops a beautiful, personalized patina over generations.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1612] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#2F2620] transition-colors"
          >
            Our Leather Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ──────── WHY CHOOSE US ──────── */}
      <section className="bg-[#15110E] py-16 border-t border-[#2A231C]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Award className="w-7 h-7" />, title: 'Full-Grain Leather', sub: 'Ethically sourced top-grade hides only' },
              { icon: <Truck className="w-7 h-7" />, title: 'Pan-India Delivery', sub: 'Free shipping on orders over ₹1,999' },
              { icon: <RotateCcw className="w-7 h-7" />, title: `${BRAND_CONFIG.policy.returnDays}-Day Returns`, sub: 'Hassle-free exchange policy' },
              { icon: <ShieldCheck className="w-7 h-7" />, title: '1-Year Warranty', sub: 'Artisanal stitching guarantee' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="text-[#E6C687]">{item.icon}</div>
                <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wider uppercase">{item.title}</h4>
                <p className="text-xs text-[#A89D91] leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── TESTIMONIALS ──────── */}
      <section className="py-20 lg:py-24 bg-[#F5EFEB] border-t border-[#EDE6DC]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7F5E38] mb-3">
              Client Chronicles
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1612]">
              Cherished By Connoisseurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-7 shadow-subtle border border-[#EBE3D8] flex flex-col justify-between">
                <div>
                  <Quote className="w-5 h-5 text-[#C5BCB0] mb-3" />
                  <p className="text-sm text-[#4E453C] leading-relaxed italic mb-6">"{t.text}"</p>
                </div>
                <div>
                  <StarRating rating={t.rating} />
                  <p className="text-xs font-semibold text-[#1A1612] mt-3">{t.name}</p>
                  <p className="text-[11px] text-[#8C7E72]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── NEWSLETTER ──────── */}
      <section className="bg-[#FAF7F2] py-20 border-t border-[#EDE6DC]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1612] mb-3">
            Join the KOSHA Circle
          </h2>
          <p className="text-sm text-[#554C42] mb-8 leading-relaxed max-w-md mx-auto">
            Receive private exhibition invitations, early access to limited capsule editions, and stories from our workshop.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3.5 bg-white border border-[#D5C9BD] text-[#1A1612] placeholder-[#9E9184] text-sm focus:outline-none focus:border-[#1A1612] transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#1A1612] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#2F2620] transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-[#9E9184] mt-3">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
