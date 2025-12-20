import { useQuery } from '@tanstack/react-query';
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

// 4 rows × 6 columns (XL breakpoint) = 24 items per page
const PAGE_SIZE = 24;

export function usePaginatedDestinations(page: number) {
  return useQuery({
    queryKey: ['destinations-paginated', page],
    queryFn: async () => {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from('destinations')
        .select(DESTINATION_FIELDS, { count: 'exact' })
        .order('rating', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      
      const totalPages = Math.ceil((count || 0) / PAGE_SIZE);
      
      return {
        destinations: data as SupabaseDestination[],
        totalCount: count || 0,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages - 1,
        hasPrevPage: page > 0,
      };
    },
  });
}

export { PAGE_SIZE };
