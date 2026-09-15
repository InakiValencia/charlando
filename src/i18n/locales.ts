export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export const HTML_LANG: Record<Locale, string> = {
  es: "es-AR",
  en: "en",
};

export const OG_LOCALE: Record<Locale, string> = {
  es: "es_AR",
  en: "en_US",
};

export const getLocaleFromPathname = (pathname: string): Locale => {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LOCALE;
};

export const stripLocaleFromPathname = (pathname: string) => {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
};
