import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Destination } from '@/types/destination';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export function DestinationCard({ destination, index }: DestinationCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Link 
      to={`/destination/${destination.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.03}s` }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100">
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
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-900">{destination.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors">
          {destination.name}
        </h3>
        <p className="text-sm text-gray-500">
          {destination.category} · {destination.city}
        </p>
      </div>
    </Link>
  );
}
