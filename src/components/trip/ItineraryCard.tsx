import { Plane, Building2, UtensilsCrossed, MapPin, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItineraryItem } from "@/hooks/useTrip";

interface ItineraryCardProps {
  item: ItineraryItem;
  type?: "flight" | "hotel" | "activity" | "dining";
}

const getIcon = (type: string) => {
  switch (type) {
    case "flight":
      return Plane;
    case "hotel":
      return Building2;
    case "dining":
      return UtensilsCrossed;
    default:
      return MapPin;
  }
};

const detectType = (title: string): "flight" | "hotel" | "dining" | "activity" => {
  const lower = title.toLowerCase();
  if (lower.includes("flight") || lower.includes("airport") || lower.match(/[A-Z]{3}\s*[-–]\s*[A-Z]{3}/)) {
    return "flight";
  }
  if (lower.includes("hotel") || lower.includes("check-in") || lower.includes("check in") || lower.includes("edition") || lower.includes("resort")) {
    return "hotel";
  }
  if (lower.includes("restaurant") || lower.includes("dinner") || lower.includes("lunch") || lower.includes("breakfast") || lower.includes("steakhouse")) {
    return "dining";
  }
  return "activity";
};

export const ItineraryCard = ({ item }: ItineraryCardProps) => {
  const type = detectType(item.title);
  const Icon = getIcon(type);

  return (
    <div className={cn(
      "rounded-xl p-4 transition-all",
      type === "flight" ? "bg-card border border-border" : "bg-secondary"
    )}>
      {type === "flight" ? (
        <FlightCard item={item} />
      ) : (
        <StandardCard item={item} Icon={Icon} type={type} />
      )}
    </div>
  );
};

const FlightCard = ({ item }: { item: ItineraryItem }) => {
  // Parse flight info from title (e.g., "EWR - MIA")
  const flightMatch = item.title.match(/([A-Z]{3})\s*[-–]\s*([A-Z]{3})/);
  const origin = flightMatch?.[1] || "DEP";
  const destination = flightMatch?.[2] || "ARR";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-mono font-semibold">{origin}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <div className="w-2 h-2 rounded-full border border-current" />
            <div className="w-8 border-t border-dashed border-current" />
            <Plane className="h-4 w-4" />
            <div className="w-8 border-t border-dashed border-current" />
            <div className="w-2 h-2 rounded-full border border-current" />
          </div>
          <span className="text-lg font-mono font-semibold">{destination}</span>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent-foreground/10 text-accent-foreground border border-accent-foreground/20">
          Confirmed
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-xs text-muted-foreground uppercase">Depart</p>
          <p className="text-lg font-mono">{item.time || "8:20"} <span className="text-muted-foreground">AM</span></p>
        </div>
        <p className="text-xs text-muted-foreground">Nonstop</p>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase">Arrive</p>
          <p className="text-lg font-mono">11:36 <span className="text-muted-foreground">AM</span></p>
        </div>
      </div>

      {item.description && (
        <p className="text-sm text-muted-foreground">{item.description}</p>
      )}
    </div>
  );
};

const StandardCard = ({ 
  item, 
  Icon, 
  type 
}: { 
  item: ItineraryItem; 
  Icon: React.ComponentType<{ className?: string }>; 
  type: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">{item.title}</p>
          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}
        </div>
      </div>
      {item.time && (
        <div className="text-right">
          <p className="font-mono">{item.time}</p>
          {type === "hotel" && (
            <p className="text-xs text-muted-foreground uppercase">Check-in</p>
          )}
        </div>
      )}
    </div>
  );
};
