import React from 'react';
import { Users } from 'lucide-react';

export const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">
          Customer Management
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Registered customer accounts, order histories, and delivery address profiles.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-600">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-900">Customer Profiles Ready</h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          Customer records synced from MongoDB will display here following authentication integration in <strong>Phase 3 & 8</strong>.
        </p>
      </div>
    </div>
  );
};

export default CustomersPage;
