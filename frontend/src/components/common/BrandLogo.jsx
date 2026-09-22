import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Official BrandLogo component for Avyastore.in
 * Designed with authentic logo image and Gen-Z typography variants.
 */
export const BrandLogo = ({
  variant = 'nav',
  showTagline = true,
  className = '',
  linkTo = '/',
}) => {
  // Content variants
  if (variant === 'badge' || variant === 'full') {
    const badgeContent = (
      <div className={`inline-flex flex-col items-center group transition-transform duration-300 hover:scale-[1.02] ${className}`}>
        <div className="relative">
          <img
            src="/logo.png"
            alt="Avya Store"
            className="h-28 sm:h-36 w-auto object-contain mix-blend-multiply drop-shadow-sm select-none"
            loading="eager"
          />
        </div>
      </div>
    );
    return linkTo ? <Link to={linkTo}>{badgeContent}</Link> : badgeContent;
  }

  if (variant === 'footer') {
    const footerContent = (
      <div className={`inline-flex flex-col items-start group ${className}`}>
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Avya Store"
            className="w-12 h-12 object-contain mix-blend-multiply"
          />
          <div>
            <div className="flex items-baseline font-bold tracking-tight text-xl text-white">
              <span className="text-[#C8F376]">avya</span>
              <span className="text-[#A2BA88] ml-0.5">store</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4E4C4] font-medium mt-0.5 font-sans">
              More Than Trends
            </p>
          </div>
        </div>
        <p className="text-xs text-[#A2BA88] mt-3 font-serif italic tracking-wide">
          "Trends Today • Trends Tomorrow • Old Is Gold"
        </p>
      </div>
    );
    return linkTo ? <Link to={linkTo}>{footerContent}</Link> : footerContent;
  }

  if (variant === 'icon') {
    return (
      <img
        src="/logo.png"
        alt="Avya Store"
        className={`h-10 w-10 object-contain mix-blend-multiply ${className}`}
      />
    );
  }

  // Default Navbar Lockup — Large according to navbar, simple static display with NO hover effects
  const navContent = (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-navbar.png"
        alt="Avya Store"
        className="h-[72px] sm:h-[82px] w-auto max-w-[190px] sm:max-w-[240px] object-contain select-none mix-blend-multiply"
        loading="eager"
        onError={(e) => {
          e.currentTarget.src = '/logo.png';
        }}
      />
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} aria-label="Avya Store Home" className="inline-flex items-center">
      {navContent}
    </Link>
  ) : navContent;
};

export default BrandLogo;
