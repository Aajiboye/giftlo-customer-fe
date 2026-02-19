'use client';

import { useDeleteItem, useFetchItem, usePostItem, usePostWithData, usePutWithData } from '@/utilities/useQuery';
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
import { Cart } from '@/types/cart';
import { toast } from 'sonner';
import { useProduct } from './ProductContext';
import api from '@/config/axiosInstance';


export type PageKey = 'products' | 'categories' | 'cart';

export type PageState = Partial<Record<PageKey, number>>;

interface CartContextType {
  cart: Cart;
  isFetchingCartItems: boolean;
  addItemToCart: (productId: string, quantity: number) => void;
  addOneItemToCart: (productId: string) => void;
  removeOneItemFromCart: (productId: string) => void;
  isModifyingCart: boolean;
  totalQuantity: number;
  totalAmount: number;
  deleteProductFromCart: (productId: string) => void;
  refetchUserCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const { data: cartData, isLoading: isFetchingCartItems, refetch: refetchUserCart } = useFetchItem(
    'app',
    ['get-customer-cart'],
    '/cart'
  );

  const cart: Cart = useMemo(() => {
    if (cartData) {
      return cartData
    }
    return [];
  }, [cartData]);

  const { mutateAsync: AddToCart, isPending: isAddingToCart } = usePostWithData("app", ["add-item-to-cart"], '/cart/add', false);
  const { mutateAsync: AddOneToCart, isPending: isAddingOneToCart } = usePutWithData("app", ["add-one-item-to-cart"], '/cart/add-one', false);
  const { mutateAsync: RemoveOneFromCart, isPending: isRemovingOneFromCart } = usePutWithData("app", ["remove-item-from-cart"], '/cart/remove-one', false);

  const isModifyingCart = isAddingOneToCart || isAddingToCart || isRemovingOneFromCart || isDeleting

  const addItemToCart = async (productId: string, quantity: number) => {
    try {
      const data: any = await AddToCart({
        productId, quantity
      });

      console.log({ data });
      await refetchUserCart();
      toast.success('Item added to cart successfully');
    } catch (error: any) {
      toast.error(
        `${error}`
      );
    }
  };

  const addOneItemToCart = async (productId: string) => {
    try {
      const data: any = await AddOneToCart({
        productId
      });

      console.log({ data });
      await refetchUserCart();
      toast.success('Item added to cart successfully');
    } catch (error: any) {
      toast.error(
        `${error}`
      );
    }
  };

  const removeOneItemFromCart = async (productId: string) => {
    try {
      const data: any = await RemoveOneFromCart({
        productId
      });

      console.log({ data });
      await refetchUserCart();
      toast.success('Item remove from cart successfully');
    } catch (error: any) {
      toast.error(
        `${error}`
      );
    }
  };

  const deleteProductFromCart = async (productId: string) => {
    try {
      setIsDeleting(true)
      const data: any = await api('app').delete(`/cart/${productId}`);
      console.log({ data });
      await refetchUserCart();
      toast.success('Item deleted from cart successfully');
    } catch (error: any) {
      toast.error(
        `${error}`
      );
    }

    setIsDeleting(false)

  };

  const totalQuantity = useMemo(() => {
    return cart?.items?.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart])

  const totalAmount = useMemo(() => {
    return cart?.items?.reduce((acc, item) => acc + item.quantity * item?.price, 0);
  }, [cart])




  console.log({ cartData })






  return (
    <CartContext.Provider
      value={{
        cart, isFetchingCartItems, addItemToCart, isModifyingCart, removeOneItemFromCart, addOneItemToCart, totalAmount, totalQuantity, deleteProductFromCart, refetchUserCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
