import { createClient } from "@supabase/supabase-js";
import { stat, readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const PROJECT_ROOT = process.cwd();
const PUBLIC_VIDEOS_DIR = path.join(PROJECT_ROOT, "public", "videos");
const POSTERS_DIR = path.join(PUBLIC_VIDEOS_DIR, "posters");
const BUCKET = process.env.SUPABASE_LIBRARY_BUCKET || "charlando-library";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
const shouldDeleteLocal = process.argv.includes("--delete-local");

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const contentTypeFor = (filePath) => {
  if (filePath.endsWith(".mp4")) return "video/mp4";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
};

const listAssets = async () => {
  const [videoFiles, posterFiles] = await Promise.all([
    readdir(PUBLIC_VIDEOS_DIR),
    readdir(POSTERS_DIR),
  ]);

  return [
    ...videoFiles
      .filter((file) => /^charlando-video-\d+\.mp4$/i.test(file))
      .map((file) => ({
        localPath: path.join(PUBLIC_VIDEOS_DIR, file),
        remotePath: `videos/${file}`,
      })),
    ...posterFiles
      .filter((file) => /^charlando-video-\d+\.(png|jpe?g|webp)$/i.test(file))
      .map((file) => ({
        localPath: path.join(POSTERS_DIR, file),
        remotePath: `posters/${file}`,
      })),
  ].sort((a, b) => a.remotePath.localeCompare(b.remotePath));
};

const ensureBucket = async () => {
  const bucketOptions = {
    public: true,
    fileSizeLimit: 52_428_800,
    allowedMimeTypes: ["video/mp4", "image/png", "image/jpeg", "image/webp"],
  };

  const { error } = await supabase.storage.createBucket(BUCKET, bucketOptions);

  if (error && !/already exists/i.test(error.message)) {
    throw error;
  }

  if (error) {
    const { error: updateError } = await supabase.storage.updateBucket(BUCKET, bucketOptions);
    if (updateError) {
      throw updateError;
    }
  }
};

const uploadAsset = async ({ localPath, remotePath }) => {
  const buffer = await readFile(localPath);
  const { error } = await supabase.storage.from(BUCKET).upload(remotePath, buffer, {
    upsert: true,
    cacheControl: "31536000",
    contentType: contentTypeFor(localPath),
  });

  if (error) {
    throw new Error(`${remotePath}: ${error.message}`);
  }

  const size = await stat(localPath);
  console.log(`Uploaded ${remotePath} (${Math.round(size.size / 1024)} KB)`);
};

const main = async () => {
  await ensureBucket();

  const assets = await listAssets();

  for (const asset of assets) {
    await uploadAsset(asset);
  }

  if (shouldDeleteLocal) {
    for (const asset of assets) {
      await rm(asset.localPath);
    }
    console.log("Deleted local library video assets after successful upload.");
  }

  console.log(`Done. Public base URL: ${supabaseUrl}/storage/v1/object/public/${BUCKET}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
