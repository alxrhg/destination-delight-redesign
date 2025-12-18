import { X, Star, Heart, Share2, Navigation, MapPin, Phone, Globe, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SupabaseDestination } from '@/hooks/useDestinations';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface DestinationDrawerProps {
  destination: SupabaseDestination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DestinationDrawer({ destination, open, onOpenChange }: DestinationDrawerProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!destination) return null;

  const imageUrl = destination.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[480px] p-0 bg-[#0D1117] border-l border-white/10 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="sticky top-0 z-10 bg-[#0D1117]/95 backdrop-blur-sm px-6 py-4 border-b border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-lg font-medium text-white">
                {destination.name}
              </SheetTitle>
              <p className="text-sm text-white/50 mt-0.5">
                {destination.city}{destination.country ? `, ${destination.country}` : ''}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </SheetHeader>

        {/* Hero Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
          
          {/* Michelin Stars Badge */}
          {destination.michelin_stars && destination.michelin_stars > 0 && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-medium flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {destination.michelin_stars} Michelin Star{destination.michelin_stars > 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-8 -mt-8 relative">
          {/* Title Section */}
          <div className="mb-4">
            <h2 className="text-xl font-medium text-white mb-1">{destination.name}</h2>
            <p className="text-sm text-white/50">
              {destination.category} · {destination.city}
            </p>
          </div>

          {/* Rating */}
          {destination.rating && (
            <div className="flex items-center gap-2 mb-5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-white font-medium">{destination.rating.toFixed(1)}</span>
              {destination.price_level && (
                <span className="text-white/40 text-sm ml-2">
                  {'$'.repeat(destination.price_level)}
                </span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all",
                isSaved
                  ? "bg-white text-[#0D1117]"
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
              )}
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Navigation className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          {destination.description && (
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              {destination.description}
            </p>
          )}

          {/* Contact Section */}
          {(destination.address || destination.phone_number || destination.website) && (
            <div className="mb-8">
              <h3 className="text-[11px] font-medium tracking-wider text-white/30 uppercase mb-4">
                Contact & Location
              </h3>
              <div className="space-y-3">
                {destination.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{destination.address}</span>
                  </div>
                )}
                {destination.phone_number && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-white/40 flex-shrink-0" />
                    <a 
                      href={`tel:${destination.phone_number}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {destination.phone_number}
                    </a>
                  </div>
                )}
                {destination.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-white/40 flex-shrink-0" />
                    <a 
                      href={destination.website.startsWith('http') ? destination.website : `https://${destination.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Visit website
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Design Section */}
          {(destination.architect || destination.architectural_style) && (
            <div className="mb-8">
              <h3 className="text-[11px] font-medium tracking-wider text-white/30 uppercase mb-4">
                Design & Architecture
              </h3>
              <div className="space-y-2">
                {destination.architect && (
                  <div className="flex items-center gap-3 py-3 border-b border-white/5">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 text-xs font-medium">
                      A
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 uppercase tracking-wide">Architect</p>
                      <p className="text-sm text-white/80">{destination.architect}</p>
                    </div>
                  </div>
                )}
                {destination.architectural_style && (
                  <div className="flex items-center gap-3 py-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 text-xs font-medium">
                      S
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 uppercase tracking-wide">Style</p>
                      <p className="text-sm text-white/80">{destination.architectural_style}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Map Preview */}
          <div className="relative aspect-[2/1] rounded-xl overflow-hidden bg-white/5 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-6 w-6 text-white/30 mx-auto mb-2" />
                <span className="text-xs text-white/40">Map Preview</span>
              </div>
            </div>
            <button className="absolute bottom-3 left-3 px-3 py-1.5 rounded-md bg-white text-[#0D1117] text-xs font-medium hover:bg-white/90 transition-colors">
              View larger map
            </button>
          </div>

          {/* View Full Page Link */}
          <Link
            to={`/destination/${destination.slug}`}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-[#0D1117] text-sm font-medium hover:bg-white/90 transition-colors"
          >
            View Full Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
