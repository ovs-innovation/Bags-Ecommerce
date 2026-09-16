import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Award, Mail, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12100E] text-stone-300 pt-8 pb-6 border-t border-[#2A241F]">
      {/* ─── Compact Brand Trust Badges Strip ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">Full-Grain Leather</h4>
              <p className="text-[11px] text-stone-400">100% genuine hides</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">Pan-India Delivery</h4>
              <p className="text-[11px] text-stone-400">Free over {BRAND_CONFIG.currency}{BRAND_CONFIG.policy.freeShippingThreshold}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <RotateCcw className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">{BRAND_CONFIG.policy.returnDays}-Day Exchange</h4>
              <p className="text-[11px] text-stone-400">Hassle-free policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">1-Year Warranty</h4>
              <p className="text-[11px] text-stone-400">Artisanal stitching guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Columns ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-gold-300 transition-colors">
                {BRAND_CONFIG.name}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-gold-400 font-medium">
                Luxury Leather Atelier
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              {BRAND_CONFIG.description}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                {BRAND_CONFIG.contact.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                {BRAND_CONFIG.contact.email}
              </span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider mb-3">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/category/men" className="hover:text-gold-300 transition-colors">
                  Men's Briefcases & Wallets
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="hover:text-gold-300 transition-colors">
                  Women's Totes & Clutches
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-300 transition-colors">
                  Handcrafted Messengers
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-300 transition-colors">
                  All Atelier Goods
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider mb-3">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">
                  Our Heritage & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Shipping & Returns FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">
                  Leather Care Guidance
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider mb-2">
              The Artisan Circle
            </h4>
            <p className="text-[11px] text-stone-400 mb-3 leading-relaxed">
              Subscribe for private capsule previews and leather care insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 text-white placeholder-stone-500 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="py-2 px-3 text-[11px] uppercase tracking-wider font-semibold bg-brand-800 hover:bg-gold-600 text-white transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 border-t border-white/10 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {currentYear} {BRAND_CONFIG.name} Atelier. Handcrafted in India.</p>
        <div className="flex space-x-5">
          <Link to="/contact" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-stone-300 transition-colors">Leather Care Guide</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
