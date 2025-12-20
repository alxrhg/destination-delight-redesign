'use client';

import { useState } from 'react';
import { Header } from '@/components/home/Header';
import { HeroSearch } from '@/components/home/HeroSearch';
import { DestinationGrid } from '@/components/home/DestinationGrid';
import { DestinationDrawer } from '@/components/home/DestinationDrawer';
import { Footer } from '@/components/home/Footer';
import { mockCities, mockCategories } from '@/data/mockData';
import { Helmet } from 'react-helmet-async';
import { SupabaseDestination } from '@/hooks/useDestinations';
import { usePaginatedDestinations } from '@/hooks/usePaginatedDestinations';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState<SupabaseDestination | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = usePaginatedDestinations(currentPage);
  
  const destinations = data?.destinations || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 1;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                totalCount={totalCount}
                onDestinationClick={(dest) => {
                  const original = (dest as any)._original as SupabaseDestination;
                  handleDestinationClick(original);
                }}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="py-8 px-6 md:px-10">
                  <div className="max-w-[1800px] mx-auto flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 7) {
                          pageNum = i;
                        } else if (currentPage < 3) {
                          pageNum = i;
                        } else if (currentPage > totalPages - 4) {
                          pageNum = totalPages - 7 + i;
                        } else {
                          pageNum = currentPage - 3 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className="w-9 h-9 p-0"
                          >
                            {pageNum + 1}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Page {currentPage + 1} of {totalPages} • {totalCount} destinations
                  </p>
                </div>
              )}
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
