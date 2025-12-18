import { Badge } from '@/types/destination';
import { Award, Sparkles, TrendingUp, Star, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DestinationBadgeProps {
  badge: Badge;
  size?: 'sm' | 'md';
}

const iconMap = {
  featured: Sparkles,
  new: Star,
  trending: TrendingUp,
  award: Award,
  verified: BadgeCheck,
};

const colorMap = {
  featured: 'bg-primary/90 text-primary-foreground',
  new: 'bg-accent/90 text-accent-foreground',
  trending: 'bg-gold/90 text-gold-foreground',
  award: 'bg-gold/90 text-gold-foreground',
  verified: 'bg-accent/90 text-accent-foreground',
};

export function DestinationBadge({ badge, size = 'md' }: DestinationBadgeProps) {
  const Icon = iconMap[badge.type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium backdrop-blur-sm",
        colorMap[badge.type],
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      )}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {badge.label}
    </span>
  );
}
