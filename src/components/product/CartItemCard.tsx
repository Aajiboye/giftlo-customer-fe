import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react'; 
import { CartItem } from '@/types/cart';
import { formatPrice } from '@/utilities/format.helper'; 

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="group flex flex-col w-full border border-gray-100 rounded-xl bg-white overflow-hidden transition-all hover:shadow-sm">
      <div className="flex p-4 gap-4 items-start">
        {/* Image */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 96px"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight line-clamp-2">
              {item.name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>Seller: <span className="text-gray-700 font-medium">{item.seller}</span></span>
              {item.isCustomized && (
                <>
                  <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-100 uppercase">
                    ⚡ Customized
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {/* Using the new helper with dynamic currency support */}
              {formatPrice(item.price, item.currency || 'NGN')}
            </span>
            
            <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
                className="p-1.5 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 font-semibold text-sm min-w-[32px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="p-1.5 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="flex items-center gap-2 px-4 py-2.5 text-red-600 bg-gray-50/50 hover:bg-red-50 transition-all border-t border-gray-100 text-xs font-bold uppercase tracking-wider"
      >
        <Trash2 size={14} strokeWidth={2.5} />
        Remove Item
      </button>
    </div>
  );
};