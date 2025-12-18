import { useState } from "react";
import { format, addDays } from "date-fns";
import { ArrowLeft, MapPin, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ItineraryTimeline } from "@/components/trip/ItineraryTimeline";
import { cn } from "@/lib/utils";

// Sample trip data for demo
const sampleTrip = {
  id: "demo-trip",
  title: "Tokyo Adventure",
  destination: "Tokyo",
  start_date: new Date().toISOString(),
  end_date: addDays(new Date(), 4).toISOString(),
  description: "Exploring the best of Tokyo's architecture and cuisine",
};

const sampleItineraryItems = [
  {
    id: "1",
    trip_id: "demo-trip",
    day: 1,
    order_index: 0,
    title: "Flight to Tokyo",
    description: "Depart from LAX",
    time: "08:00",
    destination_slug: null,
    is_completed: false,
    notes: "Terminal 5, Gate 42",
    type: "flight" as const,
  },
  {
    id: "2",
    trip_id: "demo-trip",
    day: 1,
    order_index: 1,
    title: "Park Hyatt Tokyo",
    description: "Shinjuku, Tokyo",
    time: "15:00",
    destination_slug: "park-hyatt-tokyo",
    is_completed: false,
    notes: null,
    type: "hotel" as const,
  },
  {
    id: "3",
    trip_id: "demo-trip",
    day: 1,
    order_index: 2,
    title: "Sukiyabashi Jiro",
    description: "Omakase experience",
    time: "19:00",
    destination_slug: "sukiyabashi-jiro",
    is_completed: false,
    notes: "Reservation confirmed",
    type: "dining" as const,
  },
  {
    id: "4",
    trip_id: "demo-trip",
    day: 2,
    order_index: 0,
    title: "Tsukiji Outer Market",
    description: "Fresh sushi breakfast",
    time: "07:00",
    destination_slug: null,
    is_completed: false,
    notes: null,
    type: "activity" as const,
  },
  {
    id: "5",
    trip_id: "demo-trip",
    day: 2,
    order_index: 1,
    title: "TeamLab Borderless",
    description: "Digital art museum",
    time: "11:00",
    destination_slug: null,
    is_completed: false,
    notes: "Book tickets online",
    type: "activity" as const,
  },
  {
    id: "6",
    trip_id: "demo-trip",
    day: 2,
    order_index: 2,
    title: "Narisawa",
    description: "Innovative Japanese cuisine",
    time: "19:30",
    destination_slug: "narisawa",
    is_completed: false,
    notes: null,
    type: "dining" as const,
  },
];

const TripPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const trip = sampleTrip;
  const itineraryItems = sampleItineraryItems;

  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const currentDayDate = addDays(startDate, selectedDay - 1);
  const filteredItems = itineraryItems.filter(item => item.day === selectedDay);

  const goToPrevDay = () => setSelectedDay(d => Math.max(1, d - 1));
  const goToNextDay = () => setSelectedDay(d => Math.min(totalDays, d + 1));

  return (
    <>
      <Helmet>
        <title>{trip.title} | Trip Planner</title>
        <meta name="description" content={`Plan your trip to ${trip.destination}`} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        {/* Full-screen Map Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-secondary via-background to-card">
          {/* Map placeholder with grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `
                linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} 
          />
          
          {/* Decorative map pins */}
          <div className="absolute top-[30%] left-[25%] animate-pulse">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
          </div>
          <div className="absolute top-[45%] left-[40%] animate-pulse delay-150">
            <div className="w-4 h-4 rounded-full bg-destructive" />
          </div>
          <div className="absolute top-[35%] left-[55%] animate-pulse delay-300">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
          </div>
          
          {/* City label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-[120px] font-light tracking-widest text-foreground/[0.03] uppercase">
              {trip.destination}
            </p>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-between h-16 px-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-destructive" />
              <span className="font-medium">{trip.title}</span>
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Floating Itinerary Panel */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:left-auto lg:right-6 lg:bottom-6 lg:top-24 lg:w-[420px]">
          <div className="bg-card/95 backdrop-blur-xl border-t lg:border border-border lg:rounded-2xl shadow-elevated overflow-hidden h-[60vh] lg:h-auto lg:max-h-[calc(100vh-120px)] flex flex-col animate-fade-up">
            
            {/* Day Selector */}
            <div className="flex-shrink-0 p-5 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Day {selectedDay} of {totalDays}
                  </p>
                  <p className="text-lg font-medium">
                    {format(currentDayDate, "EEEE, MMMM d")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={goToPrevDay}
                    disabled={selectedDay === 1}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      selectedDay === 1 
                        ? "text-muted-foreground/30 cursor-not-allowed" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goToNextDay}
                    disabled={selectedDay === totalDays}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      selectedDay === totalDays 
                        ? "text-muted-foreground/30 cursor-not-allowed" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Day Pills */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full text-sm font-medium transition-all",
                      selectedDay === day
                        ? "bg-foreground text-background"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Itinerary List */}
            <div className="flex-1 overflow-y-auto p-5">
              {filteredItems.length > 0 ? (
                <ItineraryTimeline items={filteredItems} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-1">No activities yet</p>
                  <p className="text-sm text-muted-foreground/60">Add your first stop for this day</p>
                </div>
              )}
            </div>

            {/* Add Activity Button */}
            <div className="flex-shrink-0 p-4 border-t border-border/50">
              <Button className="w-full gap-2" variant="secondary">
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </div>
          </div>
        </div>

        {/* Trip Stats Floating Card (Desktop only) */}
        <div className="hidden lg:block fixed top-24 left-6 z-40">
          <div className="bg-card/90 backdrop-blur-xl border border-border rounded-xl p-4 shadow-soft animate-fade-up">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-2xl font-light">{itineraryItems.length}</p>
                <p className="text-xs text-muted-foreground">Places</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-light">{totalDays}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-light">
                  {format(startDate, "MMM d")}
                </p>
                <p className="text-xs text-muted-foreground">Start</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripPage;
