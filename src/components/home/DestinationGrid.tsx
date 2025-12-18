import { SlidersHorizontal } from 'lucide-react';
import { Destination } from '@/types/destination';
import { DestinationCard } from './DestinationCard';

interface DestinationGridProps {
  destinations: Destination[];
  totalCount: number;
}

export function DestinationGrid({ destinations, totalCount }: DestinationGridProps) {
  return (
    <section className="py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Curated for you</h2>
            <p className="text-sm text-gray-500 mt-1">{totalCount} destinations</p>
          </div>

          <button className="h-10 px-4 rounded-full bg-white border border-gray-200 flex items-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
