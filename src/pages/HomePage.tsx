'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/home/Header';
import { HeroSearch } from '@/components/home/HeroSearch';
import { DestinationGrid } from '@/components/home/DestinationGrid';
import { DestinationDrawer } from '@/components/home/DestinationDrawer';
import { Footer } from '@/components/home/Footer';
import { mockCities, mockCategories } from '@/data/mockData';
import { Helmet } from 'react-helmet-async';
import { useDestinationsCount, SupabaseDestination } from '@/hooks/useDestinations';
import { useInfiniteDestinations } from '@/hooks/useInfiniteDestinations';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState<SupabaseDestination | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { 
    data, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage 
  } = useInfiniteDestinations();
  const { data: totalCount = 0 } = useDestinationsCount();

  // Flatten all pages into a single array
  const destinations = data?.pages.flatMap(page => page.destinations) || [];

  // Filter destinations based on selection
  const filteredDestinations = destinations.filter((destination) => {
    const cityMatch = selectedCity === 'all' ||
      destination.city?.toLowerCase() === mockCities.find(c => c.id === selectedCity)?.name.toLowerCase();
    const categoryMatch = selectedCategory === 'all' ||
      destination.category?.toLowerCase() === mockCategories.find(c => c.id === selectedCategory)?.name.toLowerCase();
    return cityMatch && categoryMatch;
  });

  const handleDestinationClick = (destination: SupabaseDestination) => {
    setSelectedDestination(destination);
    setDrawerOpen(true);
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Map Supabase destinations to the format expected by DestinationGrid
  const displayDestinations = filteredDestinations.length > 0 || selectedCity !== 'all' || selectedCategory !== 'all' 
    ? filteredDestinations 
    : destinations;

  const mappedDestinations = displayDestinations.map(d => ({
    id: d.slug,
    name: d.name,
    category: d.category,
    city: d.city,
    country: d.country || undefined,
    image: d.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    rating: d.rating || undefined,
    _original: d,
  }));

  return (
    <>
      <Helmet>
        <title>Urban Manual® | Curated Destinations Worldwide</title>
        <meta name="description" content={`Discover ${totalCount}+ curated restaurants, hotels, and hidden gems worldwide.`} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />

        <main id="main-content" className="relative dark:text-white" role="main">
          <h1 className="sr-only">
            Discover the World's Best Hotels, Restaurants & Travel Destinations - Urban Manual
          </h1>

          <HeroSearch
            cities={mockCities}
            categories={mockCategories}
            selectedCity={selectedCity}
            selectedCategory={selectedCategory}
            onCityChange={setSelectedCity}
            onCategoryChange={setSelectedCategory}
            totalDestinations={totalCount}
            featuredDestination={mappedDestinations[0]}
          />

          {isLoading ? (
            <div className="py-16 text-center text-gray-500 dark:text-gray-400">
              Loading destinations...
            </div>
          ) : (
            <>
              <DestinationGrid
                destinations={mappedDestinations}
                totalCount={selectedCity !== 'all' || selectedCategory !== 'all' ? displayDestinations.length : totalCount}
                onDestinationClick={(dest) => {
                  const original = (dest as any)._original as SupabaseDestination;
                  handleDestinationClick(original);
                }}
              />

              {/* Load More Trigger */}
              <div ref={loadMoreRef} className="py-8 flex justify-center">
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Loading more...</span>
                  </div>
                ) : hasNextPage ? (
                  <Button
                    variant="outline"
                    onClick={() => fetchNextPage()}
                    className="text-sm"
                  >
                    Load more destinations
                  </Button>
                ) : destinations.length > 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You've seen all {destinations.length} destinations
                  </p>
                ) : null}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>

      <DestinationDrawer
        destination={selectedDestination}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
