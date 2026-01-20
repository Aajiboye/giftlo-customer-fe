'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';

const slides = [
  {
    id: 1, url: "/images/authSide.svg"
  },
  {
    id: 2, url: "/images/authSide.svg"
  },
];

export default function GiftWizardSwiper() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 min-h-full flex flex-col">
      {/* Header */}
      <span className="inline-block w-fit mb-4 rounded-full bg-[#FFF8E6] px-4 py-1 text-sm font-medium text-secondary">
        Meet Your AI Gift Wizard
      </span>

      <h2 className="text-xl font-semibold text-secondary">
        Personalized Recommendations at Your Fingertips
      </h2>

      <p className="mt-2 text-gray-600">
        Our intelligent AI wizard asks a few simple questions and delivers perfect
        gift ideas tailored to your loved ones&apos; tastes and preferences.
      </p>

      {/* Swiper */}
      <div className="mt-8 flex-1">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            el: '.gift-pagination',
            clickable: true,
            bulletClass: 'gift-bullet',
            bulletActiveClass: 'gift-bullet-active',
            renderBullet: (_, className) =>
              `<span class="${className}"></span>`,
          }}
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.url} alt="" className=''/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination */}
      <div className="gift-pagination mt-6 flex justify-center gap-3" />
    </div>
  );
}
