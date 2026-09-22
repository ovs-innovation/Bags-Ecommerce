import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, size = 'sm' }) => {
  const s = size === 'xs' ? 'w-3 h-3' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${s} ${n <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-border'}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
