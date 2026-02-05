// src/components/product/ProductBreadCrumbs.tsx

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function ProductBreadcrumbs({ items }: ProductBreadcrumbsProps) {
  const router = useRouter();

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center gap-1 md:gap-2 py-4  w-full overflow-hidden"
    >
      {/* 1. Back Button: Visible on ALL views now, but styling adapts */}
      <button
        type="button"
        onClick={() => router.back()}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors flex flex-shrink-0 items-center justify-center group"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#171717] group-hover:scale-110 transition-transform" />
      </button>

      {/* 2. Breadcrumb List: Horizontal row on mobile and PC */}
      <ol className="flex items-center whitespace-nowrap overflow-x-auto no-scrollbar text-[10px] sm:text-[13px] md:text-[14px] tracking-tight">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center flex-shrink-0">
              {!isLast ? (
                <div className="flex items-center">
                  <Link
                    href={item.href || '#'}
                    className="text-[#A3A3A3] hover:text-[#737373] transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                  {/* Slash Separator */}
                  <span className="mx-1.5 md:mx-2 text-[#A3A3A3] font-extralight">/</span>
                </div>
              ) : (
                /* 3. Final Item: Bold and slightly truncated on very small screens */
                <span className="text-[#171717] font-semibold truncate max-w-[120px] xs:max-w-[200px] sm:max-w-none">
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