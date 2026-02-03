'use client';
import images from "@/assets/images";
import { ProfileSideBar } from "@/components";
import useToggle from "@/components/Nav/useToggle";
import OrderCard from "@/components/profile/OrderCard";
import ProfileCard from "@/components/profile/ProfileCard";
import { useUser } from "@/context/UserContext";
import { useNavigation } from "@/hooks/useNavigation";
import { ChevronLeft } from "lucide-react";


const Page = () => {
  const { user } = useUser();
  const { navigateToProfileEdit } = useNavigation();

  return <div className="flex flex-col space-y-2">
    <div className="flex min-h-[300px] p-2 md:p-8 space-x-4">
      <div className="hidden md:block w-1/4">
        <ProfileSideBar />
      </div>

      <div className="w-full space-y-4">
        <div className="flex gap-2 items-center text-secondary">
          <ChevronLeft />
          <p className="text-lg text-secondary"> Orders</p>
        </div>

        <OrderCard
          orderId="2c5f87"
          completedAt="28 May 2024 • 05:47 PM"
          subtotal={7550000}
          items={[
            {
              id: "1",
              title: "Olaplex No. 3 Hair Perfector",
              seller: "Gadget Galaxy",
              price: 7550000,
              image: images?.order,
              customized: true,
            },
            {
              id: "2",
              title: "Olaplex No. 3 Hair Perfector",
              seller: "Gadget Galaxy",
              price: 7550000,
              image: images?.order,
              customized: true,
            },
          ]}
        />

      </div>


    </div>


  </div>
};

export default Page;
