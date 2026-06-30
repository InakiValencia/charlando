import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { usePageSeo } from "@/lib/seo";

type TermsBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type TermsSection = {
  id: string;
  title: string;
  blocks: TermsBlock[];
};

const LAST_UPDATED = "30 de junio de 2026";

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

const TermsConditions = () => {
  usePageSeo({
    title: "Términos y condiciones | Charlando",
    description: "Términos de servicio de Charlando para proyectos de entrevistas callejeras, reacciones reales y contenido audiovisual para marcas.",
    canonicalPath: "/terminos-y-condiciones",
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
            Términos y condiciones
          </h1>
          <p className="mt-4 text-pretty text-sm leading-6 text-muted-foreground">
            Última actualización: {LAST_UPDATED}
          </p>
        </aside>

        <article className="rounded-[28px] bg-card px-5 py-7 shadow-[0_18px_70px_-42px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] sm:px-8 sm:py-10 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Estos Términos de servicio regulan la contratación y uso de los servicios prestados por Charlando, una propuesta de contenido que crea entrevistas callejeras, reacciones reales y piezas verticales para marcas, redes sociales y campañas digitales.
            </p>
            <p className="mt-5 text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Al contratar, aprobar una propuesta, pagar una reserva, completar un formulario comercial o utilizar entregables producidos por Charlando, el cliente acepta estos términos.
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

export default TermsConditions;
