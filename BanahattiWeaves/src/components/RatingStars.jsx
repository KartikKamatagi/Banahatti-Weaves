import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5.0, count = 0, showCount = true }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1 text-[#C69214]">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < fullStars ? 'fill-[#C69214] text-[#C69214]' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      <span className="font-bold text-xs text-[#2C221E] dark:text-[#FDFBF7] ml-0.5">
        {rating}
      </span>
      {showCount && count > 0 && (
        <span className="text-[10px] text-[#6B5E57] dark:text-[#B8ACA5]">
          ({count})
        </span>
      )}
    </div>
  );
}
