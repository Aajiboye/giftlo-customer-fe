// src/components/cart/CartSummary.tsx
import React from 'react';
import { formatPrice, formatKoboToNaira } from '@/utilities/format.helper';
import { Currency } from '@/types/detailproduct';
import { Lightbulb,Bolt } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  currency: Currency;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  subtotal,
  currency,
}) => {
  const formattedPrice =  formatKoboToNaira(subtotal);
  const {navigateToCheckout} = useNavigation();
  // formatPrice(subtotal, currency);

  return (
    <div className="flex flex-col">
      {/* Main Summary Section */}
      <div className="bg-white p-4 lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-gray-50">
        <h3 className="text-lg font-bold text-[#343434] mb-4 lg:mb-6 border-b border-gray-100 lg:border-gray-50 pb-4">
          Cart Summary
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center  text-sm">
            <span className='text-[#343434]'>No. of Items</span>
            <span className="font-semibold text-[#3D3D3D]">{totalItems}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#343434] text-sm">Subtotal</span>
            <span className="font-bold text-xl text-[#3D3D3D]">{formattedPrice}</span>
          </div>

          <p className="text-[11px] text-[#3D3D3D]">Delivery fees not included yet.</p>

          <button
            type="button"
            className="w-full bg-[#3B006B] hover:bg-[#2d0052] text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
            onClick={navigateToCheckout}
          >
            Checkout {formattedPrice}
          </button>
        </div>

        {/* Mobile-Only Return Info: Merged into the bottom of this section */}
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-[12px] text-gray-600">
<Lightbulb className="w-4 h-4 bg-[#FFB800] text-white rounded-full" />
          <p>
            Free return within 7 days for All eligible items{' '}
            <span className="text-[#3B006B] font-medium cursor-pointer underline">Details</span>
          </p>
        </div>
      </div>

      {/* Desktop-Only Return Card: Stays separate on PC */}
      <div className="hidden lg:block mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h4 className="font-semibold text-[#1B1B1B] text-sm mb-1">Returns are easy</h4>
        <p className="text-sm text-[#343434] leading-relaxed">
          Free return within 7 days for All eligible items.
          <span className="text-[#343434] font-medium cursor-pointer ml-1 hover:underline">Details</span>
        </p>
      </div>
    </div>
  );
};