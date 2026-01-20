'use client';

import images from "@/assets/images";
import { CartRoller } from "@/assets/svg";
import { SideBar } from "@/components";
import Footer from "@/components/Nav/Footer";
import Rightbar from "@/components/Nav/Rightbar";
import useToggle from "@/components/Nav/useToggle";
import CategoryCard from "@/components/common/CategoryCard";
import HeroBanner from "@/components/common/HeroBanner";
import ProductCard from "@/components/common/ProductCard";
import { LazyBackgroundImage } from '@/components/common/lazyLoadingBg';
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";


const Page = () => {
  const [show, toggle] = useToggle();

  return <div className="flex flex-col space-y-2">
    <div className="flex justify-between min-h-[300px] p-2 md:p-8">
      <SideBar show={show} toggle={toggle} />
      <main className="w-full">
        <LazyBackgroundImage src={images?.banner} />
      </main>
      <Rightbar />

    </div>

    <div className="p-2 md:p-8">
      <p className="text-xl mb-2 text-secondary">Popular Categories</p>
      <div className="flex justify-between flex-wrap">
        <CategoryCard text="Books & Literature" imageSrc={images?.book} itemCount={7000} />
        <CategoryCard text="Electronics" imageSrc={images?.laptop} itemCount={10000} />
        <CategoryCard text="Sport Goods" imageSrc={images?.mask} itemCount={6500} widthClass="w-full md:w-[24%]" />
        <CategoryCard text="Children’s Goods" imageSrc={images?.toy} itemCount={1125} widthClass="w-full md:w-[24%]" />
        <CategoryCard text="Beauty" imageSrc={images?.beddings} itemCount={800} widthClass="w-full md:w-[24%]" />
        <CategoryCard text="Furniture" imageSrc={images?.sofa} itemCount={2030} widthClass="w-full md:w-[50%]" />
      </div>
    </div>

    <HeroBanner />

    <div className="p-2 md:p-8">
      <p className="text-xl mb-2 text-secondary">Discover More Gift Ideas</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={12000} imageUrl={images?.product_a} />
        <ProductCard productName="Champion Bracelet" price={14000} unitsSold={1200} imageUrl={images?.product_b} />
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={1850} imageUrl={images?.product_c} />
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={7800} imageUrl={images?.product_d} />
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={1932} imageUrl={images?.product_e} />
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={2004} imageUrl={images?.product_f} />
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={165} imageUrl={images?.product_g} />
        <ProductCard productName="Gift Special Box" price={24000} unitsSold={12} imageUrl={images?.product_h} />
      </div>

      <div className="text-center mt-3">
        <Button className="py-2 px-4 bg-secondary text-white text-sm">
          Explore More Gift Ideas <ChevronsRight color="white" />
        </Button>
      </div>



    </div>

    <Footer />

  </div>
};

export default Page;
