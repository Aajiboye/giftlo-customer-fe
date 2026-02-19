import { formatCount, formatKoboToNaira } from "@/utilities/format.helper";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { CartArrow, CartRoller, GiftBoldIcon } from "@/assets/svg";
import { LazyImage } from "./lazyLoadingImg";
import { LazyBackgroundImage } from "./lazyLoadingBg";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { useNavigation } from "@/hooks/useNavigation";
import { useProduct } from "@/context/ProductContext";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({
    product
}: ProductCardProps) {
    const { name, price, quantitySold, images, _id } = product;
    const { addItemToCart, isModifyingCart } = useCart();
    const { setActiveProduct, isFetchingProducts } = useProduct();
    const { navigateToViewProduct } = useNavigation();

    const viewProduct = () => {
        setActiveProduct(product)
        navigateToViewProduct(product?._id)
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Image Section */}
            <div className="relative w-full h-64 cursor-pointer" onClick={viewProduct}>
                <LazyBackgroundImage
                    src={images[0]}
                />


                <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2">
                    <Heart className="h-6 w-6" />
                </button>
            </div>

            {/* Product Info Section */}
            <div className="p-2">
                <h3 className="text-md text-[#3D3D3D] cursor-pointer" onClick={viewProduct}>{name}</h3>

                <div className="flex justify-between">
                    <div className="mt-2">
                        <p className="text-lg font-semibold text-secondary">
                            {formatKoboToNaira(price)}
                        </p>
                        <div className="flex text-gray-500 items-center">
                            <CartArrow width={22} height={22} />
                            <p className="text-sm"> {formatCount(quantitySold)} Units sold</p>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button variant={'secondary'} onClick={() => addItemToCart(_id, 1)} isLoading={isModifyingCart}>
                        <CartRoller color="white" /> <p className="hidden md:block">Add to cart</p>
                    </Button>
                </div>


            </div>
        </div>
    );
}
