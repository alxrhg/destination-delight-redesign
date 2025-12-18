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
  image: string | null;
  gallery: string[] | null;
  rating: number | null;
  price_level: number | null;
  architect: string | null;
  architectural_style: string | null;
  address: string | null;
  phone_number: string | null;
  website: string | null;
  michelin_stars: number | null;
  crown: boolean | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: any | null;
  vibe_tags: string[] | null;
  tags: string[] | null;
}

export function useDestinations(limit = 10) {
  return useQuery({
    queryKey: ['destinations', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select(`
          id,
          slug,
          name,
          city,
          country,
          category,
          description,
          image,
          rating,
          price_level,
          architect,
          architectural_style,
          address,
          phone_number,
          website,
          michelin_stars,
          crown
        `)
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
        .select(`
          id,
          slug,
          name,
          city,
          country,
          category,
          description,
          content,
          image,
          gallery,
          rating,
          price_level,
          architect,
          architectural_style,
          address,
          phone_number,
          website,
          michelin_stars,
          crown,
          latitude,
          longitude,
          opening_hours,
          vibe_tags,
          tags
        `)
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
