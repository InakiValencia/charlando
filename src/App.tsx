import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import Landing from "./pages/Landing";
import Library from "./pages/Library";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import CompanyPage from "./pages/CompanyPage";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Events from "./pages/dashboard/Events";
import CreateEvent from "./pages/dashboard/CreateEvent";
import EventDetail from "./pages/dashboard/EventDetail";
import Attendees from "./pages/dashboard/Attendees";
import Analytics from "./pages/dashboard/Analytics";
import Integrations from "./pages/dashboard/Integrations";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";
import { detectPreferredLocale } from "@/i18n/geoLocale";
import { getLocaleFromPathname } from "@/i18n/locales";
import { localizePath } from "@/i18n/routes";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = hash.slice(1);
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;

      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "auto" });
      return true;
    };

    if (scrollToTarget()) return;

    const timeout = window.setTimeout(scrollToTarget, 0);
    return () => window.clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
}

const STATIC_AUTO_LOCALE_PATHS = new Set([
  "/",
  "/biblioteca",
  "/blog",
  "/auth",
  "/terminos-y-condiciones",
  "/politica-de-privacidad",
  "/dashboard",
]);

const shouldAutoRedirectLocale = (pathname: string) => {
  return (
    STATIC_AUTO_LOCALE_PATHS.has(pathname) ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/register/") ||
    pathname.startsWith("/company/")
  );
};

function AutoLocaleRedirect() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (getLocaleFromPathname(pathname) === "en") return;
    if (!shouldAutoRedirectLocale(pathname)) return;

    let cancelled = false;
    detectPreferredLocale().then((preferredLocale) => {
      if (cancelled || preferredLocale !== "en") return;
      const localizedPath = localizePath(pathname, "en");
      const nextPath = `${localizedPath}${search}${hash}`;
      const currentPath = `${pathname}${search}${hash}`;
      if (nextPath !== currentPath) {
        navigate(nextPath, { replace: true });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [hash, navigate, pathname, search]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="app-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AutoLocaleRedirect />
            <Routes>
              {/* Public */}
              <Route path="/" element={<Landing />} />
              <Route path="/en" element={<Landing />} />
              <Route path="/biblioteca" element={<Library />} />
              <Route path="/en/library" element={<Library />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/en/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/en/blog/:slug" element={<BlogPost />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/en/auth" element={<Auth />} />
              <Route path="/register/:slug" element={<Register />} />
              <Route path="/en/register/:slug" element={<Register />} />
              <Route path="/company/:companySlug" element={<CompanyPage />} />
              <Route path="/en/company/:companySlug" element={<CompanyPage />} />
              <Route path="/terminos-y-condiciones" element={<TermsConditions />} />
              <Route path="/en/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />

              {/* Dashboard (protected) */}
              <Route path="/dashboard" element={<Navigate to="/dashboard/events" replace />} />
              <Route path="/en/dashboard" element={<Navigate to="/en/dashboard/events" replace />} />
              <Route path="/dashboard/*" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="events" element={<Events />} />
                      <Route path="events/create" element={<CreateEvent />} />
                      <Route path="events/:id" element={<EventDetail />} />
                      <Route path="events/:id/edit" element={<CreateEvent />} />
                      <Route path="attendees" element={<Attendees />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="integrations" element={<Integrations />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/en/dashboard/*" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="events" element={<Events />} />
                      <Route path="events/create" element={<CreateEvent />} />
                      <Route path="events/:id" element={<EventDetail />} />
                      <Route path="events/:id/edit" element={<CreateEvent />} />
                      <Route path="attendees" element={<Attendees />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="integrations" element={<Integrations />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
