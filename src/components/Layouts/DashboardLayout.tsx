import React from 'react';
import { SideBar, NavBar } from '@/components';
import useToggle from '../Nav/useToggle';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';


export default function DashboardLayout({
  children,
  pageTitle = ''
}: {
  children: React.ReactNode;
  pageTitle?: string;
}) {
  const [show, toggle] = useToggle();
  const router = useRouter();

  return (

    <div className="w-full overflow-x-hidden">
      <NavBar show={show} toggle={toggle} />
     
        <main className="">
          
          {children}
        </main>
    </div>
  );
}
