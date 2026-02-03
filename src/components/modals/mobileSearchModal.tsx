"use client";

import React from "react";
import { SearchInput } from "@/components/common/SearchInput";

type MobileSearchModalProps = {
  open: boolean;
  onClose: () => void;
  onSearch?: (value: string) => void;
};

export default function MobileSearchModal({
  open,
  onClose,
  onSearch,
}: MobileSearchModalProps) {
  const [query, setQuery] = React.useState("");

  if (!open) return null;

  // Function to handle the search action
  const handleSearch = () => {
    if (query.trim() === "") return; // prevent empty search
    onSearch?.(query); // trigger the callback
    setQuery(""); // clear input
    onClose(); // close modal
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center px-4 pt-20 md:hidden"
      onClick={onClose} // click outside closes modal
    >
      <div
        className="w-full max-w-md bg-white rounded-xl p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <SearchInput
          value={query}
          onValueChange={setQuery}
          showOnMobile={true} // show input on mobile
          // trigger search on Enter key
          {...{ onKeyDown: handleKeyPress } as any}
        />

        <button
          onClick={handleSearch}
          className="mt-4 w-full rounded-lg bg-[#3B006B] py-2 text-white font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
}
