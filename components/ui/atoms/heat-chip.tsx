import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeatChipProps {
  level: 0 | 1 | 2 | 3;
  showLabel?: boolean;
  className?: string;
}

const heatLevelConfig = {
  0: { label: 'No Heat', count: 0, color: 'text-muted-foreground' },
  1: { label: 'Mild', count: 1, color: 'text-corn' },
  2: { label: 'Medium', count: 2, color: 'text-zesty' },
  3: { label: 'Hot', count: 3, color: 'text-flame' },
};

export function HeatChip({ level, showLabel = false, className }: HeatChipProps) {
  const config = heatLevelConfig[level];

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Flame
            key={index}
            className={cn(
              'h-4 w-4',
              index < config.count ? config.color : 'text-muted-foreground/30'
            )}
            fill={index < config.count ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground">
          {config.label}
        </span>
      )}
    </div>
  );
}

