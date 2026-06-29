import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Videos", href: "/#videos" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Blog", href: "/blog" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Servicios", href: "/#features" },
  { label: "Preguntas", href: "/#faq" },
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

type PublicSiteHeaderProps = {
  source?: string;
};

const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export const PublicSiteHeader = ({ source = "site" }: PublicSiteHeaderProps) => {
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
        source,
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

  const fieldPrefix = `${source}-lead`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <Logo size="md" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.href} className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <Button
              className="bg-foreground px-3 text-xs font-semibold text-background hover:bg-primary hover:text-background sm:px-4 sm:text-sm"
              type="button"
              onClick={openLeadForm}
              data-testid={`open-lead-form-${source}-nav`}
            >
              Agendar llamada
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={leadFormOpen} onOpenChange={setLeadFormOpen}>
        <DialogContent className="max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border-border p-0 sm:max-w-lg">
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
                <Label htmlFor={`${fieldPrefix}-email`}>Cuál es tu mail</Label>
                <Input
                  id={`${fieldPrefix}-email`}
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
                <Label htmlFor={`${fieldPrefix}-name`}>Cómo es tu nombre</Label>
                <Input
                  id={`${fieldPrefix}-name`}
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
                <Label htmlFor={`${fieldPrefix}-brand`}>Cómo se llama tu marca</Label>
                <Input
                  id={`${fieldPrefix}-brand`}
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
                <Label htmlFor={`${fieldPrefix}-website`}>Cuál es la URL de tu página</Label>
                <Input
                  id={`${fieldPrefix}-website`}
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
    </>
  );
};
