import type { Locale } from "./locales";
import { stripLocaleFromPathname } from "./locales";

type RoutePair = {
  es: string;
  en: string;
};

const ROUTE_PAIRS: RoutePair[] = [
  { es: "/", en: "/en" },
  { es: "/biblioteca", en: "/en/library" },
  { es: "/blog", en: "/en/blog" },
  { es: "/auth", en: "/en/auth" },
  { es: "/terminos-y-condiciones", en: "/en/terms-and-conditions" },
  { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
  { es: "/dashboard", en: "/en/dashboard" },
];

const dynamicRoutePairs = [
  {
    es: /^\/blog\/(.+)$/,
    en: /^\/en\/blog\/(.+)$/,
    buildEs: (value: string) => `/blog/${value}`,
    buildEn: (value: string) => `/en/blog/${value}`,
  },
  {
    es: /^\/register\/(.+)$/,
    en: /^\/en\/register\/(.+)$/,
    buildEs: (value: string) => `/register/${value}`,
    buildEn: (value: string) => `/en/register/${value}`,
  },
  {
    es: /^\/company\/(.+)$/,
    en: /^\/en\/company\/(.+)$/,
    buildEs: (value: string) => `/company/${value}`,
    buildEn: (value: string) => `/en/company/${value}`,
  },
  {
    es: /^\/dashboard\/(.+)$/,
    en: /^\/en\/dashboard\/(.+)$/,
    buildEs: (value: string) => `/dashboard/${value}`,
    buildEn: (value: string) => `/en/dashboard/${value}`,
  },
];

const splitHash = (value: string) => {
  const [path, hash = ""] = value.split("#");
  return { path: path || "/", hash: hash ? `#${hash}` : "" };
};

export const localizePath = (target: string, locale: Locale) => {
  if (/^https?:\/\//.test(target) || target.startsWith("mailto:")) return target;
  if (target.startsWith("#")) return locale === "en" ? `/en${target}` : `/${target}`;

  const { path, hash } = splitHash(target);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithoutLocale = stripLocaleFromPathname(normalizedPath);

  const staticPair = ROUTE_PAIRS.find((pair) => pair.es === pathWithoutLocale || pair.en === normalizedPath);
  if (staticPair) return `${staticPair[locale]}${hash}`;

  for (const pair of dynamicRoutePairs) {
    const esMatch = pathWithoutLocale.match(pair.es);
    const enMatch = normalizedPath.match(pair.en);
    const value = esMatch?.[1] || enMatch?.[1];
    if (value) return `${locale === "en" ? pair.buildEn(value) : pair.buildEs(value)}${hash}`;
  }

  return `${locale === "en" ? `/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}` : pathWithoutLocale}${hash}`;
};

export const switchLocalePath = (pathname: string, nextLocale: Locale, hash = "") => {
  return `${localizePath(pathname, nextLocale)}${hash}`;
};

export const alternatePathsFor = (spanishPath: string) => ({
  es: localizePath(spanishPath, "es"),
  en: localizePath(spanishPath, "en"),
});
