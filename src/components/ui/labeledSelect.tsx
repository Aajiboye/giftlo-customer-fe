import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem, // Make sure SelectItem is exported from your ui/select
} from "@/components/ui/select";

interface LabeledSelectProps {
  label: string;
  placeholder?: string;
  error?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const LabeledSelect = React.forwardRef<
  HTMLButtonElement,
  LabeledSelectProps
>(
  (
    {
      label,
      placeholder,
      error,
      value,
      onValueChange,
      disabled,
      children,
    },
    ref
  ) => {
    return (
      <div className="">
        <label
          htmlFor={label}
          className="block md:hidden text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <div
            className={cn(
              "flex w-full items-stretch overflow-hidden rounded-lg border bg-white",
              error
                ? "border-red-500"
                : "border-gray-300"
            )}
          >
            {/* Left label segment */}
            <div className="hidden md:flex items-center px-4 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-300 whitespace-nowrap w-[150px]">
              {label}
            </div>

            {/* Select trigger */}
            <SelectTrigger
              ref={ref}
              className={cn(
                "flex-1 h-10 px-4 text-sm text-gray-700",
                "border-0"
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </div>

          <SelectContent>{children}</SelectContent>
        </Select>
      </div>

    );
  }
);

LabeledSelect.displayName = "LabeledSelect";

export { LabeledSelect, SelectItem }; // Export SelectItem so it can be used