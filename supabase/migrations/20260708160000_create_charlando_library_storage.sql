BEGIN;

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'charlando-library',
  'charlando-library',
  true,
  52428800,
  ARRAY['video/mp4', 'image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view charlando library assets" ON storage.objects;

CREATE POLICY "Public can view charlando library assets"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'charlando-library');

COMMIT;
