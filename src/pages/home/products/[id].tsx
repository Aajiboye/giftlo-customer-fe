import { useRouter } from 'next/router';
import { ProductDetail } from '@/components/product/ProductDetail';
import { detailproduct } from '@/types/detailproduct';
import { useProduct } from '@/context/ProductContext';
import { useMemo } from 'react';
import { Product } from '@/types/product';
import CartLoader from '@/components/Loaders/CartLoader';
import CardLoader from '@/components/Loaders/CardLoader';


export default function ProductDetailsPage() {
  const router = useRouter();
  const { activeProduct, products } = useProduct();
  const { id } = router.query;

  const mainProduct: Product = useMemo(() => {
    if (id) {
      return products?.find(prod => prod._id == String(id)) ?? activeProduct
    } else {
      return activeProduct
    }
  }, [products])

  if (!id) {
    return <div className="p-4">
      <div className=""><CardLoader /></div>
    </div>
  }

  if (!mainProduct) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-gray-400">issues viewing product details...</div>
      </div>
    );
  }

  return <ProductDetail product={mainProduct} />;
}