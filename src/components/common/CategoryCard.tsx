import Image from "next/image";
import { BookOpen } from "lucide-react";
import { formatCount } from "@/utilities/format.helper";

interface CategoryCardProps {
    widthClass?: string;
    text: string;
    itemCount: number;
    imageSrc: string;
}

export default function CategoryCard({
    widthClass = "w-full md:w-[37%]",
    text,
    itemCount,
    imageSrc,
}: CategoryCardProps) {
    return (
        <div
            className={`
        ${widthClass}
        
        rounded-xl bg-white p-5
        shadow-sm transition hover:shadow-md mt-4
      `}
        >
            {/* Text Section */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm text-[#3B006B]">
                        {text}
                    </h3>
                </div>
                <p className="text-sm text-gray-500">
                    {formatCount(itemCount)} Items
                </p>
            </div>

            {/* Image Section */}
            <div className="relative h-[120px] w-full">
                <Image
                    src={imageSrc}
                    alt={text}
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
