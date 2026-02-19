import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types/cart';
import { formatKoboToNaira, formatPrice } from '@/utilities/format.helper';
import { Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '../ui/button';
interface CartItemCardProps {
  item: CartItem;

}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,

}) => {
  const { addOneItemToCart, removeOneItemFromCart, deleteProductFromCart, isModifyingCart } = useCart();

  return (
    <div className="group flex flex-col w-full border border-gray-100 rounded-xl bg-white overflow-hidden transition-all hover:shadow-sm">
      <div className="relative flex p-3 sm:p-4 gap-4 items-start">
        <Button
          onClick={() => deleteProductFromCart(item.productId)}
          className="sm:hidden absolute top-4 left-4 z-10 p-1.5 bg-white/90 shadow-sm rounded-md text-red-500 active:bg-red-100"
          isLoading={isModifyingCart}
        >
          <Trash2 size={16} strokeWidth={2.5} />
        </Button>

        <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 96px, 112px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-[15px] sm:text-lg leading-tight line-clamp-1">
              {item.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>Seller: <span className="text-gray-600 font-medium">{item.brandName}</span></span>
              {/* {item.isCustomized && ( */}
              <div className="bg-amber-50 text-[#FFB800] px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-100 uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 bg-[#FFB800] text-white rounded-full" /> Customized
              </div>
              {/* )} */}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {/* {formatPrice(item.price, "NGN")} */}
              {formatKoboToNaira(item?.price)}
            </span>

            <div className="flex items-center border border-gray-100 rounded-lg bg-gray-50/50 overflow-hidden">
              <Button
                onClick={() => removeOneItemFromCart(item.productId)}
                disabled={item.quantity <= 1}
                className="p-1.5"
                variant={'secondary'}
                isLoading={isModifyingCart}
              >
                <Minus size={16} className="" />
              </Button>
              <span className="px-3 font-medium text-sm min-w-[32px] text-center text-gray-700">
                {item.quantity}
              </span>
              <Button
                onClick={() => addOneItemToCart(item.productId)}
                className="p-1.5"
                variant={'secondary'}
                isLoading={isModifyingCart}
              >
                <Plus size={16} className="" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          onClick={() => { deleteProductFromCart(item?.productId) }}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-red-500 bg-gray-50/30 hover:bg-red-50 transition-all border-t border-gray-50 text-[11px] font-bold uppercase tracking-wider"
          isLoading={isModifyingCart}
        >
          <Trash2 size={14} strokeWidth={2.5} />
          Remove Item
        </Button>
      </div>

    </div>
  );
};