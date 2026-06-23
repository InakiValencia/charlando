BEGIN;

CREATE TABLE IF NOT EXISTS public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'landing',
  page_path TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS landing_leads_public_insert ON public.lead_submissions;

CREATE POLICY landing_leads_public_insert
ON public.lead_submissions
FOR INSERT
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_lead_submissions_created_at
ON public.lead_submissions (created_at DESC);

COMMIT;
