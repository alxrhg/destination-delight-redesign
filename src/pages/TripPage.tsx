import { useState } from "react";
import { useParams } from "react-router-dom";
import { format, addDays } from "date-fns";
import { Plus, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { TripHeader } from "@/components/trip/TripHeader";
import { TripMap } from "@/components/trip/TripMap";
import { DayTabs } from "@/components/trip/DayTabs";
import { ItineraryCard } from "@/components/trip/ItineraryCard";
import { TripSidebar } from "@/components/trip/TripSidebar";
import { useTrip, useItineraryItems, useCityDestinations } from "@/hooks/useTrip";

const TripPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [selectedDay, setSelectedDay] = useState(1);

  const isValidUUID = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  if (!tripId || tripId.startsWith(":" ) || !isValidUUID(tripId)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-semibold">Trip not found</h1>
          <p className="text-muted-foreground">
            This page needs a real Trip ID in the URL (a UUID). You’re currently on <code className="px-1 py-0.5 rounded bg-muted">/trip/:tripId</code>.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => (window.location.href = "/")}>Go Home</Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { data: trip, isLoading: tripLoading, error: tripError } = useTrip(tripId);
  const { data: itineraryItems = [] } = useItineraryItems(tripId);
  const { data: suggestedPlaces = [] } = useCityDestinations(trip?.destination ?? null);

  if (tripLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading trip...</div>
      </div>
    );
  }

  if (tripError || !trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Trip not found</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const filteredItems = itineraryItems.filter(item => item.day === selectedDay);
  const startDate = trip.start_date || new Date().toISOString();
  const endDate = trip.end_date || addDays(new Date(), 2).toISOString();
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
              {trip.start_date && trip.end_date && (
                <DayTabs
                  startDate={startDate}
                  endDate={endDate}
                  selectedDay={selectedDay}
                  onSelectDay={setSelectedDay}
                />
              )}

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
