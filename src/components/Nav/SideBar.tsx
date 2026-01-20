import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { logout } from '@/types/user';
import { useUser } from '@/context/UserContext';
import { Bell, Search, User, UserCircle } from 'lucide-react';
import icons from '@/assets/icons'
import { Input } from '../ui/input';

type SubMenuItem = {
  name: string;
  url: string;
};

type MenuItem = {
  name: string;
  url: string;
  icon?: string;
  disabled?: boolean;
  toast?: string;
  subMenu?: SubMenuItem[];
};

type MenuSection = {
  heading: string;
  items: MenuItem[];
};
const CaretUpIcon = ({ color = '#4A4A4A' }: { color: string }) => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    stroke={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.825 0.912598L5 4.72926L1.175 0.912598L0 2.0876L5 7.0876L10 2.0876L8.825 0.912598Z"
      fill={color}
    />
  </svg>
);

const CaretDownIcon = ({ color = '#4A4A4A' }: { color: string }) => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.825 0.912598L5 4.72926L1.175 0.912598L0 2.0876L5 7.0876L10 2.0876L8.825 0.912598Z"
      fill={color}
    />
  </svg>
);
export default function SideBar({ show, toggle }: any) {
  const { push, pathname, back } = useRouter();
  const { user } = useUser();

  const menu: MenuSection[] = [
    {
      heading: 'OPERATIONS',
      items: [
        {
          name: 'Electronics & Gadgets',
          url: '/app/electronics-and-Gadgets',
          icon: icons.electronics
        },
        {
          name: 'Fashion & Accessories',
          url: '/app/fashion-and-accessories',
          icon: icons.fashion
        },

        {
          name: 'Beauty & Skincare',
          url: '/app/Beauty-and-Skincare',
          icon: icons.beauty
        },

        {
          name: 'Home & Living',
          url: '/app/home-and-living',
          icon: icons.home
        },

        {
          name: 'Books & Literature',
          url: '/app/books-and-literature',
          icon: icons.books
        },

        {
          name: 'Toys & Games',
          url: '/app/toys-and-games',
          icon: icons.toys
        },

        {
          name: 'Sports & Outdoors',
          url: '/app/sports-and-outdoors',
          icon: icons.sports
        },
        {
          name: 'Food & Beverages',
          url: '/app/Food-and-beverages',
          icon: icons.food
        },
        {
          name: 'Arts & Crafts',
          url: '/app/arts-and-craft',
          icon: icons.art
        },
        {
          name: 'Travel & Adventure',
          url: '/app/travel-and-adventure',
          icon: icons.travel
        },
      ]
    }
  
  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div
      onClick={show ? toggle : undefined}
      className={cn(
        {
          'left-0 lg:after:hidden after:w-screen after:absolute after:-z-10 after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-gray-900 after:opacity-50 border border-sidebar':
            show,
          '-left-96': !show
        },
        'fixed shadow bg-sidebar_bg w-[15rem] lg:sticky lg:left-0 top-0 bottom-0 z-50 lg:z-0 lg:flex flex-col justify-between transition-all ease-in-out duration-350'
      )}
    >
      <div className="h-full bg-sidebar_bg text-sidebar_text flex flex-col">
        <div className="flex-1 overflow-y-auto">
          

          
          <div className="flex flex-col">
            {menu.map((section, idx) => (
              <div key={idx} className="mb-14">
                {section.items.map((item, index) => {
                  const isActive = pathname.includes(item.url);
                  const hasSubMenu = !!item.subMenu;
                  const isSubMenuOpen = activeMenu === item.name;
                  const disabled = user.profileCompleted;

                  return (
                    <div key={index}>
                      <div
                        className={cn(
                          `${isActive ? 'bg-secondary text-white rounded-lg' : disabled ? `opacity-50` : ''}
                          text-xs font-medium px-4 py-2 mx-3 my-2 flex space-x-2 items-center cursor-pointer`
                        )}
                        onClick={() =>
                          disabled
                            ? null
                            : hasSubMenu
                              ? setActiveMenu(isSubMenuOpen ? null : item.name)
                              : push(item.url)
                        }
                      >
                        <div className="flex w-3">
                          {item.icon && (
                            <img src={item?.icon} alt={item?.icon}
                            />
                          )}
                        </div>
                        <div className="whitespace-nowrap text-secondary">{item.name}</div>
                        {hasSubMenu && (
                          <div className="ml-auto items-center">
                            {isSubMenuOpen ? (
                              <CaretUpIcon color={isActive ? '#FFFFFF' : ''} />
                            ) : (
                              <CaretDownIcon
                                color={isActive ? '#FFFFFF' : ''}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {hasSubMenu && isSubMenuOpen && (
                        <div className="ml-8">
                          {item.subMenu!.map((subItem, subIdx) => (
                            <Link href={subItem.url} key={subIdx}>
                              <div
                                className={cn(
                                  `text-sidebar_text text-xs font-medium px-4 py-2 my-1 mx-3 flex items-center hover:bg-neutral-400 hover:text-white rounded-lg`,
                                  pathname === subItem.url &&
                                    'bg-neutral-500 text-white'
                                )}
                              >
                                {subItem.name}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
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
