import React from 'react';
import { Star } from 'lucide-react';

export const ReviewsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-stone-900">
          Review Moderation
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review customer feedback, verify purchase authenticity, and approve customer ratings.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-600">
          <Star className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-stone-900">Review Moderation Ready</h3>
        <p className="text-xs text-stone-600 leading-relaxed">
          Product ratings and verified buyer reviews moderation pipeline will be connected in <strong>Phase 13</strong>.
        </p>
      </div>
    </div>
  );
};

export default ReviewsPage;
