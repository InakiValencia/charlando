import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/useTranslation";
import { switchLocalePath } from "@/i18n/routes";
import type { Locale } from "@/i18n/locales";
import { storeLocalePreference } from "@/i18n/geoLocale";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const location = useLocation();
  const nextLocale: Locale = locale === "en" ? "es" : "en";
  const label = nextLocale === "en" ? "EN" : "ES";

  return (
    <Button
      asChild
      type="button"
      variant="outline"
      className={`h-10 rounded-full border-border bg-background px-3 text-xs font-bold tracking-[0.12em] text-foreground hover:bg-muted ${className || ""}`}
      aria-label={nextLocale === "en" ? "Switch to English" : "Cambiar a español"}
    >
      <Link
        to={switchLocalePath(location.pathname, nextLocale, location.hash)}
        onClick={() => storeLocalePreference(nextLocale)}
      >
        {label}
      </Link>
    </Button>
  );
}
