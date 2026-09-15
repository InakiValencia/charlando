import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { localizePath } from "@/i18n/routes";
import { useTranslation } from "@/i18n/useTranslation";
import { usePageSeo } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();
  const { locale, t } = useTranslation();

  usePageSeo({
    title: `${t.notFound.title} | Charlando`,
    description: t.notFound.subtitle,
    canonicalPath: localizePath("/", locale),
    locale,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.notFound.subtitle}</p>
        <Link to={localizePath("/", locale)} className="text-primary underline hover:text-primary/90">
          {t.notFound.home}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
