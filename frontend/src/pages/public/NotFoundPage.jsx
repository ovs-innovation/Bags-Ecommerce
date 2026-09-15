import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

export const NotFoundPage = () => {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <Compass className="w-16 h-16 text-brand-700 mx-auto animate-pulse" />
        <span className="text-xs uppercase font-bold tracking-widest text-brand-600 block">
          404 · Destination Not Found
        </span>
        <h1 className="font-serif text-4xl font-bold text-onyx-950">
          The Trail Has Ended
        </h1>
        <p className="text-sm text-onyx-700">
          The boutique page or collection you are seeking may have relocated or is currently unavailable.
        </p>
        <div className="pt-4">
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to {BRAND_CONFIG.name} Atelier</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
