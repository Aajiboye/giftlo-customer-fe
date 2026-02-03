import { Product } from '@/types/product';
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo'; // We will build this next
import { ProductBreadcrumbs } from './ProductBreadCrumbs';

interface ProductDetailProps {
  product: Product;
}


export function ProductDetail({ product }: ProductDetailProps) {
  const breadcrumbItems = [
    { label: 'AI Gift Recommendations', href: '/recommendations' },
    { label: 'Item More Details', href: '#' },
    { label: product.name },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
      <ProductBreadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 xl:gap-4 items-stretch">
        {/* Gallery */}
        <div className="lg:col-span-7 h-full">
          <ProductGallery images={product.images} />
        </div>

        {/* Info */}
        <div className="lg:col-span-5 h-full flex">
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
}
