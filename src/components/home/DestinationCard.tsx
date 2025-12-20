import { Star, Heart, ArrowUpRight } from 'lucide-react';
import { Destination } from '@/types/destination';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  index: number;
  variant?: 'default' | 'featured';
  onClick?: (destination: Destination) => void;
}

export function DestinationCard({ destination, index, variant = 'default', onClick }: DestinationCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleClick = () => {
    onClick?.(destination);
  };

  if (variant === 'featured') {
    return (
      <div 
        onClick={handleClick}
        className="group block animate-fade-up cursor-pointer"
        style={{ animationDelay: `${0.1 + index * 0.05}s` }}
      >
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-secondary">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0" />
          
          {/* Save Button */}
          <button
            onClick={handleSave}
            className={cn(
              "absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center transition-all",
              isSaved 
                ? "bg-foreground text-destructive" 
                : "bg-background/20 backdrop-blur-sm text-foreground hover:bg-background/30"
            )}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </button>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-sm text-foreground text-xs font-medium">
                {destination.category}
              </span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-foreground">{destination.rating}</span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-1 group-hover:underline underline-offset-4">
              {destination.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {destination.city}
            </p>
          </div>

          {/* Arrow */}
          <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-background/0 group-hover:bg-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <ArrowUpRight className="h-5 w-5 text-background" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group block animate-fade-up cursor-pointer"
      style={{ animationDelay: `${0.1 + index * 0.03}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-secondary">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Save Button */}
        <button
          onClick={handleSave}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isSaved 
              ? "bg-foreground text-destructive" 
              : "bg-background/30 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-foreground">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs tracking-wide uppercase text-muted-foreground mb-1">
          {destination.category} · {destination.city}
        </p>
        <h3 className="text-base font-medium text-foreground group-hover:text-muted-foreground transition-colors">
          {destination.name}
        </h3>
      </div>
    </div>
  );
}
