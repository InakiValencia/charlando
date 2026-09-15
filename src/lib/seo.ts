import { useEffect } from "react";
import { HTML_LANG, OG_LOCALE, type Locale } from "@/i18n/locales";
import { alternatePathsFor } from "@/i18n/routes";

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
  locale?: Locale;
  alternatePaths?: Partial<Record<Locale | "x-default", string>>;
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

const setLink = (rel: string, href: string, hreflang?: string) => {
  const hreflangSelector = hreflang ? `[hreflang="${hreflang}"]` : "";
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${hreflangSelector}`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) element.hreflang = hreflang;
    document.head.appendChild(element);
  }
  element.href = href;
};

const clearAlternateLinks = () => {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
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
  locale = "es",
  alternatePaths,
}: PageSeo) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(canonicalPath);
    const alternates = alternatePaths || alternatePathsFor(canonicalPath);

    document.documentElement.lang = HTML_LANG[locale];
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:locale"]', "content", OG_LOCALE[locale]);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:image:secure_url"]', "content", image);
    setMeta('meta[name="twitter:image"]', "content", image);
    setLink("canonical", canonicalUrl);
    clearAlternateLinks();
    if (alternates.es) setLink("alternate", getCanonicalUrl(alternates.es), "es-AR");
    if (alternates.en) setLink("alternate", getCanonicalUrl(alternates.en), "en");
    setLink("alternate", getCanonicalUrl(alternates["x-default"] || alternates.es || "/"), "x-default");

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
  }, [alternatePaths, author, canonicalPath, description, image, locale, modifiedTime, publishedTime, section, title, type]);
}
