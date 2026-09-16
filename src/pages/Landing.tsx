import { useState, useEffect, type FormEvent } from "react";
import { Logo } from "@/components/Logo";
import { MobileSiteMenu } from "@/components/MobileSiteMenu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Puzzle,
  ArrowRight,
  Mic,
  Plus,
  Minus,
  Globe2,
  UserPlus,
} from "lucide-react";

import eventHackathon from "@/assets/event-hackathon-ai.jpg";
import eventSummit from "@/assets/event-vibe-coding-summit.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMarcus from "@/assets/avatar-marcus.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import { supabase } from "@/integrations/supabase/client";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { alternatePathsFor, localizePath } from "@/i18n/routes";
import { useTranslation } from "@/i18n/useTranslation";
import { usePageSeo } from "@/lib/seo";


const features = [
  {
    title: "Estrategia Creativa",
    description: "Entendemos tu marca, tu audiencia y tu objetivo. Diseñamos preguntas, hooks y ángulos creativos para que cada entrevista tenga intención.",
  },
  {
    title: "Grabación en la calle",
    description: "Salimos con hosts y equipo de video para capturar respuestas reales de personas reales, en ubicaciones alineadas con tu público objetivo.",
  },
  {
    title: "Listo para viralizar",
    description: "Convertimos el material crudo en videos verticales con ritmo, subtítulos, hooks, cortes dinámicos y CTAs",
  },
];

const MESSAGE_STAGES = [
  {
    label: "Atención",
    title: "Ganate el primer segundo",
    text: "Las marcas empiezan con un mensaje. Nosotros, con un momento. Una reacción real, cruda y natural que frena el scroll.",
  },
  {
    label: "Confianza",
    title: "Donde se toman las decisiones",
    text: "Las preguntas, las objeciones y la respuesta honesta. Nada se recorta para no perder credibilidad. Ahí se construye la confianza.",
  },
  {
    label: "Acción",
    title: "Hacé fácil decir que sí",
    text: "Con atención y confianza ganadas, convertimos esas reacciones reales en piezas que llevan a la conversión.",
  },
];

const AVATAR_URLS = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=8",
  "https://i.pravatar.cc/150?img=9",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=16",
];

const LOGO_URLS = [
  { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/tiktok-icon.svg", name: "TikTok" },
  { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/instagram-icon.svg", name: "Instagram" },
  { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/youtube-icon.svg", name: "YouTube" },
  { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/meta-icon.svg", name: "Meta" },
  { src: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/facebook.svg", name: "Facebook" },
  { src: "https://cdn.simpleicons.org/snapchat/000000", name: "Snapchat" },
];

const HOST_PROFILES = [
  { name: "Imanol", image: "/host-imanol.jpg" },
  { name: "Carolina", image: "/host-carolina.jpg" },
  { name: "Juan", image: "/host-juan.jpg" },
];

type BentoAccents = { integrationCircle: string; attendeeBorder: string; analyticsBars: string; analyticsAccent: string; pageButton: string };

function IllustrationPages({ accents }: { accents: BentoAccents }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-[70%] bg-white rounded-2xl shadow-lg overflow-hidden border border-border">
        <div className="relative">
          <img src={eventSummit} alt="Video vertical" className="w-full h-36 object-cover" />
          <div className="absolute top-2 left-2 bg-foreground text-background text-[9px] font-bold px-2 py-0.5 rounded-full">REAL</div>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: accents.analyticsAccent }}>Hook</span>
            <span className="h-1 flex-1 rounded-full bg-muted" />
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-full bg-muted" />
            <div className="h-1.5 w-3/4 rounded-full bg-muted" />
          </div>
          <div className="flex gap-1.5 pt-1">
            <div className="h-6 rounded-full flex-1 flex items-center justify-center" style={{ backgroundColor: accents.pageButton }}>
              <span className="text-[9px] text-white font-semibold">CTA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IllustrationAnalytics({ accents }: { accents: BentoAccents }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-[85%] bg-white rounded-2xl shadow-lg p-4 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Mic className="w-4 h-4" style={{ color: accents.analyticsAccent }} />
          <span className="text-[10px] font-bold" style={{ color: accents.analyticsAccent }}>REC</span>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accents.analyticsBars }} />
          <span className="ml-auto text-[9px] text-muted-foreground">00:24</span>
        </div>
        <div className="flex items-end gap-1 h-20">
          {[30, 60, 45, 80, 55, 70, 40, 65, 35, 75, 50, 60, 40, 55].map((h, i) => (
            <div key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, backgroundColor: accents.analyticsBars }} />
          ))}
        </div>
        <p className="text-[8px] text-muted-foreground mt-2 text-center">Live interview · Real person</p>
      </div>
    </div>
  );
}

function IllustrationIntegrations({ accents }: { accents: BentoAccents }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: accents.integrationCircle }}>
        <Puzzle className="w-8 h-8 text-white" />
      </div>
      {LOGO_URLS.map((logo, i) => {
        const angle = (i * 60 - 90) * Math.PI / 180;
        const r = 85;
        return (
          <div key={i} className="absolute w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center border border-border" style={{ left: `calc(50% + ${Math.cos(angle) * r}px - 28px)`, top: `calc(50% + ${Math.sin(angle) * r}px - 28px)` }}>
            <img src={logo.src} alt={logo.name} className="w-8 h-8" />
          </div>
        );
      })}
    </div>
  );
}

