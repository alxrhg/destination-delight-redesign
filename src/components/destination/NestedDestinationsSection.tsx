import { NestedDestination } from '@/types/destination';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NestedDestinationsSectionProps {
  destinations: NestedDestination[];
  parentName: string;
}

function NestedCard({ destination }: { destination: NestedDestination }) {
  return (
    <Card className="group overflow-hidden bg-card shadow-soft border-0 hover:shadow-medium transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="inline-block px-2.5 py-1 text-xs font-medium bg-background/20 backdrop-blur-sm text-primary-foreground rounded-full mb-2">
              {destination.category}
            </span>
            <h3 className="font-display text-xl font-semibold text-primary-foreground">
              {destination.name}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {destination.description}
          </p>
          <Button
            variant="ghost"
            className="h-auto p-0 text-primary hover:text-primary/80 gap-1.5 group/btn"
          >
            <span className="text-sm font-medium">Explore</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function NestedDestinationsSection({
  destinations,
  parentName,
}: NestedDestinationsSectionProps) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section id="nested" className="py-12 md:py-16 bg-sand/50">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Inside {parentName}
          </h2>
          <p className="text-muted-foreground mt-2">
            Discover the venues and experiences within
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <NestedCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}
