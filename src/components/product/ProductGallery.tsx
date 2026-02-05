// src/components/product/ProductGallery.tsx

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductImage } from '@/types/detailproduct';
import {
  Expand,
  Undo,
  Redo,
  RotateCcw,
  Heart,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  // FIX: Changed from string[] to ProductImage[] to match your data structure
  images: string[]; 
  onLike?: () => void;
  onGift?: () => void;
  onShare?: () => void;
  onImageChange?: (image: string) => void;
}

export function ProductGallery({
  images,
  onLike,
  onImageChange,
}: ProductGalleryProps) {
  // Use images[0].src for initial state
  const [activeImage, setActiveImage] = useState<string | null>(
    images[0] || null
  );

  useEffect(() => {
    if (activeImage && onImageChange) {
      onImageChange(activeImage);
    }
  }, [activeImage, onImageChange]);

  if (!activeImage) return null;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* MAIN IMAGE */}
      <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden bg-[#F9F9F9] border border-gray-100 group">
        <div className="absolute top-4 left-3 z-10">
          <button
            type="button"
            className="p-3 bg-white/40 backdrop-blur-md rounded-xl text-white hover:bg-white/60 transition"
            aria-label="Expand image"
          >
            <Expand size={24} />
          </button>
        </div>

        <div className="absolute top-4 right-3 z-10 flex gap-3">
          <button
            type="button"
            className="p-3 bg-white/40 backdrop-blur-md rounded-full text-white hover:bg-white/60 transition"
            aria-label="Undo"
          >
            <Undo size={20} />
          </button>

          <button
            type="button"
            className="p-3 bg-white/40 backdrop-blur-md rounded-full text-white hover:bg-white/60 transition"
            aria-label="Redo"
          >
            <Redo size={20} />
          </button>

          <button
            type="button"
            onClick={onLike}
            className="p-3 bg-white/40 backdrop-blur-md rounded-full text-white hover:bg-white/60 transition"
            aria-label="Like product"
          >
            <Heart size={20} />
          </button>
        </div>

        <Image
          src={activeImage}
          alt="Active product image"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />

        {/* Desktop thumbnails */}
        <div className="hidden lg:flex flex-col absolute right-3 bottom-4 z-10 bg-white/20 backdrop-blur-md p-1 rounded-2xl gap-1 border border-white/30">
          <ChevronUp size={16} className="mx-auto text-white opacity-50" />

          <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto no-scrollbar">
            {images.map(img => (
              <button
                key={img} // Use the unique ID from ProductImage
                type="button"
                onClick={() => setActiveImage(img)} // Set active state to the src string
                className={cn(
                  'relative w-12 h-12 rounded-lg overflow-hidden border-2 transition',
                  img === activeImage
                    ? 'border-white shadow-xl'
                    : 'border-transparent opacity-70'
                )}
                aria-label="Select image"
              >
                <Image
                  src={img} // Use the src property
                  alt={img || 'Thumbnail'}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <ChevronDown size={16} className="mx-auto text-white opacity-50" />
        </div>

        {/* Reset */}
        <div className="absolute bottom-4 left-3 z-10">
          <button
            type="button"
            onClick={() => setActiveImage(images[0])} // Use images[0].src
            className="flex items-center gap-2 px-5 py-2 bg-white/30 backdrop-blur-md border border-white/30 text-white rounded-lg hover:bg-white/50 transition text-sm font-medium"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Mobile thumbnails */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {images.map(img => (
          <button
            key={img} // Use the unique ID
            type="button"
            onClick={() => setActiveImage(img)} // Set active state to the src string
            className={cn(
              'relative w-20 h-20 flex-shrink-0 rounded-xl border-2 transition',
              img === activeImage
                ? 'border-[#5B0888]'
                : 'border-transparent bg-gray-50'
            )}
            aria-label="Select image"
          >
            <Image
              src={img} // Use the src property
              alt={img || 'Thumbnail'}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}