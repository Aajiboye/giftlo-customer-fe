import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { logout } from '@/types/user';
import { useUser } from '@/context/UserContext';
import { Bell, List, LogIn, Search, Settings, ShoppingCart, User, UserCircle } from 'lucide-react';
import icons from '@/assets/icons'
import { Input } from '../ui/input';
import { CartRoller } from '@/assets/svg';

type SubMenuItem = {
  name: string;
  url: string;
};

type MenuItem = {
  name: string;
  url: string;
  icon?: ReactElement;
  disabled?: boolean;
  toast?: string;
  subMenu?: SubMenuItem[];
  action?: () => void;

};

type MenuSection = {
  heading: string;
  items: MenuItem[];
};

export default function ProfileSideBar() {
  const { push, pathname, back } = useRouter();
  const { user } = useUser();

  const menu: MenuSection[] = [
    {
      heading: 'OPERATIONS',
      items: [
        {
          name: 'Profile',
          url: '/home/profile',
          icon: <UserCircle />
        },
        {
          name: 'Orders',
          url: '/home/profile/orders',
          icon: <ShoppingCart />
        },
        {
          name: 'WishList',
          url: '/home/profile/wishlist',
          icon: <List />
        },

        {
          name: 'Settings',
          url: '/home/profile/settings',
          icon: <Settings />
        },

        {
          name: 'Logout',
          url: '/home/profile/settings',
          action: logout,
          icon: <LogIn />
        },





      ]
    }

  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div>
      <div className="h-fit bg-sidebar_bg text-sidebar_text flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col p-4">
            <div className="">
              <p className="text-light font-light text-sm">Good Morning</p>
              <p className="font-medium text-lg">Vaughan Olamide Isaac</p>
            </div>
            {menu.map((section, idx) => (
              <div key={idx} className="my-5">
                {section.items.map((item, index) => {
                  const isActive = pathname.includes(item.url);
                  const hasSubMenu = !!item.subMenu;
                  const isSubMenuOpen = activeMenu === item.name;
                  const disabled = false;

                  return (
                    <div key={index}>
                      <div
                        className={cn(
                          `${isActive ? 'bg-[#FFB800] text-black rounded-lg' : disabled ? `opacity-50` : 'text-[#ACACAC] bg-[#FAFAFA]'}
                          text-xs font-medium px-4 py-2 my-2 flex space-x-2 items-center cursor-pointer`
                        )}
                        onClick={() =>
                          disabled
                            ? null
                            : hasSubMenu
                              ? setActiveMenu(isSubMenuOpen ? null : item.name)
                              : item?.action ? item?.action()
                              : push(item.url)
                        }
                      >
                        <div className={cn(
                          `${isActive ? 'text-black' : item?.action? 'text-[#FF0000]':  'text-[#ACACAC]'}
                          flex w-4`
                        )}>
                          {item.icon && (
                            item.icon
                          )}
                        </div>
                        <div className={cn(
                          `${isActive ? 'text-black' :  item?.action? 'text-[#FF0000]':  'text-[#ACACAC]'}
                          whitespace-nowrap text-md`
                        )}>{item.name}</div>


                      </div>

                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
