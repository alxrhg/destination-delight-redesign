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

interface PaginationFilters {
  city?: string;
  category?: string;
}

export function usePaginatedDestinations(page: number, filters?: PaginationFilters) {
  const cityFilter = filters?.city && filters.city !== 'all' ? filters.city : null;
  const categoryFilter = filters?.category && filters.category !== 'all' ? filters.category : null;

  return useQuery({
    queryKey: ['destinations-paginated', page, cityFilter, categoryFilter],
    queryFn: async () => {
      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('destinations')
        .select(DESTINATION_FIELDS, { count: 'exact' });

      // Apply city filter (case-insensitive)
      if (cityFilter) {
        query = query.ilike('city', cityFilter);
      }

      // Apply category filter (case-insensitive)
      if (categoryFilter) {
        query = query.ilike('category', categoryFilter);
      }

      const { data, error, count } = await query
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
