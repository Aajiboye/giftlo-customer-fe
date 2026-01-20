import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  icon?: React.ReactNode;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      // <div className="relative">
      <div className="relative">
      {icon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-3">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "font-normal rounded flex h-10 w-full border bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gray-400",
          icon ? "pl-10" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>


      //   {icon && <img src={icon} alt="input-icon"/>}
      // </div>

    )
  }
)
Input.displayName = "Input"

export { Input }
