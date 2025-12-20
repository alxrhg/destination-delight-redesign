-- Fix content_audit_log policy that references user_metadata
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.content_audit_log;

CREATE POLICY "Admins can view audit logs"
ON public.content_audit_log FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix the SECURITY DEFINER views by recreating them as SECURITY INVOKER
-- First, drop and recreate enriched_destinations view
DROP VIEW IF EXISTS public.enriched_destinations;
CREATE VIEW public.enriched_destinations 
WITH (security_invoker = true)
AS
SELECT slug,
    name,
    city,
    category,
    image,
    content,
    crown,
    michelin_stars,
    place_id,
    rating,
    price_level,
    opening_hours,
    phone_number,
    website,
    google_maps_url,
    tags,
    last_enriched_at,
    CASE
        WHEN (last_enriched_at IS NOT NULL) THEN true
        ELSE false
    END AS is_enriched
FROM destinations;

-- Fix popular_destinations view
DROP VIEW IF EXISTS public.popular_destinations;
CREATE VIEW public.popular_destinations
WITH (security_invoker = true)
AS
SELECT slug,
    name,
    city,
    category,
    COALESCE(image, main_image) AS image
FROM destinations d
ORDER BY name;