import { Plane, Building2, UtensilsCrossed, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ItineraryItem {
  id: string;
  title: string;
  description: string | null;
  time: string | null;
  destination_slug: string | null;
  type: "flight" | "hotel" | "dining" | "activity";
}

interface ItineraryTimelineProps {
  items: ItineraryItem[];
}

const getIcon = (type: string) => {
  switch (type) {
    case "flight": return Plane;
    case "hotel": return Building2;
    case "dining": return UtensilsCrossed;
    default: return MapPin;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "flight": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "hotel": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "dining": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    default: return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  }
};

export const ItineraryTimeline = ({ items }: ItineraryTimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border" />

      <div className="space-y-1">
        {items.map((item, index) => {
          const Icon = getIcon(item.type);
          const colorClasses = getTypeColor(item.type);
          
          const content = (
            <div 
              className={cn(
                "relative flex gap-4 p-3 rounded-xl transition-all group",
                "hover:bg-secondary/50 cursor-pointer",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <div className={cn(
                "relative z-10 w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0",
                colorClasses
              )}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-foreground transition-colors">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.time && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono">{item.time}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

          if (item.destination_slug) {
            return (
              <Link key={item.id} to={`/destination/${item.destination_slug}`}>
                {content}
              </Link>
            );
          }

          return <div key={item.id}>{content}</div>;
        })}
      </div>
    </div>
  );
};
