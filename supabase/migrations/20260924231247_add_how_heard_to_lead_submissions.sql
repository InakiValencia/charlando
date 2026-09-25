ALTER TABLE public.lead_submissions
ADD COLUMN IF NOT EXISTS how_heard TEXT;
