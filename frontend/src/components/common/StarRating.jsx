import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, size = 'sm' }) => {
  const s = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${s} ${n <= Math.round(rating) ? 'text-gold-500 fill-gold-500' : 'text-stone-300'}`}
        />
      ))}
    </div>
  );
};
export default StarRating;
