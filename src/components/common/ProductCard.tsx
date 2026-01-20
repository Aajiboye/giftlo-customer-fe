import { formatCount } from "@/utilities/format.helper";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { CartArrow, CartRoller, GiftBoldIcon } from "@/assets/svg";
import { LazyImage } from "./lazyLoadingImg";
import { LazyBackgroundImage } from "./lazyLoadingBg";

interface ProductCardProps {
    productName: string;
    price: number;
    unitsSold: number;
    imageUrl: string;
}

export default function ProductCard({
    productName,
    price,
    unitsSold,
    imageUrl,
}: ProductCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Image Section */}
            <div className="relative w-full h-64">
                <LazyBackgroundImage
                    src={imageUrl}
                />

                
                <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2">
                    <Heart className="h-6 w-6" />
                </button>
            </div>

            {/* Product Info Section */}
            <div className="p-2">
                <h3 className="text-md text-[#3D3D3D]">{productName}</h3>

                <div className="flex justify-between">
                    <div className="mt-2">
                        <p className="text-lg font-semibold text-secondary">
                            ₦{price.toLocaleString()}
                        </p>
                        <div className="flex text-gray-500 items-center">
                            <CartArrow width={22} height={22}/>                        
                            <p className="text-sm"> {formatCount(unitsSold)} Units sold</p>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button className="p-2 bg-secondary text-white text-xs">
                       <CartRoller color="white"/> <p className="hidden md:block">Add to cart</p>
                    </Button>
                </div>


            </div>
        </div>
    );
}
