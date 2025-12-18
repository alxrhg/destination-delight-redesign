import { X, Star, Heart, Share2, Navigation, MapPin, Phone, Globe, ArrowUpRight } from 'lucide-react';
import { Destination } from '@/types/destination';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface DestinationDrawerProps {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended mock data for drawer display
const getDestinationDetails = (destination: Destination) => ({
  description: `Discover unparalleled luxury at ${destination.name}, where exceptional design meets curated experiences. A destination that defines modern elegance.`,
  rating: destination.rating || 5.0,
  reviewCount: 10,
  address: '123 Design District, ' + destination.city,
  phone: '+1 555-123-4567',
  website: destination.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
  architect: 'Studio Design',
  style: 'Contemporary',
});

export function DestinationDrawer({ destination, open, onOpenChange }: DestinationDrawerProps) {
  const [isSaved, setIsSaved] = useState(false);

  if (!destination) return null;

  const details = getDestinationDetails(destination);

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
              <p className="text-sm text-white/50 mt-0.5">{destination.city}</p>
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
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent" />
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
          <div className="flex items-center gap-2 mb-5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-white font-medium">{details.rating}</span>
            <span className="text-white/40 text-sm">({details.reviewCount} reviews)</span>
          </div>

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
          <p className="text-sm text-white/60 leading-relaxed mb-8">
            {details.description}
          </p>

          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="text-[11px] font-medium tracking-wider text-white/30 uppercase mb-4">
              Contact & Hours
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">{details.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white/40 flex-shrink-0" />
                <span className="text-sm text-white/70">{details.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-white/40 flex-shrink-0" />
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  {details.website}
                </a>
              </div>
            </div>
          </div>

          {/* Design Section */}
          <div className="mb-8">
            <h3 className="text-[11px] font-medium tracking-wider text-white/30 uppercase mb-4">
              Design & Architecture
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 py-3 border-b border-white/5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 text-xs font-medium">
                  A
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">Architect</p>
                  <p className="text-sm text-white/80">{details.architect}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 text-xs font-medium">
                  S
                </div>
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">Style</p>
                  <p className="text-sm text-white/80">{details.style}</p>
                </div>
              </div>
            </div>
          </div>

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
            to={`/destination/${destination.id}`}
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
