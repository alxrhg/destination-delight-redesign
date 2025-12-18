import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SupabaseDestination {
  id: number;
  slug: string;
  name: string;
  city: string;
  country: string | null;
  category: string;
  description: string | null;
  content: string | null;
  subline: string | null;
  short_summary: string | null;
  ai_short_summary: string | null;
  image: string | null;
  gallery: string[] | null;
  rating: number | null;
  price_level: number | null;
  reviews_count: number | null;
  // Architecture & Design
  architect: string | null;
  architectural_style: string | null;
  design_story: string | null;
  design_period: string | null;
  design_firm: string | null;
  materials: string[] | null;
  // Location
  address: string | null;
  neighborhood: string | null;
  latitude: number | null;
  longitude: number | null;
  // Contact
  phone_number: string | null;
  email: string | null;
  website: string | null;
  instagram_url: string | null;
  instagram_handle: string | null;
  // Booking
  booking_url: string | null;
  opentable_url: string | null;
  resy_url: string | null;
  // Awards & Recognition
  michelin_stars: number | null;
  michelin_keys: number | null;
  crown: boolean | null;
  // Features
  amenities: string[] | null;
  cuisine_type: string[] | null;
  dietary_options: string[] | null;
  chef_name: string | null;
  brand: string | null;
  // Tags
  vibe_tags: string[] | null;
  tags: string[] | null;
  style_tags: string[] | null;
  ambience_tags: string[] | null;
  experience_tags: string[] | null;
  // Timing
  opening_hours: any | null;
  best_months: string[] | null;
  peak_season: string | null;
}

const DESTINATION_FIELDS = `
  id,
  slug,
  name,
  city,
  country,
  category,
  description,
  content,
  subline,
  short_summary,
  ai_short_summary,
  image,
  gallery,
  rating,
  price_level,
  reviews_count,
  architect,
  architectural_style,
  design_story,
  design_period,
  design_firm,
  materials,
  address,
  neighborhood,
  latitude,
  longitude,
  phone_number,
  email,
  website,
  instagram_url,
  instagram_handle,
  booking_url,
  opentable_url,
  resy_url,
  michelin_stars,
  michelin_keys,
  crown,
  amenities,
  cuisine_type,
  dietary_options,
  chef_name,
  brand,
  vibe_tags,
  tags,
  style_tags,
  ambience_tags,
  experience_tags,
  opening_hours,
  best_months,
  peak_season
`;

export function useDestinations(limit = 10) {
  return useQuery({
    queryKey: ['destinations', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select(DESTINATION_FIELDS)
        .limit(limit)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SupabaseDestination[];
    },
  });
}

export function useDestination(slug: string | undefined) {
  return useQuery({
    queryKey: ['destination', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('destinations')
        .select(DESTINATION_FIELDS)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as SupabaseDestination;
    },
    enabled: !!slug,
  });
}

export function useDestinationsCount() {
  return useQuery({
    queryKey: ['destinations-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('destinations')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      return count || 0;
    },
  });
}
