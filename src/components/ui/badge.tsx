import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'border-none bg-badge_success text-success',
        danger: 'border-none bg-badge_danger text-danger',
        warning: 'border-none bg-badge_warning text-warning',
        outline: 'text-foreground',
        new: 'bg-[#F7EFE8] text-[#91755D] border-none',
        progress: 'bg-[#F7F9FC] text-grey-600 border-none',
        darkgreen: 'bg-[#CCDBDC] text-[#004C4E] border-none',
        warningWithBorder:
          'border-grey-300 rounded-2xl text-warning bg-badge_warning'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
