import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HalalBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HalalBadge({ className, size = 'md' }: HalalBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'inline-flex items-center gap-1.5 bg-mint/10 text-mint hover:bg-mint/20 border-mint/30',
        sizeClasses[size],
        className
      )}
    >
      <CheckCircle2 className={iconSizes[size]} />
      <span className="font-medium">Halal</span>
    </Badge>
  );
}

