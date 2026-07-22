BEGIN;

ALTER TABLE public.host_applications
DROP CONSTRAINT IF EXISTS host_applications_age_check;

ALTER TABLE public.host_applications
ADD CONSTRAINT host_applications_age_check CHECK (age BETWEEN 18 AND 100);

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
  AND age BETWEEN 18 AND 100
  AND length(btrim(motivation)) >= 20
);

COMMIT;
