import { useState } from 'react';
import { Header } from '@/components/home/Header';
import { HeroSearch } from '@/components/home/HeroSearch';
import { DestinationGrid } from '@/components/home/DestinationGrid';
import { mockDestinations, mockCities, mockCategories } from '@/data/mockData';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter destinations based on selection
  const filteredDestinations = mockDestinations.filter((destination) => {
    const cityMatch = selectedCity === 'all' || 
      destination.city.toLowerCase() === mockCities.find(c => c.id === selectedCity)?.name.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || 
      destination.category.toLowerCase() === mockCategories.find(c => c.id === selectedCategory)?.name.toLowerCase();
    return cityMatch && categoryMatch;
  });

  return (
    <>
      <Helmet>
        <title>Urban Manual® | Curated Destinations Worldwide</title>
        <meta name="description" content="Discover 909+ curated restaurants, hotels, and hidden gems worldwide." />
      </Helmet>

      <div className="min-h-screen bg-background">
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
          />

          <DestinationGrid
            destinations={filteredDestinations.length > 0 ? filteredDestinations : mockDestinations}
            totalCount={filteredDestinations.length > 0 ? filteredDestinations.length : 909}
          />
        </main>
      </div>
    </>
  );
}
