import { useState } from 'react';
import { ChevronLeft, MapPin, Star, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionButtons } from './ActionButtons';
import { DestinationBadge } from './DestinationBadge';
import { Destination } from '@/types/destination';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  destination: Destination;
  onBack?: () => void;
  onSave: () => void;
  onVisited: () => void;
  onShare: () => void;
  onGalleryOpen: () => void;
}

export function HeroSection({
  destination,
  onBack,
  onSave,
  onVisited,
  onShare,
  onGalleryOpen,
}: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className={cn(
            "h-full w-full object-cover transition-all duration-700",
            imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <ActionButtons
            isSaved={destination.isSaved || false}
            isVisited={destination.isVisited || false}
            onSave={onSave}
            onVisited={onVisited}
            onShare={onShare}
            variant="hero"
          />
        </div>
      </div>

      {/* Gallery Button */}
      <Button
        variant="ghost"
        onClick={onGalleryOpen}
        className="absolute bottom-24 right-4 md:right-6 z-10 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-primary-foreground gap-2"
      >
        <Images className="h-4 w-4" />
        <span className="hidden sm:inline">View Gallery</span>
        <span className="bg-background/30 px-2 py-0.5 rounded-full text-xs">
          {destination.gallery.length + 1}
        </span>
      </Button>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 lg:p-8">
        <div className="container max-w-5xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {destination.badges.map((badge, index) => (
              <DestinationBadge key={index} badge={badge} size="sm" />
            ))}
          </div>

          {/* Title */}
          <h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground mb-3 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {destination.name}
          </h1>

          {/* Tagline */}
          <p 
            className="text-lg md:text-xl text-primary-foreground/90 font-light mb-4 max-w-2xl animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            {destination.tagline}
          </p>

          {/* Meta Info */}
          <div 
            className="flex flex-wrap items-center gap-4 text-primary-foreground/80 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{destination.city}, {destination.country}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="text-sm font-medium">{destination.rating}</span>
              <span className="text-sm text-primary-foreground/60">
                ({destination.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            {destination.priceLevel && (
              <span className="text-sm">
                {'€'.repeat(destination.priceLevel)}
                <span className="text-primary-foreground/40">{'€'.repeat(4 - destination.priceLevel)}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
