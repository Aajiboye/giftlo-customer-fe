"use client";

import Image from "next/image";
import { SearchInput } from "../common/SearchInput";
import { History, ShoppingCart, Bell, CircleUserIcon, Search, Menu } from 'lucide-react';

type Props = {
  show?: boolean | (() => void);
  toggle?: boolean | (() => void);
}

export default function OnboardingNavbar({show, toggle}: Props) {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      {/* Container maintains your PC py-8/h-[50px] logic but adds mobile h-[60px] */}
      <div className="mx-auto max-w-[1440px] px-4 md:px-10 py-0 md:py-8 h-[60px] md:h-[50px] flex items-center justify-between">

        {/* LEFT: LOGO + Menu */}
        <div className="flex items-center gap-2">
          <Menu className="h-6 w-6 text-[#3B006B] md:hidden cursor-pointer" />
          
          <Image
            src="/images/logo.svg"
            alt="Giftlo"
            width={135}
            height={48}
            className="w-[100px] md:w-[135px]" 
          />
        </div>

        {/* MIDDLE: PC SEARCH (Untouched for PC, Hidden for Mobile) */}
        <div className="hidden md:block">
          <SearchInput />
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* YOUR PC BUTTON: Strictly PC */}
          <span className="hidden md:flex text-sm bg-[#3B006B] text-white px-3 py-2 rounded-lg items-center cursor-pointer">
            <History className="h-5 w-5 inline mr-1" /> Recommendation History
          </span>
          
          {/* ICON GROUP - Strictly following your mobile order */}
          <div className="flex items-center gap-3 md:gap-4 px-1 md:px-3 py-2">
            
            {/* 1. SEARCH ICON (Mobile Only) */}
            <Search className="h-6 w-6 text-[#3B006B] md:hidden cursor-pointer" />

            {/* 2. HISTORY ICON (Mobile Only) */}
            <History className="h-6 w-6 text-[#3B006B] md:hidden cursor-pointer" />
              {/* 3. CART ICON (Visible on both) */}
            <ShoppingCart className="h-6 w-6 fill-[#3B006B] hover:bg-gray-50 transition cursor-pointer" />

  {/*4. BELL: Strictly PC Only (placed after Cart on PC) */}
            <Bell className="hidden md:block h-6 w-6 fill-[#3B006B] hover:bg-gray-50 transition cursor-pointer" />
              {/* 5. USER ICON (Visible on both) */}
            <CircleUserIcon className="h-6 w-6 text-[#3B006B] hover:bg-gray-50 transition cursor-pointer" />

            
      
      
          </div>
        </div>

      </div>
    </nav>
  );
}