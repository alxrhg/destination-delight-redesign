'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Destination } from '@/types/destination';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
  index?: number;
  isVisited?: boolean;
  showQuickActions?: boolean;
  className?: string;
}

function capitalizeCity(city: string): string {
  return city
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Editorial Destination Card with refined hover interactions
 */
export const DestinationCard = memo(function DestinationCard({
  destination,
  onClick,
  index = 0,
  isVisited = false,
  showQuickActions = true,
  className = '',
}: DestinationCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <button
      ref={cardRef}
      onClick={handleClick}
      type="button"
      className={cn(
        'group relative w-full flex flex-col transition-all duration-300',
        'cursor-pointer text-left focus-ring',
        'active:scale-[0.99]',
        className
      )}
      aria-label={`View ${destination.name} in ${capitalizeCity(destination.city)}`}
    >
      {/* Image Container */}
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden',
          'bg-muted',
          'transition-all duration-500',
          'mb-4',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Skeleton while loading */}
        {!isLoaded && isInView && (
          <div className="absolute inset-0 animate-pulse bg-secondary" />
        )}

        {/* Actual Image */}
        {isInView && destination.image && !imageError ? (
          <img
            src={destination.image}
            alt={`${destination.name} in ${capitalizeCity(destination.city)}${destination.category ? ` - ${destination.category}` : ''}`}
            className={cn(
              'w-full h-full object-cover',
              'transition-transform duration-700 ease-out',
              'group-hover:scale-[1.03]',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            loading={index < 6 ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setImageError(true);
              setIsLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <MapPin className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}

        {/* Subtle overlay on hover */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-foreground/0 group-hover:bg-foreground/5',
            'transition-all duration-500',
            'pointer-events-none'
          )}
        />

        {/* Quick Actions - Top Right on Hover */}
        {showQuickActions && (
          <div
            className={cn(
              'absolute top-4 right-4 z-20',
              'opacity-0 group-hover:opacity-100',
              'transition-opacity duration-300'
            )}
          >
            <button
              onClick={handleSave}
              className={cn(
                'p-3 bg-background/95 backdrop-blur-sm',
                'transition-all duration-200',
                'hover:bg-background',
                isSaved ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={isSaved ? 'Remove from saved' : 'Save destination'}
            >
              <Heart className={cn('h-4 w-4', isSaved && 'fill-current')} />
            </button>
          </div>
        )}

        {/* Category Tag - Bottom Left */}
        {destination.category && (
          <div
            className={cn(
              'absolute bottom-4 left-4 z-10',
              'px-3 py-1.5',
              'bg-background/95 backdrop-blur-sm',
              'text-[10px] uppercase tracking-widest text-muted-foreground'
            )}
          >
            {destination.category}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col gap-1">
        <h3
          className={cn(
            'font-display text-lg font-normal text-foreground',
            'leading-tight',
            'transition-colors duration-200',
            'group-hover:text-muted-foreground'
          )}
        >
          {destination.name}
        </h3>

        <p className="text-xs text-muted-foreground tracking-wide">
          {capitalizeCity(destination.city)}
          {destination.country && `, ${destination.country}`}
        </p>

        {/* Rating */}
        {typeof destination.rating === 'number' && destination.rating > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-muted-foreground">
              {destination.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
});

/**
 * Skeleton for loading state
 */
export function DestinationCardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-[4/5] bg-secondary" />
      <div className="space-y-2">
        <div className="h-5 bg-secondary w-3/4" />
        <div className="h-3 bg-secondary w-1/2" />
      </div>
    </div>
  );
}
