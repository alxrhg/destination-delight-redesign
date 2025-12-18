import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { mockDestination } from '@/data/mockDestination';
import { HeroSection } from '@/components/destination/HeroSection';
import { TabNavigation } from '@/components/destination/TabNavigation';
import { AboutSection } from '@/components/destination/AboutSection';
import { ArchitectureSection } from '@/components/destination/ArchitectureSection';
import { ReviewsSection } from '@/components/destination/ReviewsSection';
import { NestedDestinationsSection } from '@/components/destination/NestedDestinationsSection';
import { SimilarDestinationsSection } from '@/components/destination/SimilarDestinationsSection';
import { LocationSection } from '@/components/destination/LocationSection';
import { GalleryModal } from '@/components/destination/GalleryModal';
import { FloatingActionBar } from '@/components/destination/FloatingActionBar';
import { Helmet } from 'react-helmet-async';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'nested', label: 'Inside' },
  { id: 'similar', label: 'Similar' },
  { id: 'location', label: 'Location' },
];

export default function DestinationDetail() {
  const [destination, setDestination] = useState(mockDestination);
  const [activeTab, setActiveTab] = useState('about');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { toast } = useToast();

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) => ({
        id: tab.id,
        element: document.getElementById(tab.id),
      }));

      for (const section of sections.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveTab(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSave = () => {
    setDestination((prev) => ({ ...prev, isSaved: !prev.isSaved }));
    toast({
      title: destination.isSaved ? 'Removed from saved' : 'Saved to collection',
      description: destination.isSaved
        ? `${destination.name} has been removed`
        : `${destination.name} has been added to your saved places`,
    });
  };

  const handleVisited = () => {
    setDestination((prev) => ({ ...prev, isVisited: !prev.isVisited }));
    toast({
      title: destination.isVisited ? 'Unmarked as visited' : 'Marked as visited',
      description: destination.isVisited
        ? `${destination.name} removed from visited`
        : `${destination.name} added to your visited places`,
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
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: 'Link copied',
            description: 'The link has been copied to your clipboard',
          });
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied',
        description: 'The link has been copied to your clipboard',
      });
    }
  };

  const allImages = [destination.heroImage, ...destination.gallery];

  return (
    <>
      <Helmet>
        <title>{destination.name} | Discover Beautiful Destinations</title>
        <meta name="description" content={destination.tagline} />
      </Helmet>

      <main className="min-h-screen bg-background pb-24 md:pb-12">
        <HeroSection
          destination={destination}
          onBack={() => window.history.back()}
          onSave={handleSave}
          onVisited={handleVisited}
          onShare={handleShare}
          onGalleryOpen={() => setGalleryOpen(true)}
        />

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <AboutSection
          description={destination.description}
          microDescriptions={destination.microDescriptions}
        />

        <ArchitectureSection
          architect={destination.architect}
          designer={destination.designer}
          yearBuilt={destination.yearBuilt}
          architecturalStyle={destination.architecturalStyle}
          designHighlights={destination.designHighlights}
        />

        <ReviewsSection
          reviews={destination.reviews}
          rating={destination.rating}
          reviewCount={destination.reviewCount}
        />

        <NestedDestinationsSection
          destinations={destination.nestedDestinations || []}
          parentName={destination.name}
        />

        <SimilarDestinationsSection
          destinations={destination.similarDestinations || []}
        />

        <LocationSection
          address={destination.address}
          city={destination.city}
          country={destination.country}
          phone={destination.phone}
          email={destination.email}
          website={destination.website}
          hours={destination.hours}
          coordinates={destination.coordinates}
        />

        <GalleryModal
          images={allImages}
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
        />

        <FloatingActionBar
          isSaved={destination.isSaved || false}
          isVisited={destination.isVisited || false}
          onSave={handleSave}
          onVisited={handleVisited}
          onShare={handleShare}
          website={destination.website}
        />
      </main>
    </>
  );
}
