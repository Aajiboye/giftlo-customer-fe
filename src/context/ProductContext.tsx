'use client';

import { useFetchItem } from '@/utilities/useQuery';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo
} from 'react';
import { useUser } from './UserContext';
import {
  Category,
  Pagination,
  Product
} from '@/types/product';


type PageKey = 'products' | 'categories' | 'cart';

type PageState = Partial<Record<PageKey, number>>;

interface ProductContextType {
  categories: Category[];
  products: Product[];
  pagination: Record<string, Pagination | undefined>;
  page: PageState;
  setActiveProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  updatePage: (type: string, page: number) => void;
  isFetchingCategories:boolean;
  isFetchingProducts: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState<PageState>({});
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const { user } = useUser();
  const { data: categoryData, isLoading: isFetchingCategories } = useFetchItem(
    'app',
    ['get-all-categories'],
    '/product-categories'
  );

  const { data: productData, isLoading: isFetchingProducts } = useFetchItem(
    'app',
    ['get-all-products'],
    '/products'
  );

  const categories: Category[] = useMemo(() => {
    if (categoryData?.length > 0) {
      setActiveCategory(categoryData[0]);
      return categoryData;
    }
    return [];
  }, [categoryData]);

  const products: Product[] = useMemo(() => {
    if (productData?.data?.length > 0) {
      setActiveProduct(productData?.data?.[0]);
      let pagination: Pagination = {
        page: productData?.page, page_total: productData?.page_total, size: productData?.size,
      }

      setPagination((prev) => ({
        ...prev,
        products: pagination
      }));

      return productData?.data
    }
    return [];
  }, [productData]);

  function updatePage(type: string, page: number) {
    setPage((prev) => ({
      ...prev,
      [type]: page
    }));
  }

  return (
    <ProductContext.Provider
      value={{
        categories, products, pagination, page, setActiveProduct, updatePage, isFetchingProducts, isFetchingCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
