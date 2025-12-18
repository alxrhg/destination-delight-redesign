import { ArrowRight } from 'lucide-react';
import { Destination } from '@/types/destination';
import { DestinationCard } from './DestinationCard';

interface DestinationGridProps {
  destinations: Destination[];
  totalCount: number;
}

export function DestinationGrid({ destinations, totalCount }: DestinationGridProps) {
  // Split destinations for layout variety
  const featured = destinations.slice(0, 2);
  const regular = destinations.slice(2);

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-3">Selected for you</p>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
              Latest additions
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group">
            View all {totalCount}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Row - Larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              variant="featured"
            />
          ))}
        </div>

        {/* Regular Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {regular.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index + 2}
              variant="default"
            />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="md:hidden mt-10 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
            View all {totalCount} destinations
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
