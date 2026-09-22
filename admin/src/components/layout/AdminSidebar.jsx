import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Star,
  Settings,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { ADMIN_CONFIG } from '../../constants/config';

export const AdminSidebar = () => {
  const navIcons = {
    Dashboard: LayoutDashboard,
    Products: Package,
    Categories: Layers,
    Orders: ShoppingCart,
    Customers: Users,
    Reviews: Star,
    Settings: Settings,
  };

  return (
    <aside className="w-64 bg-admin-sidebar text-brand-100 flex flex-col border-r border-stone-800 min-h-screen select-none">
      {/* Brand Header with Official Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
            <img
              src="/logo.png"
              alt="Avyastore.in"
              className="w-full h-full object-contain mix-blend-multiply scale-125"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-lg leading-none text-white font-sans">
                <span className="text-[#C8F376]">avya</span>
                <span className="text-[#A2BA88]">store</span>
                <span className="text-xs font-semibold text-[#C8F376]">.in</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-[#C8F376]/20 text-[#C8F376] border border-[#C8F376]/40 rounded">
                Admin
              </span>
              <span className="text-[10px] text-stone-400 font-sans tracking-wide">
                Gen-Z Suite
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {ADMIN_CONFIG.navLinks.map((item) => {
          const Icon = navIcons[item.label] || LayoutDashboard;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 text-sm font-medium rounded transition-colors ${
                  isActive
                    ? 'bg-brand-900/80 text-white font-semibold'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 text-brand-400" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Storefront Quick Link */}
      <div className="p-4 border-t border-white/10">
        <a
          href={ADMIN_CONFIG.storefrontUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4 text-gold-400" />
            <span>Open Storefront (Port 5173)</span>
          </span>
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
