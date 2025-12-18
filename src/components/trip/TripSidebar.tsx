import { AlertTriangle, GripVertical, Plus, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SuggestedPlace {
  id: number;
  slug: string;
  name: string;
  category: string | null;
  image: string | null;
}

interface TripSidebarProps {
  suggestedPlaces: SuggestedPlace[];
  city: string | null;
  hasConflict?: boolean;
}

export const TripSidebar = ({ suggestedPlaces, city, hasConflict }: TripSidebarProps) => {
  return (
    <aside className="space-y-4">
      {/* Conflict Alert */}
      {hasConflict && (
        <div className="flex items-center gap-2 bg-destructive/20 text-destructive px-4 py-3 rounded-xl">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Day 1: Schedule conflict</span>
        </div>
      )}

      {/* Curated List */}
      <div className="bg-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Our Curated List in {city?.toLowerCase()}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Drag to add to your trip</p>
        </div>
        <div className="divide-y divide-border">
          {suggestedPlaces.slice(0, 4).map((place) => (
            <div 
              key={place.id}
              className="flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors cursor-grab"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                {place.image ? (
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-accent" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{place.name}</p>
                <p className="text-xs text-muted-foreground">{place.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-card rounded-xl p-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Checklist
        </h3>
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Add checklist item..."
            className="bg-secondary border-0 text-sm"
          />
          <Button size="icon" variant="ghost" className="flex-shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};
