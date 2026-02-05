// src/types/detailproduct.ts

export interface ProductImage {
  id: string;
  src: string;
  alt?: string;
}

export interface ProductRating {
  value: number; // 0 - 5
  count: number;
}

export type Currency = 'NGN' | 'USD';

export interface detailproduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: Currency;
  images: ProductImage[];
  rating?: ProductRating;
  note?: string;
  isCustomizable: boolean; 
  isNew?: boolean;         
  category: string;        
}