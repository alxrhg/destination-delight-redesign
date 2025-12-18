import { useState } from "react";
import { format, addDays } from "date-fns";
import { Plus, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { TripHeader } from "@/components/trip/TripHeader";
import { TripMap } from "@/components/trip/TripMap";
import { DayTabs } from "@/components/trip/DayTabs";
import { ItineraryCard } from "@/components/trip/ItineraryCard";
import { TripSidebar } from "@/components/trip/TripSidebar";

// Sample trip data for demo
const sampleTrip = {
  id: "demo-trip",
  title: "Tokyo Adventure",
  destination: "Tokyo",
  start_date: new Date().toISOString(),
  end_date: addDays(new Date(), 4).toISOString(),
  description: "Exploring the best of Tokyo's architecture and cuisine",
  is_public: true,
  status: "planning",
  cover_image: null,
  user_id: "demo-user",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
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
  },
  {
    id: "2",
    trip_id: "demo-trip",
    day: 1,
    order_index: 1,
    title: "Check-in at Park Hyatt Tokyo",
    description: "Shinjuku, Tokyo",
    time: "15:00",
    destination_slug: "park-hyatt-tokyo",
    is_completed: false,
    notes: null,
  },
  {
    id: "3",
    trip_id: "demo-trip",
    day: 1,
    order_index: 2,
    title: "Dinner at Sukiyabashi Jiro",
    description: "Omakase experience",
    time: "19:00",
    destination_slug: "sukiyabashi-jiro",
    is_completed: false,
    notes: "Reservation confirmed",
  },
  {
    id: "4",
    trip_id: "demo-trip",
    day: 2,
    order_index: 0,
    title: "Morning at Tsukiji Outer Market",
    description: "Fresh sushi breakfast",
    time: "07:00",
    destination_slug: null,
    is_completed: false,
    notes: null,
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
  },
];

const sampleSuggestedPlaces = [
  { id: 1, slug: "aman-tokyo", name: "Aman Tokyo", city: "Tokyo", category: "hotel", image: null, rating: 4.9 },
  { id: 2, slug: "narisawa", name: "Narisawa", city: "Tokyo", category: "dining", image: null, rating: 4.8 },
  { id: 3, slug: "nezu-museum", name: "Nezu Museum", city: "Tokyo", category: "attraction", image: null, rating: 4.7 },
];

const TripPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  const trip = sampleTrip;
  const itineraryItems = sampleItineraryItems;
  const suggestedPlaces = sampleSuggestedPlaces;

  const filteredItems = itineraryItems.filter(item => item.day === selectedDay);
  const startDate = trip.start_date;
  const endDate = trip.end_date;
  const currentDayDate = addDays(new Date(startDate), selectedDay - 1);

  return (
    <>
      <Helmet>
        <title>{trip.title} | Trip Planner</title>
        <meta name="description" content={`Plan your trip to ${trip.destination}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Map */}
              <TripMap city={trip.destination} pinnedCount={itineraryItems.length} />

              {/* Trip Header */}
              <TripHeader trip={trip} placesCount={itineraryItems.length} />

              {/* Day Tabs */}
              <DayTabs
                startDate={startDate}
                endDate={endDate}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
              />

              {/* Day Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Day {selectedDay}: {format(currentDayDate, "MMMM d")}
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    Optimize
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Itinerary Items */}
              <div className="space-y-3">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <ItineraryCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-card rounded-xl">
                    <p className="text-muted-foreground mb-4">No items for this day yet</p>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Activity
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <TripSidebar 
              suggestedPlaces={suggestedPlaces}
              city={trip.destination}
              hasConflict={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TripPage;
