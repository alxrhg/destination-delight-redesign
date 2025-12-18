import { useState } from 'react';
import { Header } from '@/components/home/Header';
import { HeroSearch } from '@/components/home/HeroSearch';
import { DestinationGrid } from '@/components/home/DestinationGrid';
import { DestinationDrawer } from '@/components/home/DestinationDrawer';
import { mockDestinations, mockCities, mockCategories } from '@/data/mockData';
import { Destination } from '@/types/destination';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Filter destinations based on selection
  const filteredDestinations = mockDestinations.filter((destination) => {
    const cityMatch = selectedCity === 'all' || 
      destination.city.toLowerCase() === mockCities.find(c => c.id === selectedCity)?.name.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || 
      destination.category.toLowerCase() === mockCategories.find(c => c.id === selectedCategory)?.name.toLowerCase();
    return cityMatch && categoryMatch;
  });

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setDrawerOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Urban Manual® | Curated Destinations Worldwide</title>
        <meta name="description" content="Discover 909+ curated restaurants, hotels, and hidden gems worldwide." />
      </Helmet>

      <div className="min-h-screen bg-[#F8F6F3]">
        <Header />
        
        <main>
          <HeroSearch
            cities={mockCities}
            categories={mockCategories}
            selectedCity={selectedCity}
            selectedCategory={selectedCategory}
            onCityChange={setSelectedCity}
            onCategoryChange={setSelectedCategory}
            totalDestinations={909}
            featuredDestination={mockDestinations[0]}
          />

          <DestinationGrid
            destinations={filteredDestinations.length > 0 ? filteredDestinations : mockDestinations}
            totalCount={filteredDestinations.length > 0 ? filteredDestinations.length : 909}
            onDestinationClick={handleDestinationClick}
          />
        </main>
      </div>

      <DestinationDrawer
        destination={selectedDestination}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
