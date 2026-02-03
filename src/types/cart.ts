export type Currency = 'NGN' | 'USD';

export interface CartItem {
  id: string;
  name: string;
  seller: string;
  price: number;
  currency: Currency; 
  quantity: number;
  image: string;
  isCustomized?: boolean;
}