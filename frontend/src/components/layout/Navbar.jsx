import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, User, Search, Menu, X, Heart,
  ChevronDown, LogOut, Settings, Sparkles, Zap, ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useSavedItems } from '../../context/SavedItemsContext';
import BrandLogo from '../common/BrandLogo';

export const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [searchOpen,      setSearchOpen]       = useState(false);
  const [userDropOpen,    setUserDropOpen]     = useState(false);
  const [searchQuery,     setSearchQuery]      = useState('');
  const [scrolled,        setScrolled]         = useState(false);

  const { cartCount }                          = useCart();
  const { savedCount }                         = useSavedItems();
  const { user, isAuthenticated, logout }      = useAuth();
  const dropdownRef                            = useRef(null);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setUserDropOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const handleLogout = async () => {
    setUserDropOpen(false);
    setMobileOpen(false);
    await logout();
    navigate('/');
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'You';

  const navLinks = BRAND_CONFIG.navLinks;

  return (
    <>
      {/* ─── Top Announcement Marquee ─── */}
      <div className="bg-ink text-[11px] py-2 overflow-hidden select-none border-b border-white/5">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10 font-sans font-semibold tracking-[0.14em] uppercase text-fog/80">
          {[...Array(2)].map((_, idx) => (
            <span key={idx} className="flex items-center gap-10">
              <span className="flex items-center gap-2">
                <span className="text-accent">✦</span>
                <span>Trends Today · Trends Tomorrow · <span className="text-accent">Old Is Gold</span></span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-accent">✦</span>
                <span>Free shipping over ₹{BRAND_CONFIG.policy.freeShippingThreshold.toLocaleString('en-IN')}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-accent">✦</span>
                <span>100% Full-Grain Leather · Handcrafted in India</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Main Navbar ─── */}
      <header
        className="sticky top-0 z-50 bg-white border-b border-border/80 shadow-xs transition-shadow duration-200"
        style={{ position: 'sticky', top: 0, zIndex: 50 }}
      >
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px] sm:h-[78px] lg:h-[88px] gap-2.5 sm:gap-6">

            {/* ── Left: Mobile hamburger + Brand Logo ── */}
            <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 flex-shrink-0">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 -ml-1 text-ink hover:text-accent-mid transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center">
                <BrandLogo variant="nav" linkTo="/" />
              </div>
            </div>

            {/* ── Center: Primary Navigation Links ── */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `text-[12.5px] font-bold uppercase tracking-[0.12em] transition-colors duration-200 py-1 relative group ${
                      isActive ? 'text-ink font-black' : 'text-ink/65 hover:text-ink'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className="absolute -bottom-1 left-0 h-[2px] bg-ink transition-all duration-300"
                        style={{ width: isActive ? '100%' : '0%' }}
                      />
                      <span className="absolute -bottom-1 left-0 h-[2px] bg-accent-mid w-0 group-hover:w-full transition-all duration-300" />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── Right: Actions ── */}
            <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 flex-shrink-0">

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-ink/60 hover:text-ink transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px] stroke-[1.8]" />
              </button>

              {/* Saved */}
              <Link to="/saved" className="relative p-1.5 text-ink/60 hover:text-ink transition-colors" aria-label="Saved">
                <Heart className="w-[18px] h-[18px] stroke-[1.8]" />
                {savedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-ink text-[9px] font-black flex items-center justify-center rounded-full">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropOpen(!userDropOpen)}
                    className="flex items-center gap-1.5 text-ink/60 hover:text-ink transition-colors p-1.5"
                  >
                    <div className="w-6 h-6 bg-ink text-accent text-[10px] font-black flex items-center justify-center rounded-full">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${userDropOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-paper border border-border shadow-elevated z-50 animate-fade-in"
                      style={{ borderRadius: '2px' }}>
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-xs font-bold text-ink truncate">{user?.name}</p>
                        <p className="text-[11px] text-muted truncate mt-0.5">{user?.email}</p>
                      </div>
                      <div className="py-1 text-xs">
                        <Link to="/profile" onClick={() => setUserDropOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-ink/70 hover:text-ink hover:bg-fog transition-colors">
                          <Settings className="w-3.5 h-3.5" /> Account
                        </Link>
                        <Link to="/saved" onClick={() => setUserDropOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-ink/70 hover:text-ink hover:bg-fog transition-colors">
                          <Heart className="w-3.5 h-3.5" /> Saved ({savedCount})
                        </Link>
                        <Link to="/cart" onClick={() => setUserDropOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-ink/70 hover:text-ink hover:bg-fog transition-colors">
                          <ShoppingBag className="w-3.5 h-3.5" /> Bag ({cartCount})
                        </Link>
                      </div>
                      <div className="border-t border-border">
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left">
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold text-ink/60 hover:text-ink transition-colors uppercase tracking-wide p-1.5">
                  <User className="w-[18px] h-[18px] stroke-[1.8]" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center gap-1.5 bg-ink text-accent px-3 py-2 hover:bg-[#1a1a1a] transition-colors group"
                style={{ borderRadius: '2px' }}
              >
                <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-[12px] font-black uppercase tracking-wider">{cartCount}</span>
              </Link>
            </div>

          </div>
        </div>

        {/* ─── Search Dropdown ─── */}
        {searchOpen && (
          <div className="border-t border-border bg-paper animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 sm:px-8 py-4">
              <div className="flex items-center gap-3 bg-fog border border-border focus-within:border-ink transition-colors"
                style={{ borderRadius: '2px' }}>
                <Search className="w-4 h-4 text-muted ml-4 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bags, leather, colors…"
                  className="flex-1 py-3 pr-4 text-sm text-ink placeholder-muted bg-transparent focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                    if (e.key === 'Escape') setSearchOpen(false);
                  }}
                />
                <button onClick={() => setSearchOpen(false)} className="p-3 text-muted hover:text-ink transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted">Trending:</span>
                {['Tote', 'Crossbody', 'Wallet', 'Cognac'].map((t) => (
                  <button key={t} onClick={() => {
                    navigate(`/products?search=${encodeURIComponent(t)}`);
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                    className="text-[11px] px-2.5 py-1 border border-border text-ink/60 hover:border-ink hover:text-ink transition-all"
                    style={{ borderRadius: '99px' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── Mobile Drawer ─── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[80vw] max-w-xs bg-paper h-full overflow-y-auto shadow-elevated flex flex-col animate-slide-left">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <BrandLogo variant="nav" linkTo="/" />
              <button onClick={() => setMobileOpen(false)} className="p-1 text-muted hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-5 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3 border-b border-border/50 text-sm font-semibold text-ink/70 hover:text-ink uppercase tracking-wide transition-colors">
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted" />
                </Link>
              ))}
            </nav>

            <div className="px-5 py-5 border-t border-border space-y-2.5">
              {isAuthenticated ? (
                <>
                  <div className="text-xs text-muted mb-3">{user?.name} · {user?.email}</div>
                  <Link to="/saved" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink py-1.5">
                    <Heart className="w-4 h-4" /> Saved ({savedCount})
                  </Link>
                  <Link to="/cart" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink py-1.5">
                    <ShoppingBag className="w-4 h-4" /> Bag ({cartCount})
                  </Link>
                  <button onClick={handleLogout} className="text-sm font-semibold text-red-600 flex items-center gap-2 py-1.5">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-outline text-center py-3 text-xs">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary text-center py-3 text-xs">Join</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
