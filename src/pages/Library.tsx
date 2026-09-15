import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileSiteMenu } from "@/components/MobileSiteMenu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { alternatePathsFor, localizePath } from "@/i18n/routes";
import { useTranslation } from "@/i18n/useTranslation";
import { usePageSeo } from "@/lib/seo";

type LibraryVideo = {
  id: string;
  brand: "AIRTM" | "Takenos" | "Wallbit";
  title: string;
  videoUrl: string;
  poster?: string;
};

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Servicios", href: "/#features" },
  { label: "Contacto", href: "/#cta" },
  { label: "Blog", href: "/blog" },
];

const CALENDAR_BOOKING_URL = "https://calendar.app.google/UqwA28tsXsQCnchF6";
const EMPTY_LEAD_FORM = {
  email: "",
  fullName: "",
  brandName: "",
  websiteUrl: "",
};

type LeadFormField = keyof typeof EMPTY_LEAD_FORM;

const LIBRARY_VIDEO_NUMBERS = [10, 11, 12, 16, 17, 18, 19, 20];
const TAKENOS_VIDEOS: LibraryVideo[] = [
  { id: "takenos-01", brand: "Takenos", title: "Mashup 1", videoUrl: "/videos/takenos/takenos-01.mp4" },
  {
    id: "takenos-02",
    brand: "Takenos",
    title: "¿Sabés cómo pagar cuando viajás?",
    videoUrl: "/videos/takenos/takenos-02.mp4",
  },
  {
    id: "takenos-03",
    brand: "Takenos",
    title: "¿Te molesta que las billeteras te cobren por recibir plata de afuera?",
    videoUrl: "/videos/takenos/takenos-03.mp4",
  },
  {
    id: "takenos-04",
    brand: "Takenos",
    title: "¿Ganás guita jugando al FIFA?",
    videoUrl: "/videos/takenos/takenos-04.mp4",
  },
  {
    id: "takenos-05",
    brand: "Takenos",
    title: "¿Invertís? Contame en qué",
    videoUrl: "/videos/takenos/takenos-05.mp4",
  },
  {
    id: "takenos-06",
    brand: "Takenos",
    title: "Decime algún lujo que te des en tu día a día",
    videoUrl: "/videos/takenos/takenos-06.mp4",
  },
  {
    id: "takenos-07",
    brand: "Takenos",
    title: "¿Sabés cómo cobrar de afuera?",
    videoUrl: "/videos/takenos/takenos-07.mp4",
  },
  {
    id: "takenos-08",
    brand: "Takenos",
    title: "¿Cuánto ganás y a qué te dedicás?",
    videoUrl: "/videos/takenos/takenos-08.mp4",
  },
  { id: "takenos-09", brand: "Takenos", title: "Mashup 2", videoUrl: "/videos/takenos/takenos-09.mp4" },
];
const WALLBIT_VIDEOS: LibraryVideo[] = [
  { id: "wallbit-01", brand: "Wallbit", title: "Mashup 1", videoUrl: "/videos/wallbit/wallbit-01.mp4" },
  {
    id: "wallbit-02",
    brand: "Wallbit",
    title: "¿Cuánto ahorrás por mes?",
    videoUrl: "/videos/wallbit/wallbit-02.mp4",
  },
  {
    id: "wallbit-03",
    brand: "Wallbit",
    title: "¿Cuánto ganás y a qué te dedicás?",
    videoUrl: "/videos/wallbit/wallbit-03.mp4",
  },
  { id: "wallbit-04", brand: "Wallbit", title: "S&P 100 USD", videoUrl: "/videos/wallbit/wallbit-04.mp4" },
  { id: "wallbit-05", brand: "Wallbit", title: "Mashup 2", videoUrl: "/videos/wallbit/wallbit-05.mp4" },
  {
    id: "wallbit-06",
    brand: "Wallbit",
    title: "¿Cuánto cuesta una cuenta en el exterior?",
    videoUrl: "/videos/wallbit/wallbit-06.mp4",
  },
  {
    id: "wallbit-07",
    brand: "Wallbit",
    title: "¿Cobrar en pesos o en dólares?",
    videoUrl: "/videos/wallbit/wallbit-07.mp4",
  },
  {
    id: "wallbit-08",
    brand: "Wallbit",
    title: "¿Invertís? Contame en qué",
    videoUrl: "/videos/wallbit/wallbit-08.mp4",
  },
];
const LIBRARY_STORAGE_BUCKET = "charlando-library";
const SUPABASE_PUBLIC_URL = (
  import.meta.env.VITE_SUPABASE_URL || "https://ltgklogmxvqezlpcrghr.supabase.co"
).replace(/\/$/, "");
const DEFAULT_LIBRARY_ASSET_BASE_URL = `${SUPABASE_PUBLIC_URL}/storage/v1/object/public/${LIBRARY_STORAGE_BUCKET}`;
const LIBRARY_ASSET_BASE_URL = (
  import.meta.env.VITE_LIBRARY_ASSET_BASE_URL || DEFAULT_LIBRARY_ASSET_BASE_URL
).replace(/\/$/, "");

