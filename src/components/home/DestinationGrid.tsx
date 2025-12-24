'use client';

import { Destination } from '@/types/destination';
import { DestinationCard, DestinationCardSkeleton } from './DestinationCard';

interface DestinationGridProps {
  destinations: Destination[];
  totalCount: number;
  onDestinationClick?: (destination: Destination) => void;
  isLoading?: boolean;
}

export function DestinationGrid({
  destinations,
  totalCount,
  onDestinationClick,
  isLoading = false,
}: DestinationGridProps) {
  return (
    <section className="w-full px-8 md:px-12 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 flex items-baseline justify-between border-b border-border pb-6">
          <div className="flex items-baseline gap-4">
            <h2 className="font-display text-2xl text-foreground">
              Selected Places
            </h2>
            <span className="text-sm text-muted-foreground tracking-wide">
              {totalCount}
            </span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <DestinationGridSkeleton count={12} />
        ) : destinations.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-sm text-muted-foreground">
              No destinations found.
            </p>
          </div>
        ) : (
          /* Editorial Grid - Fewer columns, more breathing room */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
                onClick={() => onDestinationClick?.(destination)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Grid skeleton for loading state
 */
export function DestinationGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <DestinationCardSkeleton key={index} />
      ))}
    </div>
  );
}
