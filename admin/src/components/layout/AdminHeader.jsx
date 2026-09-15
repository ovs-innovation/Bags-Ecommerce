import React from 'react';
import { Shield, Radio } from 'lucide-react';
import { ADMIN_CONFIG } from '../../constants/config';

export const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        <h1 className="text-base font-semibold text-stone-900">
          {ADMIN_CONFIG.portalName}
        </h1>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Standalone Admin (Port 5174)
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded border border-stone-200">
          <Shield className="w-3.5 h-3.5 text-stone-700" />
          <span>Role: Super Administrator</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
