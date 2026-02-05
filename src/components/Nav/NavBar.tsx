"use client";

import Image from "next/image";
import { useState } from "react";
import { SearchInput } from "../common/SearchInput";
import {
  History,
  ShoppingCart,
  Bell,
  CircleUserIcon,
  Search,
  Menu,
} from "lucide-react";
import MobileSearchModal from "@/components/modals/mobileSearchModal";
import { useNavigation } from "@/hooks/useNavigation";
import { useCart } from "@/context/CartContext";

export default function OnboardingNavbar({ show, toggle }: any) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { navigateToProfile, navigateToHome, navigateToCart } = useNavigation();
  const { cart } = useCart();


  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="mx-auto max-w-[1440px] px-4 md:px-10 py-0 md:py-8 h-[60px] md:h-[50px] flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-2">
            <Menu className="h-6 w-6 text-[#3B006B] lg:hidden cursor-pointer" onClick={toggle} />
            <Image
              src="/images/logo.svg"
              alt="Giftlo"
              width={135}
              height={48}
              className="w-[100px] md:w-[135px] cursor-pointer"
              onClick={navigateToHome}
            />
          </div>

          {/* PC SEARCH (UNCHANGED) */}
          <div className="hidden md:block">
            <SearchInput />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden md:flex text-sm bg-[#3B006B] text-white px-3 py-2 rounded-lg items-center cursor-pointer">
              <History className="h-5 w-5 inline mr-1" />
              Recommendation History
            </span>

            <div className="flex items-center gap-3 md:gap-4 px-1 md:px-3 py-2">
              {/* MOBILE SEARCH ICON */}
              <Search
                className="h-6 w-6 text-[#3B006B] md:hidden cursor-pointer"
                onClick={() => setIsMobileSearchOpen(true)}
              />

              <History className="h-6 w-6 text-[#3B006B] md:hidden cursor-pointer" />

              <div className="relative" onClick={navigateToCart}>
                <div className="bg-danger text-white absolute z-100 rounded-full w-3 h-3 flex justify-center items-center right-0"> <span className="text-xxs">{cart?.items?.length ?? 0}</span></div>
                <ShoppingCart className="h-6 w-6 fill-[#3B006B] cursor-pointer" />
              </div>

              <Bell className="hidden md:block h-6 w-6 fill-[#3B006B] cursor-pointer" />

              <CircleUserIcon className="h-6 w-6 text-[#3B006B] cursor-pointer" onClick={navigateToProfile} />
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH MODAL */}
      <MobileSearchModal
        open={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={(query) => {
          console.log("Searching for:", query);
        }}
      />

    </>
  );
}
