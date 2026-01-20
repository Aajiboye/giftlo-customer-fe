import images from '@/assets/images';
import Image from 'next/image';
import React from "react";
import GiftWizardSwiper from '../common/GiftWizardSwiper';

export default function AuthSideComponent() {
  return (
    <div className="hidden md:block w-full md:w-1/2 min-h-[100vh] md:w-1/2 px-2 md:px-8">
      

      <div className="">
        <GiftWizardSwiper />
      </div>
    </div>
  );
}
