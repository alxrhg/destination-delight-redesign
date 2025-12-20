'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { MapPin, Check, Heart } from 'lucide-react';
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
 * Urban Manual Destination Card with hover interactions and progressive loading
 * Memoized to prevent unnecessary re-renders
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

  // Intersection Observer for progressive loading
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
        'group relative w-full flex flex-col transition-all duration-300 ease-out',
        'cursor-pointer text-left focus-ring',
        'hover:scale-[1.01]',
        'active:scale-[0.98]',
        className
      )}
      aria-label={`View ${destination.name} in ${capitalizeCity(destination.city)}`}
    >
      {/* Image Container with Progressive Loading */}
      <div
        className={cn(
          'relative aspect-video overflow-hidden rounded-2xl',
          'bg-gray-100 dark:bg-gray-800',
          'border border-gray-200 dark:border-gray-800',
          'transition-all duration-300 ease-out',
          'mb-3',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Skeleton while loading */}
        {!isLoaded && isInView && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />
        )}

        {/* Actual Image */}
        {isInView && destination.image && !imageError ? (
          <img
            src={destination.image}
            alt={`${destination.name} in ${capitalizeCity(destination.city)}${destination.category ? ` - ${destination.category}` : ''}`}
            className={cn(
              'w-full h-full object-cover',
              'transition-all duration-500 ease-out',
              'group-hover:scale-105',
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
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
            <MapPin className="h-12 w-12 opacity-20 transition-transform duration-300 group-hover:scale-105" />
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-t from-black/60 via-transparent to-transparent',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-300',
            'pointer-events-none'
          )}
        />

        {/* Quick Actions - Top Right on Hover */}
        {showQuickActions && (
          <div
            className={cn(
              'absolute top-2 right-2 z-20',
              'opacity-0 group-hover:opacity-100',
              'translate-y-1 group-hover:translate-y-0',
              'transition-all duration-200'
            )}
          >
            <button
              onClick={handleSave}
              className={cn(
                'p-2.5 rounded-full backdrop-blur-sm shadow-lg',
                'transition-all duration-200',
                isSaved
                  ? 'bg-white text-red-500'
                  : 'bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 hover:text-red-500'
              )}
              aria-label={isSaved ? 'Remove from saved' : 'Save destination'}
            >
              <Heart className={cn('h-4 w-4', isSaved && 'fill-current')} />
            </button>
          </div>
        )}

        {/* Visited Check Badge - Center */}
        {isVisited && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-5 h-5 text-gray-900 dark:text-white stroke-[3]" />
          </div>
        )}

        {/* Rating Badge - Bottom Right */}
        {typeof destination.rating === 'number' && destination.rating > 0 && (
          <div
            className={cn(
              'absolute bottom-2 right-2 z-10',
              'px-3 py-1 border border-gray-200 dark:border-gray-800',
              'rounded-2xl text-gray-600 dark:text-gray-400 text-xs',
              'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm',
              'flex items-center gap-1.5',
              'transform scale-100 group-hover:scale-[1.02]',
              'transition-transform duration-300',
              'shadow-sm group-hover:shadow-md'
            )}
          >
            <svg className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{destination.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col">
        <div>
          <h3
            className={cn(
              'text-sm font-medium text-gray-900 dark:text-white',
              'line-clamp-2',
              'transition-colors duration-200',
              'group-hover:text-gray-700 dark:group-hover:text-gray-200'
            )}
          >
            {destination.name}
          </h3>

          {/* Micro Description - Category and City */}
          <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-0.5">
            {destination.category && destination.city
              ? `${destination.category} in ${capitalizeCity(destination.city)}`
              : destination.city
                ? capitalizeCity(destination.city)
                : destination.category || ''}
          </div>
        </div>
      </div>

      {/* Focus Ring for Accessibility */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl',
          'ring-2 ring-offset-2 ring-black dark:ring-white',
          'opacity-0 focus-within:opacity-100',
          'transition-opacity duration-200',
          'pointer-events-none'
        )}
      />
    </button>
  );
});

/**
 * Skeleton for loading state
 */
export function DestinationCardSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-gray-800" />
      <div className="h-3 rounded bg-gray-100 dark:bg-gray-800 w-3/4" />
      <div className="h-2 rounded bg-gray-100 dark:bg-gray-800 w-1/2" />
    </div>
  );
}
