import { Star, Heart, ArrowUpRight } from 'lucide-react';
import { Destination } from '@/types/destination';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  index: number;
  variant?: 'default' | 'featured';
  onClick?: (destination: Destination) => void;
}

export function DestinationCard({ destination, index, variant = 'default', onClick }: DestinationCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleClick = () => {
    onClick?.(destination);
  };

  if (variant === 'featured') {
    return (
      <div 
        onClick={handleClick}
        className="group block animate-fade-up cursor-pointer"
        style={{ animationDelay: `${0.1 + index * 0.05}s` }}
      >
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          
          {/* Save Button */}
          <button
            onClick={handleSave}
            className={cn(
              "absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center transition-all",
              isSaved 
                ? "bg-white text-red-500" 
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            )}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </button>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                {destination.category}
              </span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-white text-white" />
                <span className="text-xs font-medium text-white">{destination.rating}</span>
              </div>
            </div>
            <h3 className="text-xl lg:text-2xl font-medium text-white mb-1 group-hover:underline underline-offset-4">
              {destination.name}
            </h3>
            <p className="text-white/70 text-sm">
              {destination.city}
            </p>
          </div>

          {/* Arrow */}
          <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <ArrowUpRight className="h-5 w-5 text-gray-900" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group block animate-fade-up cursor-pointer"
      style={{ animationDelay: `${0.1 + index * 0.03}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-gray-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Save Button */}
        <button
          onClick={handleSave}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isSaved 
              ? "bg-white text-red-500" 
              : "bg-black/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-900">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-xs tracking-wide uppercase text-gray-400 mb-1">
          {destination.category} · {destination.city}
        </p>
        <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {destination.name}
        </h3>
      </div>
    </div>
  );
}
