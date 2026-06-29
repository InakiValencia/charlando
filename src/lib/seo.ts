import { useEffect } from "react";

export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.charlando.com.ar").replace(/\/$/, "");
export const DEFAULT_TITLE = "Charlando | Conversaciones que convierten";
export const DEFAULT_DESCRIPTION = "Personas reales, reacciones reales y videos verticales listos para redes y campañas digitales.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/charlando-og-v2.jpg`;

type PageSeo = {
  title?: string;
  description?: string;
  image?: string;
  canonicalPath?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
};

const createMetaElement = (selector: string) => {
  const propertyMatch = selector.match(/^meta\[property="([^"]+)"\]$/);
  if (propertyMatch) {
    const element = document.createElement("meta");
    element.setAttribute("property", propertyMatch[1]);
    document.head.appendChild(element);
    return element;
  }

  const nameMatch = selector.match(/^meta\[name="([^"]+)"\]$/);
  if (nameMatch) {
    const element = document.createElement("meta");
    element.setAttribute("name", nameMatch[1]);
    document.head.appendChild(element);
    return element;
  }

  return null;
};

const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
  const element = document.head.querySelector(selector) || createMetaElement(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
};

const removeMeta = (selector: string) => {
  document.head.querySelector(selector)?.remove();
};

export function getCanonicalUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function usePageSeo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  canonicalPath = "/",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
}: PageSeo) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(canonicalPath);

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:image:secure_url"]', "content", image);
    setMeta('meta[name="twitter:image"]', "content", image);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);

    if (publishedTime) {
      setMeta('meta[property="article:published_time"]', "content", publishedTime);
    } else {
      removeMeta('meta[property="article:published_time"]');
    }

    if (modifiedTime) {
      setMeta('meta[property="article:modified_time"]', "content", modifiedTime);
    } else {
      removeMeta('meta[property="article:modified_time"]');
    }

    if (author) {
      setMeta('meta[property="article:author"]', "content", author);
    } else {
      removeMeta('meta[property="article:author"]');
    }

    if (section) {
      setMeta('meta[property="article:section"]', "content", section);
    } else {
      removeMeta('meta[property="article:section"]');
    }
  }, [author, canonicalPath, description, image, modifiedTime, publishedTime, section, title, type]);
}
