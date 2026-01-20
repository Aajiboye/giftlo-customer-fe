"use client";

import { Search } from 'lucide-react';
import React from 'react';

interface Props {
  onValueChange?: (value: string) => void;
  value?: string;
}

export const SearchInput = ({ onValueChange, value }: Props) => {
  return (
    /* Strictly PC: Hidden on mobile, visible on md (768px)+ */
    <div className="hidden md:block relative w-full max-w-[480px]">
      <div className="flex items-center w-full h-[45px] px-4 rounded-lg border border-[#E0E0E0] bg-white transition-all focus-within:border-[#3B0066] focus-within:ring-1 focus-within:ring-[#3B0066]/10">
        
        {/* Magnifying glass matching the subtle grey in your image */}
        <Search className="text-[#999999] size-[18px] shrink-0" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          placeholder="Search products, brands or categories"
          className="w-full ml-3 bg-transparent outline-none border-none p-0 text-[14px] md:text-[15px] text-[#333333] placeholder:text-[#999999] focus:ring-0"
        />
      </div>
    </div>
  );
};