import { readFile, writeFile } from "node:fs/promises";

async function loadPublicEnvFile(filePath) {
  try {
    const contents = await readFile(filePath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*(VITE_[A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (process.env[key]) continue;

      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // Env files are optional in CI because deploy providers inject variables.
  }
}

await loadPublicEnvFile(".env");
await loadPublicEnvFile(".env.local");

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.charlando.com.ar").replace(/\/$/, "");
const projectId = process.env.VITE_SANITY_PROJECT_ID || "irdg3uqh";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const apiVersion = process.env.VITE_SANITY_API_VERSION || "2026-06-26";

const staticPathPairs = [
  { es: "/", en: "/en" },
  { es: "/biblioteca", en: "/en/library" },
  { es: "/blog", en: "/en/blog" },
  { es: "/terminos-y-condiciones", en: "/en/terms-and-conditions" },
  { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
  { es: "/auth", en: "/en/auth" },
];

const publishedPostSlugsQuery = `
*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  !(_id in path("drafts.**"))
	] | order(publishedAt desc) {
	  "slug": slug.current,
	  "slugEn": slugEn.current,
	  publishedAt
	}`;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

async function getBlogPaths() {
  if (!projectId) {
    console.warn("[sitemap] VITE_SANITY_PROJECT_ID is not set. Generating sitemap without blog posts.");
    return [];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", publishedPostSlugsQuery);

  let posts = [];
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Sanity returned ${response.status}`);
    }
    const payload = await response.json();
    posts = Array.isArray(payload.result) ? payload.result : [];
  } catch (error) {
    console.warn(`[sitemap] Could not fetch Sanity posts: ${error instanceof Error ? error.message : "unknown error"}`);
  } finally {
    clearTimeout(timeout);
  }

  return posts.flatMap((post) => {
    const entries = [
      {
        path: `/blog/${post.slug}`,
        lastmod: post.publishedAt,
        alternates: post.slugEn
          ? { es: `/blog/${post.slug}`, en: `/en/blog/${post.slugEn}`, xDefault: `/blog/${post.slug}` }
          : undefined,
      },
    ];

    if (post.slugEn) {
      entries.push({
        path: `/en/blog/${post.slugEn}`,
        lastmod: post.publishedAt,
        alternates: { es: `/blog/${post.slug}`, en: `/en/blog/${post.slugEn}`, xDefault: `/blog/${post.slug}` },
      });
    }

    return entries;
  });
}

const blogPaths = await getBlogPaths();
const entries = [
  ...staticPathPairs.flatMap((pair) => [
    { path: pair.es, alternates: { es: pair.es, en: pair.en, xDefault: pair.es } },
    { path: pair.en, alternates: { es: pair.es, en: pair.en, xDefault: pair.es } },
  ]),
  ...blogPaths,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map((entry) => {
    const loc = `${SITE_URL}${entry.path}`;
    const lastmod = entry.lastmod ? `\n    <lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>` : "";
    const alternates = entry.alternates
      ? `\n    <xhtml:link rel="alternate" hreflang="es-AR" href="${escapeXml(`${SITE_URL}${entry.alternates.es}`)}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${SITE_URL}${entry.alternates.en}`)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_URL}${entry.alternates.xDefault}`)}" />`
      : "";
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${alternates}${lastmod}\n  </url>`;
  })
  .join("\n")}
</urlset>
`;

await writeFile("public/sitemap.xml", xml);
console.log(`[sitemap] Wrote public/sitemap.xml with ${entries.length} URLs.`);
