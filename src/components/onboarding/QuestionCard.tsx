// components/QuestionCard.tsx
import { ReactNode } from 'react';
import { GiftBoldIcon } from "@/assets/svg";
import { Lightbulb } from 'lucide-react';

interface QuestionCardProps {
  title: string;
  children: ReactNode;
}

export function QuestionCard({ title, children }: QuestionCardProps) {
  return (
    <div className="w-full rounded-2xl  px-6 py-6 shadow-sm md:px-10 md:py-10 bg-[#FAF9FB]">
      
      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F4ECFF] text-[#4B0082]">
           <GiftBoldIcon height={22} width={22} className='md: height={40} width={40} ' />
        </span>

        <h2 className="text-sm font-semibold text-[#4B0082] md:text-2xl">
          {title}
        </h2>
      </div>

      {/* Options */}
      <div className="text-sm md:text-base space-y-1 md:space-y-3">
        {children}
      </div>

      {/* Helper text */}
      <p className="mt-6 text-xs text-[#B58DE8] md:text-sm">
        <Lightbulb className="inline mr-2 w-4 h-4 fill-slate-400" />
        Multiple options can be selected
      </p>
    </div>
  );
}
