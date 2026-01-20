import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Dispatch, useEffect, useMemo, useState } from 'react';
import { logout } from '@/types/user';
import { useUser } from '@/context/UserContext';
import { Bell, Search, User, UserCircle } from 'lucide-react';
import icons from '@/assets/icons'
import { Input } from '../ui/input';
import images from '@/assets/images';
import { LazyBackgroundImage } from '../common/lazyLoadingBg';


type Props = {

};

export default function Rightbar({ }: Props) {
  const { push, pathname, back } = useRouter();
  const { user } = useUser();



  return (
    <div className={`w-[18rem] hidden md:block`}>
      <div className="h-full bg-sidebar_bg text-sidebar_text flex flex-col p-2 block ">
        <div className="flex-1 overflow-y-auto">



          <div className="flex flex-col text-sm text-secondary space-y-2 lg:space-y-10 h-full">
            <div className="flex space-x-2 items-center">
              <img src={icons?.call} alt={icons?.call} className='w-7' />

              <div className="">
                <p className="">Call to order</p>
                <span className='text-xs font-light'>(234) 81352227805</span>
              </div>

            </div>

            <div className="flex space-x-2 items-center">
              <img src={icons?.vendor} alt={icons?.vendor} className='w-7' />

              <div className="">
                <span className='font-light'>Become a vendor</span>

              </div>

            </div>

            <div className="flex space-x-2">
              <img src={icons?.Cartcircle} alt={icons?.Cartcircle} className='w-7' />

              <div className="">
                <span className='font-light'>Link background ips</span>
              </div>

            </div>

            <LazyBackgroundImage src={images?.promo} />

          </div>
        </div>
      </div>
    </div>
  );
}
