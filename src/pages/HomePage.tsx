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

  const cityName = mockCities.find(c => c.id === selectedCity)?.name;
  const categoryName = mockCategories.find(c => c.id === selectedCategory)?.name;

  const { data, isLoading } = usePaginatedDestinations(currentPage, {
    city: cityName,
    category: categoryName,
  });
  
  const destinations = data?.destinations || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 1;

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCurrentPage(0);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  const handleDestinationClick = (destination: SupabaseDestination) => {
    setSelectedDestination(destination);
    setDrawerOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mappedDestinations = destinations.map(d => ({
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
        <title>Urban Manual | Curated Destinations Worldwide</title>
        <meta name="description" content={`Discover ${totalCount}+ curated restaurants, hotels, and hidden gems worldwide.`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content" className="relative" role="main">
          <h1 className="sr-only">
            Discover the World's Best Hotels, Restaurants & Travel Destinations
          </h1>

          <HeroSearch
            cities={mockCities}
            categories={mockCategories}
            selectedCity={selectedCity}
            selectedCategory={selectedCategory}
            onCityChange={handleCityChange}
            onCategoryChange={handleCategoryChange}
            totalDestinations={totalCount}
            featuredDestination={mappedDestinations[0]}
          />

          {isLoading ? (
            <div className="py-24 text-center">
              <p className="text-sm text-muted-foreground tracking-wide">
                Loading destinations...
              </p>
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
                <div className="py-16 px-8 md:px-12 lg:px-16">
                  <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className="text-xs uppercase tracking-widest font-normal"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i;
                        } else if (currentPage < 2) {
                          pageNum = i;
                        } else if (currentPage > totalPages - 3) {
                          pageNum = totalPages - 5 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className="w-10 h-10 p-0 text-xs"
                          >
                            {pageNum + 1}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1}
                      className="text-xs uppercase tracking-widest font-normal"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <p className="text-center text-xs text-muted-foreground tracking-wide mt-6">
                    Page {currentPage + 1} of {totalPages}
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
