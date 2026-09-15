import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { usePageSeo } from "@/lib/seo";
import { alternatePathsFor, localizePath } from "@/i18n/routes";
import { useTranslation } from "@/i18n/useTranslation";

type TermsBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type TermsSection = {
  id: string;
  title: string;
  blocks: TermsBlock[];
};

const LAST_UPDATED = "30 de junio de 2026";
const LAST_UPDATED_EN = "June 30, 2026";

const sections: TermsSection[] = [
  {
    id: "quienes-somos",
    title: "1. Quiénes somos",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando crea contenido audiovisual basado en conversaciones reales. Nuestro trabajo puede incluir estrategia creativa, diseño de preguntas, producción en calle, entrevistas con personas reales, grabación, edición, subtitulado, adaptación de piezas para redes sociales y preparación de materiales para contenido orgánico o pauta digital.",
      },
      {
        type: "paragraph",
        text: "Charlando no promete respuestas guionadas ni actuaciones simuladas. La esencia del servicio es capturar reacciones auténticas dentro de una dinámica creativa previamente diseñada.",
      },
    ],
  },
  {
    id: "alcance",
    title: "2. Alcance de los servicios",
    blocks: [
      {
        type: "paragraph",
        text: "El alcance específico de cada proyecto se define en la propuesta comercial, presupuesto, orden de trabajo, email de confirmación o acuerdo equivalente. Según el caso, los servicios pueden incluir:",
      },
      {
        type: "list",
        items: [
          "estrategia creativa y definición del concepto;",
          "investigación de marca, producto, audiencia y objetivo;",
          "diseño de preguntas, hooks y ángulos creativos;",
          "selección de locaciones o contextos de grabación;",
          "coordinación de hosts y equipo de producción;",
          "grabación de entrevistas, pruebas de producto o reacciones;",
          "edición de videos verticales;",
          "subtítulos, cortes, ritmo, hooks y llamados a la acción;",
          "preparación de piezas para TikTok, Instagram Reels, YouTube Shorts, Meta Ads, TikTok Ads u otras plataformas;",
          "entrega de materiales finales listos para publicar, pautar o testear.",
        ],
      },
      {
        type: "paragraph",
        text: "Cualquier servicio no incluido expresamente en la propuesta se considerará fuera de alcance y podrá presupuestarse por separado.",
      },
    ],
  },
  {
    id: "proceso",
    title: "3. Proceso de trabajo",
    blocks: [
      {
        type: "paragraph",
        text: "El proceso habitual de Charlando incluye cuatro etapas: planeamos, producimos, editamos y entregamos.",
      },
      {
        type: "paragraph",
        text: "Primero entendemos la marca, el producto, el público y el objetivo. Luego diseñamos preguntas y ángulos creativos para generar respuestas naturales. Después salimos a grabar con hosts y equipo de video. Finalmente editamos el material y entregamos piezas listas para usar.",
      },
      {
        type: "paragraph",
        text: "Los tiempos, cantidad de piezas, rondas de revisión y formatos de entrega se definen en cada propuesta. Si el cliente demora aprobaciones, materiales, pagos o definiciones necesarias, los plazos podrán ajustarse.",
      },
    ],
  },
  {
    id: "obligaciones-cliente",
    title: "4. Obligaciones del cliente",
    blocks: [
      { type: "paragraph", text: "El cliente se compromete a:" },
      {
        type: "list",
        items: [
          "entregar información correcta sobre su marca, producto, servicio, restricciones legales, claims permitidos y objetivos de comunicación;",
          "revisar y aprobar conceptos, preguntas o enfoques cuando corresponda;",
          "informar restricciones de uso de marca, producto, claims, locaciones, permisos o categorías reguladas;",
          "entregar logos, guías, referencias, materiales, productos o accesos necesarios en tiempo y forma;",
          "pagar los importes acordados en las condiciones pactadas;",
          "usar los entregables de manera legal, responsable y alineada con las políticas de las plataformas donde sean publicados o pautados.",
        ],
      },
      {
        type: "paragraph",
        text: "Charlando no será responsable por información incorrecta, incompleta o tardía entregada por el cliente.",
      },
    ],
  },
  {
    id: "contenido-real",
    title: "5. Contenido con personas reales",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando trabaja con personas reales y busca respuestas espontáneas. Por eso, el cliente entiende que:",
      },
      {
        type: "list",
        items: [
          "las respuestas no están guionadas;",
          "las reacciones no pueden garantizarse de antemano;",
          "puede haber respuestas positivas, neutrales, inesperadas o no utilizables;",
          "la edición final selecciona los fragmentos más adecuados para el objetivo del proyecto;",
          "no se garantiza viralidad, views, conversiones, ventas, ROAS ni resultados específicos de performance.",
        ],
      },
      {
        type: "paragraph",
        text: "Charlando puede orientar la conversación con preguntas pensadas estratégicamente, pero no controla totalmente lo que una persona entrevistada responderá.",
      },
    ],
  },
  {
    id: "autorizaciones",
    title: "6. Autorizaciones de imagen y uso de participantes",
    blocks: [
      {
        type: "paragraph",
        text: "Cuando el proyecto incluya personas entrevistadas, Charlando procurará gestionar autorizaciones de uso de imagen y voz mediante formularios, consentimientos digitales, QR u otros medios razonables según el contexto de producción.",
      },
      {
        type: "paragraph",
        text: "El cliente se compromete a usar las piezas dentro del alcance, territorios, medios y plazos autorizados. Si el cliente desea usos adicionales, campañas extendidas, sublicencias, cesiones a terceros, uso en medios no previstos o usos fuera de plataformas digitales, deberá informarlo y obtener aprobación previa cuando corresponda.",
      },
      {
        type: "paragraph",
        text: "En caso de que una persona solicite retirar, limitar o revisar el uso de su imagen, Charlando y el cliente colaborarán de buena fe para evaluar el caso y actuar razonablemente.",
      },
    ],
  },
  {
    id: "propiedad-intelectual",
    title: "7. Propiedad intelectual y derechos de uso",
    blocks: [
      {
        type: "paragraph",
        text: "Salvo acuerdo distinto por escrito, una vez abonado el proyecto, el cliente recibe una licencia de uso sobre los videos finales entregados para publicarlos, pautarlos y utilizarlos en sus canales digitales, de acuerdo con la propuesta aprobada.",
      },
      {
        type: "paragraph",
        text: "Charlando conserva la propiedad sobre metodologías, ideas generales, know-how, procesos creativos, estructuras de entrevista, archivos de trabajo, proyectos editables, presets, plantillas, material descartado y conocimientos desarrollados durante el servicio.",
      },
      {
        type: "paragraph",
        text: "Los archivos editables, crudos completos, proyectos de edición, backups o materiales fuente no están incluidos salvo que se pacten expresamente.",
      },
      {
        type: "paragraph",
        text: "Charlando podrá mostrar los trabajos realizados como parte de su portfolio, casos de estudio, presentaciones comerciales, sitio web, redes sociales o materiales institucionales, salvo que el cliente solicite confidencialidad por escrito antes del inicio del proyecto y Charlando la acepte.",
      },
    ],
  },
  {
    id: "no-exclusividad",
    title: "8. No exclusividad comercial",
    blocks: [
      {
        type: "paragraph",
        text: "Salvo que exista un acuerdo específico de exclusividad firmado por escrito, Charlando no otorga exclusividad comercial, creativa ni de categoría a ningún cliente.",
      },
      {
        type: "paragraph",
        text: "El cliente entiende y acepta que Charlando podrá prestar servicios, producir contenido, grabar entrevistas, editar piezas o desarrollar campañas para otras marcas, incluyendo empresas que operen en la misma industria, categoría, zona geográfica o segmento competitivo.",
      },
      {
        type: "paragraph",
        text: "La contratación de Charlando no impide que trabajemos de manera simultánea o posterior con marcas competidoras, siempre respetando la confidencialidad de la información propia de cada cliente y sin compartir materiales internos, estrategias privadas, datos sensibles o entregables exclusivos de un proyecto con terceros.",
      },
    ],
  },
  {
    id: "revisiones",
    title: "9. Revisiones y cambios",
    blocks: [
      {
        type: "paragraph",
        text: "Las rondas de revisión incluidas se definirán en cada propuesta. Las revisiones deben referirse a los entregables acordados y realizarse dentro de un plazo razonable.",
      },
      {
        type: "paragraph",
        text: "Cambios de concepto, nuevas piezas, modificaciones sustanciales, nuevas versiones, cambios posteriores a la aprobación final o pedidos fuera del alcance podrán presupuestarse aparte.",
      },
      {
        type: "paragraph",
        text: "Charlando podrá rechazar cambios que afecten la autenticidad del contenido, alteren de manera engañosa el sentido de una respuesta real o impliquen usos ilegales, discriminatorios, abusivos o contrarios a políticas de plataforma.",
      },
    ],
  },
  {
    id: "pagos",
    title: "10. Pagos, reservas y cancelaciones",
    blocks: [
      {
        type: "paragraph",
        text: "Los precios, moneda, forma de pago, anticipos, hitos y fechas de vencimiento se establecen en la propuesta comercial o acuerdo correspondiente.",
      },
      {
        type: "paragraph",
        text: "Salvo acuerdo distinto, una fecha de producción puede requerir una seña o anticipo para quedar reservada. Los pagos realizados por reserva de agenda, preproducción o producción pueden no ser reembolsables si el cliente cancela o posterga con poca anticipación.",
      },
      {
        type: "paragraph",
        text: "Si el cliente cancela, posterga o modifica una producción ya coordinada, podrá asumir costos incurridos, honorarios de equipo, locaciones, traslados, reservas, edición iniciada u otros gastos comprometidos.",
      },
      {
        type: "paragraph",
        text: "Charlando podrá pausar entregas, revisiones o nuevas producciones si existen pagos vencidos.",
      },
    ],
  },
  {
    id: "publicacion",
    title: "11. Publicación, pauta y plataformas",
    blocks: [
      {
        type: "paragraph",
        text: "El cliente es responsable por la publicación, administración de cuentas, inversión publicitaria, segmentación, configuración de campañas, cumplimiento de políticas de plataformas y resultados de pauta, salvo que la propuesta incluya expresamente esos servicios.",
      },
      {
        type: "paragraph",
        text: "Charlando puede entregar piezas pensadas para redes y anuncios, pero no garantiza aprobación por parte de Meta, TikTok, YouTube, Google u otras plataformas, ni resultados específicos de performance.",
      },
    ],
  },
  {
    id: "confidencialidad",
    title: "12. Confidencialidad",
    blocks: [
      {
        type: "paragraph",
        text: "Las partes podrán intercambiar información confidencial, incluyendo estrategias, lanzamientos, métricas, precios, materiales internos o información comercial. Ambas partes se comprometen a usar esa información únicamente para el proyecto y a no divulgarla sin autorización, salvo que sea pública, requerida por ley o necesaria para ejecutar el servicio.",
      },
    ],
  },
  {
    id: "responsabilidad",
    title: "13. Limitación de responsabilidad",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando prestará sus servicios con criterio profesional y buena fe. Sin embargo, no será responsable por daños indirectos, lucro cesante, pérdida de ventas, pérdida de datos, bloqueo de cuentas, rechazo de campañas, cambios de algoritmo, decisiones de plataformas, uso indebido de los entregables por parte del cliente o reclamos derivados de instrucciones, claims o información proporcionada por el cliente.",
      },
      {
        type: "paragraph",
        text: "La responsabilidad total de Charlando, en la medida permitida por la ley aplicable, se limitará al monto efectivamente pagado por el cliente por el servicio específico que originó el reclamo.",
      },
    ],
  },
  {
    id: "usos-prohibidos",
    title: "14. Usos prohibidos",
    blocks: [
      { type: "paragraph", text: "El cliente no podrá utilizar los entregables para:" },
      {
        type: "list",
        items: [
          "afirmar datos falsos, engañosos o no comprobables;",
          "promocionar productos o servicios ilegales;",
          "vulnerar derechos de terceros;",
          "manipular testimonios de forma engañosa;",
          "usar imagen o voz de participantes fuera del alcance autorizado;",
          "discriminar, acosar, difamar o afectar la dignidad de personas entrevistadas;",
          "incumplir políticas de plataformas publicitarias o redes sociales.",
        ],
      },
    ],
  },
  {
    id: "fuerza-mayor",
    title: "15. Fuerza mayor",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando no será responsable por retrasos o incumplimientos derivados de causas fuera de su control razonable, incluyendo clima, restricciones de locación, cortes, enfermedad, fallas técnicas, problemas de transporte, cambios normativos, bloqueos de plataformas, emergencias o hechos de fuerza mayor.",
      },
      {
        type: "paragraph",
        text: "En esos casos, las partes coordinarán de buena fe una reprogramación o alternativa razonable.",
      },
    ],
  },
  {
    id: "cambios",
    title: "16. Cambios en estos términos",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando podrá actualizar estos Términos de servicio cuando sea necesario. La versión aplicable será la vigente al momento de la contratación o aprobación del proyecto, salvo que las partes acuerden otra cosa por escrito.",
      },
    ],
  },
  {
    id: "contacto",
    title: "17. Contacto",
    blocks: [
      {
        type: "paragraph",
        text: "Para consultas sobre estos términos, uso de materiales, autorizaciones o condiciones comerciales, el cliente puede comunicarse con el equipo de Charlando por los canales comerciales habituales o a través del formulario de contacto del sitio.",
      },
    ],
  },
  {
    id: "nota-legal",
    title: "18. Nota legal",
    blocks: [
      {
        type: "paragraph",
        text: "Este documento es una base general de términos de servicio y no reemplaza asesoramiento legal específico. Para proyectos regulados, campañas sensibles, usos extendidos de imagen, licencias especiales o acuerdos de alto valor, se recomienda revisión legal profesional antes de su publicación o firma.",
      },
    ],
  },
];

