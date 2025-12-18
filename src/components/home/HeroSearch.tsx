import { useState, useEffect } from 'react';
import { Globe, Send, Star, Wine, Coffee, Utensils, Building, Hotel, MoreHorizontal, Croissant } from 'lucide-react';
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

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid: Globe,
  Star: Star,
  Croissant: Croissant,
  Wine: Wine,
  Coffee: Coffee,
  Cup: Coffee,
  Building: Building,
  Utensils: Utensils,
  Hotel: Hotel,
  MoreHorizontal: MoreHorizontal,
};

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

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayedCities = cities.slice(0, 4);
  const remainingCities = cities.length - 4;

  return (
    <section className="pt-32 pb-8 px-4">
      <div className="container max-w-3xl mx-auto text-center">
        {/* Greeting */}
        <h1 
          className="text-4xl md:text-5xl font-semibold text-foreground mb-2 animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          {greeting}, Alexander
        </h1>
        <p 
          className="text-muted-foreground mb-8 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          {totalDestinations}+ curated destinations worldwide
        </p>

        {/* Search Bar */}
        <div 
          className="relative mb-3 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden shadow-soft">
            <div className="flex items-center gap-3 flex-1 px-4 py-4">
              <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <input
                id="search-input"
                type="text"
                placeholder="Find restaurants, hotels, or hidden gems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              />
            </div>
            <button className="m-2 p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
              <Send className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <p 
          className="text-sm text-muted-foreground mb-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          Press <kbd className="px-1.5 py-0.5 mx-1 text-xs bg-secondary rounded border border-border">/</kbd> to focus • Enter to search
        </p>

        {/* City Filters */}
        <div 
          className="flex flex-wrap items-center justify-center gap-2 mb-4 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          {displayedCities.map((city) => (
            <button
              key={city.id}
              onClick={() => onCityChange(city.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                selectedCity === city.id
                  ? "border border-foreground/30 text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {city.name}
            </button>
          ))}
          {remainingCities > 0 && (
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              +{remainingCities} more
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div 
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.icon] || Globe;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-2 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.id !== 'all' && (
                  <IconComponent className="h-4 w-4" />
                )}
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
