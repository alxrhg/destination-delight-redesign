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

  const sortedCities = [...cities].sort((a, b) => {
    const aFeatured = FEATURED_CITIES.includes(a.name);
    const bFeatured = FEATURED_CITIES.includes(b.name);
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return a.name.localeCompare(b.name);
  });

  const displayedCities = showAllCities ? sortedCities : sortedCities.slice(0, 6);

  return (
    <section className="flex flex-col px-8 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="max-w-4xl">
        {/* Main Heading - Editorial serif style */}
        <div className="space-y-6 mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-foreground leading-[1.1] tracking-tight">
            Conscious By Design
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-light">
            A curated collection of {totalDestinations}+ destinations for those who understand that how we live is expressed through the places we inhabit. Each selection embodies our foundational principle of intentional discovery.
          </p>
        </div>

        {/* Filters Section */}
        <div className="space-y-12">
          {/* City Filters */}
          <div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <button
                onClick={() => onCityChange('all')}
                className={cn(
                  'text-sm tracking-wide transition-all duration-300',
                  selectedCity === 'all'
                    ? 'text-foreground'
                    : 'text-muted-foreground/50 hover:text-muted-foreground'
                )}
              >
                All Cities
              </button>
              {displayedCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => onCityChange(city.id === selectedCity ? 'all' : city.id)}
                  className={cn(
                    'text-sm tracking-wide transition-all duration-300',
                    selectedCity === city.id
                      ? 'text-foreground'
                      : 'text-muted-foreground/50 hover:text-muted-foreground'
                  )}
                >
                  {capitalizeCity(city.name)}
                </button>
              ))}
            </div>

            {cities.length > displayedCities.length && !showAllCities && (
              <button
                onClick={() => setShowAllCities(true)}
                className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                + {cities.length - displayedCities.length} more
              </button>
            )}
            {showAllCities && (
              <button
                onClick={() => setShowAllCities(false)}
                className="mt-4 text-xs uppercase tracking-widest text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                Show less
              </button>
            )}
          </div>

          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <button
                onClick={() => onCategoryChange('all')}
                className={cn(
                  'text-sm tracking-wide transition-all duration-300',
                  selectedCategory === 'all'
                    ? 'text-foreground'
                    : 'text-muted-foreground/50 hover:text-muted-foreground'
                )}
              >
                All
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
                      'text-sm tracking-wide transition-all duration-300',
                      selectedCategory === category.id
                        ? 'text-foreground'
                        : 'text-muted-foreground/50 hover:text-muted-foreground'
                    )}
                  >
                    {capitalizeCategory(category.name)}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
