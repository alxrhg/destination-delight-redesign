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
    <section className="w-full px-6 md:px-10 py-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-6 flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Destinations
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {totalCount} places
            </span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <DestinationGridSkeleton count={20} />
        ) : destinations.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No destinations found.
            </p>
          </div>
        ) : (
          /* Urban Manual Grid - Responsive columns */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6 items-start">
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
export function DestinationGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6 items-start">
      {Array.from({ length: count }).map((_, index) => (
        <DestinationCardSkeleton key={index} />
      ))}
    </div>
  );
}
