import { SimilarDestination } from '@/types/destination';
import { Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SimilarDestinationsSectionProps {
  destinations: SimilarDestination[];
}

function SimilarCard({ destination }: { destination: SimilarDestination }) {
  return (
    <Card className="group overflow-hidden bg-card shadow-soft border-0 hover:shadow-medium transition-all duration-300 cursor-pointer">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          
          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-xs font-medium text-foreground">{destination.rating}</span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-xs text-primary-foreground/70 uppercase tracking-wide">
              {destination.category}
            </span>
            <h3 className="font-display text-lg font-semibold text-primary-foreground mt-1">
              {destination.name}
            </h3>
            <p className="text-sm text-primary-foreground/80 mt-0.5">
              {destination.city}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SimilarDestinationsSection({
  destinations,
}: SimilarDestinationsSectionProps) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section id="similar" className="py-12 md:py-16">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              You Might Also Like
            </h2>
            <p className="text-muted-foreground mt-2">
              Similar destinations to explore
            </p>
          </div>

          <Button
            variant="ghost"
            className="hidden sm:flex gap-1.5 text-primary hover:text-primary/80 group"
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {destinations.map((destination) => (
            <SimilarCard key={destination.id} destination={destination} />
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 sm:hidden gap-1.5 rounded-full"
        >
          View all recommendations
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
