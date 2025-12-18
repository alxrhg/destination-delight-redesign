import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
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
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDestinationDetail } from '@/data/destinationDetail';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

  // Static map URL using OpenStreetMap tiles
  const { lat, lng } = destination.coordinates;
  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l+1a1a1a(${lng},${lat})/${lng},${lat},15,0/600x300@2x?access_token=pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNHg5cjR6NjBtMjMybHE1MHp0YzY3YjAifQ.fake`;
  const fallbackMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x300&scale=2&maptype=roadmap&markers=color:black%7C${lat},${lng}`;
  const osmStaticUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.005},${lng + 0.01},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <>
      <Helmet>
        <title>{destination.name} | Urban Manual</title>
        <meta name="description" content={destination.tagline} />
      </Helmet>

      {/* Mobile Layout */}
      <div className="min-h-screen bg-black lg:hidden">
        {/* Hero Image Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          <img
            src={allImages[activeImage]}
            alt={destination.name}
            className="w-full h-full object-cover"
            onClick={nextImage}
          />
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 text-sm">
            <div className="w-5 h-5 rounded-full border-2 border-white/40" />
            <span>{activeImage + 1}/{allImages.length}</span>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <button
              onClick={handleSave}
              className={cn(
                "w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all",
                isSaved ? "text-red-500" : "text-white/80 hover:text-white"
              )}
            >
              <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-all"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Sheet */}
        <div className="relative -mt-6 bg-[#F8F6F3] rounded-t-3xl min-h-[50vh]">
          <div className="px-5 pt-6 pb-8">
            <div className="flex items-start justify-between gap-4 mb-1">
              <h1 className="text-2xl font-semibold text-gray-900">{destination.name}</h1>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white shrink-0">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {destination.category} · {destination.city}, {destination.country} · {'€'.repeat(destination.priceLevel)}
            </p>
            <div className="h-px bg-gray-200 mb-4" />
            <p className="text-gray-900 mb-4">
              <span className="font-medium">{destination.tagline.split('.')[0]}.</span>{' '}
              <span className="text-gray-600">{destination.description.split('.').slice(0, 2).join('.')}...</span>
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {destination.badges.map((badge, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700">
                  <Sparkles className="h-3 w-3" />
                  {badge.label}
                </span>
              ))}
            </div>
            <div className="space-y-2 mb-6">
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-xs text-gray-500">{destination.contact.address}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Contact</p>
                    <p className="text-xs text-gray-500">{destination.contact.phone}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Website</p>
                    <p className="text-xs text-gray-500">Visit official site</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
                <button className="text-sm text-gray-500">See all</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
                {destination.reviews.map((review) => (
                  <div key={review.id} className="shrink-0 w-64 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={review.avatar} alt={review.author} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.author}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section - Mobile */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Location</h2>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-2xl overflow-hidden border border-gray-100"
              >
                <div className="aspect-[2/1] bg-gray-100 relative">
                  <iframe
                    src={osmStaticUrl}
                    className="w-full h-full border-0"
                    title="Location map"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="px-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm shadow-sm">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{destination.contact.address}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
                    <Navigation className="h-4 w-4 text-white" />
                  </div>
                </div>
              </a>
            </div>

            <Button size="lg" className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-base">
              <ExternalLink className="h-5 w-5 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Editorial Style */}
      <div className="hidden lg:block min-h-screen bg-[#FAFAF8]">
        {/* Minimal Top Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              ← Back to explore
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Share
              </button>
              <button
                onClick={handleSave}
                className={cn(
                  "text-sm transition-colors",
                  isSaved ? "text-red-500" : "text-gray-500 hover:text-gray-900"
                )}
              >
                {isSaved ? '♥ Saved' : '♡ Save'}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-14">
          <div className="relative h-[50vh] min-h-[400px] max-h-[500px]">
            <img
              src={allImages[activeImage]}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            {/* Image Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {allImages.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeImage === idx ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                  )}
                />
              ))}
              {allImages.length > 5 && (
                <span className="text-white/70 text-xs ml-2">+{allImages.length - 5}</span>
              )}
            </div>
            {/* Arrow Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 opacity-0 hover:opacity-100 transition-opacity shadow-md"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-800 opacity-0 hover:opacity-100 transition-opacity shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* Editorial Content */}
        <section className="max-w-6xl mx-auto px-8 py-16">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-12 mb-16">
            {/* Left: Title Area */}
            <div className="col-span-8">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
                {destination.category}
              </p>
              <h1 className="text-5xl font-serif font-normal text-gray-900 mb-4 leading-tight">
                {destination.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {destination.tagline}
              </p>
            </div>
            {/* Right: Quick Facts */}
            <div className="col-span-4 flex flex-col justify-center">
              <div className="space-y-4 border-l border-gray-200 pl-8">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-semibold text-gray-900">{destination.rating}</span>
                  <span className="text-gray-400">({destination.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{destination.city}, {destination.country}</span>
                </div>
                <div className="text-gray-600">
                  <span className="text-lg">{'€'.repeat(destination.priceLevel)}</span>
                  <span className="text-gray-300">{'€'.repeat(4 - destination.priceLevel)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="col-span-8">
              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-700 leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200">
                {destination.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    {badge.label}
                  </span>
                ))}
              </div>

              {/* Reviews */}
              <div className="mb-12">
                <h2 className="text-2xl font-serif text-gray-900 mb-6">What guests are saying</h2>
                <div className="space-y-6">
                  {destination.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-4 mb-3">
                        <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-gray-900">{review.author}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-3 w-3", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  See all {destination.reviews.length} reviews →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-span-4">
              <div className="sticky top-20 space-y-6">
                {/* Booking Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium mb-3"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <p className="text-center text-sm text-gray-400">Free cancellation available</p>
                </div>

                {/* Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      Hours
                    </div>
                    <div className="space-y-1 text-sm">
                      {destination.hours.map((h, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-gray-500">{h.day}</span>
                          <span className="text-gray-900">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Contact */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      Contact
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{destination.contact.phone}</p>
                    <a 
                      href={destination.contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Visit website
                    </a>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Location */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      Location
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{destination.contact.address}</p>
                    
                    {/* Map Panel Trigger */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                          <Navigation className="h-4 w-4" />
                          View on map
                        </button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-[500px] sm:w-[600px] p-0">
                        <SheetHeader className="p-6 border-b border-gray-100">
                          <SheetTitle className="text-left">{destination.name}</SheetTitle>
                          <p className="text-sm text-gray-500 text-left">{destination.contact.address}</p>
                        </SheetHeader>
                        <div className="h-[calc(100vh-180px)]">
                          <iframe
                            src={osmStaticUrl}
                            className="w-full h-full border-0"
                            title="Location map"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 border-t border-gray-100">
                          <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                          >
                            <Navigation className="h-4 w-4" />
                            Get Directions in Google Maps
                          </a>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
