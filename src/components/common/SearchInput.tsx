"use client";

import { Search } from "lucide-react";

interface Props {
  onValueChange?: (value: string) => void;
  value?: string;
  showOnMobile?: boolean;
}

export const SearchInput = ({
  onValueChange,
  value,
  showOnMobile = false,
}: Props) => {
  return (
    <div
      className={`relative w-full max-w-[480px] ${
        showOnMobile ? "block" : "hidden md:block"
      }`}
    >
      <div className="flex items-center w-full h-[45px] px-4 rounded-lg border border-[#E0E0E0] bg-white transition-all  focus-within:ring-1 focus-within:ring-[#3B0066]/10">
        <Search className="text-[#999999] size-[18px] shrink-0" />

        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          placeholder="Search products, brands or categories"
          className="w-full ml-3 bg-transparent outline-none border-none p-0 text-[14px] md:text-[15px] text-[#333333] placeholder:text-[#999999]"
        />
      </div>
    </div>
  );
};
