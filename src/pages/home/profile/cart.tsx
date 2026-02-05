import React from 'react';
import { useRouter } from 'next/router';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { CartSummary } from '@/components/cart/CartSummary';
import { ProductBreadcrumbs } from '@/components/product/ProductBreadCrumbs';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types/cart';
import PageNav from '@/components/common/PageNav';
import CartLoader from '@/components/Loaders/CartLoader';

export default function CartPage() {
  const { cart, totalAmount, totalQuantity, isFetchingCartItems } = useCart();
  const cartCurrency = 'NGN';

  return (

    <div className="min-h-screen bg-white lg:bg-[#F5F5F5] lg:pb-12">
      <div className="max-w-[1440px] mx-auto">


        {/* <div className="hidden lg:block px-10">
          <PageNav />
        </div> */}


        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-0 lg:gap-6 lg:px-10 mt-0 lg:mt-2">


          <div className="lg:col-span-4 lg:order-2 lg:sticky lg:top-6">
            <CartSummary
              totalItems={totalQuantity}
              subtotal={totalAmount}
              currency={cartCurrency}
            />
          </div>


          <div className="lg:col-span-8 lg:order-1">
            <div className="bg-white lg:rounded-2xl p-4 lg:p-6 lg:shadow-sm lg:border lg:border-gray-100">

              <div className="flex items-baseline gap-2 mb-6">
                <h2 className="text-xl font-bold text-[#171717]">Cart</h2>
                <span className="text-[#A3A3A3] font-medium">({cart?.items?.length})</span>
              </div>

              <div className="space-y-0 lg:space-y-4">
                {isFetchingCartItems ? [0].map(() => <CartLoader />)

                  : cart?.items?.map((item: CartItem) => (
                    <CartItemCard
                      key={item.productId}
                      item={item}

                    />
                  ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}