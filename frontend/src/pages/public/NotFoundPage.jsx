import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-center bg-fog text-ink">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 mx-auto rounded-xs bg-paper border border-border shadow-subtle flex items-center justify-center text-ink">
          <Compass className="w-9 h-9 animate-pulse" />
        </div>
        <span className="badge-new text-[9px] inline-block">
          404 · Destination Relocated
        </span>
        <h1 className="font-display text-5xl font-bold text-ink uppercase tracking-tight">
          The Trail Has Ended
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto font-light">
          The specific drop or archive page you are seeking may have moved or is temporarily in the vault.
        </p>
        <div className="pt-2">
          <Link to="/" className="btn-primary inline-flex items-center gap-2 py-3.5 px-7 text-xs font-black tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO {BRAND_CONFIG.name.toUpperCase()}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