const getLibraryAssetUrl = (storagePath: string) => {
  return `${LIBRARY_ASSET_BASE_URL}/${storagePath}`;
};

const AIRTM_VIDEOS: LibraryVideo[] = LIBRARY_VIDEO_NUMBERS.map((number) => {
  const paddedNumber = String(number).padStart(2, "0");

  return {
    id: `charlando-video-${paddedNumber}`,
    brand: "AIRTM",
    title: `Video ${paddedNumber}`,
    videoUrl: getLibraryAssetUrl(`videos/charlando-video-${paddedNumber}.mp4`),
    poster: getLibraryAssetUrl(`posters/charlando-video-${paddedNumber}.png`),
  };
});

const LIBRARY_VIDEOS: LibraryVideo[] = [...AIRTM_VIDEOS, ...TAKENOS_VIDEOS, ...WALLBIT_VIDEOS];

const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const Library = () => {
  const { locale, t } = useTranslation();
  const leadCopy = t.leadForm;
  const navLinks = [
    { label: t.common.nav.home, href: localizePath("/", locale) },
    { label: t.common.nav.library, href: localizePath("/biblioteca", locale) },
    { label: t.common.nav.process, href: localizePath("/#proceso", locale) },
    { label: t.common.nav.services, href: localizePath("/#features", locale) },
    { label: t.common.nav.contact, href: localizePath("/#cta", locale) },
    { label: t.common.nav.blog, href: localizePath("/blog", locale) },
  ];
  const [selectedVideo, setSelectedVideo] = useState<LibraryVideo | null>(null);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadForm, setLeadForm] = useState(EMPTY_LEAD_FORM);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");

  const openLeadForm = () => {
    setLeadError("");
    setLeadFormOpen(true);
  };

  usePageSeo({
    title: t.seo.libraryTitle,
    description: t.seo.libraryDescription,
    canonicalPath: localizePath("/biblioteca", locale),
    locale,
    alternatePaths: alternatePathsFor("/biblioteca"),
  });

  const updateLeadField = (field: LeadFormField, value: string) => {
    setLeadForm((current) => ({ ...current, [field]: value }));
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadError("");

    const email = leadForm.email.trim().toLowerCase();
    const fullName = leadForm.fullName.trim();
    const brandName = leadForm.brandName.trim();
    const websiteUrl = normalizeWebsiteUrl(leadForm.websiteUrl);

    if (!email || !fullName || !brandName || !websiteUrl) {
      setLeadError(leadCopy.requiredError);
      return;
    }

    try {
      new URL(websiteUrl);
    } catch {
      setLeadError(leadCopy.urlError);
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    setLeadSubmitting(true);

    try {
      const { error } = await supabase.from("lead_submissions").insert({
        email,
        full_name: fullName,
        brand_name: brandName,
        website_url: websiteUrl,
        source: "library",
        page_path: `${window.location.pathname}${window.location.search}`,
        utm_source: searchParams.get("utm_source"),
        utm_medium: searchParams.get("utm_medium"),
        utm_campaign: searchParams.get("utm_campaign"),
      });

      if (error) {
        setLeadError(leadCopy.submitError);
        toast.error(error.message || leadCopy.submitError);
        return;
      }
    } catch {
      setLeadError(leadCopy.submitError);
      toast.error(leadCopy.submitError);
      return;
    } finally {
      setLeadSubmitting(false);
    }

    toast.success(leadCopy.success);
    setLeadForm(EMPTY_LEAD_FORM);
    setLeadFormOpen(false);
    window.location.assign(CALENDAR_BOOKING_URL);
  };

  const playPreview = (card: HTMLButtonElement) => {
    const preview = card.querySelector("video");
    if (!preview) return;
    preview.currentTime = preview.currentTime || 0;
    preview.play().catch(() => undefined);
  };

  const resetPreview = (card: HTMLButtonElement) => {
    const preview = card.querySelector("video");
    if (!preview) return;
    preview.pause();
    preview.currentTime = 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <Link to={localizePath("/", locale)} className="shrink-0">
            <Logo size="md" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="text-sm font-medium text-foreground/80 hover:text-primary px-3 py-2 rounded-full transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              className="text-xs sm:text-sm font-semibold bg-foreground text-background hover:bg-primary hover:text-background px-3 sm:px-4"
              type="button"
              onClick={openLeadForm}
              data-testid="open-lead-form-library-nav"
            >
              {t.common.bookCall}
            </Button>
            <LanguageSwitcher className="hidden lg:inline-flex" />
            <MobileSiteMenu links={navLinks} onLeadClick={openLeadForm} />
          </div>
        </div>
      </header>

      <Dialog open={leadFormOpen} onOpenChange={setLeadFormOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl border-border p-0 overflow-hidden">
          <DialogHeader>
            <div className="px-6 pt-6 sm:px-7 sm:pt-7">
              <DialogTitle className="font-display text-2xl text-foreground">
                {leadCopy.title}
              </DialogTitle>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {leadCopy.description}
              </p>
            </div>
          </DialogHeader>

          <form className="space-y-4 px-6 pb-6 sm:px-7 sm:pb-7" onSubmit={handleLeadSubmit}>
            <div className="grid gap-3">
              <div className="space-y-2">
                <Label htmlFor="library-lead-email">{leadCopy.email}</Label>
                <Input
                  id="library-lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={leadCopy.emailPlaceholder}
                  value={leadForm.email}
                  onChange={(event) => updateLeadField("email", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="library-lead-name">{leadCopy.name}</Label>
                <Input
                  id="library-lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={leadCopy.namePlaceholder}
                  value={leadForm.fullName}
                  onChange={(event) => updateLeadField("fullName", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="library-lead-brand">{leadCopy.brand}</Label>
                <Input
                  id="library-lead-brand"
                  name="brand"
                  type="text"
                  autoComplete="organization"
                  placeholder={leadCopy.brandPlaceholder}
                  value={leadForm.brandName}
                  onChange={(event) => updateLeadField("brandName", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="library-lead-website">{leadCopy.website}</Label>
                <Input
                  id="library-lead-website"
                  name="website"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder={leadCopy.websitePlaceholder}
                  value={leadForm.websiteUrl}
                  onChange={(event) => updateLeadField("websiteUrl", event.target.value)}
                  required
                />
              </div>
            </div>

            {leadError && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {leadError}
              </p>
            )}

            <DialogFooter>
              <Button type="submit" className="w-full bg-foreground text-background hover:bg-primary hover:text-background" disabled={leadSubmitting}>
                {leadSubmitting ? t.common.saving : t.common.continue} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <main className="mx-auto w-full max-w-[1600px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          className="mb-8 text-center lg:mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground text-balance sm:text-5xl lg:text-6xl">
            {t.library.title}
          </h1>
          <p className="mx-auto max-w-3xl text-balance text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {t.library.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 xl:gap-5">
          {LIBRARY_VIDEOS.map((video, index) => (
            <motion.button
              key={video.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              onClick={() => setSelectedVideo(video)}
              onMouseEnter={(event) => {
                playPreview(event.currentTarget);
              }}
              onMouseLeave={(event) => {
                resetPreview(event.currentTarget);
              }}
              onFocus={(event) => {
                playPreview(event.currentTarget);
              }}
              onBlur={(event) => {
                resetPreview(event.currentTarget);
              }}
              className="group relative overflow-hidden rounded-3xl bg-card text-left shadow-sm outline-none transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 active:scale-[0.96]"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-muted">
                <video
                  src={video.videoUrl}
                  poster={video.poster}
                  aria-label={`${t.library.preview} ${video.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground shadow-sm backdrop-blur-sm">
                  {video.brand}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="text-xs font-medium leading-snug text-white/75 sm:text-sm">{t.library.click}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      <Dialog open={Boolean(selectedVideo)} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border-0 bg-foreground p-0 shadow-2xl sm:max-w-[430px]">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideo?.title ?? t.library.modalTitle}</DialogTitle>
          </DialogHeader>
          <div className="aspect-[9/16] w-full bg-black">
            {selectedVideo && (
              <video
                key={selectedVideo.id}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.poster}
                aria-label={selectedVideo.title}
                className="h-full w-full border-0"
                autoPlay
                controls
                playsInline
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
