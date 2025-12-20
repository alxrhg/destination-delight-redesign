-- Fix remaining tables that use insecure app_metadata role checks
-- These policies reference raw_app_meta_data which users can manipulate

-- Fix brands table policies
DROP POLICY IF EXISTS "Admin delete brands" ON public.brands;
DROP POLICY IF EXISTS "Admin insert brands" ON public.brands;
DROP POLICY IF EXISTS "Admin update brands" ON public.brands;

CREATE POLICY "Admins can delete brands"
ON public.brands FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert brands"
ON public.brands FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update brands"
ON public.brands FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix cities table policies
DROP POLICY IF EXISTS "Admin delete cities" ON public.cities;
DROP POLICY IF EXISTS "Admin insert cities" ON public.cities;
DROP POLICY IF EXISTS "Admin update cities" ON public.cities;

CREATE POLICY "Admins can delete cities"
ON public.cities FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert cities"
ON public.cities FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cities"
ON public.cities FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix countries table policies
DROP POLICY IF EXISTS "Admin delete countries" ON public.countries;
DROP POLICY IF EXISTS "Admin insert countries" ON public.countries;
DROP POLICY IF EXISTS "Admin update countries" ON public.countries;

CREATE POLICY "Admins can delete countries"
ON public.countries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert countries"
ON public.countries FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update countries"
ON public.countries FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix neighborhoods table policies
DROP POLICY IF EXISTS "Admin delete neighborhoods" ON public.neighborhoods;
DROP POLICY IF EXISTS "Admin insert neighborhoods" ON public.neighborhoods;
DROP POLICY IF EXISTS "Admin update neighborhoods" ON public.neighborhoods;

CREATE POLICY "Admins can delete neighborhoods"
ON public.neighborhoods FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert neighborhoods"
ON public.neighborhoods FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update neighborhoods"
ON public.neighborhoods FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));