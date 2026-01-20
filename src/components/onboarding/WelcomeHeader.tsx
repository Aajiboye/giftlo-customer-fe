"use client";

import { GiftBoldIcon } from "@/assets/svg";
import { useUser } from "@/context/UserContext";

export function WelcomeHeader() {
  const { user } = useUser();

  /**
   * Logic to build the full name string.
   * Filter(Boolean) removes any empty strings or nulls,
   * then join(' ') puts a space between them.
   */
  const fullName = [user?.firstName, user?.otherName, user?.lastName]
    .filter(Boolean)
    .join(' ') || " Joy Chidera Emmanuel";

  return (
    <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-8 ">
      {/* 1. The Gift Icon */}
      <div className="mb-1">
        <GiftBoldIcon color="#FFB800" width={70} height={70}  className="md: width={64} md:height={64} " />
      </div>

      {/* 2. The "Welcome" label - Matches Figma style */}
      <p className="text-[#606060] text-sm md:text-xl font-medium mb-2">
        Welcome
      </p>

      {/* 3. The Full Name Display */}
      <h1 className="text-2xl md:text-2xl font-bold text-[#3B006B] leading-tight mb-4 px-4">
        {fullName}
      </h1>

      {/* 4. The Figma Description */}
      <p className="text-[#3D3D3D] text-xs md:text-base leading-relaxed max-w-[700px]   md:px-4">
        Users receive personalized gift suggestions based on their answers to a 
        few simple questions. This makes it easy to recommend the perfect 
        best gift options in few seconds.
      </p>
    </div>
  );
}