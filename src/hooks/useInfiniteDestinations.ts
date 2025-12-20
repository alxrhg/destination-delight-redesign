import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SupabaseDestination } from './useDestinations';

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

const PAGE_SIZE = 24;

export function useInfiniteDestinations() {
  return useInfiniteQuery({
    queryKey: ['destinations-infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from('destinations')
        .select(DESTINATION_FIELDS)
        .order('rating', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      return {
        destinations: data as SupabaseDestination[],
        nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
