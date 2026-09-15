import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Award, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-onyx-950 text-brand-100/90 pt-16 pb-12 border-t border-brand-900/40">
      {/* Brand Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center space-x-3.5">
            <Award className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Full-Grain Leather</h4>
              <p className="text-xs text-brand-200/70">100% genuine top-grade hides</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <Truck className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">Pan-India Delivery</h4>
              <p className="text-xs text-brand-200/70">Safe and expedited shipping</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <RotateCcw className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">{BRAND_CONFIG.policy.returnDays}-Day Returns</h4>
              <p className="text-xs text-brand-200/70">Hassle-free exchange policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <ShieldCheck className="w-8 h-8 text-gold-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">1-Year Warranty</h4>
              <p className="text-xs text-brand-200/70">Artisanal stitching guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-wider text-white">
                {BRAND_CONFIG.name}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gold-400">
                Luxury Leather Atelier
              </span>
            </Link>
            <p className="text-sm text-brand-200/80 leading-relaxed max-w-sm">
              {BRAND_CONFIG.description}
            </p>
            <div className="pt-2 space-y-2 text-xs text-brand-200/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </p>
            </div>
          </div>

          {/* Collections Col */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-200/75">
              <li>
                <Link to="/category/women" className="hover:text-gold-400 transition-colors">
                  Women's Purses & Totes
                </Link>
              </li>
              <li>
                <Link to="/category/men" className="hover:text-gold-400 transition-colors">
                  Men's Purses & Wallets
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-400 transition-colors">
                  Handcrafted Handbags
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-400 transition-colors">
                  Crossbody & Sling Bags
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-400 transition-colors">
                  Card Holders & Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Col */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-200/75">
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  Our Heritage & Leather Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">
                  Contact Atelier
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-gold-400 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold-400 transition-colors">
                  Shipping & Returns FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white tracking-wide mb-4">
              The Artisan Circle
            </h4>
            <p className="text-xs text-brand-200/70 mb-3">
              Subscribe to receive exclusive access to bespoke releases, seasonal capsules, and leather care guides.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs bg-white/5 border border-white/15 text-white placeholder-brand-300/40 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="w-full py-2 px-3 text-xs uppercase tracking-widest font-semibold bg-brand-800 hover:bg-brand-700 text-white transition-colors"
              >
                Join Circle
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/10 text-xs text-brand-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {currentYear} {BRAND_CONFIG.name}. All rights reserved. Handcrafted with pride.</p>
        <div className="flex space-x-6">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
          <span className="hover:underline cursor-pointer">Leather Care Guide</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
