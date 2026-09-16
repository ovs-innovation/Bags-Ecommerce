import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-all duration-200 py-1 border-b-2 ${
      isActive
        ? 'border-brand-800 text-[#1A1715] font-semibold'
        : 'border-transparent text-stone-600 hover:text-[#1A1715] hover:border-brand-300'
    }`;

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#1A1715] text-brand-200 text-[11px] py-2 px-4 text-center tracking-[0.15em] uppercase font-medium">
        <span>Handcrafted in India</span>
        <span className="mx-3 opacity-40">·</span>
        <span>Free Shipping Over {BRAND_CONFIG.currency}{BRAND_CONFIG.policy.freeShippingThreshold.toLocaleString('en-IN')}</span>
        <span className="mx-3 opacity-40">·</span>
        <span>{BRAND_CONFIG.policy.returnDays}-Day Returns</span>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-brand-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-stone-700"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center group">
              <span className="font-serif text-2xl sm:text-[28px] font-bold tracking-[0.12em] text-[#1A1715] group-hover:text-brand-800 transition-colors">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-brand-600 -mt-0.5 font-medium">
                Leather Atelier
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {BRAND_CONFIG.navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-stone-700 hover:text-brand-900 transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* Account */}
              <Link to="/login" className="p-2 text-stone-700 hover:text-brand-900 transition-colors" aria-label="Account">
                <User className="w-[18px] h-[18px]" />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-stone-700 hover:text-brand-900 transition-colors group" aria-label="Cart">
                <ShoppingBag className="w-[18px] h-[18px] group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-cognac-600 rounded-full leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-brand-200/60 px-4 py-3 bg-cream/98">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leather bags, wallets, purses..."
                className="flex-1 bg-transparent text-sm text-[#1A1715] placeholder-stone-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
              <button onClick={() => setSearchOpen(false)}>
                <X className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-brand-200/60 bg-cream px-4 pt-4 pb-8 shadow-elevated space-y-1">
            {BRAND_CONFIG.navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 px-2 text-base font-medium text-[#1A1715] hover:bg-brand-100/50 rounded"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-brand-400" />
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
