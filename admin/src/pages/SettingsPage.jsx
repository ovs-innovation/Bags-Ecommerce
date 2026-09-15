import React from 'react';
import { Settings, Shield, Store } from 'lucide-react';
import { ADMIN_CONFIG } from '../constants/config';

export const SettingsPage = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">
          Store & System Configuration
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review central brand metadata, connected backend API configuration, and security parameters.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-6 shadow-xs">
        <div className="flex items-center space-x-3 pb-4 border-b border-stone-100">
          <Store className="w-5 h-5 text-stone-700" />
          <h3 className="text-sm font-semibold text-stone-900">Brand & Localization Parameters</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block font-medium">Placeholder Brand Name</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">{ADMIN_CONFIG.brandName}</span>
          </div>
          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block font-medium">Currency Symbol</span>
            <span className="text-stone-900 font-bold text-sm mt-0.5 block">{ADMIN_CONFIG.currency} ({ADMIN_CONFIG.currencyCode})</span>
          </div>
          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block font-medium">Central API Endpoint</span>
            <span className="text-stone-900 font-mono text-xs mt-0.5 block">{import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</span>
          </div>
          <div className="p-3 bg-stone-50 rounded border border-stone-200">
            <span className="text-stone-500 block font-medium">Customer Storefront Link</span>
            <span className="text-stone-900 font-mono text-xs mt-0.5 block">{ADMIN_CONFIG.storefrontUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
