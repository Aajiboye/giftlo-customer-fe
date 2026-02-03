import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useProduct } from '@/context/ProductContext';
import { DynamicIcon } from '../common/DynamicIcon';
import CardLoader from '../Loaders/CardLoader';
import CategoryLoader from '../Loaders/CategoryLoader';



export default function SideBar() {
  const { push, pathname, back } = useRouter();
  const { user } = useUser();
  const { categories, isFetchingCategories } = useProduct();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div>
      <div className="h-full bg-sidebar_bg text-sidebar_text flex flex-col py-4">
          <div className="flex flex-col">
            {isFetchingCategories && [...Array(10).keys()].map(() => <CategoryLoader />)}

            {categories.map((item, index) => {
              const disabled = false;

              return (
                <div key={index} className="">
                  <div
                    className={cn(
                      ` text-xs font-medium px-4 py-3 mx-3 flex space-x-2 items-center cursor-pointer`
                    )}
                    onClick={() =>
                      disabled
                        ? null

                        : console.log({ item })
                    }
                  >
                    <div className="flex w-3">
                      <DynamicIcon name={item?.iconKey} color='#3B006B'/>
                    </div>
                    <div className="whitespace-nowrap text-secondary">{item.title.toUpperCase()}</div>
                    
                  </div>
                  
                </div>
              );
            })}
          </div>

        </div>
    </div >
  );
}
