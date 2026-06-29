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

const staticPaths = ["/", "/biblioteca"];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const entries = [
  ...staticPaths.map((path) => ({ path })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((entry) => {
    const loc = `${SITE_URL}${entry.path}`;
    const lastmod = entry.lastmod ? `\n    <lastmod>${new Date(entry.lastmod).toISOString()}</lastmod>` : "";
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`;
  })
  .join("\n")}
</urlset>
`;

await writeFile("public/sitemap.xml", xml);
console.log(`[sitemap] Wrote public/sitemap.xml with ${entries.length} URLs.`);
