import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  ExternalLink,
  Phone,
  Globe,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Clock,
  Navigation,
  Search,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import { useDestination } from '@/hooks/useDestinations';

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: destination, isLoading, error } = useDestination(slug);
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-4">Destination not found</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Go back home
          </Button>
        </div>
      </div>
    );
  }

  const heroImage = destination.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80';
  const allImages = [heroImage, ...(destination.gallery || [])];

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? 'Removed from saved' : 'Saved to collection',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destination.name,
          text: destination.description || '',
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
        toast({ title: 'Link copied' });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied' });
    }
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const lat = destination.latitude || 0;
  const lng = destination.longitude || 0;
  const hasCoordinates = lat !== 0 && lng !== 0;
  const osmStaticUrl = hasCoordinates 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.005},${lng + 0.01},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`
    : '';
  const directionsUrl = hasCoordinates 
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.address || destination.name)}`;

  return (
    <>
      <Helmet>
        <title>{destination.name} | Urban Manual</title>
        <meta name="description" content={destination.description || `Discover ${destination.name} in ${destination.city}`} />
      </Helmet>

      <div className="min-h-screen bg-[#0D1117]">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-white font-semibold text-lg tracking-tight">
              Urban Manual®
            </Link>
            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 h-10 px-4 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-colors">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search...</span>
                <kbd className="ml-4 text-xs bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
              </button>
              <button className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors px-3">
                Trips
              </button>
              <button className="h-10 px-4 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline text-sm">Sign In</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section with Image */}
          <div className="relative">
            {/* Hero Image */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[300px] lg:h-[400px]">
              <img
                src={allImages[activeImage]}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/60 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent lg:hidden" />
              
              {/* Michelin Stars Badge */}
              {destination.michelin_stars && destination.michelin_stars > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-medium flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {destination.michelin_stars} Star{destination.michelin_stars > 1 ? 's' : ''}
                </div>
              )}
              
              {/* Image Navigation */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={prevImage}
                    className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/60 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-white/80">{activeImage + 1}/{allImages.length}</span>
                  <button
                    onClick={nextImage}
                    className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-black/60 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Overlay */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[320px] lg:pt-10">
              {/* Back Link */}
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">All Destinations</span>
              </button>

              {/* Category Label */}
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                {destination.category}
              </p>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-semibold text-white mb-2 max-w-xl">
                {destination.name}
              </h1>

              {/* Meta Info */}
              <p className="text-gray-400 mb-6 max-w-xl">
                {destination.city}{destination.country ? `, ${destination.country}` : ''}
                {destination.price_level && ` · ${'$'.repeat(destination.price_level)}`}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={handleSave}
                  className={cn(
                    "h-10 px-4 rounded-lg border flex items-center gap-2 transition-colors",
                    isSaved 
                      ? "bg-red-500/10 border-red-500/30 text-red-400" 
                      : "border-white/10 text-gray-300 hover:bg-white/5"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                  <span className="text-sm">{isSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="h-10 px-4 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </button>
                {destination.rating && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-white">{destination.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Tags/Badges */}
              {(destination.vibe_tags || destination.tags) && (
                <div className="flex flex-wrap gap-2 mb-12">
                  {[...(destination.vibe_tags || []), ...(destination.tags || [])].slice(0, 5).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                    >
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-10">
                {/* Description */}
                {(destination.description || destination.content) && (
                  <div>
                    <h2 className="text-lg font-medium text-white mb-4">About</h2>
                    <p className="text-gray-400 leading-relaxed">
                      {destination.description || destination.content}
                    </p>
                  </div>
                )}

                {/* Gallery Grid */}
                {allImages.length > 1 && (
                  <div>
                    <h2 className="text-lg font-medium text-white mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={cn(
                            "relative aspect-[4/3] rounded-xl overflow-hidden transition-all",
                            activeImage === idx ? "ring-2 ring-white/30" : "opacity-60 hover:opacity-100"
                          )}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map */}
                {(hasCoordinates || destination.address) && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-white">Location</h2>
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                      >
                        <Navigation className="h-4 w-4" />
                        Get Directions
                      </a>
                    </div>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-xl overflow-hidden border border-white/10 group"
                    >
                      <div className="aspect-[2/1] bg-gray-800 relative">
                        {hasCoordinates ? (
                          <iframe
                            src={osmStaticUrl}
                            className="w-full h-full border-0 grayscale invert opacity-90"
                            title="Location map"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin className="h-8 w-8 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 pointer-events-none group-hover:bg-white/5 transition-colors" />
                      </div>
                      {destination.address && (
                        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-sm">
                          <p className="text-sm font-medium text-white">{destination.address}</p>
                        </div>
                      )}
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column - Sticky Info */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24 space-y-4">
                  {/* Book Button */}
                  {destination.website && (
                    <a
                      href={destination.website.startsWith('http') ? destination.website : `https://${destination.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="w-full h-12 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </a>
                  )}

                  {/* Info Cards */}
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-4">
                    {destination.address && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white mb-0.5">Address</p>
                            <p className="text-sm text-gray-400">{destination.address}</p>
                          </div>
                        </div>
                        <div className="h-px bg-white/5" />
                      </>
                    )}

                    {destination.phone_number && (
                      <>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white mb-0.5">Contact</p>
                            <a 
                              href={`tel:${destination.phone_number}`}
                              className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              {destination.phone_number}
                            </a>
                          </div>
                        </div>
                        <div className="h-px bg-white/5" />
                      </>
                    )}

                    {destination.website && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white mb-0.5">Website</p>
                          <a 
                            href={destination.website.startsWith('http') ? destination.website : `https://${destination.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                          >
                            Visit official site
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Architecture Info */}
                  {(destination.architect || destination.architectural_style) && (
                    <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                      <h3 className="text-sm font-medium text-white mb-3">Design & Architecture</h3>
                      <div className="space-y-3">
                        {destination.architect && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Architect</span>
                            <span className="text-sm text-gray-300">{destination.architect}</span>
                          </div>
                        )}
                        {destination.architectural_style && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Style</span>
                            <span className="text-sm text-gray-300">{destination.architectural_style}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {(destination.vibe_tags || destination.tags) && (
                    <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                      <h3 className="text-sm font-medium text-white mb-3">Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {[...(destination.vibe_tags || []), ...(destination.tags || [])].map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-full text-xs bg-white/5 text-gray-300 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
