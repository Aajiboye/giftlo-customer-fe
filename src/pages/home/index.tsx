'use client';

import images from "@/assets/images";
import { SideBar } from "@/components";
import CardLoader from "@/components/Loaders/CardLoader";
import Rightbar from "@/components/Nav/Rightbar";
import useToggle from "@/components/Nav/useToggle";
import CategoryCard from "@/components/common/CategoryCard";
import HeroBanner from "@/components/common/HeroBanner";
import ProductCard from "@/components/common/ProductCard";
import { LazyBackgroundImage } from '@/components/common/lazyLoadingBg';
import { Button } from "@/components/ui/button";
import { useProduct } from "@/context/ProductContext";
import { ChevronsRight } from "lucide-react";

const widthClassesByIndex: Record<number, string> = {
  2: "w-full md:w-[24%]",
  3: "w-full md:w-[24%]",
  4: "w-full md:w-[24%]",
  5: "w-full md:w-[50%]",
};

const Page = () => {
  const { categories, products, isFetchingCategories } = useProduct();


  return <div className="flex flex-col space-y-2">
    <div className="flex justify-between min-h-[300px] md:min-h-[500px] p-2 md:p-8">

      <div className="hidden lg:block w-1/4">
        <SideBar />
      </div>

      <main className="w-full">
        <LazyBackgroundImage src={images?.banner} />
      </main>
      <Rightbar />

    </div>

    <div className="p-2 md:p-8">
      <p className="text-xl mb-2 text-secondary">Popular Categories</p>
      <div className="flex justify-between flex-wrap">
        {isFetchingCategories ? [...Array(10).keys()].map(() => <CardLoader />)

          :

          categories
            ?.slice(0, 6)
            .map((category, index) => (
              <CategoryCard
                key={category._id ?? index}
                text={category.title}
                imageSrc={category.categoryImageUrl}
                itemCount={7000}
                widthClass={widthClassesByIndex[index]}
              />
            ))


        }



      </div>
    </div>

    <HeroBanner />

    <div className="p-2 md:p-8">
      <p className="text-xl mb-2 text-secondary">Discover More Gift Ideas</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {products
          ?.slice(0, 6)
          .map((product, index) => (
            <ProductCard key={index} product={product}/>
          ))}
      </div>

      <div className="text-center mt-3">
        <Button className="py-2 px-4 bg-secondary text-white text-sm">
          Explore More Gift Ideas <ChevronsRight color="white" />
        </Button>
      </div>



    </div>
  </div>
};

export default Page;
