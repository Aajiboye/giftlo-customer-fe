import { Star, Lightbulb } from 'lucide-react';
import { ProductActions } from './ProductActions';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { formatKoboToNaira } from '@/utilities/format.helper';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  
  const { addItemToCart, isModifyingCart } = useCart();


  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="rounded-2xl border bg-white p-6 flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-[#3D3D3D]">
          {product.name}
        </h4>

        <p className="text-[#858585] text-base leading-[160%]">
          {product?.name}
        </p>

        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{4.4}</span>
          <span className="text-gray-400">
            ({300})
          </span>
        </div>

        <h2 className="text-4xl font-medium text-[#3D3D3D]">
          {formatKoboToNaira(product?.price)}
        </h2>

        <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 w-fit px-3 py-1 rounded-full border">
          <Lightbulb className="w-4 h-4 bg-[#FFB800] text-white rounded-full" />
          <p className="text-xs">{product.approvalStatus}</p>
        </div>

        <div className="lg:hidden">
          <ProductActions
            isCustomizable={true} product={product}
          />
        </div>
      </div>

      <div className="hidden lg:block rounded-2xl border bg-white p-6">
        <ProductActions
          isCustomizable={true}
          product={product}
        />
      </div>
    </div>
  );
}