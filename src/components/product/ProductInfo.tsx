import { Star, Lightbulb } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductActions } from './ProductActions';

export function ProductInfo({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="flex flex-col w-full h-full gap-4">
      {/* INFO CARD */}
      <div className="rounded-2xl border bg-white p-6 flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-[#3D3D3D]">
          {product.name}
        </h4>

        <p className="text-[#858585] text-base leading-[160%]">
          {product?.name}
        </p>

        {/* {product.rating && (
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{product.rating.value}</span>
            <span className="text-gray-400">
              ({product.rating.count})
            </span>
          </div>
        )} */}

        <h2 className="text-4xl font-medium text-[#3D3D3D]">
          {formattedPrice}
        </h2>

        <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 w-fit px-3 py-1 rounded-full border">
          <Lightbulb className="w-4 h-4 bg-[#FFB800] text-white rounded-full" />
          <p className="text-xs">{product?.name}</p>
        </div>

        {/* 🔹 DESKTOP ONLY: Customize button */}
        {/* {product.isCustomizable && ( */}
          <div className="mt-auto hidden lg:block">
            <button
              className="w-full h-[50px] rounded-2xl bg-[#3B006B] text-white font-semibold hover:bg-[#6213a3]"
            >
              Customize Package
            </button>
          </div>
        {/* )} */}

        {/* 🔹 MOBILE ONLY: Buy + Add to Cart INSIDE SAME CARD */}
        <div className=" lg:hidden">
          <ProductActions
            isCustomizable={false}
            onBuyNow={() => console.log('Buy now', product._id)}
            onAddToCart={() => console.log('Add to cart', product._id)}
          />
        </div>
      </div>

      {/* 🔹 DESKTOP ONLY: Separate actions card */}
      <div className="hidden lg:block rounded-2xl border bg-white p-6">
        <ProductActions
          isCustomizable={false}
          onBuyNow={() => console.log('Buy now', product._id)}
          onAddToCart={() => console.log('Add to cart', product._id)}
        />
      </div>
    </div>
  );
}
