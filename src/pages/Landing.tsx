import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Puzzle,
  ArrowRight,
  Star,
  ChevronUp,
  ChevronDown,
  BarChart2,
  Mic,
  Plus,
  Minus,
} from "lucide-react";

import eventHackathon from "@/assets/event-hackathon-ai.jpg";
import eventSummit from "@/assets/event-vibe-coding-summit.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMarcus from "@/assets/avatar-marcus.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";


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
              <span className="text-[9px] text-white font-semibold">Llamado a la acción</span>
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
        <p className="text-[8px] text-muted-foreground mt-2 text-center">Entrevista en curso · Persona real</p>
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
            <img src={url} alt={`Persona real ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

const ILLUSTRATIONS = [IllustrationPages, IllustrationAnalytics, IllustrationIntegrations, IllustrationAttendees];

const rotatingWords = ["TikTok.", "Reels.", "Shorts.", "marcas."];

const FEATURED_VIDEOS = [
  "/featured-video-1.png",
  "/featured-video-2.png",
  "/featured-video-3.jpg",
  "/featured-video-4.jpg",
];

const HERO_IMAGES = [
  "/hero-card-1.jpg",
  "/hero-card-2.jpg",
  "/hero-card-3.png",
  "/hero-card-4.png",
];

const fontWeightOptions = [
  { label: "Medium (500)", value: 500 },
  { label: "Semibold (600)", value: 600 },
  { label: "Bold (700)", value: 700 },
  { label: "Extrabold (800)", value: 800 },
];

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
  { label: "Inicio", href: "#top" },
  { label: "Videos", href: "#videos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Servicios", href: "#features" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#cta" },
];

const FAQS = [
  {
    q: "¿Qué hace exactamente OpenMicMedia?",
    a: "Creamos entrevistas callejeras para marcas. Nos encargamos de pensar el concepto, diseñar las preguntas, grabar con personas reales y entregar videos editados para redes y campañas digitales.",
  },
  {
    q: "¿Qué diferencia a OpenMicMedia de una agencia tradicional?",
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
    q: "¿Qué tipo de marcas pueden trabajar con OpenMicMedia?",
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
  { n: "01", title: "Concepto", text: "Entendemos tu producto y marca. En base a eso diseñamos preguntas, hooks y ángulos para generar respuestas naturales y transmitir tu mensaje." },
  { n: "02", title: "Producción", text: "Grabamos entrevistas callejeras con personas reales, cuidando energía, sonido, encuadre y contexto." },
  { n: "03", title: "Edición", text: "Creamos piezas verticales optimizadas para retención, claridad y conversión." },
  { n: "04", title: "Entrega", text: "Recibís videos listos para publicar, pautar y testear en diferentes plataformas." },
];

const HOSTS = [
  { label: "Host urbano", avatar: AVATAR_URLS[0] },
  { label: "Host lifestyle", avatar: AVATAR_URLS[1] },
  { label: "Host producto", avatar: AVATAR_URLS[2] },
  { label: "Host retail", avatar: AVATAR_URLS[3] },
  { label: "Host eventos", avatar: AVATAR_URLS[4] },
];

const Landing = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const [titleWeight, setTitleWeight] = useState(700);
  const [confettiSize, setConfettiSize] = useState(2.5);
  const [confettiOpacity, setConfettiOpacity] = useState(0.8);
  const [confettiCount, setConfettiCount] = useState(8);
  const [confettiSpread, setConfettiSpread] = useState(1.0);
  const [bentoStyle, setBentoStyle] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
  const currentPreset = bentoPresets[bentoStyle] ?? bentoPresets[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,.font-display").forEach((el) => {
      el.style.fontWeight = String(titleWeight);
    });
  }, [titleWeight]);

  return (
    <div id="top" className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar — hidden until scroll */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-[72px] px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <Logo size="md" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary px-3 py-2 rounded-full transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button className="text-xs sm:text-sm font-semibold bg-foreground text-background hover:bg-primary hover:text-background px-3 sm:px-4" asChild>
              <a href="https://calendar.app.google/Pm3VmXyedj7Qx4R89" target="_blank" rel="noopener noreferrer">Agendar llamada</a>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="relative min-h-[580px] flex items-center justify-center">

            <ConfettiLayer size={confettiSize} opacity={confettiOpacity} count={confettiCount} spread={confettiSpread} />

            {/* Top-left card */}
            <motion.div
              className="hidden md:block absolute left-[-80px] lg:left-[-20px] top-[10px] w-[140px] lg:w-[170px]"
              initial={{ opacity: 0, scale: 0.3, x: -80, y: -60 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg rotate-[6deg] bg-card aspect-[9/16] relative">
                <img src={HERO_IMAGES[0]} alt="Entrevista callejera" className="w-full h-full object-cover" />
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
                <img src={HERO_IMAGES[1]} alt="Reacciones reales" className="w-full h-full object-cover" />
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
                <img src={HERO_IMAGES[2]} alt="Reacción a producto" className="w-full h-full object-cover" />
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
                <img src={HERO_IMAGES[3]} alt="Lanzamiento de marca" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Center — headline */}
            <motion.div
              className="text-center max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center mb-6">
                <Logo size="lg" />
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Personas reales · Reacciones reales
              </div>
              <h1 className="text-[28px] min-[360px]:text-[31px] sm:text-5xl lg:text-[44px] 2xl:text-[56px] font-display tracking-tight leading-[1.15] text-foreground mb-6" style={{ fontWeight: titleWeight }}>
                Conversaciones que
                <br />
                <span className="whitespace-nowrap">
                  convierten en{" "}
                  <span className="inline-block relative" style={{ minWidth: "7ch" }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={rotatingWords[wordIndex]}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35 }}
                        className="text-primary inline-block"
                      >
                        {rotatingWords[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="invisible block h-0 overflow-hidden" aria-hidden="true">Shorts.</span>
                  </span>
                </span>
              </h1>
              <div className="md:hidden grid grid-cols-4 gap-2 max-w-[350px] mx-auto mb-7 px-2">
                {HERO_IMAGES.map((image, i) => (
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, y: 18, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: i === 0 ? -5 : i === 3 ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.2 + i * 0.1 }}
                    className={`relative overflow-hidden rounded-xl bg-card shadow-lg aspect-[9/16] ${i === 1 || i === 2 ? "-translate-y-2" : ""}`}
                  >
                    <img src={image} alt="Ejemplo de video vertical" className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  </motion.div>
                ))}
              </div>
              <p className="text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                Hacemos entrevistas en la calle con personas reales y transformamos esas reacciones en videos listos para contenido orgánico y ads, para viralizar tu marca.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-foreground text-background hover:bg-primary hover:text-background" asChild>
                  <a href="https://calendar.app.google/Pm3VmXyedj7Qx4R89" target="_blank" rel="noopener noreferrer">Agendar llamada <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
                <Button size="lg" variant="outline" className="text-base font-semibold px-8 h-12 border-foreground/15" asChild>
                  <a href="#videos">Ver videos</a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Para marcas que quieren contenido que realmente capte atención.</p>
              <p className="text-sm font-semibold text-primary mt-1">+4M views en 1 mes</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Videos destacados */}
      <section id="videos" className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-display text-foreground tracking-[-0.02em] text-center" style={{ fontWeight: titleWeight }}>
              Videos destacados de OpenMicMedia
            </h2>
          </div>
          <div className="flex sm:grid sm:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto overflow-x-auto sm:overflow-visible snap-x snap-mandatory px-1 pb-4 sm:px-0 sm:pb-0">
            {FEATURED_VIDEOS.map((video, i) => (
              <motion.div
                key={video}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="min-w-[68vw] max-w-[270px] sm:min-w-0 sm:max-w-none snap-center"
              >
                <div className="group cursor-pointer">
                  <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[9/16] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={video}
                      alt={`Video destacado de OpenMicMedia ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso — moderno */}
      <section id="proceso" className="py-12 lg:py-20 bg-card">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Cómo trabajamos
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display mb-4 text-foreground tracking-[-0.02em]" style={{ fontWeight: titleWeight }}>
              De la idea al video viral en 4 pasos.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Un proceso simple: pensamos la conversación, salimos a grabar y entregamos contenido listo para usar.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative"
                >
                  <div className="relative bg-background rounded-3xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center font-display font-bold text-xl shadow-md group-hover:bg-primary transition-colors">
                        {step.n}
                      </div>
                      {i < PROCESS_STEPS.length - 1 && (
                        <ArrowRight className="hidden lg:block w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 text-foreground tracking-[-0.01em]">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display mb-4 text-foreground tracking-[-0.02em]" style={{ fontWeight: titleWeight }}>
              Todo lo que necesitás para viralizar tu producto orgánicamente
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Desde la estrategia creativa hasta la edición final, nos ocupamos de transformar conversaciones espontáneas en piezas listas para publicar, pautar y testear.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.slice(0, 2).map((feature, i) => {
                const Illust = ILLUSTRATIONS[i];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className={`h-full rounded-3xl overflow-hidden ${currentPreset.cardBg} flex flex-col`}>
                      <div className={`${currentPreset.colors[i]} aspect-[4/3] flex items-center justify-center`}>
                        <Illust accents={currentPreset.accents} />
                      </div>
                      <div className="p-6">
                        <h3 className="font-display font-bold text-xl mb-2 text-foreground tracking-[-0.01em]">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className={`grid grid-cols-1 gap-6 ${features.slice(2).length > 1 ? 'md:grid-cols-5' : ''}`}>
              {features.slice(2).map((feature, rawI) => {
                const i = rawI + 2;
                const Illust = ILLUSTRATIONS[i];
                const isWide = rawI === 0;
                const remainingCount = features.slice(2).length;
                return (
                  <motion.div
                    key={feature.title}
                    className={remainingCount === 1 ? "" : (isWide ? "md:col-span-3" : "md:col-span-2")}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className={`h-full rounded-3xl overflow-hidden ${currentPreset.cardBg} flex ${isWide ? "flex-col sm:flex-row" : "flex-col"}`}>
                      <div className={`${currentPreset.colors[i]} ${isWide ? "sm:w-1/2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3]"} flex items-center justify-center relative flex-shrink-0`}>
                        <Illust accents={currentPreset.accents} />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <h3 className="font-display font-bold text-xl mb-2 text-foreground tracking-[-0.01em]">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* Beneficios */}
      <section className="py-12 lg:py-20 bg-card">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display mb-4 text-foreground tracking-[-0.02em]" style={{ fontWeight: titleWeight }}>
              Por qué funciona
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Sin videos AI, generás confianza", text: "Tu audiencia ve a personas reales reaccionando, opinando y haciendo preguntas. Eso se siente más creíble que una marca hablando sola." },
              { title: "Detiene el scroll", text: "Los videos reales llaman la atención de la gente. Termina haciendo que el producto se entienda sin explicarlo de forma pesada. La conversación abre el interés y mantiene la atención." },
              { title: "Impulsa conversión", text: "El contenido puede trabajar todo el funnel: presenta la marca, educa, genera consideración y termina con un llamado a la acción claro." },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-3xl bg-background p-8"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-foreground tracking-[-0.01em]">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display mb-4 text-foreground tracking-[-0.02em]" style={{ fontWeight: titleWeight }}>
              Preguntas frecuentes
            </h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="rounded-2xl bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left p-5 gap-4"
                  >
                    <span className="font-display font-semibold text-foreground text-base">{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="pt-10 lg:pt-16 pb-12 lg:pb-16 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative pt-20 lg:pt-24">
            <div className="absolute inset-x-0 top-0 z-20 flex justify-center pointer-events-none" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 18 }}
                className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              >
                <div className="w-[130px] h-[140px] flex items-center justify-center">
                  <div className="w-[110px] h-[110px] rounded-full bg-primary flex items-center justify-center shadow-xl">
                    <Mic className="w-14 h-14 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-foreground rounded-[2rem] relative overflow-hidden px-6 pt-24 pb-20 lg:px-10 lg:pt-28 lg:pb-24">
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
                  <h2 className="text-3xl sm:text-4xl font-display mb-4 text-background tracking-[-0.02em]" style={{ fontWeight: titleWeight }}>
                    ¿Listo para crear contenido que la gente sí quiera mirar?
                  </h2>
                  <p className="text-background/70 text-lg mb-8 max-w-lg mx-auto text-balance">
                    Agendemos una llamada y veamos cómo convertir tu producto, servicio o campaña en entrevistas reales para redes y pauta.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button size="lg" className="text-base font-semibold px-8 h-12 bg-primary text-white hover:bg-primary/90" asChild>
                      <a href="https://calendar.app.google/Pm3VmXyedj7Qx4R89" target="_blank" rel="noopener noreferrer">Agendar llamada <ArrowRight className="ml-2 w-4 h-4" /></a>
                    </Button>
                    <Button size="lg" variant="outline" className="text-base font-semibold px-8 h-12 bg-transparent text-background border-background/30 hover:bg-background/10 hover:text-background" asChild>
                      <a href="#videos">Ver ejemplos</a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <Logo size="md" />
              <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
                Entrevistas callejeras para marcas que quieren generar atención, confianza y conversación real.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm mb-4 text-foreground">Compañía</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#top" className="hover:text-primary">Inicio</a></li>
                <li><a href="#videos" className="hover:text-primary">Videos</a></li>
                <li><a href="#proceso" className="hover:text-primary">Proceso</a></li>
                <li><a href="#features" className="hover:text-primary">Servicios</a></li>
                <li><a href="#cta" className="hover:text-primary">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm mb-4 text-foreground">Redes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Instagram</a></li>
                <li><a href="#" className="hover:text-primary">TikTok</a></li>
                <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary">YouTube</a></li>
              </ul>
              <h4 className="font-display font-bold text-sm mb-3 mt-6 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-primary">Política de privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 OpenMicMedia. Todos los derechos reservados.</p>
            <p className="text-xs text-muted-foreground">De la calle a la pantalla.</p>
          </div>
        </div>
      </footer>

      {/* Dev picker */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[9999]">
        <button
          onClick={() => setDevOpen(!devOpen)}
          className="mx-auto flex items-center gap-1.5 bg-foreground text-background text-xs font-medium px-4 py-1.5 rounded-t-lg shadow-lg"
        >
          🎨 Dev tools {devOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
        {devOpen && (
          <div className="bg-card border border-border rounded-t-xl shadow-2xl p-4 w-[340px] space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title font weight</label>
              <select
                value={titleWeight}
                onChange={(e) => setTitleWeight(Number(e.target.value))}
                className="w-full text-sm bg-background border border-input rounded-lg px-3 py-2 text-foreground"
              >
                {fontWeightOptions.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Bento colour style</label>
              <div className="flex gap-1.5">
                {bentoPresets.map((preset, idx) => (
                  <button
                    key={preset.label}
                    onClick={() => setBentoStyle(idx)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${bentoStyle === idx ? "bg-primary text-primary-foreground border-primary" : "bg-background border-input text-foreground hover:bg-muted"}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-medium text-muted-foreground">Confetti visible</span>
              <input type="checkbox" checked={confettiCount > 0} onChange={(e) => setConfettiCount(e.target.checked ? 6 : 0)} className="accent-primary w-4 h-4" />
            </label>
            <div className="border-t border-border pt-3 space-y-2">
              <label className="text-xs font-medium text-muted-foreground block">Confetti</label>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Size</span>
                  <span className="text-[11px] text-muted-foreground w-8 text-right">{confettiSize.toFixed(1)}</span>
                </div>
                <input type="range" min="0.3" max="2.5" step="0.1" value={confettiSize} onChange={(e) => setConfettiSize(Number(e.target.value))} className="w-full h-1.5 accent-primary" />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Boldness</span>
                  <span className="text-[11px] text-muted-foreground w-8 text-right">{Math.round(confettiOpacity * 100)}%</span>
                </div>
                <input type="range" min="0.1" max="1" step="0.05" value={confettiOpacity} onChange={(e) => setConfettiOpacity(Number(e.target.value))} className="w-full h-1.5 accent-primary" />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Amount</span>
                  <span className="text-[11px] text-muted-foreground w-8 text-right">{confettiCount}</span>
                </div>
                <input type="range" min="1" max="8" step="1" value={confettiCount} onChange={(e) => setConfettiCount(Number(e.target.value))} className="w-full h-1.5 accent-primary" />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Spread</span>
                  <span className="text-[11px] text-muted-foreground w-8 text-right">{confettiSpread.toFixed(1)}</span>
                </div>
                <input type="range" min="0.5" max="2" step="0.1" value={confettiSpread} onChange={(e) => setConfettiSpread(Number(e.target.value))} className="w-full h-1.5 accent-primary" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
