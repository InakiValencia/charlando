import { DEFAULT_LOCALE, type Locale } from "./locales";

export const LOCALE_PREFERENCE_STORAGE_KEY = "charlando.localePreference";

const GEO_COUNTRY_SESSION_KEY = "charlando.geoCountry";
const DETECTED_LOCALE_SESSION_KEY = "charlando.detectedLocale";
const GEO_TIMEOUT_MS = 1200;

const SPANISH_FIRST_COUNTRIES = new Set([
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "ES",
  "GQ",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PE",
  "PR",
  "PY",
  "SV",
  "UY",
  "VE",
]);

const getNavigatorLocale = (): Locale => {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const languages = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  return languages.some((language) => language.toLowerCase().startsWith("es")) ? "es" : "en";
};

const normalizeCountryCode = (value: unknown) => {
  if (typeof value !== "string") return "";
  const country = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : "";
};

const safeGetStorage = (storage: Storage | undefined, key: string) => {
  try {
    return storage?.getItem(key) || "";
  } catch {
    return "";
  }
};

const safeSetStorage = (storage: Storage | undefined, key: string, value: string) => {
  try {
    storage?.setItem(key, value);
  } catch {
    // Storage can be blocked in private or hardened browser contexts.
  }
};

const getCountryFromPayload = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as Record<string, unknown>;
  return (
    normalizeCountryCode(record.country_code) ||
    normalizeCountryCode(record.countryCode) ||
    normalizeCountryCode(record.country) ||
    normalizeCountryCode(record.country_code2)
  );
};

const getCountryFromTrace = (trace: string) => {
  const match = trace.match(/^loc=([A-Za-z]{2})$/m);
  return normalizeCountryCode(match?.[1]);
};

const fetchCountryCode = async () => {
  const cached = safeGetStorage(typeof sessionStorage === "undefined" ? undefined : sessionStorage, GEO_COUNTRY_SESSION_KEY);
  if (cached) return cached;

  const endpoint = import.meta.env.VITE_GEO_IP_URL || "https://ipapi.co/json/";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return "";

    const contentType = response.headers.get("content-type") || "";
    const country = contentType.includes("application/json")
      ? getCountryFromPayload(await response.json())
      : getCountryFromTrace(await response.text());

    if (country) safeSetStorage(typeof sessionStorage === "undefined" ? undefined : sessionStorage, GEO_COUNTRY_SESSION_KEY, country);
    return country;
  } catch {
    return "";
  } finally {
    window.clearTimeout(timeout);
  }
};

export const getStoredLocalePreference = (): Locale | null => {
  const stored = safeGetStorage(typeof localStorage === "undefined" ? undefined : localStorage, LOCALE_PREFERENCE_STORAGE_KEY);
  return stored === "es" || stored === "en" ? stored : null;
};

export const storeLocalePreference = (locale: Locale) => {
  safeSetStorage(typeof localStorage === "undefined" ? undefined : localStorage, LOCALE_PREFERENCE_STORAGE_KEY, locale);
};

export const detectPreferredLocale = async (): Promise<Locale> => {
  const storedPreference = getStoredLocalePreference();
  if (storedPreference) return storedPreference;

  const sessionLocale = safeGetStorage(typeof sessionStorage === "undefined" ? undefined : sessionStorage, DETECTED_LOCALE_SESSION_KEY);
  if (sessionLocale === "es" || sessionLocale === "en") return sessionLocale;

  const country = await fetchCountryCode();
  if (country) {
    const locale = SPANISH_FIRST_COUNTRIES.has(country) ? "es" : "en";
    safeSetStorage(typeof sessionStorage === "undefined" ? undefined : sessionStorage, DETECTED_LOCALE_SESSION_KEY, locale);
    return locale;
  }

  const locale = getNavigatorLocale();
  safeSetStorage(typeof sessionStorage === "undefined" ? undefined : sessionStorage, DETECTED_LOCALE_SESSION_KEY, locale);
  return locale;
};
