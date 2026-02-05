// src/components/product/ProductActions.tsx

import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface ProductActionsProps {
  isCustomizable: boolean;
  product: Product
  disabled?: boolean;
}


export function ProductActions({
  isCustomizable, product
}: ProductActionsProps) {
  const { addItemToCart, isModifyingCart } = useCart();

  return (
    <div className="flex flex-col gap-2 ">
      {isCustomizable && (
        <Button
          type="button"
          onClick={() => console.log("customizing")}
          disabled={!isCustomizable}
          className="w-full h-[50px] bg-[#3B006B] hover:bg-[#6213a3] text-white text-lg font-semibold rounded-2xl px-8 py-3  mb-8"
        >
          Customize Package
        </Button>
      )}

      <div className="grid grid-cols-2 gap-4 mt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => console.log(product?._id)} isLoading={isModifyingCart}
          className="h-[50px] border-2 border-[#3B006B] text-[#3B006B] hover:bg-[#3B006B] rounded-2xl font-bold"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Buy Now
        </Button>

        <Button
          type="button"
          onClick={() => addItemToCart(product?._id, 1)} isLoading={isModifyingCart}
          className="h-[50px] bg-[#3B006B] hover:bg-[#6213a3] text-white rounded-2xl font-bold"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
