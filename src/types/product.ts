export type Category = {
    "categoryImageUrl": string,
    "iconKey": string,
    "_id": string;
    "title": string;
    "createdAt": string;
    "updatedAt": string;
    "__v": number;
}

export type Product = {
    "_id": string;
    "name": string;
    "category": Category;
    "images": string[];
    "price": number;
    "stockCount": number;
    "quantitySold": number;
    "approvalStatus": string;
    "code": string;
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
