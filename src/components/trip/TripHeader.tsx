import { ArrowLeft, Pencil, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Trip } from "@/hooks/useTrip";

interface TripHeaderProps {
  trip: Trip;
  placesCount: number;
}

export const TripHeader = ({ trip, placesCount }: TripHeaderProps) => {
  const formatDateRange = () => {
    if (!trip.start_date || !trip.end_date) return null;
    const start = format(new Date(trip.start_date), "MMM d");
    const end = format(new Date(trip.end_date), "MMM d");
    return `${start} – ${end}`;
  };

  return (
    <div className="space-y-4">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Trips
      </Link>

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <span className="text-2xl">🎂</span>
            {trip.title}
          </h1>
          <p className="text-muted-foreground">
            {trip.destination?.toLowerCase()}
            {formatDateRange() && ` · ${formatDateRange()}`}
            {placesCount > 0 && ` · ${placesCount} places`}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};
