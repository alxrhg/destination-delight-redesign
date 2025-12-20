-- Fix 1: Remove the anonymous insert policy on destinations table
-- This policy allows anyone without authentication to insert destination records
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.destinations;

-- Fix 2: Enable RLS on tables that are currently missing it
-- These tables were flagged as having RLS disabled
ALTER TABLE public.architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.architectural_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_materials ENABLE ROW LEVEL SECURITY;

-- Add read-only public policies for reference data tables
-- These are reference/lookup tables that should be publicly readable but not writable

CREATE POLICY "Public read access for architects"
ON public.architects FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for design_movements"
ON public.design_movements FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for design_firms"
ON public.design_firms FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for materials"
ON public.materials FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for architectural_photos"
ON public.architectural_photos FOR SELECT
TO public
USING (true);

CREATE POLICY "Public read access for destination_materials"
ON public.destination_materials FOR SELECT
TO public
USING (true);

-- Fix 3: Create a secure user_roles table and helper function for admin checks
-- This replaces the insecure app_metadata role checks

-- Create the app_role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for secure role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create security definer function for role checking (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Fix 4: Update destinations policies to use secure role checking instead of app_metadata
-- First drop the insecure policies that reference app_metadata
DROP POLICY IF EXISTS "Authenticated admin users can insert destinations" ON public.destinations;
DROP POLICY IF EXISTS "Authenticated admin users can update destinations" ON public.destinations;
DROP POLICY IF EXISTS "Authenticated admin users can delete destinations" ON public.destinations;

-- Create new secure policies using the has_role function
CREATE POLICY "Admins can insert destinations"
ON public.destinations FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update destinations"
ON public.destinations FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete destinations"
ON public.destinations FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));