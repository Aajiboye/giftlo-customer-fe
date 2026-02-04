export type Category = {
    "_id": "6901dad36857b37784406570",
    "title": "electronics & gadgets",
    "createdAt": "2025-10-29T09:13:55.995Z",
    "updatedAt": "2026-02-01T23:23:10.138Z",
    "__v": 0,
    "categoryImageUrl": "https://res.cloudinary.com/dnhntomez/image/upload/v1769987100/38af569916dd53411e99ce13970c0ffd5428a709_nxmu5y.png",
    "iconKey": "headphones"
}

export type Product = {
    "_id": "6903440b6e16bb16fbd3f9dd",
    "name": "golden choco dream layer cake",
    "category": {
        "_id": "6901db21dd4d18827fd1f82d",
        "title": "food & beverages",
        "createdAt": "2025-10-29T09:15:13.836Z",
        "updatedAt": "2025-10-29T09:15:13.836Z",
        "__v": 0
    },
    "images": [
        "https://res.cloudinary.com/dnhntomez/image/upload/v1761821705/giftlo/uchx9lewzkxz49kgeo5x.jpg"
    ],
    "price": 25000,
    "stockCount": 5,
    "quantitySold": 0,
    "approvalStatus": "approved",
    "code": "#fd09e3376d"
}

export interface Pagination {
    page: number;
    size: number;
    page_total: number;
}

export const widthClassesByIndex: Record<number, string> = {
  2: "w-full md:w-[24%]",
  3: "w-full md:w-[24%]",
  4: "w-full md:w-[24%]",
  5: "w-full md:w-[50%]",
};


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
