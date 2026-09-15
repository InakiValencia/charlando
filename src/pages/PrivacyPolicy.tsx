import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { usePageSeo } from "@/lib/seo";
import { alternatePathsFor, localizePath } from "@/i18n/routes";
import { useTranslation } from "@/i18n/useTranslation";

type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type PrivacySection = {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

const LAST_UPDATED = "30 de junio de 2026";
const LAST_UPDATED_EN = "June 30, 2026";

const sections: PrivacySection[] = [
  {
    id: "quienes-somos",
    title: "1. Quiénes somos",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando crea contenido audiovisual para marcas a partir de entrevistas callejeras, reacciones reales y piezas verticales para redes sociales y campañas digitales. Esta Política de privacidad explica cómo podemos recopilar, usar, guardar y proteger información personal cuando una persona visita nuestro sitio, completa un formulario, agenda una llamada, interactúa con nuestros contenidos o participa en una producción.",
      },
      {
        type: "paragraph",
        text: "Al usar el sitio, completar formularios o compartir información con Charlando, aceptás el tratamiento de tus datos conforme a esta política.",
      },
    ],
  },
  {
    id: "datos-recolectados",
    title: "2. Qué datos podemos recopilar",
    blocks: [
      {
        type: "paragraph",
        text: "Según la forma en que interactúes con Charlando, podemos recopilar las siguientes categorías de información:",
      },
      {
        type: "list",
        items: [
          "datos de contacto, como nombre, email, teléfono, marca, empresa, sitio web o usuario de redes sociales;",
          "información comercial que nos compartas para evaluar un proyecto, una campaña o una propuesta;",
          "datos enviados a través de formularios del sitio, formularios externos, calendarios de reserva o canales comerciales como email y WhatsApp;",
          "información técnica básica, como página visitada, fecha, hora, navegador, dispositivo, URL de origen, parámetros UTM o datos similares de analítica;",
          "imagen, voz, respuestas, reacciones o participación audiovisual cuando una persona forma parte de una entrevista, grabación, prueba de producto o producción de contenido;",
          "materiales que una marca o cliente nos entregue, como logos, guías, referencias, productos, briefs, claims permitidos o restricciones de comunicación.",
        ],
      },
    ],
  },
  {
    id: "uso-datos",
    title: "3. Para qué usamos los datos",
    blocks: [
      {
        type: "paragraph",
        text: "Usamos la información recopilada para operar Charlando, responder consultas y prestar nuestros servicios. En particular, podemos usar datos personales para:",
      },
      {
        type: "list",
        items: [
          "responder consultas comerciales y coordinar llamadas;",
          "preparar propuestas, presupuestos, estrategias creativas o recomendaciones para una marca;",
          "gestionar la relación con clientes, leads, colaboradores, hosts, proveedores y participantes;",
          "coordinar grabaciones, autorizaciones, entregas, revisiones y comunicaciones del proyecto;",
          "guardar registros razonables de formularios, aprobaciones, consentimientos, solicitudes o conversaciones comerciales;",
          "mejorar el sitio, medir la efectividad de campañas y entender qué contenidos o páginas generan más interés;",
          "cumplir obligaciones legales, contractuales, contables, fiscales o de defensa ante posibles reclamos.",
        ],
      },
    ],
  },
  {
    id: "participantes",
    title: "4. Imagen, voz y participantes de producciones",
    blocks: [
      {
        type: "paragraph",
        text: "Cuando una persona participa en una entrevista, reacción, prueba de producto o grabación, Charlando puede registrar su imagen, voz, respuestas, gestos y contexto de participación para producir piezas audiovisuales. En esos casos procuramos gestionar autorizaciones de uso de imagen y voz mediante formularios, consentimientos digitales, QR u otros medios razonables según el tipo de producción.",
      },
      {
        type: "paragraph",
        text: "Los materiales finales podrán ser usados por Charlando o por el cliente dentro del alcance acordado para redes sociales, campañas digitales, portfolio, casos de estudio, presentaciones comerciales u otros usos autorizados. Si una persona solicita revisar, limitar o retirar el uso de su imagen, evaluaremos el caso de buena fe junto con el cliente cuando corresponda.",
      },
    ],
  },
  {
    id: "base-legal",
    title: "5. Bases para tratar información",
    blocks: [
      {
        type: "paragraph",
        text: "Tratamos información personal cuando existe una razón válida para hacerlo, incluyendo el consentimiento de la persona, la ejecución de una relación contractual o precontractual, el interés legítimo de Charlando en operar y mejorar sus servicios, o el cumplimiento de obligaciones legales aplicables.",
      },
      {
        type: "paragraph",
        text: "En todos los casos buscamos recopilar solo la información razonablemente necesaria para el fin correspondiente.",
      },
    ],
  },
  {
    id: "herramientas",
    title: "6. Herramientas y proveedores",
    blocks: [
      {
        type: "paragraph",
        text: "Para operar el sitio y prestar servicios podemos usar herramientas de terceros. Estas herramientas pueden procesar información en nuestro nombre o bajo sus propias condiciones de privacidad.",
      },
      {
        type: "list",
        items: [
          "servicios de hosting, infraestructura y despliegue del sitio;",
          "bases de datos y herramientas para guardar formularios o solicitudes comerciales;",
          "calendarios, formularios, email, mensajería y herramientas de productividad;",
          "herramientas de analítica, medición, CRM, gestión de proyectos o automatización;",
          "plataformas de contenido, almacenamiento, edición, transferencia de archivos o gestión de campañas.",
        ],
      },
      {
        type: "paragraph",
        text: "No vendemos bases de datos personales. Podemos compartir información con proveedores únicamente cuando sea necesario para operar el sitio, responder una consulta, ejecutar un proyecto o cumplir obligaciones legales.",
      },
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies y tecnologías similares",
    blocks: [
      {
        type: "paragraph",
        text: "El sitio puede usar cookies, almacenamiento local, píxeles o tecnologías similares para recordar preferencias, mejorar la experiencia, medir tráfico, analizar campañas o entender cómo se navega el sitio.",
      },
      {
        type: "paragraph",
        text: "Podés configurar tu navegador para bloquear o eliminar cookies. Algunas funciones del sitio podrían no funcionar correctamente si se deshabilitan ciertas tecnologías.",
      },
    ],
  },
  {
    id: "conservacion",
    title: "8. Conservación de datos",
    blocks: [
      {
        type: "paragraph",
        text: "Conservamos información personal durante el tiempo necesario para cumplir los fines indicados en esta política, prestar servicios, mantener registros comerciales razonables, cumplir obligaciones legales o defender derechos ante posibles reclamos.",
      },
      {
        type: "paragraph",
        text: "Cuando la información deja de ser necesaria, podemos eliminarla, anonimizarla o conservarla de forma limitada cuando exista una razón legítima para hacerlo.",
      },
    ],
  },
  {
    id: "seguridad",
    title: "9. Seguridad",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando adopta medidas razonables para proteger la información contra acceso no autorizado, pérdida, alteración o divulgación indebida. Sin embargo, ningún sistema digital es completamente seguro y no podemos garantizar seguridad absoluta.",
      },
      {
        type: "paragraph",
        text: "El cliente también debe cuidar los accesos, materiales, links y archivos que comparte con Charlando o con terceros involucrados en un proyecto.",
      },
    ],
  },
  {
    id: "derechos",
    title: "10. Derechos de las personas",
    blocks: [
      {
        type: "paragraph",
        text: "Según la ley aplicable, una persona puede solicitar acceso, actualización, rectificación, eliminación, limitación u oposición al tratamiento de sus datos personales. También puede retirar consentimientos otorgados cuando corresponda.",
      },
      {
        type: "paragraph",
        text: "Para ejercer estos derechos, se puede contactar al equipo de Charlando por los canales comerciales habituales o a través del formulario de contacto del sitio. Podemos pedir información adicional para verificar identidad y procesar la solicitud de manera segura.",
      },
    ],
  },
  {
    id: "menores",
    title: "11. Menores de edad",
    blocks: [
      {
        type: "paragraph",
        text: "Los servicios de Charlando están orientados a marcas, empresas y personas mayores de edad. No buscamos recopilar intencionalmente datos de menores sin autorización correspondiente. Si detectamos que recibimos información de un menor sin autorización válida, podremos eliminarla o limitar su uso.",
      },
    ],
  },
  {
    id: "transferencias",
    title: "12. Transferencias internacionales",
    blocks: [
      {
        type: "paragraph",
        text: "Algunas herramientas o proveedores que usamos pueden estar ubicados fuera del país desde donde accedés al sitio. En esos casos, la información puede ser procesada en otras jurisdicciones con normas de protección de datos diferentes.",
      },
      {
        type: "paragraph",
        text: "Cuando corresponda, procuramos trabajar con proveedores reconocidos y adoptar medidas razonables para proteger la información transferida.",
      },
    ],
  },
  {
    id: "cambios",
    title: "13. Cambios en esta política",
    blocks: [
      {
        type: "paragraph",
        text: "Charlando podrá actualizar esta Política de privacidad cuando sea necesario para reflejar cambios operativos, legales, técnicos o comerciales. La versión vigente será la publicada en esta página con su fecha de última actualización.",
      },
    ],
  },
  {
    id: "contacto",
    title: "14. Contacto",
    blocks: [
      {
        type: "paragraph",
        text: "Para consultas sobre privacidad, tratamiento de datos, solicitudes de acceso o uso de imagen, podés comunicarte con el equipo de Charlando por los canales comerciales habituales o mediante el formulario de contacto del sitio.",
      },
    ],
  },
  {
    id: "nota-legal",
    title: "15. Nota legal",
    blocks: [
      {
        type: "paragraph",
        text: "Esta política es una base general de privacidad y no reemplaza asesoramiento legal específico. Para campañas sensibles, categorías reguladas, tratamiento intensivo de datos, proyectos con menores, transferencias internacionales complejas o acuerdos de alto valor, se recomienda revisión legal profesional.",
      },
    ],
  },
];

