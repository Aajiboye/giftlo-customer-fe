export type Currency = 'NGN' | 'USD';

export interface CartItem {
    "productId": string;
    "name": string;
    "brandName": string;
    "price": number;
    "image": string;
    "quantity": number;
    "_id": string;
    "createdAt": string;
    "updatedAt": string;
}



export interface Cart {
  "customerId": string;
  "items": CartItem[];
  "_id": string;
  "createdAt": string;
  "updatedAt": string;
  "__v": number
}