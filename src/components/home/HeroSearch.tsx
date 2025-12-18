import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { City, Category } from '@/types/destination';

interface HeroSearchProps {
  cities: City[];
  categories: Category[];
  selectedCity: string;
  selectedCategory: string;
  onCityChange: (cityId: string) => void;
  onCategoryChange: (categoryId: string) => void;
  totalDestinations: number;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function HeroSearch({
  cities,
  categories,
  selectedCity,
  selectedCategory,
  onCityChange,
  onCategoryChange,
  totalDestinations,
}: HeroSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const greeting = getGreeting();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="pt-28 pb-8 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Greeting */}
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          {greeting}
        </h1>
        <p 
          className="text-gray-500 mb-8 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          Discover {totalDestinations}+ curated destinations worldwide
        </p>

        {/* Search Bar */}
        <div 
          className="relative mb-8 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 flex-1 px-5 py-4">
              <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <input
                id="search-input"
                type="text"
                placeholder="Search destinations, cities, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none text-base"
              />
            </div>
            <button className="m-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 rounded-xl text-white text-sm font-medium transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* City Pills */}
        <div 
          className="flex flex-wrap items-center justify-center gap-2 mb-6 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => onCityChange(city.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                selectedCity === city.id
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              )}
            >
              <MapPin className="h-3.5 w-3.5" />
              {city.name}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div 
          className="flex flex-wrap items-center justify-center gap-2 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === category.id
                  ? "bg-gray-100 text-gray-900 border border-gray-300"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
