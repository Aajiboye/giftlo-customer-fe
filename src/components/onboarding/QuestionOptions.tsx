import { cn } from '@/lib/utils';
import { QuestionOption, Question } from '@/types/questions';

interface Props {
  options: QuestionOption[];
  onSelect: (id: string) => void;
  selected?: string[];
  layout?: Question['layout'];
}

export function QuestionOptions({
  options,
  onSelect,
  selected = [],
  layout = 'standard-grid',
}: Props) {

  /* --------------------------------------------------
   * Q4 — Sex + Age
   * -------------------------------------------------- */
 if (layout === 'split-sex-age') {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Sex */}
      <div className="flex flex-col gap-2">
        {/* Mobile-only label */}
        <span className="block md:hidden text-sm font-semibold text-[#3B0066]">
          Sex
        </span>

        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {options.slice(0, 2).map((opt) => (
            <OptionButton
              key={opt.id}
              option={opt}
              isSelected={selected.includes(opt.id)}
              onClick={() => onSelect(opt.id)}
            />
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="flex flex-col gap-2">
        {/* Mobile-only label */}
        <span className="block md:hidden text-sm font-semibold text-[#3B0066]">
          Age Range
        </span>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {options.slice(2).map((opt) => (
            <OptionButton
              key={opt.id}
              option={opt}
              isSelected={selected.includes(opt.id)}
              onClick={() => onSelect(opt.id)}
              className="text-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


  /* --------------------------------------------------
   * Q5 — Budget
   * -------------------------------------------------- */
  if (layout === 'balanced-five') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
        {options.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            isSelected={selected.includes(opt.id)}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>
    );
  }

  /* --------------------------------------------------
   * Q8 — Gift Type
   * -------------------------------------------------- */
  if (layout === 'triple-column') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {options.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            isSelected={selected.includes(opt.id)}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>
    );
  }

  /* --------------------------------------------------
   * DEFAULT GRID
   * Handles:
   * - standard-grid
   * - grid-with-footer (Q1, Q2)
   * - standard-grid-pc
   * -------------------------------------------------- */
  const hasOther = options.some(
    (opt) =>
      opt.id === 'other' ||
      opt.label.toLowerCase().includes('other')
  );

  const mainOptions = hasOther ? options.slice(0, -1) : options;
  const footerOption = hasOther ? options[options.length - 1] : null;

  const desktopCols =
    layout === 'standard-grid-pc'
      ? 'md:grid-cols-3'
      : 'md:grid-cols-4';

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 gap-4',
          desktopCols
        )}
      >
        {mainOptions.map((opt) => (
          <OptionButton
            key={opt.id}
            option={opt}
            isSelected={selected.includes(opt.id)}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>

      {footerOption && (
        <OptionButton
          option={footerOption}
          isSelected={selected.includes(footerOption.id)}
          onClick={() => onSelect(footerOption.id)}
          className="w-full"
        />
      )}
    </div>
  );
}

/* --------------------------------------------------
 * Option Button
 * -------------------------------------------------- */
function OptionButton({
  option,
  isSelected,
  onClick,
  className,
}: {
  option: any;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Base
        "w-full rounded-xl border-2 transition-all",

        // Layout: left-aligned on mobile, centered on PC
        "flex items-center md:justify-center",

        // Spacing
        " py-4 md:px-4 md:py-5",

        // Typography
        "text-base font-medium",

        "border-0 rounded-none md:border-2 md:rounded-xl   ",

        // Colors
      isSelected
  ? "bg-transparent md:bg-[#F4ECFF] border-[#3B0066] text-[#3B0066]"
  : "bg-transparent md:bg-white border-[#D6C4F3] text-[#3B0066] hover:bg-[#FAF7FF]",

        className
      )}
    >
      {/* Mobile-only radio */}
      <span
        className={cn(
          "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border md:hidden",
          isSelected
            ? "border-[#3B0066]"
            : "border-[#3B006B]"
        )}
      >
        {isSelected && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#3B0066]" />
        )}
      </span>

      {/* Label */}
      <span className="text-left md:text-center ">
        {option.label}
      </span>
    </button>
  );
}
