import { Destination } from '@/types/destination';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <article 
      className="group cursor-pointer animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors">
          {destination.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {destination.category} in {destination.city}
        </p>
      </div>
    </article>
  );
}
