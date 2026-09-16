import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, User, Search, Menu, X, ArrowRight,
  ChevronDown, LogOut, ShieldCheck, Settings, Sparkles, Heart
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSavedItems } from '../../context/SavedItemsContext';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount } = useCart();
  const { savedCount } = useSavedItems();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileOpen(false);
    await logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `text-[13px] tracking-wide transition-colors duration-200 py-1 ${
      isActive
        ? 'text-[#1A1612] font-semibold'
        : 'text-[#4A4238] hover:text-[#1A1612]'
    }`;

  const firstName = user?.name ? user.name.split(' ')[0] : 'Patron';

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#15120F] text-[#E5D6C2] border-b border-[#2A231C] text-[10.5px] sm:text-[11px] py-2.5 px-4 text-center tracking-[0.18em] uppercase font-medium">
        <span className="text-[#E6C687] font-semibold">Handcrafted in India</span>
        <span className="mx-2.5 text-[#6D5D4E]">•</span>
        <span className="text-[#FAF7F2]">Free Shipping Over ₹{BRAND_CONFIG.policy.freeShippingThreshold.toLocaleString('en-IN')}</span>
        <span className="mx-2.5 text-[#6D5D4E]">•</span>
        <span className="text-[#D8C7B5]">{BRAND_CONFIG.policy.returnDays}-Day Atelier Returns</span>
      </div>

      {/* Main luxury navbar */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE6DC]/40">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-3 items-center h-[72px]">

            {/* Left: Desktop nav links */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 -ml-2 text-[#1A1612]"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <nav className="hidden lg:flex items-center space-x-8 text-[13px]">
                {BRAND_CONFIG.navLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} className={linkClass}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex justify-center items-center">
              <Link to="/" className="inline-block group text-center">
                <span className="font-serif text-[24px] sm:text-[28px] tracking-[0.28em] text-[#1A1612] font-bold uppercase select-none transition-opacity group-hover:opacity-85">
                  {BRAND_CONFIG.name}
                </span>
              </Link>
            </div>

            {/* Right: Actions with Search, Authenticated Account, and Bag */}
            <div className="flex items-center justify-end gap-4 sm:gap-6 text-[13px] text-[#2C241E]">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden sm:inline font-normal">Search</span>
              </button>

              {/* Saved Items */}
              <Link
                to="/saved"
                className="inline-flex items-center gap-1.5 hover:text-black transition-colors relative group"
                aria-label="Saved Items"
                title="Saved Items"
              >
                <div className="relative flex items-center justify-center">
                  <Heart className="w-4 h-4 stroke-[1.5] group-hover:scale-110 transition-transform" />
                  {savedCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#1A1612] text-[#E6C687] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                      {savedCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-normal">Saved</span>
              </Link>

              {/* Account / User Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="inline-flex items-center gap-2 hover:text-black transition-colors py-1 focus:outline-none"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#1A1612] text-[#E6C687] text-[10px] font-semibold flex items-center justify-center">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline font-medium text-xs tracking-wider">
                      {firstName}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Luxury Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-[#EDE6DC] shadow-elevated rounded-sm py-2 z-50 animate-fadeIn">
                      {/* User Header */}
                      <div className="px-4 py-3 border-b border-[#EDE6DC]/60 bg-[#FAF7F2]/60">
                        <p className="text-xs font-semibold text-[#1A1612] truncate">
                          {user?.name}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1 text-[9px] uppercase tracking-widest text-[#7F5E38] font-semibold">
                          <Sparkles className="w-2.5 h-2.5 text-[#B89B74]" />
                          {user?.role === 'admin' ? 'Atelier Admin' : 'Artisan Member'}
                        </span>
                      </div>

                      {/* Dropdown Links */}
                      <div className="py-1 text-xs">
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#3D352E] hover:bg-[#FAF7F2] hover:text-[#1A1612] transition-colors"
                        >
                          <Settings className="w-4 h-4 text-stone-400" />
                          <span>Account & Security</span>
                        </Link>
                        <Link
                          to="/saved"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-[#3D352E] hover:bg-[#FAF7F2] hover:text-[#1A1612] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Heart className="w-4 h-4 text-stone-400" />
                            <span>Saved Creations</span>
                          </div>
                          {savedCount > 0 && (
                            <span className="text-[10px] bg-[#FAF7F2] text-[#7F5E38] font-bold px-1.5 py-0.5 rounded border border-[#EDE6DC]">
                              {savedCount}
                            </span>
                          )}
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-[#3D352E] hover:bg-[#FAF7F2] hover:text-[#1A1612] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <ShoppingBag className="w-4 h-4 text-stone-400" />
                            <span>My Shopping Bag</span>
                          </div>
                          <span className="text-[10px] bg-[#FAF7F2] text-[#7F5E38] font-bold px-1.5 py-0.5 rounded border border-[#EDE6DC]">
                            {cartCount}
                          </span>
                        </Link>
                      </div>

                      {/* Sign Out Action */}
                      <div className="border-t border-[#EDE6DC]/60 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-700 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
                  aria-label="Sign In"
                >
                  <User className="w-4 h-4 stroke-[1.5]" />
                  <span className="hidden sm:inline font-normal">Sign In</span>
                </Link>
              )}

              {/* Bag Counter */}
              <Link
                to="/cart"
                className="inline-flex items-center gap-1.5 hover:text-black transition-colors group"
                aria-label="Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5] group-hover:scale-105 transition-transform" />
                <span className="font-normal">Bag ({cartCount})</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Search bar slide-out */}
        {searchOpen && (
          <div className="border-t border-[#EDE6DC] bg-[#FAF7F2] py-4 px-6 sm:px-10 shadow-md">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center bg-white border border-[#EDE6DC] focus-within:border-[#1A1612] focus-within:ring-1 focus-within:ring-[#1A1612] rounded-sm shadow-subtle transition-all">
                <div className="pl-4 pr-2 text-[#7F5E38] pointer-events-none">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by bag name, leather type, color, or category..."
                  className="flex-1 py-3 pr-24 text-xs sm:text-sm text-[#1A1612] placeholder-stone-400 bg-transparent focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                      setSearchOpen(false);
                    }
                    if (e.key === 'Escape') setSearchOpen(false);
                  }}
                />
                <div className="absolute right-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                        setSearchOpen(false);
                      }
                    }}
                    className="px-3 py-1 bg-[#1A1612] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs hover:bg-[#2C241E] transition-colors"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="w-6 h-6 rounded-full hover:bg-stone-100 text-stone-400 hover:text-black flex items-center justify-center transition-colors"
                    title="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick search tags */}
              <div className="flex items-center gap-2 mt-2.5 text-[11px] text-[#7F5E38] overflow-x-auto">
                <span className="text-stone-400 uppercase font-semibold text-[10px] tracking-wider flex-shrink-0">
                  Popular:
                </span>
                {['Totes', 'Crossbody', 'Cognac', 'Vegetable-Tanned', 'Wallets'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      window.location.href = `/products?search=${encodeURIComponent(item)}`;
                      setSearchOpen(false);
                    }}
                    className="px-2.5 py-0.5 bg-white border border-[#EDE6DC] hover:border-black hover:text-black rounded-full transition-colors whitespace-nowrap"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#EDE6DC] bg-[#FAF7F2] px-6 pt-4 pb-8 shadow-elevated space-y-3">
            {BRAND_CONFIG.navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-2 text-base font-medium text-[#1A1612] hover:text-brand-800"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#8C7E72]" />
              </Link>
            ))}

            {/* Mobile Auth Status */}
            <div className="pt-4 border-t border-[#EDE6DC] space-y-3 text-sm text-[#4A4238]">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EDE6DC]/60">
                    <div>
                      <p className="font-semibold text-[#1A1612] text-sm">{user?.name}</p>
                      <p className="text-xs text-stone-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-1 bg-white border border-[#EDE6DC] text-xs font-semibold uppercase tracking-wider"
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <Link to="/saved" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5 hover:text-black">
                      <Heart className="w-4 h-4" /> Saved ({savedCount})
                    </Link>
                    <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5 hover:text-black">
                      <ShoppingBag className="w-4 h-4" /> Bag ({cartCount})
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-red-600 font-semibold uppercase text-[11px]"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5 font-medium">
                      <User className="w-4 h-4" /> Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="px-3.5 py-1.5 bg-[#1A1612] text-white text-xs uppercase tracking-wider font-semibold"
                    >
                      Join Atelier
                    </Link>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#EDE6DC]/60 text-xs">
                    <Link to="/saved" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5 hover:text-black">
                      <Heart className="w-4 h-4" /> Saved ({savedCount})
                    </Link>
                    <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-1.5 hover:text-black">
                      <ShoppingBag className="w-4 h-4" /> Bag ({cartCount})
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
