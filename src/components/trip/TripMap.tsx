import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { MapPin, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// TopoJSON world atlas URL - requires CSP connect-src for raw.githubusercontent.com
const GEO_URL = "https://raw.githubusercontent.com/topojson/world-atlas/master/countries-110m.json";

interface TripMapProps {
  city: string | null;
  pinnedCount: number;
  coordinates?: [number, number]; // [longitude, latitude]
}

type GeoLoadState = "loading" | "loaded" | "error";

export const TripMap = ({ city, pinnedCount, coordinates }: TripMapProps) => {
  const [geoLoadState, setGeoLoadState] = useState<GeoLoadState>("loading");
  const [geoData, setGeoData] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchGeoData = async () => {
    setGeoLoadState("loading");
    setErrorMessage("");

    try {
      const response = await fetch(GEO_URL);

      if (!response.ok) {
        throw new Error(`Failed to load map data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setGeoData(data);
      setGeoLoadState("loaded");
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "An unexpected error occurred while loading the map";

      setErrorMessage(message);
      setGeoLoadState("error");
      console.error("Failed to load geography data:", error);
    }
  };

  useEffect(() => {
    fetchGeoData();
  }, []);

  // Default coordinates (center of the world) if not provided
  const mapCenter = coordinates || [0, 20];
  const zoom = coordinates ? 4 : 1;

  if (geoLoadState === "loading") {
    return (
      <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-card">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin opacity-50" />
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (geoLoadState === "error") {
    return (
      <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-card flex flex-col items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-sm mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage || "Unable to load map data. Please check your connection."}
            </AlertDescription>
          </Alert>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchGeoData}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
        {/* City badge - still show even on error */}
        {city && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
              <MapPin className="h-4 w-4 text-destructive" />
              <span className="font-medium">{city.toLowerCase()}</span>
              <span className="text-muted-foreground">{pinnedCount} pinned</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] rounded-xl overflow-hidden bg-card">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup center={mapCenter as [number, number]} zoom={zoom}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "hsl(var(--accent))" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {coordinates && (
            <Marker coordinates={coordinates}>
              <circle r={6} fill="hsl(var(--destructive))" />
              <circle r={10} fill="hsl(var(--destructive))" fillOpacity={0.3} />
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* City badge */}
      {city && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
            <MapPin className="h-4 w-4 text-destructive" />
            <span className="font-medium">{city.toLowerCase()}</span>
            <span className="text-muted-foreground">{pinnedCount} pinned</span>
          </div>
        </div>
      )}
    </div>
  );
};