function IllustrationAttendees({ accents }: { accents: BentoAccents }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-4">
        {AVATAR_URLS.map((url, i) => (
          <div key={i} className="w-16 h-16 rounded-full overflow-hidden shadow-md border-[3px]" style={{ borderColor: accents.attendeeBorder }}>
            <img src={url} alt={`Real person ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

const ILLUSTRATIONS = [IllustrationPages, IllustrationAnalytics, IllustrationIntegrations, IllustrationAttendees];

const rotatingWords = ["TikTok.", "Reels.", "Shorts.", "marcas."];

const FEATURED_VIDEOS = [
  "/featured-video-3.jpg",
  "/featured-video-4.jpg",
  "/featured-video-5.png",
  "/featured-video-6.png",
  "/featured-video-10.png",
  "/featured-video-11.png",
  "/featured-video-12.png",
  "/featured-video-13.png",
];

const HERO_IMAGES = [
  "/hero-card-1.jpg",
  "/hero-card-2.jpg",
  "/hero-card-3.png",
  "/hero-card-4.png",
];

const CREATIVE_STRATEGY_IMAGE = "/creative-strategy.png";
const STREET_RECORDING_IMAGE = "/street-recording.png";

const CONFETTI_COLORS = ["#24b5cf", "#0A0A0A", "#1698ad", "#9CA3AF", "#24b5cf", "#0A0A0A"];
const CONFETTI_SHAPES = ["circle", "square", "triangle", "line"] as const;

const cornerSeeds = [
  [
    { x: -40, y: -20, shape: 0, color: 0, rot: 12, baseSize: 12 },
    { x: 220, y: -30, shape: 1, color: 1, rot: 45, baseSize: 8 },
    { x: -25, y: 200, shape: 2, color: 2, rot: -20, baseSize: 14 },
    { x: 240, y: 50, shape: 0, color: 3, rot: 0, baseSize: 5 },
    { x: -30, y: 100, shape: 3, color: 4, rot: 30, baseSize: 10 },
    { x: 200, y: 200, shape: 1, color: 1, rot: 15, baseSize: 6 },
    { x: 100, y: -35, shape: 0, color: 5, rot: 0, baseSize: 7 },
    { x: -45, y: 150, shape: 2, color: 0, rot: 55, baseSize: 9 },
  ],
  [
    { x: 230, y: -20, shape: 1, color: 1, rot: 22, baseSize: 7 },
    { x: -35, y: 40, shape: 2, color: 3, rot: 15, baseSize: 12 },
    { x: 40, y: -30, shape: 0, color: 0, rot: 0, baseSize: 10 },
    { x: 220, y: 190, shape: 3, color: 2, rot: -40, baseSize: 10 },
    { x: -20, y: 200, shape: 1, color: 4, rot: 60, baseSize: 6 },
    { x: 150, y: -40, shape: 0, color: 5, rot: 0, baseSize: 8 },
    { x: -50, y: 120, shape: 2, color: 1, rot: 35, baseSize: 11 },
    { x: 250, y: 80, shape: 3, color: 0, rot: -15, baseSize: 9 },
  ],
  [
    { x: 230, y: -25, shape: 0, color: 4, rot: 0, baseSize: 10 },
    { x: -35, y: 70, shape: 1, color: 1, rot: 35, baseSize: 7 },
    { x: 40, y: -30, shape: 2, color: 2, rot: 40, baseSize: 13 },
    { x: 240, y: 180, shape: 0, color: 3, rot: 0, baseSize: 5 },
    { x: -25, y: 190, shape: 3, color: 0, rot: -25, baseSize: 10 },
    { x: 100, y: -40, shape: 1, color: 5, rot: 20, baseSize: 8 },
    { x: -50, y: 140, shape: 0, color: 4, rot: 0, baseSize: 6 },
    { x: 250, y: 60, shape: 2, color: 2, rot: -50, baseSize: 11 },
  ],
  [
    { x: -40, y: 30, shape: 1, color: 3, rot: 18, baseSize: 8 },
    { x: 230, y: -25, shape: 2, color: 1, rot: -30, baseSize: 14 },
    { x: 50, y: 200, shape: 0, color: 4, rot: 0, baseSize: 8 },
    { x: 240, y: 100, shape: 3, color: 2, rot: 50, baseSize: 10 },
    { x: 20, y: -30, shape: 0, color: 0, rot: 0, baseSize: 6 },
    { x: -30, y: 160, shape: 1, color: 5, rot: -40, baseSize: 7 },
    { x: 180, y: -45, shape: 2, color: 3, rot: 25, baseSize: 10 },
    { x: -45, y: 90, shape: 0, color: 1, rot: 0, baseSize: 9 },
  ],
];

function ConfettiLayer({ size, opacity, count, spread }: { size: number; opacity: number; count: number; spread: number }) {
  const corners = [
    { side: "left" as const, vSide: "top" as const, originX: 105, originY: 95 },
    { side: "left" as const, vSide: "bottom" as const, originX: 95, originY: -95 },
    { side: "right" as const, vSide: "top" as const, originX: -105, originY: 95 },
    { side: "right" as const, vSide: "bottom" as const, originX: -105, originY: -95 },
  ];

  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      {corners.map((corner, ci) =>
        cornerSeeds[ci].slice(0, count).map((seed, si) => {
          const s = seed.baseSize * size;
          const finalX = seed.x * spread;
          const finalY = seed.y * spread;
          const color = CONFETTI_COLORS[seed.color % CONFETTI_COLORS.length];
          const shape = CONFETTI_SHAPES[seed.shape % CONFETTI_SHAPES.length];

          const sharedMotion = {
            initial: {
              [corner.side]: corner.originX,
              [corner.vSide]: Math.abs(corner.originY),
              opacity: 0,
              scale: 0,
              rotate: 0,
            },
            animate: {
              [corner.side]: finalX,
              [corner.vSide]: finalY < 0 ? Math.abs(finalY) : finalY,
              opacity,
              scale: 1,
              rotate: seed.rot,
            },
            transition: {
              delay: 0.8 + si * 0.06 + ci * 0.04,
              duration: 0.5,
              type: "spring" as const,
              stiffness: 200,
              damping: 15,
            },
          };

          const posStyle: React.CSSProperties = { position: "absolute" };

          if (shape === "circle") {
            return <motion.div key={`${ci}-${si}`} {...sharedMotion} style={{ ...posStyle, width: s, height: s, borderRadius: "50%", backgroundColor: color }} />;
          }
          if (shape === "square") {
            return <motion.div key={`${ci}-${si}`} {...sharedMotion} style={{ ...posStyle, width: s, height: s, borderRadius: 2, backgroundColor: color }} />;
          }
          if (shape === "line") {
            return <motion.div key={`${ci}-${si}`} {...sharedMotion} style={{ ...posStyle, width: s, height: s * 0.25, borderRadius: 99, backgroundColor: color }} />;
          }
          const half = s / 2;
          return (
            <motion.div
              key={`${ci}-${si}`}
              {...sharedMotion}
              style={{
                ...posStyle,
                width: 0,
                height: 0,
                borderLeft: `${half}px solid transparent`,
                borderRight: `${half}px solid transparent`,
                borderBottom: `${s * 0.85}px solid ${color}`,
                backgroundColor: "transparent",
              }}
            />
          );
        })
      )}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Inicio", href: "#top", external: false },
  { label: "Biblioteca", href: "/biblioteca", external: true },
  { label: "Proceso", href: "#proceso", external: false },
  { label: "Servicios", href: "#features", external: false },
  { label: "Contacto", href: "#cta", external: false },
  { label: "Blog", href: "/blog", external: true },
];

const FAQS = [
  {
    q: "¿Qué hace exactamente Charlando?",
    a: "Creamos entrevistas callejeras para marcas. Nos encargamos de pensar el concepto, diseñar las preguntas, grabar con personas reales y entregar videos editados para redes y campañas digitales.",
  },
  {
    q: "¿Qué diferencia a Charlando de una agencia tradicional?",
    a: "No hacemos publicidad que parece publicidad. Creamos conversaciones reales que se sienten nativas en redes. La marca aparece dentro de una interacción humana, no como un anuncio forzado.",
  },
  {
    q: "¿Los videos sirven para pauta o solo orgánico?",
    a: "Sirven para ambas cosas. Podemos editar piezas para TikTok Ads, Meta Ads, Instagram Reels, YouTube Shorts, Stories y contenido orgánico.",
  },
  {
    q: "¿Las personas entrevistadas firman autorización?",
    a: "Sí. Las personas que aparecen en los videos deben autorizar el uso de su imagen y voz. Lo manejamos mediante formulario digital o QR para dejar el proceso ordenado.",
  },
  {
    q: "¿Aceptan proyectos puntuales?",
    a: "Sí. Podemos hacer una primera jornada de contenido o un paquete inicial. Si la marca necesita volumen constante, también trabajamos con planes mensuales.",
  },
  {
    q: "¿Qué tipo de marcas pueden trabajar con Charlando?",
    a: "Marcas de consumo, moda, belleza, wellness, alimentos, bebidas, tecnología, apps, retail, eventos, entretenimiento y servicios. El formato funciona especialmente bien cuando el producto necesita explicación, reacción o prueba social.",
  },
  {
    q: "¿Las respuestas son guionadas?",
    a: "No. Las respuestas son reales. Lo que sí hacemos es guiar la conversación con preguntas pensadas estratégicamente para que el contenido tenga dirección y sea útil para la marca.",
  },
  {
    q: "¿Pueden entrevistar públicos específicos?",
    a: "Sí. Podemos adaptar locaciones, horarios, tono, preguntas y hosts según el público objetivo: jóvenes, adultos, familias, estudiantes, profesionales, consumidores premium o nichos específicos.",
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "Planeamos", text: "Entendemos tu producto y marca. En base a eso diseñamos preguntas, hooks y ángulos para generar respuestas naturales y transmitir tu mensaje." },
  { n: "02", title: "Producimos", text: "Grabamos entrevistas callejeras con personas reales, cuidando energía, sonido, encuadre y contexto." },
  { n: "03", title: "Editamos", text: "Creamos piezas verticales optimizadas para retención, claridad y conversión." },
  { n: "04", title: "Entregamos", text: "Recibís videos listos para publicar, pautar y testear en diferentes plataformas." },
];

const HOSTS = [
  { label: "Host urbano", avatar: AVATAR_URLS[0] },
  { label: "Host lifestyle", avatar: AVATAR_URLS[1] },
  { label: "Host producto", avatar: AVATAR_URLS[2] },
  { label: "Host retail", avatar: AVATAR_URLS[3] },
  { label: "Host eventos", avatar: AVATAR_URLS[4] },
];

const COLLABORATOR_BRANDS = [
  { name: "Café Delirante", logo: "/cafe-delirante-logo.png" },
  { name: "Mundo Mogul MDP", logo: "/mundo-mogul-mdp-logo.jpg" },
  { name: "Swap Style", logo: "/swap-style-logo.jpg" },
  { name: "AIRTM", logo: "/airtm-logo.png" },
  { name: "Wallbit", logo: "/wallbit-logo.png" },
  { name: "Takenos", logo: "/takenos-logo.png" },
  { name: "John Foos", logo: "/john-foos-logo.jpg" },
];

const FULL_SECTION_CLASS = "flex items-center py-20 sm:py-24 lg:py-32";
const SECTION_HEADER_CLASS = "text-center mb-12 lg:mb-16";
const SECTION_TITLE_CLASS = "mb-5 font-display text-[2.55rem] leading-[0.98] tracking-[-0.03em] sm:mb-6 sm:text-[3.25rem] lg:text-[3.85rem]";
const FOOTER_LINK_CLASS = "inline-flex min-h-10 min-w-10 items-center transition-colors hover:text-primary";
const CALENDAR_BOOKING_URL = "https://calendar.app.google/UqwA28tsXsQCnchF6";
const EMPTY_LEAD_FORM = {
  email: "",
  fullName: "",
  brandName: "",
  websiteUrl: "",
};
const EMPTY_HOST_APPLICATION_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  cityLocation: "",
  socialFollowing: "",
  socialHandle: "",
  age: "",
  motivation: "",
};

const SOCIAL_FOLLOWING_OPTIONS = [
  "Estoy empezando",
  "Tengo una comunidad chica",
  "Tengo una comunidad activa",
  "Ya creo contenido seguido",
  "Ya tengo experiencia como host",
];

type LeadFormField = keyof typeof EMPTY_LEAD_FORM;
type HostApplicationFormField = keyof typeof EMPTY_HOST_APPLICATION_FORM;

const normalizeWebsiteUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const Landing = () => {
  const { locale, t } = useTranslation();
  const landing = t.landing;
  const leadCopy = t.leadForm;
  const hostFormCopy = landing.hostForm;
  const localizedHome = localizePath("/", locale);
  const localizedLibrary = localizePath("/biblioteca", locale);
  const localizedTerms = localizePath("/terminos-y-condiciones", locale);
  const localizedPrivacy = localizePath("/politica-de-privacidad", locale);
  const navLinks = [
    { label: t.common.nav.home, href: localizePath("/#top", locale), external: false },
    { label: t.common.nav.library, href: localizedLibrary, external: true },
    { label: t.common.nav.process, href: localizePath("/#proceso", locale), external: false },
    { label: t.common.nav.services, href: localizePath("/#features", locale), external: false },
    { label: t.common.nav.contact, href: localizePath("/#cta", locale), external: false },
    { label: t.common.nav.blog, href: localizePath("/blog", locale), external: true },
  ];
  const rotatingCopy = landing.rotatingWords;
  const processSteps = landing.process.steps;
  const messageStages = landing.why.stages;
  const faqItems = landing.faq.items;
  const featureItems = landing.features.items;
  const [wordIndex, setWordIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [leadForm, setLeadForm] = useState(EMPTY_LEAD_FORM);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [hostApplicationOpen, setHostApplicationOpen] = useState(false);
  const [hostApplicationForm, setHostApplicationForm] = useState(EMPTY_HOST_APPLICATION_FORM);
  const [hostApplicationSubmitting, setHostApplicationSubmitting] = useState(false);
  const [hostApplicationError, setHostApplicationError] = useState("");
  const [activeProcessStep, setActiveProcessStep] = useState<number | null>(null);
  const titleWeight = 700;
  const confettiSize = 2.5;
  const confettiOpacity = 0.8;
  const confettiCount = 8;
  const confettiSpread = 1.0;

  const bentoPresets = [
    {
      label: "Clean",
      cardBg: "bg-muted/40",
      colors: [
        "bg-[hsl(189,70%,96%)]",
        "bg-[hsl(0,0%,97%)]",
        "bg-[hsl(189,70%,96%)]",
        "bg-[hsl(0,0%,97%)]",
      ],
      accents: { integrationCircle: "hsl(189,70%,48%)", attendeeBorder: "hsl(189,70%,48%)", analyticsBars: "hsl(189,70%,48%)", analyticsAccent: "hsl(189,70%,38%)", pageButton: "hsl(0,0%,4%)" },
    },
    {
      label: "Neutral",
      cardBg: "bg-background",
      colors: ["bg-background", "bg-background", "bg-background", "bg-background"],
      accents: { integrationCircle: "hsl(0,0%,4%)", attendeeBorder: "hsl(189,70%,48%)", analyticsBars: "hsl(189,70%,48%)", analyticsAccent: "hsl(0,0%,4%)", pageButton: "hsl(189,70%,48%)" },
    },
    {
      label: "Bold",
      cardBg: "bg-muted/40",
      colors: [
        "bg-[hsl(189,70%,92%)]",
        "bg-[hsl(189,70%,96%)]",
        "bg-[hsl(0,0%,95%)]",
        "bg-[hsl(189,70%,92%)]",
      ],
      accents: { integrationCircle: "hsl(189,70%,48%)", attendeeBorder: "hsl(0,0%,4%)", analyticsBars: "hsl(189,70%,48%)", analyticsAccent: "hsl(189,70%,38%)", pageButton: "hsl(189,70%,48%)" },
    },
  ];
  const currentPreset = bentoPresets[0];

  usePageSeo({
    title: t.seo.landingTitle,
    description: t.seo.landingDescription,
    canonicalPath: localizedHome,
    locale,
    alternatePaths: alternatePathsFor("/"),
  });

  const openLeadForm = () => {
    setLeadError("");
    setLeadFormOpen(true);
  };

  const updateLeadField = (field: LeadFormField, value: string) => {
    setLeadForm((current) => ({ ...current, [field]: value }));
  };

  const openHostApplicationForm = () => {
    setHostApplicationError("");
    setHostApplicationOpen(true);
  };

  const updateHostApplicationField = (field: HostApplicationFormField, value: string) => {
    setHostApplicationForm((current) => ({ ...current, [field]: value }));
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
        source: "landing",
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

  const handleHostApplicationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHostApplicationError("");

    const firstName = hostApplicationForm.firstName.trim();
    const lastName = hostApplicationForm.lastName.trim();
    const email = hostApplicationForm.email.trim().toLowerCase();
    const cityLocation = hostApplicationForm.cityLocation.trim();
    const socialFollowing = hostApplicationForm.socialFollowing.trim();
    const socialHandle = hostApplicationForm.socialHandle.trim();
    const age = Number.parseInt(hostApplicationForm.age, 10);
    const motivation = hostApplicationForm.motivation.trim();

    if (!firstName || !lastName || !email || !cityLocation || !socialFollowing || !socialHandle || !hostApplicationForm.age || !motivation) {
      setHostApplicationError(hostFormCopy.requiredError);
      return;
    }

    if (!Number.isFinite(age) || age < 18 || age > 100) {
      setHostApplicationError(hostFormCopy.ageError);
      return;
    }

    if (motivation.length < 20) {
      setHostApplicationError(hostFormCopy.motivationError);
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    setHostApplicationSubmitting(true);

    try {
      const { error } = await supabase.from("host_applications").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        city_location: cityLocation,
        social_following: socialFollowing,
        social_platform_handle: socialHandle,
        age,
        motivation,
        source: "landing_hosts",
        page_path: `${window.location.pathname}${window.location.search}`,
        utm_source: searchParams.get("utm_source"),
        utm_medium: searchParams.get("utm_medium"),
        utm_campaign: searchParams.get("utm_campaign"),
      });

      if (error) {
        setHostApplicationError(hostFormCopy.submitError);
        toast.error(error.message || hostFormCopy.submitError);
        return;
      }
    } catch {
      setHostApplicationError(hostFormCopy.submitError);
      toast.error(hostFormCopy.submitError);
      return;
    } finally {
      setHostApplicationSubmitting(false);
    }

    toast.success(hostFormCopy.success);
    setHostApplicationForm(EMPTY_HOST_APPLICATION_FORM);
    setHostApplicationOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingCopy.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingCopy.length]);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    let frame = 0;

    const updateActiveProcessStep = () => {
      frame = 0;
      if (!mediaQuery.matches) {
        setActiveProcessStep(null);
        return;
      }

      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-process-card]"));
      const targetY = window.innerHeight * 0.52;
      const closest = cards.reduce<{ index: number; distance: number } | null>((best, card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return best;

        const index = Number(card.dataset.processCard);
        const distance = Math.abs(rect.top + rect.height / 2 - targetY);
        return !best || distance < best.distance ? { index, distance } : best;
      }, null);

      if (closest) {
        setActiveProcessStep(closest.index);
      }
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveProcessStep);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mediaQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mediaQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background overflow-x-clip">
      {/* Navbar — hidden until scroll */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-[72px] px-6 lg:px-8">
          <Link to={localizedHome} className="shrink-0">
            <Logo size="md" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              l.external ? (
                <Link key={l.label} to={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary px-3 py-2 rounded-full transition-colors">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary px-3 py-2 rounded-full transition-colors">
                  {l.label}
                </a>
              )
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              className="text-xs sm:text-sm font-semibold bg-foreground text-background hover:bg-primary hover:text-background px-3 sm:px-4"
              type="button"
              onClick={openLeadForm}
              data-testid="open-lead-form-nav"
            >
              {t.common.bookCall}
            </Button>
            <LanguageSwitcher className="hidden lg:inline-flex" />
            <MobileSiteMenu links={navLinks} onLeadClick={openLeadForm} />
          </div>
        </div>
      </motion.nav>

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
                <Label htmlFor="lead-email">{leadCopy.email}</Label>
                <Input
                  id="lead-email"
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
                <Label htmlFor="lead-name">{leadCopy.name}</Label>
                <Input
                  id="lead-name"
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
                <Label htmlFor="lead-brand">{leadCopy.brand}</Label>
                <Input
                  id="lead-brand"
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
                <Label htmlFor="lead-website">{leadCopy.website}</Label>
                <Input
                  id="lead-website"
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

      <Dialog open={hostApplicationOpen} onOpenChange={setHostApplicationOpen}>
        <DialogContent className="max-h-[calc(100svh-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border-border p-0 sm:max-w-2xl">
          <DialogHeader>
            <div className="px-6 pt-6 sm:px-7 sm:pt-7">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Globe2 className="h-3.5 w-3.5" />
                {hostFormCopy.badge}
              </div>
              <DialogTitle className="font-display text-2xl text-foreground sm:text-3xl">
                {hostFormCopy.title}
              </DialogTitle>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {hostFormCopy.description}
              </p>
            </div>
          </DialogHeader>

          <form className="space-y-4 px-6 pb-6 sm:px-7 sm:pb-7" onSubmit={handleHostApplicationSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="host-first-name">{hostFormCopy.firstName}</Label>
                <Input
                  id="host-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder={hostFormCopy.firstNamePlaceholder}
                  value={hostApplicationForm.firstName}
                  onChange={(event) => updateHostApplicationField("firstName", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="host-last-name">{hostFormCopy.lastName}</Label>
                <Input
                  id="host-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder={hostFormCopy.lastNamePlaceholder}
                  value={hostApplicationForm.lastName}
                  onChange={(event) => updateHostApplicationField("lastName", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="host-email">{hostFormCopy.email}</Label>
              <Input
                id="host-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@mail.com"
                value={hostApplicationForm.email}
                onChange={(event) => updateHostApplicationField("email", event.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
              <Label htmlFor="host-city">{hostFormCopy.city}</Label>
                <Input
                  id="host-city"
                  name="cityLocation"
                  type="text"
                  autoComplete="address-level2"
                  placeholder={hostFormCopy.cityPlaceholder}
                  value={hostApplicationForm.cityLocation}
                  onChange={(event) => updateHostApplicationField("cityLocation", event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="host-age">{hostFormCopy.age}</Label>
                <Input
                  id="host-age"
                  name="age"
                  type="number"
                  inputMode="numeric"
                  min={18}
                  max={100}
                  placeholder="22"
                  value={hostApplicationForm.age}
                  onChange={(event) => updateHostApplicationField("age", event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="host-social-following">{hostFormCopy.following}</Label>
              <Select
                value={hostApplicationForm.socialFollowing}
                onValueChange={(value) => updateHostApplicationField("socialFollowing", value)}
                required
              >
                <SelectTrigger id="host-social-following">
                  <SelectValue placeholder={hostFormCopy.followingPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {hostFormCopy.followingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="host-social-handle">{hostFormCopy.handle}</Label>
              <Input
                id="host-social-handle"
                name="socialHandle"
                type="text"
                placeholder={hostFormCopy.handlePlaceholder}
                value={hostApplicationForm.socialHandle}
                onChange={(event) => updateHostApplicationField("socialHandle", event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="host-motivation">{hostFormCopy.motivation}</Label>
              <Textarea
                id="host-motivation"
                name="motivation"
                className="min-h-28 resize-y"
                placeholder={hostFormCopy.motivationPlaceholder}
                value={hostApplicationForm.motivation}
                onChange={(event) => updateHostApplicationField("motivation", event.target.value)}
                required
              />
            </div>

            {hostApplicationError && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                {hostApplicationError}
              </p>
            )}

            <DialogFooter>
              <Button type="submit" className="w-full bg-foreground text-background hover:bg-primary hover:text-background" disabled={hostApplicationSubmitting}>
                {hostApplicationSubmitting ? hostFormCopy.submitting : hostFormCopy.submit} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hero */}
      <section className="relative min-h-[94svh] overflow-hidden flex items-center">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="relative min-h-[calc(94svh-5rem)] flex items-center justify-center">

            <ConfettiLayer size={confettiSize} opacity={confettiOpacity} count={confettiCount} spread={confettiSpread} />

            {/* Top-left card */}
            <motion.div
              className="hidden md:block absolute left-[-80px] lg:left-[-20px] top-[10px] w-[140px] lg:w-[170px]"
              initial={{ opacity: 0, scale: 0.3, x: -80, y: -60 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg rotate-[6deg] bg-card aspect-[9/16] relative">
	                <img src={HERO_IMAGES[0]} alt={landing.hero.imageAlt} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-semibold text-primary bg-white/90 backdrop-blur px-2 py-0.5 rounded-full">Street Interview</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom-left card */}
            <motion.div
              className="hidden md:block absolute left-[-100px] lg:left-[-40px] bottom-[10px] w-[140px] lg:w-[170px]"
              initial={{ opacity: 0, scale: 0.3, x: -80, y: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.35 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg rotate-[-5deg] bg-card aspect-[9/16] relative">
	                <img src={HERO_IMAGES[1]} alt={landing.hero.imageAlt} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Top-right card */}
            <motion.div
              className="hidden md:block absolute right-[-80px] lg:right-[-20px] top-[10px] w-[140px] lg:w-[170px]"
              initial={{ opacity: 0, scale: 0.3, x: 80, y: -60 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.25 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg rotate-[-6deg] bg-card aspect-[9/16] relative">
	                <img src={HERO_IMAGES[2]} alt={landing.hero.imageAlt} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-semibold text-primary bg-white/90 backdrop-blur px-2 py-0.5 rounded-full">Product Reaction</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom-right card */}
            <motion.div
              className="hidden md:block absolute right-[-100px] lg:right-[-40px] bottom-[10px] w-[140px] lg:w-[170px]"
              initial={{ opacity: 0, scale: 0.3, x: 80, y: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg rotate-[5deg] bg-card aspect-[9/16] relative">
	                <img src={HERO_IMAGES[3]} alt={landing.hero.imageAlt} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Center — headline */}
            <motion.div
              className="text-center max-w-4xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Logo size="xl" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {locale === "en" ? "Real people · Real reactions · Real results" : "Personas reales · Reacciones reales · Resultados reales"}
              </div>
              <h1 className="text-balance text-[34px] min-[360px]:text-[38px] sm:text-[56px] md:text-[64px] lg:text-[76px] 2xl:text-[84px] font-display tracking-tight leading-[1.08] text-foreground mb-6" style={{ fontWeight: titleWeight }}>
                <span className="inline-flex flex-col items-center">
                  <span>{locale === "en" ? "Conversations that" : "Conversaciones que"}</span>
                  <span className="inline-flex translate-x-1 items-baseline justify-center gap-x-[0.18em] whitespace-nowrap min-[360px]:translate-x-3 sm:translate-x-7 lg:translate-x-9">
                    <span>{locale === "en" ? "turn into" : "convierten en"}</span>
                    <span className="inline-block relative text-left" style={{ minWidth: "7ch" }}>
                      <AnimatePresence initial={false} mode="wait">
                        <motion.span
                          key={rotatingCopy[wordIndex]}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -16 }}
                          transition={{ duration: 0.35 }}
                          className="text-primary inline-block"
                        >
                          {rotatingCopy[wordIndex]}
                        </motion.span>
                      </AnimatePresence>
                      <span className="invisible block h-0 overflow-hidden" aria-hidden="true">Shorts.</span>
                    </span>
                  </span>
                </span>
              </h1>
              <div className="md:hidden grid grid-cols-4 gap-2 max-w-[350px] mx-auto mb-5 px-2">
                {HERO_IMAGES.map((image, i) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 18, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: i === 0 ? -5 : i === 3 ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.2 + i * 0.1 }}
                    className={`relative overflow-hidden rounded-xl bg-card shadow-lg aspect-[9/16] ${i === 1 || i === 2 ? "-translate-y-2" : ""}`}
                  >
                    <img src={image} alt={landing.hero.imageAlt} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  </motion.div>
                ))}
              </div>
              <p className="text-pretty text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed">
                {landing.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="text-lg font-semibold px-9 h-14 bg-foreground text-background hover:bg-primary hover:text-background"
                  type="button"
                  onClick={openLeadForm}
                  data-testid="open-lead-form-hero"
                >
                  {landing.hero.primaryCta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg font-semibold px-9 h-14 border-foreground/15" asChild>
                  <a href="#videos">{landing.hero.secondaryCta}</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-5">{landing.hero.note}</p>
              <p className="text-base font-semibold text-primary mt-1.5">{landing.hero.metric}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Videos destacados */}
      <section id="videos" className="flex items-center pb-0 pt-20 sm:pb-0 sm:pt-24 lg:pb-2 lg:pt-32">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center mb-10 lg:mb-12">
            <h2 className={`${SECTION_TITLE_CLASS} text-foreground text-center`} style={{ fontWeight: titleWeight }}>
              {landing.videos.title}
            </h2>
          </div>
          <div
            className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] sm:px-6 lg:w-[calc(100vw-3rem)] lg:px-0"
            data-testid="featured-videos-carousel"
          >
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
              data-testid="featured-videos-track"
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5 lg:gap-6 lg:pr-6" aria-hidden={copy === 1}>
                  {FEATURED_VIDEOS.map((video, i) => (
                    <div
                      key={`${video}-${copy}`}
                      className="w-[72vw] max-w-[330px] shrink-0 sm:w-[260px] lg:w-[275px] xl:w-[290px] 2xl:w-[305px]"
                    >
                      <div className="group cursor-pointer">
                        <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[9/16] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                          <img
                            src={video}
                            alt={copy === 1 ? "" : `${landing.videos.alt} ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center lg:mt-7">
            <Button
              size="lg"
              className="h-14 bg-foreground px-8 text-lg font-semibold text-background transition-transform hover:bg-primary hover:text-background active:scale-[0.96]"
              asChild
            >
              <Link to={localizedLibrary}>{landing.videos.cta} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>

          <motion.div
            className="mt-7 text-center lg:mt-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
	            <h3 className="mb-4 font-display text-[1.55rem] tracking-[-0.025em] text-foreground sm:text-[1.95rem]" style={{ fontWeight: titleWeight }}>
              {locale === "en" ? "Results from companies using this strategy" : "Resultados de empresas siguiendo esta estrategia"}
            </h3>
            <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:gap-5">
              {[
	                { value: "2X", label: locale === "en" ? "6-second view rate" : "View rate de 6 segundos" },
	                { value: "+50%", label: locale === "en" ? "hook rate" : "hook rate" },
	                { value: "2X", label: "ROAS" },
              ].map((result) => (
	                <div key={result.label} className="rounded-2xl bg-card px-3 py-4 min-[360px]:p-5 sm:rounded-3xl sm:px-6 sm:py-6">
                  <p className="font-display text-[2.45rem] tracking-[-0.035em] text-primary tabular-nums sm:text-[3rem]" style={{ fontWeight: titleWeight }}>
                    {result.value}
                  </p>
	                  <p className="mt-2 text-sm leading-snug text-muted-foreground min-[360px]:text-base sm:mt-2.5">{result.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proceso — moderno */}
      <section id="proceso" className="flex items-center bg-card pb-[4.5rem] pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-9 text-center lg:mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`${SECTION_TITLE_CLASS} text-foreground`} style={{ fontWeight: titleWeight }}>
              {landing.process.title}
            </h2>
            <p className="mx-auto max-w-4xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.45rem]">
              {locale === "es" ? (
                <>
                  <span className="block">Sin IA, sin guiones, sin actores pagos.</span>
                  <span className="block">Nuestros hosts. Tus productos. Reacciones auténticas.</span>
                </>
              ) : (
                <>
                  <span className="block">No AI, no scripts, no paid actors.</span>
                  <span className="block">Our hosts. Your products. Authentic reactions.</span>
                </>
              )}
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative"
                  data-process-card={i}
                >
	                  <div className={`relative h-full min-h-[270px] rounded-[1.75rem] ${currentPreset.cardBg} p-6 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 sm:p-7 lg:min-h-[305px] ${activeProcessStep === i ? "-translate-y-1 shadow-xl shadow-primary/5" : ""}`}>
	                    <div className="mb-6 flex items-center justify-between">
	                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.15rem] text-background font-display text-2xl font-bold tabular-nums shadow-md transition-colors group-hover:bg-primary lg:h-[4.5rem] lg:w-[4.5rem] lg:text-[1.6rem] ${activeProcessStep === i ? "bg-primary" : "bg-foreground"}`}>
                        {step.n}
                      </div>
                      {i < processSteps.length - 1 && (
                        <ArrowRight className="hidden lg:block w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                      )}
                    </div>
	                    <h3 className="mb-3 font-display text-[1.55rem] font-bold tracking-[-0.02em] text-foreground lg:text-[1.7rem]">{step.title}</h3>
	                    <p className="text-[1.05rem] leading-[1.58] text-muted-foreground">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-12 overflow-hidden lg:mt-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-center font-display text-2xl font-bold text-foreground text-balance sm:text-3xl">
              {landing.brands.title}
            </h3>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                  className="flex w-max items-center"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  aria-label={landing.brands.aria}
                >
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center gap-14 pr-14 sm:gap-16 sm:pr-16" aria-hidden={copy === 1}>
                      {COLLABORATOR_BRANDS.map((brand) => (
                        <img
                          key={`${brand.name}-${copy}`}
                          src={brand.logo}
                          alt={copy === 1 ? "" : brand.name}
                          className="no-image-outline block h-12 w-auto max-w-[155px] shrink-0 object-contain sm:h-14 sm:max-w-[180px]"
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
              <Button
                type="button"
                size="lg"
                className="h-14 shrink-0 bg-foreground px-6 text-base font-semibold text-background hover:bg-primary hover:text-background sm:text-lg lg:px-7"
                onClick={openLeadForm}
              >
                {landing.brands.cta} <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Atención, confianza y acción */}
      <section className="bg-foreground text-background" data-message-section>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <motion.h2
              className="font-display text-[clamp(2.5rem,5.4vw,4.3rem)] font-bold leading-[0.96] tracking-[-0.035em] text-balance"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, ease: [0.2, 0, 0, 1] }}
            >
              {locale === "en" ? <>Why it <span className="text-primary">works</span></> : <>Por qué <span className="text-primary">funciona</span></>}
            </motion.h2>
            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-background/75 sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            >
              {landing.why.subtitle}
            </motion.p>
          </div>

          <div className="mt-11 border-y border-background/20 lg:mt-14">
            <div className="grid md:grid-cols-3">
              {messageStages.map((stage, index) => (
                <motion.article
                  key={stage.label}
                  className={`group flex min-h-[270px] flex-col px-1 py-8 sm:min-h-[290px] sm:py-9 md:px-7 lg:min-h-[325px] lg:px-8 ${index > 0 ? "border-t border-background/20 md:border-l md:border-t-0" : ""}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-display text-lg font-bold text-primary sm:text-xl">{stage.label}</p>
                    <span className="font-display text-sm font-semibold tabular-nums text-background/45">0{index + 1}</span>
                  </div>
                  <div className="pt-9 sm:pt-11">
                    <h3 className="max-w-sm font-display text-[1.55rem] font-bold leading-tight tracking-[-0.02em] text-background sm:text-[1.7rem] md:min-h-16">
                      {stage.title}
                    </h3>
                    <p className="mt-3.5 max-w-md text-[1.05rem] leading-relaxed text-background/70">
                      {stage.text}
                    </p>
                    {index === messageStages.length - 1 && (
                      <Button
                        type="button"
                        size="lg"
                        className="mt-6 h-12 bg-primary px-6 text-base font-semibold text-background hover:bg-background hover:text-foreground focus-visible:ring-background"
                        onClick={openLeadForm}
                        data-testid="open-lead-form-message"
                      >
                        {landing.why.cta} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.16em] text-background/55 sm:flex-row sm:items-center sm:justify-between">
            <span>{landing.why.footerLeft}</span>
            <span className="text-primary">{landing.why.footerRight}</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="flex items-center pb-12 pt-20 sm:pt-24 lg:pb-16 lg:pt-28">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className={SECTION_HEADER_CLASS}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mx-auto mb-5 max-w-7xl text-balance font-display text-[2.55rem] leading-[0.98] tracking-[-0.035em] text-foreground sm:mb-6 sm:text-[3.25rem] lg:text-[3.55rem] xl:whitespace-nowrap xl:text-[3.25rem] 2xl:text-[3.6rem]" style={{ fontWeight: titleWeight }}>
              {landing.features.title}
            </h2>
            <p className="mx-auto max-w-4xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.45rem]">
              {landing.features.subtitle}
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
            {featureItems.map((feature, i) => {
              const Illust = ILLUSTRATIONS[i];
              return (
                <motion.div
                  key={feature.title}
                  className="h-full"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
	                  <div className={`grid h-full min-h-[21.5rem] grid-rows-[9rem_1fr] overflow-hidden rounded-[1.5rem] ${currentPreset.cardBg} md:min-h-[25rem] md:grid-rows-[10.5rem_1fr] lg:min-h-[26rem] lg:grid-rows-[11rem_1fr]`}>
	                    <div className={`${currentPreset.colors[i]} flex items-center justify-center overflow-hidden`}>
                      {i === 0 ? (
                        <img
                          src={CREATIVE_STRATEGY_IMAGE}
                          alt={feature.title}
                          className="no-image-outline h-full w-full object-contain md:object-cover"
                        />
                      ) : i === 1 ? (
                        <img
                          src={STREET_RECORDING_IMAGE}
                          alt={feature.title}
                          className="no-image-outline h-full w-full object-contain md:object-cover"
                        />
                      ) : (
                        <Illust accents={currentPreset.accents} />
                      )}
                    </div>
	                    <div className="flex flex-col p-5 sm:p-6">
	                      <h3 className="mb-2.5 font-display text-[1.35rem] font-bold leading-[1.12] tracking-[-0.02em] text-foreground md:min-h-[2.15em] lg:text-[1.5rem]">{feature.title}</h3>
	                      <p className="text-base leading-relaxed text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Hosts */}
      <section className="flex items-center pb-20 pt-12 sm:pb-24 lg:pb-28 lg:pt-14">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className={SECTION_HEADER_CLASS}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {landing.hosts.badge}
            </div>
            <h2 className={`${SECTION_TITLE_CLASS} text-foreground text-balance`} style={{ fontWeight: titleWeight }}>
              {landing.hosts.title}
            </h2>
            <p className="mx-auto max-w-4xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-[1.35rem]">
              {landing.hosts.subtitle}
            </p>
          </motion.div>

          <motion.div
            className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:mx-auto md:grid md:max-w-7xl md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8 [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {HOST_PROFILES.map((host) => (
              <div key={host.name} className="group relative aspect-[4/5] w-[82vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-3xl bg-card shadow-xl shadow-foreground/10 outline outline-1 -outline-offset-1 outline-black/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 md:w-auto md:max-w-none">
                <img
                  src={host.image}
                  alt={`${host.name}, ${landing.hosts.badge}`}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent px-5 pb-5 pt-20">
                  <h3 className="font-display text-[2.6rem] font-bold leading-none tracking-tight text-background md:text-[2.65rem] lg:text-[52px]">
                    {host.name}
                  </h3>
                </div>
              </div>
            ))}
            <div className="group relative aspect-[4/5] w-[82vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-3xl bg-foreground text-background shadow-xl shadow-foreground/10 outline outline-1 -outline-offset-1 outline-background/15 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 md:w-auto md:max-w-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(38,185,207,0.32),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
              <Mic className="absolute bottom-14 left-1/2 h-52 w-52 -translate-x-1/2 text-background/5 transition-transform duration-500 group-hover:scale-105" strokeWidth={1.2} />
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
                <span aria-hidden="true" />
                <div className="mx-auto max-w-[220px] text-center">
                  <p className="font-display text-[2.65rem] font-bold leading-none tracking-tight sm:text-[3.35rem]">
                    {landing.hosts.you}
                  </p>
                  <p className="mt-5 text-[1.05rem] leading-relaxed text-background/72 sm:text-xl">
                    {landing.hosts.applyText}
                  </p>
                </div>

                <Button
                  type="button"
                  className="w-full border border-background/20 bg-background text-foreground hover:bg-primary hover:text-background"
                  onClick={openHostApplicationForm}
                >
                  {landing.hosts.applyCta} <UserPlus className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="flex items-center py-10 sm:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-6 text-center lg:mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-display text-[2.25rem] leading-[0.98] tracking-[-0.03em] text-foreground sm:text-[2.8rem] lg:text-[3.25rem]" style={{ fontWeight: titleWeight }}>
              {landing.faq.title}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:gap-3">
            {[faqItems.slice(0, 4), faqItems.slice(4)].map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-2.5">
                {column.map((faq, i) => {
                  const faqIndex = columnIndex * 4 + i;
                  const open = openFaq === faqIndex;
                  return (
                    <div key={faq.q} className="overflow-hidden rounded-[1.15rem] bg-card">
                      <button
                        onClick={() => setOpenFaq(open ? null : faqIndex)}
                        className="flex w-full items-center justify-between gap-3 p-3.5 text-left sm:p-4"
                      >
                        <span className="font-display text-base font-semibold text-foreground sm:text-lg">{faq.q}</span>
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
	                            <div className="px-3.5 pb-3.5 text-sm leading-relaxed text-muted-foreground sm:px-4 sm:pb-4 sm:text-base">{faq.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className={`${FULL_SECTION_CLASS} relative`}>
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative pt-14 lg:pt-16">
            <div className="absolute inset-x-0 top-0 z-20 flex justify-center pointer-events-none" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 18 }}
                className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="w-[128px] h-[136px] flex items-center justify-center">
                  <div className="w-[112px] h-[112px] rounded-full bg-primary flex items-center justify-center shadow-xl">
                    <Mic className="w-14 h-14 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-foreground rounded-[2.5rem] relative overflow-hidden px-7 pt-24 pb-14 sm:px-10 lg:px-14 lg:pt-28 lg:pb-16">
              <div className="absolute inset-x-0 top-5 flex justify-center pointer-events-none" aria-hidden="true">
                {[
                  { x: -110, y: 20, size: 14, color: "hsl(189 70% 48%)", shape: "circle", rot: 0 },
                  { x: -72, y: 42, size: 10, color: "hsl(0 0% 100%)", shape: "square", rot: 35 },
                  { x: -38, y: 12, size: 16, color: "hsl(189 70% 48%)", shape: "circle", rot: 0 },
                  { x: -18, y: 48, size: 8, color: "hsl(0 0% 80%)", shape: "square", rot: -20 },
                  { x: 0, y: 10, size: 12, color: "hsl(189 70% 60%)", shape: "triangle", rot: 15 },
                  { x: 22, y: 46, size: 10, color: "hsl(0 0% 100%)", shape: "circle", rot: 0 },
                  { x: 56, y: 14, size: 14, color: "hsl(189 70% 48%)", shape: "square", rot: 50 },
                  { x: 78, y: 38, size: 8, color: "hsl(0 0% 100%)", shape: "circle", rot: 0 },
                  { x: 104, y: 20, size: 12, color: "hsl(189 70% 60%)", shape: "triangle", rot: -30 },
                  { x: -132, y: 54, size: 6, color: "hsl(189 70% 48%)", shape: "circle", rot: 0 },
                  { x: 126, y: 48, size: 10, color: "hsl(0 0% 100%)", shape: "square", rot: 22 },
                  { x: -146, y: 28, size: 8, color: "hsl(189 70% 60%)", shape: "triangle", rot: 40 },
                  { x: 146, y: 24, size: 12, color: "hsl(189 70% 48%)", shape: "circle", rot: 0 },
                  { x: -54, y: 58, size: 6, color: "hsl(0 0% 80%)", shape: "square", rot: -45 },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: `calc(50% + ${p.x}px)`, top: p.y }}
                    initial={{ opacity: 0, scale: 0, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0, rotate: p.rot }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.5, type: "spring", stiffness: 250, damping: 15 }}
                  >
                    {p.shape === "circle" && (
                      <div style={{ width: p.size, height: p.size, borderRadius: "50%", backgroundColor: p.color }} />
                    )}
                    {p.shape === "square" && (
                      <div style={{ width: p.size, height: p.size, borderRadius: 2, backgroundColor: p.color }} />
                    )}
                    {p.shape === "triangle" && (
                      <div style={{ width: 0, height: 0, borderLeft: `${p.size / 2}px solid transparent`, borderRight: `${p.size / 2}px solid transparent`, borderBottom: `${p.size}px solid ${p.color}` }} />
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className={`${SECTION_TITLE_CLASS} text-background`} style={{ fontWeight: titleWeight }}>
                    {landing.cta.title}
                  </h2>
                  <p className="mx-auto mb-9 max-w-2xl text-balance text-xl text-background/70 sm:text-[1.35rem]">
                    {landing.cta.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      size="lg"
                      className="text-lg font-semibold px-9 h-14 bg-primary text-white hover:bg-primary/90"
                      type="button"
                      onClick={openLeadForm}
                      data-testid="open-lead-form-cta"
                    >
                      {landing.cta.primary} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg font-semibold px-9 h-14 bg-transparent text-background border-background/30 hover:bg-background/10 hover:text-background" asChild>
                      <Link to={localizedLibrary}>{landing.cta.secondary}</Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 lg:py-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-7">
            <div className="md:col-span-2">
              <Logo size="md" />
              <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
                {landing.footer.description}
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm mb-4 text-foreground">{landing.footer.company}</h4>
              <ul className="space-y-0.5 text-sm text-muted-foreground">
                <li><a href={localizePath("/#top", locale)} className={FOOTER_LINK_CLASS}>{t.common.nav.home}</a></li>
                <li><a href={localizePath("/#proceso", locale)} className={FOOTER_LINK_CLASS}>{t.common.nav.process}</a></li>
                <li><a href={localizePath("/#features", locale)} className={FOOTER_LINK_CLASS}>{t.common.nav.services}</a></li>
                <li><a href={localizePath("/#cta", locale)} className={FOOTER_LINK_CLASS}>{t.common.nav.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm mb-4 text-foreground">{landing.footer.social}</h4>
              <ul className="space-y-0.5 text-sm text-muted-foreground">
                <li><a href="https://www.instagram.com/charlando.com.ar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>Instagram</a></li>
                <li><a href="https://x.com/charlando_ar?s=20" target="_blank" rel="noreferrer" className={FOOTER_LINK_CLASS}>X</a></li>
              </ul>
              <h4 className="font-display font-bold text-sm mb-3 mt-6 text-foreground">{landing.footer.legal}</h4>
              <ul className="space-y-0.5 text-sm text-muted-foreground">
                <li><Link to={localizedTerms} className={FOOTER_LINK_CLASS}>{landing.footer.terms}</Link></li>
                <li><Link to={localizedPrivacy} className={FOOTER_LINK_CLASS}>{landing.footer.privacy}</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{landing.footer.rights}</p>
            <p className="text-xs text-muted-foreground">{landing.footer.tagline}</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
