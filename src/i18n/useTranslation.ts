import { useLocation } from "react-router-dom";
import { en } from "./translations/en";
import { es } from "./translations/es";
import { getLocaleFromPathname, type Locale } from "./locales";

const translations = { es, en } as const;

export const useLocale = (): Locale => {
  const { pathname } = useLocation();
  return getLocaleFromPathname(pathname);
};

export const useTranslation = () => {
  const locale = useLocale();
  return {
    locale,
    t: translations[locale],
    isEnglish: locale === "en",
  };
};

export type Translations = typeof es;
