import { icons, HelpCircle, LucideIcon } from "lucide-react";

export const toPascalCase = (str: string) => {
    if(!str) return;

    
    return str
        .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
        .replace(/^(.)/, c => c.toUpperCase());
}


interface DynamicIconProps {
    name: string;
    size?: number;
    className?: string;
    color?: string;
}

export function DynamicIcon({
    name,
    size = 20,
    className,
    color,
}: DynamicIconProps) {
    const Icon: LucideIcon = icons[toPascalCase(name) as keyof typeof icons] ?? HelpCircle;

    return (
        <Icon
            size={size}
            className={className}
            color={color}
        />
    );
}
