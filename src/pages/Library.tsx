import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type LibraryVideo = {
  id: string;
  title: string;
  videoUrl: string;
  poster: string;
};

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Blog", href: "/blog" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Servicios", href: "/#features" },
  { label: "Contacto", href: "/#cta" },
];

const CALENDAR_BOOKING_URL = "https://calendar.app.google/47zfzDkBhp8TM1Yo6";
const EMPTY_LEAD_FORM = {
  email: "",
  fullName: "",
  brandName: "",
  websiteUrl: "",
};

type LeadFormField = keyof typeof EMPTY_LEAD_FORM;

const LIBRARY_VIDEOS: LibraryVideo[] = Array.from({ length: 10 }, (_, index) => ({
  id: `charlando-video-${String(index + 1).padStart(2, "0")}`,
  title: `Video ${String(index + 1).padStart(2, "0")}`,
  videoUrl: `/videos/charlando-video-${String(index + 1).padStart(2, "0")}.mp4`,
  poster: `/videos/posters/charlando-video-${String(index + 1).padStart(2, "0")}.png`,
}));

const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const Library = () => {
  const [selectedVideo, setSelectedVideo] = useState<LibraryVideo | null>(null);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadForm, setLeadForm] = useState(EMPTY_LEAD_FORM);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");

  const openLeadForm = () => {
    setLeadError("");
    setLeadFormOpen(true);
  };

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
      setLeadError("Completá todos los campos para agendar la llamada.");
      return;
    }

    try {
      new URL(websiteUrl);
    } catch {
      setLeadError("Ingresá una URL válida para tu página.");
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
        setLeadError("No pudimos guardar tus datos. Probá de nuevo en unos segundos.");
        toast.error(error.message || "No pudimos guardar tus datos");
        return;
      }
    } catch {
      setLeadError("No pudimos guardar tus datos. Probá de nuevo en unos segundos.");
      toast.error("No pudimos guardar tus datos");
      return;
    } finally {
      setLeadSubmitting(false);
    }

    toast.success("Datos guardados. Te llevamos al calendario.");
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
          <Link to="/" className="shrink-0">
            <Logo size="md" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
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
              Agendar llamada
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={leadFormOpen} onOpenChange={setLeadFormOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl border-border p-0 overflow-hidden">
          <DialogHeader>
            <div className="px-6 pt-6 sm:px-7 sm:pt-7">
              <DialogTitle className="font-display text-2xl text-foreground">
                Agendar llamada
              </DialogTitle>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Dejanos tus datos y avanzamos con una conversación concreta sobre tu marca.
              </p>
            </div>
          </DialogHeader>

          <form className="space-y-4 px-6 pb-6 sm:px-7 sm:pb-7" onSubmit={handleLeadSubmit}>
            <div className="grid gap-3">
              <div className="space-y-2">
                <Label htmlFor="library-lead-email">Cuál es tu mail</Label>
                <Input
                  id="library-lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@mail.com"
                  value={leadForm.email}
                  onChange={(event) => updateLeadField("email", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="library-lead-name">Cómo es tu nombre</Label>
                <Input
                  id="library-lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  value={leadForm.fullName}
                  onChange={(event) => updateLeadField("fullName", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="library-lead-brand">Cómo se llama tu marca</Label>
                <Input
                  id="library-lead-brand"
                  name="brand"
                  type="text"
                  autoComplete="organization"
                  placeholder="Nombre de tu marca"
                  value={leadForm.brandName}
                  onChange={(event) => updateLeadField("brandName", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="library-lead-website">Cuál es la URL de tu página</Label>
                <Input
                  id="library-lead-website"
                  name="website"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://tumarca.com"
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
                {leadSubmitting ? "Guardando..." : "Continuar"} <ArrowRight className="ml-1 h-4 w-4" />
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
            Biblioteca
          </h1>
          <p className="mx-auto max-w-3xl text-balance text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            Videos reales de Charlando para ver el formato, el ritmo y las reacciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 lg:grid-cols-5 xl:gap-5">
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
                  aria-label={`Preview de ${video.title}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-medium text-white/75">Click para abrir con audio</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      <Dialog open={Boolean(selectedVideo)} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border-0 bg-foreground p-0 shadow-2xl sm:max-w-[430px]">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideo?.title ?? "Video de Charlando"}</DialogTitle>
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
