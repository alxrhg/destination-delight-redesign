import { Plus, SlidersHorizontal, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Destination } from '@/types/destination';
import { DestinationCard } from './DestinationCard';

interface DestinationGridProps {
  destinations: Destination[];
  totalCount: number;
}

export function DestinationGrid({ destinations, totalCount }: DestinationGridProps) {
  return (
    <section className="py-8 px-4">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm text-muted-foreground">
            {totalCount} destinations
          </p>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2 rounded-full border-border/60 bg-card hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
              Create Trip
            </Button>
            <Button 
              variant="secondary" 
              className="gap-2 rounded-full bg-secondary hover:bg-secondary/80"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button 
              variant="secondary" 
              className="gap-2 rounded-full bg-secondary hover:bg-secondary/80"
            >
              <Globe className="h-4 w-4" />
              Discover by Cities
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
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
