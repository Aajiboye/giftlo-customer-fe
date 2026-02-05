'use client';

import images from "@/assets/images";
import CategoryCard from "@/components/common/CategoryCard";
import Pagination from "@/components/common/Pagination";
import ProductCard from "@/components/common/ProductCard";
import CategoryGridSkeleton from "@/components/Loaders/CategoryLoader";
import ProductCardSkeleton from "@/components/Loaders/ProductCardSkeleton";
import { useProduct } from "@/context/ProductContext";
import { widthClassesByIndex } from "@/types/product";
import { useState } from "react";


const Page = () => {
    const { categories, products, pagination, updatePage, isFetchingProducts, isFetchingCategories } = useProduct();

    const prodPagination = pagination.products;
    const currentPage = prodPagination?.page ?? 1;

    return <div className="flex flex-col space-y-2">

        <div className="p-2 md:px-8">
            <p className="text-secondary">Explore More Options</p>
            <div className="flex items-center justify-between text-light font-light">
                <p className="">
                    Explore other categories to find the perfect gifts for you and your loved ones below.
                </p>

                <p className="">Results <span className="font-bold">(245)</span></p>
            </div>
        </div>

        <div className="p-2 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isFetchingProducts ? [...Array(8).keys()].map(() => <ProductCardSkeleton />) :

                    products
                        .map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
            </div>


            <div className="w-full mt-3 p-2 md:px-8 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={prodPagination?.page_total ?? 1}
                    onPageChange={(val: number) => {
                        updatePage('products', val ?? 1);
                    }}
                />
            </div>




        </div>
        <div className="p-2 md:p-8">
            <p className="text-xl mb-2 text-secondary">Popular Categories</p>
            {isFetchingCategories ? <CategoryGridSkeleton />

                :
                <div className="flex justify-between flex-wrap">


                    {categories
                        ?.slice(0, 6)
                        .map((category, index) => (
                            <CategoryCard
                                key={category._id ?? index}
                                text={category.title}
                                imageSrc={category.categoryImageUrl}
                                itemCount={7000}
                                widthClass={widthClassesByIndex[index]}
                            />
                        ))}

                </div>}
        </div>
    </div>
};

export default Page;
