import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';
import BrandLogo from '../common/BrandLogo';

const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', path: '/products' },
    { label: "Men's Collection", path: '/category/men' },
    { label: "Women's Collection", path: '/category/women' },
    { label: 'New Arrivals', path: '/products?filter=new' },
    { label: 'Best Sellers', path: '/products?filter=bestseller' },
  ],
  brand: [
    { label: 'Our Story', path: '/about' },
    { label: 'Craftsmanship', path: '/about' },
    { label: 'Sustainability', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  help: [
    { label: 'FAQ', path: '/contact' },
    { label: 'Shipping Policy', path: '/contact' },
    { label: 'Returns & Exchanges', path: '/contact' },
    { label: 'Size Guide', path: '/contact' },
    { label: 'Track Order', path: '/contact' },
  ],
};

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-fog/70">

      {/* ── Top Strip: Value Props ── */}
      <div className="border-b border-white/8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: '100%', label: 'Full-Grain Leather', sub: 'Vegetable-tanned only' },
              { stat: '14d', label: 'Easy Returns', sub: 'Zero-hassle policy' },
              { stat: '1yr', label: 'Warranty', sub: 'Artisanal guarantee' },
              { stat: '18K+', label: 'Style Curators', sub: 'And growing' },
            ].map((item) => (
              <div key={item.stat} className="text-center py-2">
                <p className="font-display text-3xl sm:text-4xl text-accent leading-none">{item.stat}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-fog/80 mt-1">{item.label}</p>
                <p className="text-[11px] text-fog/40 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="footer" />
            <p className="text-sm text-fog/50 leading-relaxed max-w-xs font-light">
              {BRAND_CONFIG.description}
            </p>
            <div className="space-y-2 text-xs text-fog/50">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2.5">Drop Alerts</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 text-xs bg-white/8 border border-white/10 text-fog placeholder-fog/30 focus:outline-none focus:border-accent transition-colors"
                  style={{ borderRadius: '2px 0 0 2px' }}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-accent text-ink text-[11px] font-black uppercase tracking-wider hover:bg-[#b8e864] transition-colors whitespace-nowrap"
                  style={{ borderRadius: '0 2px 2px 0' }}
                >
                  Join
                </button>
              </form>
              <p className="text-[10px] text-fog/30 mt-1.5">We don't spam. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.path + link.label}>
                  <Link to={link.path}
                    className="text-xs text-fog/50 hover:text-fog transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent mb-5">Brand</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.brand.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}
                    className="text-xs text-fog/50 hover:text-fog transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-accent mb-5">Help</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.label}>
                  <Link to={link.path}
                    className="text-xs text-fog/50 hover:text-fog transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-fog/30">
          <p>© {year} {BRAND_CONFIG.name} — More Than Trends. Handcrafted in India.</p>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-fog transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-fog transition-colors">Terms</Link>
            <Link to="/about"   className="hover:text-fog transition-colors">Sustainability</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
