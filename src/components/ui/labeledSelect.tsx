import * as React from "react"
import { cn } from "@/lib/utils"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from "@/components/ui/select"

interface LabeledSelectProps {
    label: string
    placeholder?: string
    error?: boolean
    children: React.ReactNode
}

const LabeledSelect = ({
    label,
    placeholder,
    error,
    children,
}: LabeledSelectProps) => {
    return (
        <Select>
            <div
                className={cn(
                    "flex w-full items-stretch overflow-hidden rounded-lg border bg-white",
                    error
                        ? "border-red-500"
                        : "border-gray-300 focus-within:border-gray-400"
                )}
            >
                {/* Left label segment */}
                <div className="flex items-center px-4 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-300 whitespace-nowrap w-[150px]">
                    {label}
                </div>

                {/* Select trigger */}
                <SelectTrigger
                    className={cn(
                        "flex-1 h-10 px-4 text-sm text-gray-700 border-[#D0D0D0] placeholder:text-gray-400",
                        "focus:outline-none focus:ring-0"
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </div>

            <SelectContent>{children}</SelectContent>
        </Select>
    )
}

export { LabeledSelect }
