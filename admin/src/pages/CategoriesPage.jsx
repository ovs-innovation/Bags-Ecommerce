import React from 'react';
import { Layers, Plus } from 'lucide-react';

export const CategoriesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Category Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure Men, Women, Handbags, Wallets, Crossbody, and leather accessory categories.
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 opacity-60 cursor-not-allowed rounded"
        >
          <Plus className="w-4 h-4" />
          <span>New Category (Phase 10)</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-600">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-900">Category Hierarchy Ready</h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          Category schemas with gender filtering (men, women, unisex) and slugs will be activated in <strong>Phase 4 & 10</strong>.
        </p>
      </div>
    </div>
  );
};

export default CategoriesPage;
