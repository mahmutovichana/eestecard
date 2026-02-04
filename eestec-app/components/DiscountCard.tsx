'use client';

import { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import type { Discount } from '@/lib/types';

interface DiscountCardProps {
  discount: Discount;
}

export default function DiscountCard({ discount }: DiscountCardProps) {
  const [isFaved, setIsFaved] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: discount.title,
        text: `${discount.discountPercentage}% off at ${discount.partnerName}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
      {/* Image Placeholder */}
      <div className="h-40 bg-gradient-to-br from-eestec-red to-red-700 relative overflow-hidden">
        {discount.imageUrl ? (
          <img
            src={discount.imageUrl}
            alt={discount.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-center px-4">
            <span className="font-bold text-4xl">{discount.discountPercentage}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="badge-secondary text-xs">{discount.category}</span>
        </div>

        <h3 className="font-bold text-lg text-eestec-dark mb-1">{discount.title}</h3>
        <p className="text-sm font-semibold text-gray-600 mb-3">{discount.partnerName}</p>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{discount.description}</p>

        {discount.validUntil && (
          <p className="text-xs text-gray-500 mb-4">
            Expires: {new Date(discount.validUntil).toLocaleDateString()}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <button
            onClick={() => setIsFaved(!isFaved)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition font-semibold text-sm ${
              isFaved
                ? 'bg-red-50 text-eestec-red'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFaved ? 'fill-current' : ''}`} />
            Save
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition font-semibold text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
