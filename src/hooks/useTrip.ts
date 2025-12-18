import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Trip {
  id: string;
  title: string;
  destination: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  is_public: boolean;
  status: string;
  cover_image: string | null;
  user_id: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ItineraryItem {
  id: string;
  trip_id: string;
  day: number;
  order_index: number;
  title: string;
  description: string | null;
  time: string | null;
  destination_slug: string | null;
  is_completed: boolean | null;
  notes: string | null;
}

const isValidUUID = (id: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export const useTrip = (tripId: string | undefined) => {
  const isValid = tripId && isValidUUID(tripId);
  
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      if (!tripId || !isValid) throw new Error("Invalid Trip ID");
      
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("id", tripId)
        .single();

      if (error) throw error;
      return data as Trip;
    },
    enabled: !!isValid,
  });
};

export const useItineraryItems = (tripId: string | undefined) => {
  const isValid = tripId && isValidUUID(tripId);
  
  return useQuery({
    queryKey: ["itinerary-items", tripId],
    queryFn: async () => {
      if (!tripId || !isValid) throw new Error("Invalid Trip ID");
      
      const { data, error } = await supabase
        .from("itinerary_items")
        .select("*")
        .eq("trip_id", tripId)
        .order("day", { ascending: true })
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as ItineraryItem[];
    },
    enabled: !!isValid,
  });
};

export const useCityDestinations = (city: string | null) => {
  return useQuery({
    queryKey: ["city-destinations", city],
    queryFn: async () => {
      if (!city) return [];
      
      const { data, error } = await supabase
        .from("destinations")
        .select("id, slug, name, city, category, image, rating")
        .ilike("city", city)
        .limit(10);

      if (error) throw error;
      return data;
    },
    enabled: !!city,
  });
};
