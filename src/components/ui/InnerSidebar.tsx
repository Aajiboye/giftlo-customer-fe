import React from "react";

interface MenuItem {
  label: string;
  value: string; // Unique identifier for each item
}

interface SidebarMenuProps {
  menuItems: MenuItem[];
  activeItem: string;
  onItemClick: (value: string) => void; // Callback when a menu item is clicked
  title?: string; // Optional title for the sidebar
}

export default function SidebarMenu({
  menuItems,
  activeItem,
  onItemClick,
  title = "Menu",
}: SidebarMenuProps) {
  return (
    <div className="w-64 bg-[#FFFFFF] rounded-xl border border-gray-200 p-4 h-52 mx-auto">
      {/* Optional Title */}
      {title && <h2 className="text-[12px] font-medium text-[#98A2B3] mb-4 border-b p-2">{title}</h2>}

      {/* Menu List */}
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.value}>
            <button
              onClick={() => onItemClick(item.value)}
              className={`w-full text-left text-[14px] px-4 py-2 rounded-lg font-medium ${
                activeItem === item.value
                  ? "bg-[#CCDBDC] text-[#004C4E]"
                  : "text-[#667185] hover:bg-[#dce3e3]"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
