// src/components/product/ProductActions.tsx

import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductActionsProps {
  isCustomizable: boolean;

  onCustomize?: () => void;
  onBuyNow?: () => void;
  onAddToCart?: () => void;

  disabled?: boolean;
}


export function ProductActions({
  isCustomizable,
  onCustomize,
  onBuyNow,
  onAddToCart,
  disabled = false,
}: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-8 ">
      {isCustomizable && onCustomize && (
        <Button
          type="button"
          onClick={onCustomize}
          disabled={disabled}
          className="w-full h-[50px] bg-[#3B006B] hover:bg-[#6213a3] text-white text-lg font-semibold rounded-2xl px-8 py-3  mb-8"
        >
          Customize Package
        </Button>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={onBuyNow}
          className="h-[50px] border-2 border-[#3B006B] text-[#3B006B] hover:bg-[#3B006B] rounded-2xl font-bold"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Buy Now
        </Button>

        <Button
          type="button"
          disabled={disabled}
          onClick={onAddToCart}
          className="h-[50px] bg-[#3B006B] hover:bg-[#6213a3] text-white rounded-2xl font-bold"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
