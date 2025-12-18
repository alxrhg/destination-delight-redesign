import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { mockDestinationDetail } from '@/data/destinationDetail';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';

export default function DestinationDetailPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const destination = mockDestinationDetail;
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const allImages = [destination.heroImage, ...destination.gallery];

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
          text: destination.tagline,
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

  const { lat, lng } = destination.coordinates;
  const osmStaticUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.005},${lng + 0.01},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <>
      <Helmet>
        <title>{destination.name} | Urban Manual</title>
        <meta name="description" content={destination.tagline} />
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
            {/* Hero Image - Full width on mobile, right side on desktop */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-[300px] lg:h-[400px]">
              <img
                src={allImages[activeImage]}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/60 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent lg:hidden" />
              
              {/* Image Navigation */}
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
                {destination.city}, {destination.country} · {'€'.repeat(destination.priceLevel)}
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
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-white">{destination.rating}</span>
                  <span className="text-sm text-gray-500">({destination.reviewCount})</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-12">
                {destination.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                  >
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-10">
                {/* Description */}
                <div>
                  <h2 className="text-lg font-medium text-white mb-4">About</h2>
                  <p className="text-gray-400 leading-relaxed">
                    <span className="text-gray-200 font-medium">{destination.tagline}</span>{' '}
                    {destination.description}
                  </p>
                </div>

                {/* Gallery Grid */}
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

                {/* Reviews */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-white">Reviews</h2>
                    <button className="text-sm text-gray-500 hover:text-white transition-colors">
                      See all
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.reviews.slice(0, 4).map((review) => (
                      <div key={review.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-medium text-white">{review.author}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600")} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-3">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
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
                      <iframe
                        src={osmStaticUrl}
                        className="w-full h-full border-0 grayscale invert opacity-90"
                        title="Location map"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 pointer-events-none group-hover:bg-white/5 transition-colors" />
                    </div>
                    <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-sm">
                      <p className="text-sm font-medium text-white">{destination.contact.address}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column - Sticky Info */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24 space-y-4">
                  {/* Book Button */}
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-medium"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>

                  {/* Info Cards */}
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-0.5">Address</p>
                        <p className="text-sm text-gray-400">{destination.contact.address}</p>
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-0.5">Hours</p>
                        {destination.hours.slice(0, 3).map((h, i) => (
                          <p key={i} className="text-sm text-gray-400">{h.day}: {h.time}</p>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-0.5">Contact</p>
                        <p className="text-sm text-gray-400">{destination.contact.phone}</p>
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-0.5">Website</p>
                        <a href={destination.contact.website} className="text-sm text-gray-400 hover:text-white transition-colors">
                          Visit official site
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                    <h3 className="text-sm font-medium text-white mb-3">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full text-xs bg-white/5 text-gray-300 border border-white/5"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