const sectionsEn: TermsSection[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    blocks: [
      { type: "paragraph", text: "Charlando creates audiovisual content based on real conversations. Our work may include creative strategy, question design, street production, interviews with real people, recording, editing, subtitles, social adaptations, and materials for organic content or paid media." },
      { type: "paragraph", text: "Charlando does not promise scripted answers or simulated performances. The service is built around capturing authentic reactions inside a creative framework designed in advance." },
    ],
  },
  {
    id: "scope",
    title: "2. Scope of services",
    blocks: [
      { type: "paragraph", text: "The specific scope of each project is defined in the commercial proposal, quote, work order, confirmation email, or equivalent agreement. Depending on the project, services may include:" },
      { type: "list", items: ["creative strategy and concept definition;", "brand, product, audience, and goal research;", "question, hook, and creative angle design;", "location or recording context selection;", "host and production crew coordination;", "recording interviews, product tests, or reactions;", "vertical video editing;", "subtitles, cuts, pacing, hooks, and calls to action;", "preparation for TikTok, Instagram Reels, YouTube Shorts, Meta Ads, TikTok Ads, or other platforms;", "delivery of final materials ready to publish, run as ads, or test."] },
      { type: "paragraph", text: "Any service not expressly included in the proposal is considered out of scope and may be quoted separately." },
    ],
  },
  {
    id: "process",
    title: "3. Work process",
    blocks: [
      { type: "paragraph", text: "Charlando’s usual process has four stages: we plan, produce, edit, and deliver." },
      { type: "paragraph", text: "First we understand the brand, product, audience, and objective. Then we design questions and creative angles that generate natural answers. After that, we record with hosts and video crew. Finally, we edit the material and deliver pieces ready to use." },
      { type: "paragraph", text: "Timing, number of assets, revision rounds, and delivery formats are defined in each proposal. If the client delays approvals, materials, payments, or required definitions, timelines may be adjusted." },
    ],
  },
  {
    id: "client-obligations",
    title: "4. Client obligations",
    blocks: [
      { type: "paragraph", text: "The client agrees to:" },
      { type: "list", items: ["provide accurate information about the brand, product, service, legal restrictions, permitted claims, and communication goals;", "review and approve concepts, questions, or approaches when applicable;", "communicate restrictions around brand use, product use, claims, locations, permits, or regulated categories;", "provide logos, guidelines, references, materials, products, or necessary access on time;", "pay agreed amounts under the agreed conditions;", "use deliverables legally, responsibly, and in line with the policies of the platforms where they are published or advertised."] },
      { type: "paragraph", text: "Charlando is not responsible for incorrect, incomplete, or late information provided by the client." },
    ],
  },
  {
    id: "real-content",
    title: "5. Content with real people",
    blocks: [
      { type: "paragraph", text: "Charlando works with real people and seeks spontaneous answers. The client understands that:" },
      { type: "list", items: ["answers are not scripted;", "reactions cannot be guaranteed in advance;", "answers may be positive, neutral, unexpected, or unusable;", "final editing selects the most appropriate fragments for the project goal;", "virality, views, conversions, sales, ROAS, or specific performance results are not guaranteed."] },
      { type: "paragraph", text: "Charlando may guide the conversation with strategic questions, but cannot fully control what an interviewed person will answer." },
    ],
  },
  {
    id: "releases",
    title: "6. Image and participant releases",
    blocks: [
      { type: "paragraph", text: "When a project includes interviewed people, Charlando will seek to manage image and voice authorizations through forms, digital consents, QR flows, or other reasonable means according to the production context." },
      { type: "paragraph", text: "The client agrees to use pieces within the authorized scope, territories, media, and terms. Additional uses, extended campaigns, sublicenses, transfers to third parties, uses in unplanned media, or uses outside digital platforms must be disclosed and approved when applicable." },
      { type: "paragraph", text: "If a person requests removal, limitation, or review of the use of their image, Charlando and the client will collaborate in good faith to evaluate the case and act reasonably." },
    ],
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual property and usage rights",
    blocks: [
      { type: "paragraph", text: "Unless otherwise agreed in writing, once the project is paid, the client receives a license to use the final delivered videos for publishing, advertising, and use on their digital channels according to the approved proposal." },
      { type: "paragraph", text: "Charlando retains ownership of methodologies, general ideas, know-how, creative processes, interview structures, working files, editable projects, presets, templates, discarded material, and knowledge developed during the service." },
      { type: "paragraph", text: "Editable files, full raw footage, editing projects, backups, or source materials are not included unless expressly agreed." },
      { type: "paragraph", text: "Charlando may show completed work as part of its portfolio, case studies, commercial presentations, website, social media, or institutional materials unless the client requests confidentiality in writing before the project starts and Charlando accepts it." },
    ],
  },
  {
    id: "non-exclusivity",
    title: "8. Commercial non-exclusivity",
    blocks: [
      { type: "paragraph", text: "Unless there is a specific written exclusivity agreement, Charlando does not grant commercial, creative, or category exclusivity to any client." },
      { type: "paragraph", text: "The client understands and accepts that Charlando may provide services, produce content, record interviews, edit pieces, or develop campaigns for other brands, including companies in the same industry, category, geography, or competitive segment." },
      { type: "paragraph", text: "Hiring Charlando does not prevent us from working simultaneously or later with competing brands, while respecting each client’s confidential information and without sharing internal materials, private strategies, sensitive data, or exclusive deliverables with third parties." },
    ],
  },
  {
    id: "revisions",
    title: "9. Revisions and changes",
    blocks: [
      { type: "paragraph", text: "Included revision rounds are defined in each proposal. Revisions must refer to agreed deliverables and be requested within a reasonable timeframe." },
      { type: "paragraph", text: "Concept changes, new pieces, substantial modifications, new versions, changes after final approval, or requests outside scope may be quoted separately." },
      { type: "paragraph", text: "Charlando may reject changes that affect content authenticity, misleadingly alter the meaning of a real answer, or imply illegal, discriminatory, abusive, or platform-policy-violating uses." },
    ],
  },
  {
    id: "payments",
    title: "10. Payments, bookings, and cancellations",
    blocks: [
      { type: "paragraph", text: "Prices, currency, payment method, deposits, milestones, and due dates are established in the commercial proposal or corresponding agreement." },
      { type: "paragraph", text: "Unless otherwise agreed, a production date may require a deposit to be reserved. Payments made for schedule reservation, pre-production, or production may be non-refundable if the client cancels or postpones with short notice." },
      { type: "paragraph", text: "If the client cancels, postpones, or modifies a coordinated production, the client may be responsible for incurred costs, crew fees, locations, transportation, reservations, started editing, or other committed expenses." },
      { type: "paragraph", text: "Charlando may pause deliveries, revisions, or new productions if payments are overdue." },
    ],
  },
  {
    id: "publishing",
    title: "11. Publishing, paid media, and platforms",
    blocks: [
      { type: "paragraph", text: "The client is responsible for publishing, account management, ad spend, targeting, campaign setup, platform policy compliance, and paid media results unless the proposal expressly includes those services." },
      { type: "paragraph", text: "Charlando may deliver pieces designed for social media and ads, but does not guarantee approval by Meta, TikTok, YouTube, Google, or other platforms, nor specific performance results." },
    ],
  },
  {
    id: "confidentiality",
    title: "12. Confidentiality",
    blocks: [
      { type: "paragraph", text: "The parties may exchange confidential information, including strategies, launches, metrics, pricing, internal materials, or commercial information. Both parties agree to use that information only for the project and not disclose it without authorization, unless it is public, legally required, or necessary to execute the service." },
    ],
  },
  {
    id: "liability",
    title: "13. Limitation of liability",
    blocks: [
      { type: "paragraph", text: "Charlando will provide services with professional judgment and good faith. However, it is not responsible for indirect damages, lost profits, lost sales, data loss, account blocks, rejected campaigns, algorithm changes, platform decisions, misuse of deliverables by the client, or claims derived from instructions, claims, or information provided by the client." },
      { type: "paragraph", text: "Charlando’s total liability, to the extent permitted by applicable law, is limited to the amount actually paid by the client for the specific service that gave rise to the claim." },
    ],
  },
  {
    id: "prohibited-uses",
    title: "14. Prohibited uses",
    blocks: [
      { type: "paragraph", text: "The client may not use deliverables to:" },
      { type: "list", items: ["state false, misleading, or unverifiable claims;", "promote illegal products or services;", "violate third-party rights;", "manipulate testimonials misleadingly;", "use participant image or voice outside the authorized scope;", "discriminate, harass, defame, or harm the dignity of interviewed people;", "violate advertising platform or social media policies."] },
    ],
  },
  {
    id: "force-majeure",
    title: "15. Force majeure",
    blocks: [
      { type: "paragraph", text: "Charlando is not responsible for delays or failures caused by circumstances beyond reasonable control, including weather, location restrictions, outages, illness, technical failures, transportation issues, regulatory changes, platform blocks, emergencies, or force majeure events." },
      { type: "paragraph", text: "In those cases, the parties will coordinate in good faith to reschedule or find a reasonable alternative." },
    ],
  },
  {
    id: "changes",
    title: "16. Changes to these terms",
    blocks: [
      { type: "paragraph", text: "Charlando may update these Terms of Service when necessary. The applicable version is the one in force at the time of hiring or project approval, unless the parties agree otherwise in writing." },
    ],
  },
  {
    id: "contact",
    title: "17. Contact",
    blocks: [
      { type: "paragraph", text: "For questions about these terms, material usage, authorizations, or commercial conditions, the client may contact the Charlando team through the usual commercial channels or the site contact form." },
    ],
  },
  {
    id: "legal-note",
    title: "18. Legal note",
    blocks: [
      { type: "paragraph", text: "This document is a general base for terms of service and does not replace specific legal advice. For regulated projects, sensitive campaigns, extended image use, special licenses, or high-value agreements, professional legal review is recommended before publication or signature." },
    ],
  },
];

