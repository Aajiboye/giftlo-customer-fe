import { useState } from 'react';
import { cn } from '@/lib/utils';
import { QuestionOption, Question } from '@/types/questions';

interface Props {
  options: QuestionOption[];
  onSelect: (id: string, customValue?: string) => void;
  selected?: string[];
  layout?: Question['layout'];
}

export function QuestionOptions({
  options,
  onSelect,
  selected = [],
  layout = 'standard-grid',
}: Props) {
  
  // Helper to identify if an option is "Other" or contains "Other: custom text"
  const isSelected = (id: string) => {
    if (id === 'other') {
      return selected.some(s => s.startsWith('Other:')) || selected.includes('other');
    }
    return selected.includes(id);
  };

  // Helper to extract the text typed into the Other field
  const getOtherValue = () => {
    const otherEntry = selected.find(s => s.startsWith('Other: '));
    return otherEntry ? otherEntry.replace('Other: ', '') : '';
  };

  /**
   * REUSABLE RENDERER
   * This handles the Button + the potential "Other" text input
   */
  const renderOption = (opt: QuestionOption, isFullWidth: boolean = false) => {
    const isOther = opt.id === 'other' || opt.label.toLowerCase().includes('other');
    const active = isSelected(opt.id);

    return (
      <div key={opt.id} className={cn("flex flex-col gap-2", isFullWidth && "w-full")}>
        <OptionButton
          option={opt}
          isSelected={active}
          onClick={() => onSelect(opt.id)}
          className={cn(isFullWidth && "w-full")}
        />
        
        {/* NEAT CONDITIONAL INPUT */}
        {isOther && active && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200 px-4 md:px-0">
            <input
              type="text"
              autoFocus
              placeholder="Please specify..."
              defaultValue={getOtherValue()}
              // We use onBlur or a debounce to avoid too many state updates while typing
              onBlur={(e) => onSelect('other', e.target.value)}
              className="w-full p-3 text-sm border-b-2 border-[#3B0066] outline-none bg-[#FAF7FF] text-[#3B0066] placeholder:text-[#3B0066]/50"
            />
          </div>
        )}
      </div>
    );
  };

  /* --------------------------------------------------
   * Q4 — Sex + Age (Split Layout)
   * -------------------------------------------------- */
  if (layout === 'split-sex-age') {
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-2">
          <span className="block md:hidden text-sm font-semibold text-[#3B0066]">Sex</span>
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            {options.slice(0, 2).map((opt) => renderOption(opt))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="block md:hidden text-sm font-semibold text-[#3B0066]">Age Range</span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {options.slice(2).map((opt) => renderOption(opt))}
          </div>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------
   * Q5 — Budget (Balanced Five)
   * -------------------------------------------------- */
  if (layout === 'balanced-five') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
        {options.map((opt) => renderOption(opt))}
      </div>
    );
  }

  /* --------------------------------------------------
   * Q8 — Gift Type (Triple Column)
   * -------------------------------------------------- */
  if (layout === 'triple-column') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {options.map((opt) => renderOption(opt))}
      </div>
    );
  }

  /* --------------------------------------------------
   * DEFAULT GRID (Q1, Q2, Q3, Q6, Q7, Q9)
   * -------------------------------------------------- */
  const hasOther = options.some(opt => opt.id === 'other' || opt.label.toLowerCase().includes('other'));
  const mainOptions = hasOther ? options.slice(0, -1) : options;
  const footerOption = hasOther ? options[options.length - 1] : null;

  const desktopCols = layout === 'standard-grid-pc' ? 'md:grid-cols-3' : 'md:grid-cols-4';

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-4', desktopCols)}>
        {mainOptions.map((opt) => renderOption(opt))}
      </div>
      {footerOption && renderOption(footerOption, true)}
    </div>
  );
}

/* --------------------------------------------------
 * Option Button Component
 * -------------------------------------------------- */
function OptionButton({ option, isSelected, onClick, className }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border-2 transition-all flex items-center md:justify-center py-4 md:px-4 md:py-5 text-base font-medium",
        "border-0 rounded-none md:border-2 md:rounded-xl",
        isSelected
          ? "bg-transparent md:bg-[#F4ECFF] border-[#3B0066] text-[#3B0066]"
          : "bg-transparent md:bg-white border-[#D6C4F3] text-[#3B0066] hover:bg-[#FAF7FF]",
        className
      )}
    >
      <span className={cn(
        "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border md:hidden",
        isSelected ? "border-[#3B0066]" : "border-[#3B006B]"
      )}>
        {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-[#3B0066]" />}
      </span>
      <span className="text-left md:text-center ">{option.label}</span>
    </button>
  );
}