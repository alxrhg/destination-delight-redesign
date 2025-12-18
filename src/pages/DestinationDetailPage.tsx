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
  Clock
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
            <Button size="lg" className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-base">
              <ExternalLink className="h-5 w-5 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-[#F8F6F3]">
        {/* Top Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F3]/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="h-10 px-4 rounded-full bg-white border border-gray-200 flex items-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button
                onClick={handleSave}
                className={cn(
                  "h-10 px-4 rounded-full border flex items-center gap-2 transition-colors",
                  isSaved 
                    ? "bg-red-50 border-red-200 text-red-600" 
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                <span className="text-sm font-medium">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-12 gap-12">
              {/* Left Column - Gallery */}
              <div className="col-span-7">
                {/* Main Image */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 group">
                  <img
                    src={allImages[activeImage]}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                    {activeImage + 1} / {allImages.length}
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {allImages.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "relative aspect-square rounded-xl overflow-hidden transition-all",
                        activeImage === idx ? "ring-2 ring-gray-900 ring-offset-2" : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {idx === 3 && allImages.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                          +{allImages.length - 4}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Reviews Section */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
                    <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      See all {destination.reviews.length} reviews
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {destination.reviews.slice(0, 4).map((review) => (
                      <div key={review.id} className="p-5 bg-white rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-gray-900">{review.author}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-3.5 w-3.5", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-3">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="col-span-5">
                <div className="sticky top-24">
                  {/* Category & Rating */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {destination.category}
                    </span>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{'€'.repeat(destination.priceLevel)}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    {destination.name}
                  </h1>

                  {/* Location */}
                  <p className="flex items-center gap-1.5 text-gray-500 mb-6">
                    <MapPin className="h-4 w-4" />
                    {destination.city}, {destination.country}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {destination.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700"
                      >
                        <Sparkles className="h-3 w-3" />
                        {badge.label}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">{destination.tagline}</span>{' '}
                      {destination.description}
                    </p>
                  </div>

                  {/* Book Button */}
                  <Button
                    size="lg"
                    className="w-full h-14 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-base mb-6"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Book Now
                  </Button>

                  {/* Info Cards */}
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-0.5">Address</p>
                          <p className="text-sm text-gray-500">{destination.contact.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-0.5">Hours</p>
                          {destination.hours.slice(0, 2).map((h, i) => (
                            <p key={i} className="text-sm text-gray-500">{h.day}: {h.time}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <Phone className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 mb-0.5">Call</p>
                            <p className="text-sm text-gray-500 truncate">{destination.contact.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <Globe className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 mb-0.5">Website</p>
                            <p className="text-sm text-gray-500 truncate">Visit site</p>
                          </div>
                        </div>
                      </div>
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
