import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Clock,
  Images,
  Check,
  Wifi,
  Coffee,
  Utensils,
  Wine,
  PawPrint,
  Sparkles,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockDestinationDetail } from '@/data/destinationDetail';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Helmet } from 'react-helmet-async';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Coffee,
  Utensils,
  Wine,
  PawPrint,
  Clock,
};

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
      description: isSaved ? `${destination.name} removed` : `${destination.name} added to your saved places`,
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
        toast({ title: 'Link copied to clipboard' });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied to clipboard' });
    }
  };

  return (
    <>
      <Helmet>
        <title>{destination.name} | Urban Manual</title>
        <meta name="description" content={destination.tagline} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                className={cn(isSaved && "text-red-500")}
              >
                <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="pt-14">
          {/* Hero Section */}
          <section className="relative">
            {/* Image Gallery */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={allImages[activeImage]}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Image Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {allImages.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      activeImage === idx ? "bg-foreground w-6" : "bg-foreground/40"
                    )}
                  />
                ))}
              </div>

              {/* Gallery Button */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-4 right-4 gap-2 rounded-full"
              >
                <Images className="h-4 w-4" />
                {allImages.length} photos
              </Button>
            </div>

            {/* Content Overlay */}
            <div className="container max-w-6xl mx-auto px-4 -mt-24 relative z-10">
              <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground"
                    >
                      {badge.type === 'featured' ? <Sparkles className="h-3 w-3" /> : <Award className="h-3 w-3" />}
                      {badge.label}
                    </span>
                  ))}
                </div>

                {/* Title & Meta */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                      {destination.name}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-3">
                      {destination.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {destination.city}, {destination.country}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-foreground font-medium">{destination.rating}</span>
                        ({destination.reviewCount.toLocaleString()} reviews)
                      </span>
                      <span>
                        {'€'.repeat(destination.priceLevel)}
                        <span className="text-muted-foreground/40">{'€'.repeat(4 - destination.priceLevel)}</span>
                      </span>
                    </div>
                  </div>

                  <Button size="lg" className="rounded-full gap-2 shrink-0">
                    <ExternalLink className="h-4 w-4" />
                    Book Now
                  </Button>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {destination.hours.map((item, idx) => (
                    <div key={idx} className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">{item.day}</p>
                      <p className="text-sm font-medium text-foreground">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Content Grid */}
          <section className="container max-w-6xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
                  <div className="prose prose-invert max-w-none">
                    {destination.description.split('\n\n').map((para, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <span className="text-sm text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      See all
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {destination.reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-card rounded-xl border border-border/50">
                        <div className="flex items-start gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-foreground">{review.author}</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm text-foreground">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Amenities */}
                <div className="bg-card rounded-xl border border-border/50 p-5">
                  <h3 className="font-semibold text-foreground mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {destination.amenities.map((amenity, idx) => {
                      const Icon = iconMap[amenity.icon] || Wifi;
                      return (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon className="h-4 w-4" />
                          {amenity.label}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-card rounded-xl border border-border/50 p-5 space-y-4">
                  <h3 className="font-semibold text-foreground">Contact</h3>
                  
                  <div className="space-y-3">
                    {destination.contact.phone && (
                      <a href={`tel:${destination.contact.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Phone className="h-4 w-4" />
                        {destination.contact.phone}
                      </a>
                    )}
                    {destination.contact.email && (
                      <a href={`mailto:${destination.contact.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="h-4 w-4" />
                        {destination.contact.email}
                      </a>
                    )}
                    {destination.contact.website && (
                      <a href={destination.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Globe className="h-4 w-4" />
                        Visit website
                      </a>
                    )}
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      {destination.contact.address}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2 rounded-full">
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