const TermsConditions = () => {
  const { locale, t } = useTranslation();
  const localizedHome = localizePath("/", locale);
  const currentSections = locale === "en" ? sectionsEn : sections;

  usePageSeo({
    title: t.seo.termsTitle,
    description: locale === "en" ? "Charlando Terms of Service for street interview, real reaction, and audiovisual content projects for brands." : "Términos de servicio de Charlando para proyectos de entrevistas callejeras, reacciones reales y contenido audiovisual para marcas.",
    canonicalPath: localizePath("/terminos-y-condiciones", locale),
    locale,
    alternatePaths: alternatePathsFor("/terminos-y-condiciones"),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to={localizedHome} aria-label={t.common.goHome} className="shrink-0">
            <Logo size="md" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              to={localizedHome}
              className="inline-flex min-h-10 items-center rounded-full px-4 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-primary"
            >
              {t.common.goHome}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[300px_1fr] lg:px-8 lg:py-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Legal</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {locale === "en" ? "Terms and Conditions" : "Términos y condiciones"}
          </h1>
          <p className="mt-4 text-pretty text-sm leading-6 text-muted-foreground">
            {locale === "en" ? "Last updated" : "Última actualización"}: {locale === "en" ? LAST_UPDATED_EN : LAST_UPDATED}
          </p>
        </aside>

        <article className="rounded-[28px] bg-card px-5 py-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {locale === "en"
                ? "These Terms of Service govern the hiring and use of services provided by Charlando, a content studio that creates street interviews, real reactions, and vertical pieces for brands, social media, and digital campaigns."
                : "Estos Términos de servicio regulan la contratación y uso de los servicios prestados por Charlando, una propuesta de contenido que crea entrevistas callejeras, reacciones reales y piezas verticales para marcas, redes sociales y campañas digitales."}
            </p>
            <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {locale === "en"
                ? "By hiring, approving a proposal, paying a booking deposit, completing a commercial form, or using deliverables produced by Charlando, the client accepts these terms."
                : "Al contratar, aprobar una propuesta, pagar una reserva, completar un formulario comercial o utilizar entregables producidos por Charlando, el cliente acepta estos términos."}
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {currentSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                  {section.blocks.map((block, blockIndex) =>
                    block.type === "paragraph" ? (
                      <p key={`${section.id}-${blockIndex}`} className="text-pretty">
                        {block.text}
                      </p>
                    ) : (
                      <ul key={`${section.id}-${blockIndex}`} className="space-y-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item} className="list-disc pl-1 text-pretty marker:text-primary">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default TermsConditions;
