'use client';

import { X, Star, Heart, Share2, Navigation, MapPin, Phone, Globe, ArrowUpRight, Award, Key, Instagram, UtensilsCrossed } from 'lucide-react';
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
  const tagline = destination.subline || destination.short_summary || destination.ai_short_summary;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[480px] p-0 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="sticky top-0 z-10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-lg font-medium text-gray-900 dark:text-white">
                {destination.name}
              </SheetTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {destination.neighborhood && `${destination.neighborhood}, `}
                {destination.city}{destination.country ? `, ${destination.country}` : ''}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </SheetHeader>

        {/* Hero Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={imageUrl} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {destination.michelin_stars && destination.michelin_stars > 0 && (
              <div className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                <Star className="h-3 w-3 fill-current" />
                {destination.michelin_stars} Star{destination.michelin_stars > 1 ? 's' : ''}
              </div>
            )}
            {destination.michelin_keys && destination.michelin_keys > 0 && (
              <div className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg">
                <Key className="h-3 w-3" />
                {destination.michelin_keys} Key{destination.michelin_keys > 1 ? 's' : ''}
              </div>
            )}
            {destination.crown && (
              <div className="px-3 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium flex items-center gap-1.5 shadow-lg">
                <Award className="h-3 w-3" />
                Crown
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 -mt-8 relative">
          {/* Title Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{destination.category}</span>
              {destination.brand && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{destination.brand}</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">{destination.name}</h2>
            {tagline && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">{tagline}</p>}
          </div>

          {/* Rating & Price */}
          <div className="flex items-center gap-3 mb-5">
            {destination.rating && (
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-900 dark:text-white font-medium">{destination.rating.toFixed(1)}</span>
                {destination.reviews_count && <span className="text-gray-500 dark:text-gray-400 text-sm">({destination.reviews_count})</span>}
              </div>
            )}
            {destination.price_level && (
              <span className="text-gray-500 dark:text-gray-400 text-sm">{'$'.repeat(destination.price_level)}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all",
                isSaved
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all">
              <Navigation className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          {destination.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{destination.description}</p>
          )}

          {/* Cuisine & Chef */}
          {(destination.cuisine_type?.length || destination.chef_name) && (
            <div className="mb-6">
              <h3 className="text-xs font-medium tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-3">Cuisine</h3>
              {destination.chef_name && (
                <div className="flex items-center gap-2 mb-2">
                  <UtensilsCrossed className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Chef {destination.chef_name}</span>
                </div>
              )}
              {destination.cuisine_type?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {destination.cuisine_type.map((cuisine, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      {cuisine}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contact Section */}
          {(destination.address || destination.phone_number || destination.website || destination.instagram_handle) && (
            <div className="mb-6">
              <h3 className="text-xs font-medium tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-3">Contact</h3>
              <div className="space-y-2.5">
                {destination.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{destination.address}</span>
                  </div>
                )}
                {destination.phone_number && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <a href={`tel:${destination.phone_number}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {destination.phone_number}
                    </a>
                  </div>
                )}
                {destination.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <a href={destination.website.startsWith('http') ? destination.website : `https://${destination.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                      Visit website
                    </a>
                  </div>
                )}
                {(destination.instagram_url || destination.instagram_handle) && (
                  <div className="flex items-center gap-3">
                    <Instagram className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <a href={destination.instagram_url || `https://instagram.com/${destination.instagram_handle}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
                      @{destination.instagram_handle || 'Instagram'}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Design Section */}
          {(destination.architect || destination.architectural_style || destination.design_firm) && (
            <div className="mb-6">
              <h3 className="text-xs font-medium tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-3">Design</h3>
              <div className="space-y-2">
                {destination.architect && (
                  <div className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium">A</div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">Architect</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{destination.architect}</p>
                    </div>
                  </div>
                )}
                {destination.design_firm && (
                  <div className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-800">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium">F</div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">Design Firm</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{destination.design_firm}</p>
                    </div>
                  </div>
                )}
                {destination.architectural_style && (
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium">S</div>
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">Style</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{destination.architectural_style}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {(destination.vibe_tags?.length || destination.tags?.length) && (
            <div className="mb-6">
              <h3 className="text-xs font-medium tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {[...(destination.vibe_tags || []), ...(destination.tags || [])].slice(0, 10).map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map Preview */}
          <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-6 w-6 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Map Preview</span>
              </div>
            </div>
            <button className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:opacity-80 transition-opacity">
              View larger map
            </button>
          </div>

          {/* View Full Page Link */}
          <Link
            to={`/destination/${destination.slug}`}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View Full Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
