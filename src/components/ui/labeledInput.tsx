import * as React from "react"
import { cn } from "@/lib/utils"

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: boolean
  rightSlot?: React.ReactNode
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, className, error, rightSlot, id, ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div
        className={cn(
          "w-full bg-white",
          // Desktop unified border
          "md:rounded-lg md:overflow-hidden md:border",
          error
            ? "md:border-red-500"
            : "md:border-[#D0D0D0] md:focus-within:border-gray-400"
        )}
      >
        {/* Mobile label */}
        <label
          htmlFor={inputId}
          className="block md:hidden text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>

        <div className="flex items-stretch">
          {/* Desktop label */}
          <label
            htmlFor={inputId}
            className={cn(
              "hidden md:flex items-center px-4 text-sm font-medium whitespace-nowrap w-[150px]",
              "bg-gray-50 border-r",
              error
                ? "text-red-600 border-red-500"
                : "text-gray-700 border-gray-300"
            )}
          >
            {label}
          </label>

          {/* Input wrapper (icon is aligned to THIS, not the label) */}
          <div className="relative flex-1">
            <input
              ref={ref}
              id={inputId}
              className={cn(
                "w-full h-10 px-4 text-sm text-gray-700",
                "placeholder:text-gray-400 focus:outline-none focus:ring-0",

                // Mobile border
                "border rounded-md",
                error
                  ? "border-red-500"
                  : "border-[#D0D0D0] focus:border-gray-400",

                // Desktop removes inner border
                "md:border-0 md:rounded-none",

                // Space for right icon
                rightSlot && "pr-10",

                className
              )}
              {...props}
            />

            {/* Right icon slot */}
            {rightSlot && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                {rightSlot}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

LabeledInput.displayName = "LabeledInput"

export { LabeledInput }
