'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { City, Category, Destination } from '@/types/destination';

interface HeroSearchProps {
  cities: City[];
  categories: Category[];
  selectedCity: string;
  selectedCategory: string;
  onCityChange: (cityId: string) => void;
  onCategoryChange: (categoryId: string) => void;
  totalDestinations: number;
  featuredDestination?: Destination;
}

function capitalizeCity(city: string): string {
  return city
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function capitalizeCategory(category: string): string {
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Featured cities to show first
const FEATURED_CITIES = ['Taipei', 'Tokyo', 'New York', 'London', 'Paris', 'Barcelona'];

export function HeroSearch({
  cities,
  categories,
  selectedCity,
  selectedCategory,
  onCityChange,
  onCategoryChange,
  totalDestinations,
}: HeroSearchProps) {
  const [showAllCities, setShowAllCities] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sort cities: featured first, then alphabetically
  const sortedCities = [...cities].sort((a, b) => {
    const aFeatured = FEATURED_CITIES.includes(a.name);
    const bFeatured = FEATURED_CITIES.includes(b.name);
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return a.name.localeCompare(b.name);
  });

  const displayedCities = showAllCities ? sortedCities : sortedCities.slice(0, 6);

  return (
    <section className="min-h-[50vh] flex flex-col px-6 md:px-10 py-10 pb-6 md:pb-10">
      <div className="w-full flex md:justify-start flex-1 items-center">
        <div className="w-full md:w-1/2 md:ml-[calc(50%-2rem)] max-w-2xl flex flex-col h-full">
          <div className="flex-1 flex items-center">
            <div className="w-full">
              {/* Greeting Hero - Urban Manual Style */}
              <div className="space-y-6">
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${totalDestinations}+ destinations...`}
                    className={cn(
                      'w-full text-left text-xs uppercase tracking-[2px] font-medium',
                      'placeholder:text-gray-300 dark:placeholder:text-gray-500',
                      'focus:outline-none bg-transparent border-none',
                      'text-black dark:text-white py-4'
                    )}
                  />
                </div>

                {/* Main Greeting */}
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900 dark:text-white leading-tight">
                    Discover curated destinations
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    A carefully selected collection of restaurants, hotels, and cultural experiences worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* City and Category filters */}
          <div className="flex-1 flex items-end">
            <div className="w-full pt-6">
              {/* City Filters */}
              <div className="mb-[50px]">
                <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs">
                  <button
                    onClick={() => onCityChange('all')}
                    className={cn(
                      'transition-all duration-200 ease-out',
                      selectedCity === 'all'
                        ? 'font-medium text-black dark:text-white'
                        : 'font-medium text-black/30 dark:text-gray-500 hover:text-black/60'
                    )}
                  >
                    All Cities
                  </button>
                  {displayedCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => onCityChange(city.id === selectedCity ? 'all' : city.id)}
                      className={cn(
                        'transition-all duration-200 ease-out',
                        selectedCity === city.id
                          ? 'font-medium text-black dark:text-white'
                          : 'font-medium text-black/30 dark:text-gray-500 hover:text-black/60'
                      )}
                    >
                      {capitalizeCity(city.name)}
                    </button>
                  ))}
                </div>

                {cities.length > displayedCities.length && !showAllCities && (
                  <button
                    onClick={() => setShowAllCities(true)}
                    className="mt-3 text-xs font-medium text-black/30 dark:text-gray-500 hover:text-black/60"
                  >
                    + More cities ({cities.length - displayedCities.length})
                  </button>
                )}
                {showAllCities && (
                  <button
                    onClick={() => setShowAllCities(false)}
                    className="mt-3 text-xs font-medium text-black/30 dark:text-gray-500 hover:text-black/60"
                  >
                    Show less
                  </button>
                )}
              </div>

              {/* Category Filters */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs">
                  <button
                    onClick={() => onCategoryChange('all')}
                    className={cn(
                      'transition-all duration-200 ease-out',
                      selectedCategory === 'all'
                        ? 'font-medium text-black dark:text-white'
                        : 'font-medium text-black/30 dark:text-gray-500 hover:text-black/60'
                    )}
                  >
                    All Categories
                  </button>
                  {categories
                    .slice()
                    .sort((a, b) => {
                      if (a.name.toLowerCase() === 'others') return 1;
                      if (b.name.toLowerCase() === 'others') return -1;
                      return 0;
                    })
                    .map((category) => (
                      <button
                        key={category.id}
                        onClick={() =>
                          onCategoryChange(category.id === selectedCategory ? 'all' : category.id)
                        }
                        className={cn(
                          'flex items-center gap-1.5 transition-all duration-200 ease-out',
                          selectedCategory === category.id
                            ? 'font-medium text-black dark:text-white'
                            : 'font-medium text-black/30 dark:text-gray-500 hover:text-black/60'
                        )}
                      >
                        {capitalizeCategory(category.name)}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
