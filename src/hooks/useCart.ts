// src/hooks/useCart.ts
import { useCart as useCartContext } from '@/context/CartContext';

export const useCart = () => {
  return useCartContext();
};