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

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-[#FAFAF8]">
        {/* Bento Gallery Hero */}
        <div className="h-[70vh] min-h-[500px] max-h-[700px] p-2 bg-gray-900">
          <div className="h-full grid grid-cols-4 grid-rows-2 gap-2">
            {/* Main large image */}
            <button
              onClick={() => setActiveImage(0)}
              className="col-span-2 row-span-2 relative overflow-hidden rounded-xl group"
            >
              <img
                src={allImages[0]}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/70 text-sm font-medium mb-2">{destination.category}</p>
                <h1 className="text-4xl xl:text-5xl font-bold text-white mb-2">{destination.name}</h1>
                <p className="text-white/80 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {destination.city}, {destination.country}
                </p>
              </div>
            </button>
            
            {/* Secondary images */}
            {allImages.slice(1, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx + 1)}
                className={cn(
                  "relative overflow-hidden rounded-xl group",
                  idx === 3 && allImages.length > 5 && "relative"
                )}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {idx === 3 && allImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">+{allImages.length - 5} more</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Floating Navigation */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={() => navigate('/')}
              className="h-10 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleSave}
                className={cn(
                  "h-10 w-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all",
                  isSaved 
                    ? "bg-red-500/80 border-red-400 text-white" 
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                )}
              >
                <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Floating Booking Card */}
          <div className="absolute -top-20 right-8 xl:right-16 z-20">
            <div className="w-80 bg-white rounded-2xl shadow-2xl shadow-black/10 p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold text-gray-900">{destination.rating}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500">{destination.reviews.length} reviews</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">{'€'.repeat(destination.priceLevel)}</span>
              </div>
              <Button
                size="lg"
                className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium mb-3"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Book Now
              </Button>
              <p className="text-center text-sm text-gray-400">Free cancellation available</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-8 py-12">
            {/* Tagline & Description */}
            <div className="max-w-3xl mb-12">
              <p className="text-2xl xl:text-3xl font-medium text-gray-900 leading-relaxed mb-4">
                {destination.tagline}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-gray-200">
              {destination.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Info Grid - Horizontal Layout */}
            <div className="grid grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-200">
              {/* Hours */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Hours</h3>
                </div>
                <div className="space-y-1">
                  {destination.hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-500">{h.day}</span>
                      <span className="text-gray-900 font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Contact</h3>
                </div>
                <div className="space-y-3">
                  <a href={`tel:${destination.contact.phone}`} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    <span>{destination.contact.phone}</span>
                  </a>
                  <a href={destination.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    <Globe className="h-4 w-4" />
                    <span>Visit website</span>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">{destination.contact.address}</p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </a>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-12 pb-12 border-b border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{destination.rating}</span>
                  </div>
                </div>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  See all {destination.reviews.length} reviews →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {destination.reviews.slice(0, 4).map((review) => (
                  <div key={review.id} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn("h-4 w-4", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">·</span>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Where you'll be</h2>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Navigation className="h-4 w-4" />
                  Open in Maps
                </a>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                <div className="aspect-[21/9] bg-gray-100">
                  <iframe
                    src={osmStaticUrl}
                    className="w-full h-full border-0"
                    title="Location map"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-6 left-6 px-5 py-4 rounded-xl bg-white shadow-lg">
                  <p className="font-semibold text-gray-900 mb-1">{destination.name}</p>
                  <p className="text-sm text-gray-500">{destination.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
