// src/components/product/ProductBreadCrumbs.tsx

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
  onBack?: () => void;
}

export function ProductBreadcrumbs({
  items,
  onBack,
}: ProductBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 md:gap-4 py-4 mb-2"
    >
      {/* Back button (optional, controlled by parent) */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#333333]" />
        </button>
      )}

      {/* Breadcrumb path */}
      <ol className="flex flex-wrap items-center gap-2 text-[13px] md:text-[14px] tracking-tight">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {!isLast && item.href ? (
                <>
                  <Link
                    href={item.href}
                    className="text-[#A3A3A3] hover:text-[#737373] transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                  <span className="text-[#D4D4D4] font-extralight">/</span>
                </>
              ) : (
                <span className="text-[#171717] font-semibold truncate max-w-[120px] md:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
