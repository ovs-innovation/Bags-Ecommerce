import React from 'react';
import { Package, Plus } from 'lucide-react';
import { ADMIN_CONFIG } from '../constants/config';

export const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Product Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your leather purse inventory, pricing, images, and category assignments.
          </p>
        </div>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 opacity-60 cursor-not-allowed rounded"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product (Phase 10)</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-600">
          <Package className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-900">Product Studio Architecture Ready</h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          Product CRUD operations, image asset pipelines, variant management, and live inventory sync with MongoDB will be connected in <strong>Phase 10</strong>.
        </p>
      </div>
    </div>
  );
};

export default ProductsPage;