const sectionsEn: PrivacySection[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    blocks: [
      { type: "paragraph", text: "Charlando creates audiovisual content for brands through street interviews, real reactions, and vertical pieces for social media and digital campaigns. This Privacy Policy explains how we may collect, use, store, and protect personal information when someone visits our site, completes a form, books a call, interacts with our content, or participates in a production." },
      { type: "paragraph", text: "By using the site, completing forms, or sharing information with Charlando, you accept the processing of your data under this policy." },
    ],
  },
  {
    id: "data-we-collect",
    title: "2. Data we may collect",
    blocks: [
      { type: "paragraph", text: "Depending on how you interact with Charlando, we may collect the following categories of information:" },
      { type: "list", items: ["contact details such as name, email, phone, brand, company, website, or social handle;", "commercial information shared to evaluate a project, campaign, or proposal;", "data submitted through site forms, external forms, booking calendars, or commercial channels such as email and WhatsApp;", "basic technical information such as page visited, date, time, browser, device, referrer URL, UTM parameters, or similar analytics data;", "image, voice, answers, reactions, or audiovisual participation when someone is part of an interview, recording, product test, or content production;", "materials provided by a brand or client, such as logos, guidelines, references, products, briefs, permitted claims, or communication restrictions."] },
    ],
  },
  {
    id: "data-use",
    title: "3. How we use data",
    blocks: [
      { type: "paragraph", text: "We use collected information to operate Charlando, answer inquiries, and provide our services. In particular, we may use personal data to:" },
      { type: "list", items: ["respond to commercial inquiries and coordinate calls;", "prepare proposals, quotes, creative strategies, or recommendations for a brand;", "manage relationships with clients, leads, collaborators, hosts, suppliers, and participants;", "coordinate recordings, releases, deliveries, revisions, and project communications;", "keep reasonable records of forms, approvals, consents, requests, or commercial conversations;", "improve the site, measure campaign effectiveness, and understand which content or pages generate interest;", "comply with legal, contractual, accounting, tax, or defense obligations."] },
    ],
  },
  {
    id: "participants",
    title: "4. Image, voice, and production participants",
    blocks: [
      { type: "paragraph", text: "When someone participates in an interview, reaction, product test, or recording, Charlando may capture their image, voice, answers, gestures, and participation context to produce audiovisual pieces. In those cases, we seek to manage image and voice authorizations through forms, digital consents, QR flows, or other reasonable means according to the production type." },
      { type: "paragraph", text: "Final materials may be used by Charlando or the client within the agreed scope for social media, digital campaigns, portfolio, case studies, commercial presentations, or other authorized uses. If someone requests review, limitation, or removal of the use of their image, we will evaluate the case in good faith with the client when applicable." },
    ],
  },
  {
    id: "legal-basis",
    title: "5. Bases for processing information",
    blocks: [
      { type: "paragraph", text: "We process personal information when there is a valid reason to do so, including consent, the execution of a contractual or pre-contractual relationship, Charlando’s legitimate interest in operating and improving its services, or compliance with applicable legal obligations." },
      { type: "paragraph", text: "In all cases we aim to collect only the information reasonably necessary for the relevant purpose." },
    ],
  },
  {
    id: "tools",
    title: "6. Tools and providers",
    blocks: [
      { type: "paragraph", text: "To operate the site and provide services, we may use third-party tools. These tools may process information on our behalf or under their own privacy terms." },
      { type: "list", items: ["hosting, infrastructure, and site deployment services;", "databases and tools to store forms or commercial requests;", "calendars, forms, email, messaging, and productivity tools;", "analytics, measurement, CRM, project management, or automation tools;", "content, storage, editing, file transfer, or campaign management platforms."] },
      { type: "paragraph", text: "We do not sell personal databases. We may share information with providers only when necessary to operate the site, answer an inquiry, execute a project, or comply with legal obligations." },
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies and similar technologies",
    blocks: [
      { type: "paragraph", text: "The site may use cookies, local storage, pixels, or similar technologies to remember preferences, improve the experience, measure traffic, analyze campaigns, or understand site navigation." },
      { type: "paragraph", text: "You can configure your browser to block or delete cookies. Some site features may not work properly if certain technologies are disabled." },
    ],
  },
  {
    id: "retention",
    title: "8. Data retention",
    blocks: [
      { type: "paragraph", text: "We retain personal information for as long as necessary to fulfill the purposes in this policy, provide services, keep reasonable commercial records, comply with legal obligations, or defend rights against possible claims." },
      { type: "paragraph", text: "When information is no longer necessary, we may delete it, anonymize it, or keep it in a limited way when there is a legitimate reason to do so." },
    ],
  },
  {
    id: "security",
    title: "9. Security",
    blocks: [
      { type: "paragraph", text: "Charlando adopts reasonable measures to protect information against unauthorized access, loss, alteration, or improper disclosure. However, no digital system is completely secure and we cannot guarantee absolute security." },
      { type: "paragraph", text: "The client must also protect the access, materials, links, and files shared with Charlando or third parties involved in a project." },
    ],
  },
  {
    id: "rights",
    title: "10. Individual rights",
    blocks: [
      { type: "paragraph", text: "Depending on applicable law, a person may request access, update, rectification, deletion, limitation, or objection to the processing of their personal data. They may also withdraw consent when applicable." },
      { type: "paragraph", text: "To exercise these rights, contact the Charlando team through the usual commercial channels or the site contact form. We may request additional information to verify identity and process the request securely." },
    ],
  },
  {
    id: "minors",
    title: "11. Minors",
    blocks: [
      { type: "paragraph", text: "Charlando’s services are aimed at brands, companies, and adults. We do not intentionally seek to collect data from minors without the corresponding authorization. If we detect that we received information from a minor without valid authorization, we may delete it or limit its use." },
    ],
  },
  {
    id: "transfers",
    title: "12. International transfers",
    blocks: [
      { type: "paragraph", text: "Some tools or providers we use may be located outside the country from which you access the site. In those cases, information may be processed in jurisdictions with different data protection rules." },
      { type: "paragraph", text: "When applicable, we seek to work with recognized providers and adopt reasonable measures to protect transferred information." },
    ],
  },
  {
    id: "changes",
    title: "13. Changes to this policy",
    blocks: [
      { type: "paragraph", text: "Charlando may update this Privacy Policy when necessary to reflect operational, legal, technical, or commercial changes. The current version is the one published on this page with its last updated date." },
    ],
  },
  {
    id: "contact",
    title: "14. Contact",
    blocks: [
      { type: "paragraph", text: "For questions about privacy, data processing, access requests, or image use, you may contact the Charlando team through the usual commercial channels or the site contact form." },
    ],
  },
  {
    id: "legal-note",
    title: "15. Legal note",
    blocks: [
      { type: "paragraph", text: "This policy is a general privacy base and does not replace specific legal advice. For sensitive campaigns, regulated categories, intensive data processing, projects involving minors, complex international transfers, or high-value agreements, professional legal review is recommended." },
    ],
  },
];

