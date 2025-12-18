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
  Mail,
  Globe,
  ChevronRight,
  Sparkles
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

      <div className="min-h-screen bg-black">
        {/* Hero Image Section */}
        <div className="relative h-[60vh] min-h-[400px]">
          {/* Image */}
          <img
            src={allImages[activeImage]}
            alt={destination.name}
            className="w-full h-full object-cover"
            onClick={nextImage}
          />

          {/* Close Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 text-sm">
            <div className="w-5 h-5 rounded-full border-2 border-white/40" />
            <span>{activeImage + 1}/{allImages.length}</span>
          </div>

          {/* Action Buttons */}
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
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 mb-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                {destination.name}
              </h1>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 bg-white shrink-0">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
              </div>
            </div>

            {/* Meta Info */}
            <p className="text-sm text-gray-500 mb-4">
              {destination.category} · {destination.city}, {destination.country} · {'€'.repeat(destination.priceLevel)}
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-200 mb-4" />

            {/* Tagline */}
            <p className="text-gray-900 mb-4">
              <span className="font-medium">{destination.tagline.split('.')[0]}.</span>{' '}
              <span className="text-gray-600">
                {destination.description.split('.').slice(0, 2).join('.')}...
              </span>
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

            {/* Quick Actions */}
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

            {/* Reviews Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
                <button className="text-sm text-gray-500">See all</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
                {destination.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="shrink-0 w-64 p-4 bg-white rounded-2xl border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.author}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3",
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <Button
              size="lg"
              className="w-full h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-medium text-base"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
