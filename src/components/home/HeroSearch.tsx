import { ArrowRight } from 'lucide-react';
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

export function HeroSearch({
  cities,
  categories,
  selectedCity,
  selectedCategory,
  onCityChange,
  onCategoryChange,
  featuredDestination,
}: HeroSearchProps) {

  return (
    <section className="pt-20 lg:pt-0 lg:min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left - Content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-8 xl:px-16 py-16 lg:py-0">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <p 
              className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-6 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Curated destinations worldwide
            </p>
            
            {/* Main Headline */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[1.1] mb-8 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Discover places
              <br />
              that <span className="italic font-normal">matter</span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-lg text-gray-500 max-w-md mb-10 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              A carefully selected collection of restaurants, hotels, and cultural experiences.
            </p>

            {/* CTA */}
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <button className="inline-flex items-center justify-center gap-3 h-14 px-8 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors">
                Start exploring
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center gap-3 h-14 px-8 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-full font-medium transition-colors">
                View collections
              </button>
            </div>
          </div>
        </div>

        {/* Right - Featured Image */}
        {featuredDestination && (
          <div 
            className="hidden lg:block lg:w-[45%] xl:w-1/2 relative animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-y-0 right-0 left-0 overflow-hidden">
              <img
                src={featuredDestination.image}
                alt={featuredDestination.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3] via-[#F8F6F3]/20 to-transparent w-1/3" />
              
              {/* Featured badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
                  <p className="text-xs tracking-wide uppercase text-gray-400 mb-2">Featured</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{featuredDestination.name}</h3>
                  <p className="text-sm text-gray-500">{featuredDestination.category} · {featuredDestination.city}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Cities */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
              <span className="text-xs tracking-wide uppercase text-gray-400 shrink-0 mr-2">City</span>
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => onCityChange(city.id)}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCity === city.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {city.name}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-gray-200" />

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs tracking-wide uppercase text-gray-400 shrink-0 mr-2">Type</span>
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category.id
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
