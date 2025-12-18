import { MapPin } from "lucide-react";

interface TripMapProps {
  city: string | null;
  pinnedCount: number;
}

export const TripMap = ({ city, pinnedCount }: TripMapProps) => {
  return (
    <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-card">
      {/* Placeholder map - in production this would be Mapbox/Google Maps */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Map View</p>
        </div>
      </div>
      
      {/* City badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
          <MapPin className="h-4 w-4 text-destructive" />
          <span className="font-medium">{city?.toLowerCase()}</span>
          <span className="text-muted-foreground">{pinnedCount} pinned</span>
        </div>
      </div>
    </div>
  );
};
