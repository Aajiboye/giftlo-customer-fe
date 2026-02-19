import { LucideIcon } from "lucide-react";


export interface Package {
    _id: string;
    name: string;
    price: number;
    description: string;
    icon?:LucideIcon;
    features: string[];
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}