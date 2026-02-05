'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type RouteConfig = {
  match: (pathname: string) => boolean;
  sectionHome: string;
  sectionLabel: string;
  pageLabel: string;
};

const ROUTES: RouteConfig[] = [
  {
    match: (p) => p === '/home',
    sectionHome: '/',
    sectionLabel: '',
    pageLabel: 'Home',
  },
  {
    match: (p) => p === '/home/explore',
    sectionHome: '/home',
    sectionLabel: 'Home',
    pageLabel: 'Explorer',
  },
  {
    match: (p) => p === '/home/profile',
    sectionHome: '/home',
    sectionLabel: 'Home',
    pageLabel: 'Profile',
  },
  {
    match: (p) => p === '/home/profile/cart',
    sectionHome: '/home/profile',
    sectionLabel: 'Profile',
    pageLabel: 'Cart',
  },
  {
    // Dynamic cart / product route
    match: (p) => p?.startsWith('/home/product/'),
    sectionHome: '/home/profile',
    sectionLabel: 'Profile',
    pageLabel: 'Cart',
  },
];

export default function PageNav() {
  const pathname = usePathname();

  const config = ROUTES.find((route) => route.match(pathname));

  if (!config) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-secondary p-2 md:px-8">
      <ChevronLeft />

      {/* Section Home */}
      <Link
        href={config.sectionHome}
        className="hover:text-black opacity-60"
      >
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
