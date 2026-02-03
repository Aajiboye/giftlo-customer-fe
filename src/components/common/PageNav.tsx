'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

type RouteConfig = {
  sectionHome: string;
  sectionLabel: string;
  pageLabel: string;
};

const ROUTE_MAP: Record<string, RouteConfig> = {
  '/home': {
    sectionHome: '/',
    sectionLabel: '',
    pageLabel: 'Home',
  },
  '/home/explore': {
    sectionHome: '/home',
    sectionLabel: 'Home',
    pageLabel: 'Explorer',
  },
  // add more routes here
};

export default function PageNav() {
  const pathname = usePathname();
  const router = useRouter();

  const config = ROUTE_MAP[pathname];

  if (!config) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-secondary p-2 md:px-8">
      <ChevronLeft />

      {/* Section Home */}
      <Link href={config.sectionHome} className="hover:text-black opacity-60 ">
        {config.sectionLabel}
      </Link>

     {config.sectionLabel && <span>/</span>}

      {/* Current Page */}
      <span className="font-medium text-secondary">
        {config.pageLabel}
      </span>
    </div>
  );
}
