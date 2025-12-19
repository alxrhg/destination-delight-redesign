import { useState } from "react";
import { format, addDays } from "date-fns";
import { ArrowLeft, MapPin, Plus, MoreHorizontal, Clock, Check, GripVertical, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample trip data
const sampleTrip = {
  id: "demo-trip",
  title: "Tokyo Adventure",
  destination: "Tokyo",
  start_date: new Date().toISOString(),
  end_date: addDays(new Date(), 4).toISOString(),
};

const sampleItineraryItems = [
  { id: "1", day: 1, order_index: 0, title: "Flight to Tokyo", description: "LAX → NRT", time: "08:00", type: "flight", is_completed: false, destination_slug: null },
  { id: "2", day: 1, order_index: 1, title: "Park Hyatt Tokyo", description: "Check-in, Shinjuku", time: "15:00", type: "hotel", is_completed: false, destination_slug: "park-hyatt-tokyo" },
  { id: "3", day: 1, order_index: 2, title: "Sukiyabashi Jiro", description: "Omakase dinner", time: "19:00", type: "dining", is_completed: false, destination_slug: "sukiyabashi-jiro" },
  { id: "4", day: 2, order_index: 0, title: "Tsukiji Outer Market", description: "Morning sushi", time: "07:00", type: "activity", is_completed: true, destination_slug: null },
  { id: "5", day: 2, order_index: 1, title: "TeamLab Borderless", description: "Digital art museum", time: "11:00", type: "activity", is_completed: false, destination_slug: null },
  { id: "6", day: 2, order_index: 2, title: "Narisawa", description: "Two Michelin stars", time: "19:30", type: "dining", is_completed: false, destination_slug: "narisawa" },
  { id: "7", day: 3, order_index: 0, title: "Meiji Shrine", description: "Morning visit", time: "09:00", type: "activity", is_completed: false, destination_slug: null },
  { id: "8", day: 3, order_index: 1, title: "Harajuku & Omotesando", description: "Shopping & lunch", time: "12:00", type: "activity", is_completed: false, destination_slug: null },
  { id: "9", day: 4, order_index: 0, title: "Day trip to Hakone", description: "Hot springs & views", time: "08:00", type: "activity", is_completed: false, destination_slug: null },
  { id: "10", day: 5, order_index: 0, title: "Flight home", description: "NRT → LAX", time: "14:00", type: "flight", is_completed: false, destination_slug: null },
];

const typeStyles: Record<string, { bg: string; text: string; label: string }> = {
  flight: { bg: "bg-blue-500/10", text: "text-blue-400", label: "Flight" },
  hotel: { bg: "bg-purple-500/10", text: "text-purple-400", label: "Hotel" },
  dining: { bg: "bg-orange-500/10", text: "text-orange-400", label: "Dining" },
  activity: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: "Activity" },
};

const TripPage = () => {
  const trip = sampleTrip;
  const items = sampleItineraryItems;
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Group items by day
  const itemsByDay = Array.from({ length: totalDays }, (_, i) => ({
    day: i + 1,
    date: addDays(startDate, i),
    items: items.filter(item => item.day === i + 1),
  }));

  const [openDays, setOpenDays] = useState<number[]>(itemsByDay.map(d => d.day));

  const toggleDay = (day: number) => {
    setOpenDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <>
      <Helmet>
        <title>{trip.title} | Trip Planner</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </Link>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Trip Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{trip.destination}</span>
              <span className="text-border">•</span>
              <span>{format(startDate, "MMM d")} – {format(endDate, "MMM d, yyyy")}</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight mb-4">{trip.title}</h1>
            
            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Days</span>
                <span className="font-medium">{totalDays}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Places</span>
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium">{items.filter(i => i.is_completed).length}/{items.length}</span>
              </div>
            </div>
          </div>

          {/* Itinerary List */}
          <div className="space-y-2">
            {itemsByDay.map(({ day, date, items: dayItems }) => (
              <Collapsible
                key={day}
                open={openDays.includes(day)}
                onOpenChange={() => toggleDay(day)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors group">
                    <ChevronDown className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      openDays.includes(day) ? "" : "-rotate-90"
                    )} />
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="font-medium">{format(date, "EEEE")}</span>
                      <span className="text-muted-foreground text-sm">{format(date, "MMM d")}</span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      {dayItems.length} {dayItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="ml-7 border-l border-border pl-4 pb-2">
                    {dayItems.length > 0 ? (
                      <div className="space-y-1 py-2">
                        {dayItems.map((item, index) => {
                          const style = typeStyles[item.type] || typeStyles.activity;
                          
                          const content = (
                            <div
                              className={cn(
                                "group flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all",
                                "hover:bg-secondary/50 cursor-pointer",
                                item.is_completed && "opacity-60"
                              )}
                              style={{ animationDelay: `${index * 30}ms` }}
                            >
                              {/* Drag handle */}
                              <GripVertical className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                              
                              {/* Checkbox */}
                              <button className={cn(
                                "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                                item.is_completed 
                                  ? "bg-foreground border-foreground" 
                                  : "border-border hover:border-muted-foreground"
                              )}>
                                {item.is_completed && <Check className="h-3 w-3 text-background" />}
                              </button>

                              {/* Time */}
                              <div className="w-14 flex-shrink-0">
                                {item.time && (
                                  <span className="text-xs font-mono text-muted-foreground">{item.time}</span>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <p className={cn(
                                  "font-medium text-sm truncate",
                                  item.is_completed && "line-through"
                                )}>
                                  {item.title}
                                </p>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                                )}
                              </div>

                              {/* Type badge */}
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded flex-shrink-0",
                                style.bg, style.text
                              )}>
                                {style.label}
                              </span>
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
                    ) : (
                      <div className="py-4 text-center">
                        <p className="text-sm text-muted-foreground">No activities planned</p>
                      </div>
                    )}
                    
                    {/* Add item button */}
                    <button className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors w-full">
                      <Plus className="h-4 w-4" />
                      <span>Add activity</span>
                    </button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default TripPage;
