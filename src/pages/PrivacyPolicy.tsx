import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { usePageSeo } from "@/lib/seo";

type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type PrivacySection = {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

const LAST_UPDATED = "30 de junio de 2026";

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

const PrivacyPolicy = () => {
  usePageSeo({
    title: "Política de privacidad | Charlando",
    description: "Política de privacidad de Charlando para el uso del sitio, formularios, datos comerciales, producciones audiovisuales e imagen de participantes.",
    canonicalPath: "/politica-de-privacidad",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" aria-label="Ir al inicio" className="shrink-0">
            <Logo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-10 items-center rounded-full px-4 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:text-primary"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[300px_1fr] lg:px-8 lg:py-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Legal</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Política de privacidad
          </h1>
          <p className="mt-4 text-pretty text-sm leading-6 text-muted-foreground">
            Última actualización: {LAST_UPDATED}
          </p>
        </aside>

        <article className="rounded-[28px] bg-card px-5 py-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Esta Política de privacidad explica cómo Charlando recopila, usa y protege información relacionada con visitantes del sitio, personas que completan formularios, clientes, leads, colaboradores y participantes de producciones audiovisuales.
            </p>
            <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Buscamos tratar la información de forma razonable, limitada al propósito correspondiente y alineada con nuestros Términos y condiciones.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
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