const PrivacyPolicy = () => {
  const { locale, t } = useTranslation();
  const localizedHome = localizePath("/", locale);
  const currentSections = locale === "en" ? sectionsEn : sections;

  usePageSeo({
    title: t.seo.privacyTitle,
    description: locale === "en" ? "Charlando Privacy Policy for site usage, forms, commercial data, audiovisual productions, and participant image rights." : "Política de privacidad de Charlando para el uso del sitio, formularios, datos comerciales, producciones audiovisuales e imagen de participantes.",
    canonicalPath: localizePath("/politica-de-privacidad", locale),
    locale,
    alternatePaths: alternatePathsFor("/politica-de-privacidad"),
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
            {locale === "en" ? "Privacy Policy" : "Política de privacidad"}
          </h1>
          <p className="mt-4 text-pretty text-sm leading-6 text-muted-foreground">
            {locale === "en" ? "Last updated" : "Última actualización"}: {locale === "en" ? LAST_UPDATED_EN : LAST_UPDATED}
          </p>
        </aside>

        <article className="rounded-[28px] bg-card px-5 py-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {locale === "en"
                ? "This Privacy Policy explains how Charlando collects, uses, and protects information related to site visitors, people who complete forms, clients, leads, collaborators, and audiovisual production participants."
                : "Esta Política de privacidad explica cómo Charlando recopila, usa y protege información relacionada con visitantes del sitio, personas que completan formularios, clientes, leads, colaboradores y participantes de producciones audiovisuales."}
            </p>
            <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {locale === "en"
                ? "We aim to process information reasonably, limited to the relevant purpose, and aligned with our Terms and Conditions."
                : "Buscamos tratar la información de forma razonable, limitada al propósito correspondiente y alineada con nuestros Términos y condiciones."}
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

export default PrivacyPolicy;
