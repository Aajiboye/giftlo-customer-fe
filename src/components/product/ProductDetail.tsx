import { detailproduct } from '@/types/detailproduct'; // Import the UI type instead
import { ProductGallery } from './ProductGallery';
import { ProductInfo } from './ProductInfo';
import { ProductBreadcrumbs } from './ProductBreadCrumbs';
import { Product } from '@/types/product';
import PageNav from '../common/PageNav';

interface ProductDetailProps {
  product: Product; 
}

export function ProductDetail({ product }: ProductDetailProps) {

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-2 md:py-6">
      <PageNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 xl:gap-4 items-stretch">
        <div className="lg:col-span-7 h-full">
          {/* Ensure ProductGallery also accepts detailproduct.images (ProductImage[]) */}
          <ProductGallery images={product.images} />
        </div>

        <div className="lg:col-span-5 h-full flex">
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
}