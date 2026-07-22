BEGIN;

CREATE TABLE IF NOT EXISTS public.host_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL CHECK (length(btrim(first_name)) >= 2),
  last_name TEXT NOT NULL CHECK (length(btrim(last_name)) >= 2),
  email TEXT NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  city_location TEXT NOT NULL CHECK (length(btrim(city_location)) >= 2),
  social_following TEXT NOT NULL CHECK (length(btrim(social_following)) >= 2),
  social_platform_handle TEXT NOT NULL CHECK (length(btrim(social_platform_handle)) >= 2),
  age INTEGER NOT NULL CHECK (age BETWEEN 16 AND 100),
  motivation TEXT NOT NULL CHECK (length(btrim(motivation)) >= 20),
  source TEXT NOT NULL DEFAULT 'landing_hosts',
  page_path TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

ALTER TABLE public.host_applications ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.host_applications FROM anon, authenticated;
GRANT INSERT ON TABLE public.host_applications TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.host_applications TO service_role;

DROP POLICY IF EXISTS host_applications_public_insert ON public.host_applications;

CREATE POLICY host_applications_public_insert
ON public.host_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(first_name)) >= 2
  AND length(btrim(last_name)) >= 2
  AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  AND length(btrim(city_location)) >= 2
  AND length(btrim(social_following)) >= 2
  AND length(btrim(social_platform_handle)) >= 2
  AND age BETWEEN 16 AND 100
  AND length(btrim(motivation)) >= 20
);

CREATE INDEX IF NOT EXISTS idx_host_applications_created_at
ON public.host_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_host_applications_city_location
ON public.host_applications (city_location);

COMMIT;
