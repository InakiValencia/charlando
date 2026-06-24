# Manual de marca - Charlando

Este manual resume el sistema visual actual de la web de Charlando. La referencia principal es la implementacion vigente en `src/index.css`, `tailwind.config.ts`, `src/components/Logo.tsx` y `src/pages/Landing.tsx`.

## Esencia de marca

Charlando convierte conversaciones reales en contenido vertical para marcas. La identidad debe sentirse directa, humana, moderna y confiable: una mezcla de produccion callejera, claridad comercial y energia social.

Principios:

- Real antes que artificial.
- Simple antes que sobreexplicado.
- Alto contraste para guiar accion.
- Aire blanco, tarjetas limpias y acentos turquesa.
- Fotos reales como prueba visual, no decoracion generica.

## Logo

Asset principal:

- `public/openmic-logo.png`

Uso actual en codigo:

- Header y footer: `Logo size="md"`
- Hero principal: `Logo size="xl"`
- Layout interno: `Logo size="sm"`

Componente:

- `src/components/Logo.tsx`

Medidas definidas:

| Tamaño | Glifo | Texto |
| --- | ---: | --- |
| `sm` | 30px | `text-lg` |
| `md` | 36px | `text-[22px]` |
| `lg` | 46px | `text-[28px]` |
| `xl` | 58px | `text-[36px]` |

Reglas:

- Usar siempre el glifo junto a la palabra `Charlando` en piezas principales.
- Mantener el espacio entre glifo y wordmark corto: actualmente `gap-1`.
- No estirar, rotar ni recolorear el logo.
- Sobre fondos claros, usar texto negro.
- Sobre fondos oscuros, usar variante clara o texto blanco.
- No poner el logo dentro de contenedores muy decorativos; debe sentirse editorial y limpio.

## Paleta de color

La paleta base vive en variables CSS HSL. Estos son los valores principales convertidos a HEX.

| Token | HSL | HEX | Uso |
| --- | --- | --- | --- |
| `background` | `0 0% 100%` | `#ffffff` | Fondo principal |
| `foreground` | `0 0% 4%` | `#0a0a0a` | Texto principal, botones primarios |
| `primary` | `189 70% 48%` | `#25b6d0` | Acentos, palabras destacadas, estados activos |
| `primary-foreground` | `0 0% 100%` | `#ffffff` | Texto sobre turquesa |
| `accent` | `189 70% 96%` | `#eefafc` | Badges, fondos suaves de apoyo |
| `muted` | `0 0% 97%` | `#f7f7f7` | Superficies secundarias |
| `muted-foreground` | `0 0% 40%` | `#666666` | Subtitulos y texto descriptivo |
| `border` / `input` | `0 0% 91%` | `#e8e8e8` | Bordes sutiles, inputs |
| `success` | `172 50% 40%` | `#33998b` | Estados positivos |
| `warning` | `38 80% 55%` | `#e8a530` | Advertencias |
| `destructive` | `0 84% 60%` | `#ef4343` | Errores |

Modo oscuro disponible:

| Token | HSL | HEX |
| --- | --- | --- |
| `dark background` | `240 25% 8%` | `#0f0f1a` |
| `dark foreground` | `240 5% 95%` | `#f2f2f3` |

Reglas de color:

- El turquesa `#25b6d0` es acento, no fondo dominante.
- El negro `#0a0a0a` debe reservarse para texto fuerte, numerales y CTAs.
- El fondo general debe seguir siendo blanco.
- Evitar paletas monocromaticas turquesa. El sitio funciona por contraste blanco, negro, gris y acento.
- Para badges suaves usar `#eefafc` con texto turquesa.
- Para cards usar blanco o `#f7f7f7`, con sombra sutil antes que bordes pesados.

## Tipografia

Fuentes definidas:

- Display: `Bricolage Grotesque`
- Texto/base: `DM Sans`
- Logo wordmark: `Geist Sans`
- Monoespaciada: `Geist Mono`

Carga:

- Google Fonts en `index.html` y `src/index.css`
- Geist desde `node_modules/geist`

Uso:

| Uso | Fuente | Peso recomendado |
| --- | --- | --- |
| H1, H2, titulares | Bricolage Grotesque | 700 |
| Cards y titulos secundarios | Bricolage Grotesque | 600-700 |
| Parrafos, nav, labels | DM Sans | 400-600 |
| Logo `Charlando` | Geist Sans | 700 |
| Numeros destacados | Bricolage Grotesque + `tabular-nums` | 700 |

Jerarquia de la home:

- Hero H1: grande, compacto, con `leading-[1.12]`.
- Subtitulo: `text-base sm:text-lg`, color `muted-foreground`.
- Titulos de seccion: `text-3xl sm:text-4xl lg:text-5xl`.

Reglas:

- Los headings usan `text-wrap: balance`.
- Parrafos y listas usan `text-wrap: pretty`.
- Mantener letter spacing normal o `tracking-tight` en titulares grandes.
- Evitar subtitulos demasiado pesados: deben apoyar, no competir con el titulo.

## Componentes visuales

### Botones

Boton primario:

- Fondo: `foreground` / `#0a0a0a`
- Texto: `background` / `#ffffff`
- Hover: `primary` / `#25b6d0`
- Alto frecuente: `h-12`
- Texto: `font-semibold`
- Forma: rounded pill o radio alto segun contexto

Boton secundario:

- Variante outline.
- Borde gris sutil.
- Texto negro.
- Usar para acciones secundarias como `Ver videos`.

Reglas:

- Las acciones principales siempre deben ser negras o turquesas.
- No usar multiples CTAs de igual peso en una misma linea.
- Los iconos de flecha pueden acompanar acciones de avance.

### Cards

Estilo:

- Fondos claros: blanco o gris muy suave.
- Radios amplios en cards principales: `rounded-2xl` a `rounded-3xl`.
- Sombras suaves en hover.
- Contraste consistente entre secciones de proceso, servicios y funcionamiento.

Reglas:

- Evitar cards anidadas.
- Evitar bordes visibles pesados.
- Usar numeros negros con sombra sutil para pasos.
- En mobile, las cards del proceso pueden autoactivarse al scrollear.

### Formularios

Formulario actual:

- Modal `Agendar llamada`
- Campos: email, nombre, marca, URL
- Inserta datos en Supabase: `lead_submissions`
- Luego redirige al calendario

Copy actual:

> Dejanos tus datos y avanzamos con una conversacion concreta sobre tu marca.

Reglas:

- Labels claros y conversacionales.
- Inputs grandes, simples y sin distracciones.
- Mensajes de error en tono directo.
- No pedir mas datos de los necesarios antes de la llamada.

## Fotografia y video

Assets clave:

- `public/hero-card-1.jpg`
- `public/hero-card-2.jpg`
- `public/hero-card-3.png`
- `public/hero-card-4.png`
- `public/featured-video-1.png`
- `public/featured-video-2.png`
- `public/featured-video-3.jpg`
- `public/featured-video-4.jpg`
- `public/about-imanol.png`
- `public/street-recording.png`

Direccion visual:

- Usar fotos reales de entrevistas, reacciones y producto en contexto.
- Preferir composiciones verticales tipo Reel/TikTok.
- Mostrar personas, microfonos, calle, producto y reaccion.
- Evitar imagenes stock, fondos genericos y renders abstractos.
- Las fotos pueden ir levemente rotadas en el hero para dar energia social.

Tratamiento:

- Bordes redondeados.
- Sombras suaves.
- Outline sutil automatico para imagenes, salvo clase `no-image-outline`.
- Recortes verticales con `aspect-[9/16]`.

## Iconografia y graficos

Libreria:

- `lucide-react`

Iconos usados:

- `ArrowRight`
- `Plus`
- `Minus`
- `Mic`
- `Puzzle`

Reglas:

- Usar iconos simples, lineales y reconocibles.
- Mantener tamano compacto: 16px a 24px.
- El icono acompana una accion, no reemplaza el contenido principal.
- No mezclar estilos de iconos distintos.

## Movimiento

Libreria:

- `framer-motion`

Patrones:

- Entradas con `opacity` + `y: 24`.
- Stagger suave en cards.
- Carruseles con movimiento horizontal lineal.
- Rotacion de palabra en hero con `AnimatePresence`.

Reglas:

- El movimiento debe reforzar dinamismo social, no distraer.
- Usar animaciones cortas: 0.35s a 0.7s.
- En carruseles, movimiento continuo y lento.
- Evitar rebotes exagerados.

## Layout y espaciado

Sistema:

- Contenedor maximo frecuente: `max-w-6xl` o `max-w-7xl`.
- Padding horizontal: `px-6 lg:px-8`.
- Secciones: `py-12 lg:py-16`.
- Hero: centro visual amplio con elementos fotograficos laterales.

Reglas:

- Mantener secciones con espacio consistente.
- Reducir blancos excesivos, pero preservar aire.
- En mobile, priorizar lectura vertical y cards escaneables.
- Evitar que texto y botones se superpongan con imagenes.

## Tono de voz

La marca habla de forma clara, concreta y humana.

Si:

- "Personas reales. Reacciones reales."
- "Agendar llamada"
- "De la idea al video viral en 4 pasos."
- "Sin IA, sin guiones, sin actores pagos."

No:

- Frases demasiado corporativas.
- Promesas vagas como "soluciones innovadoras".
- Tecnicismos publicitarios innecesarios.
- Explicaciones largas dentro de la interfaz.

Reglas:

- Usar vos/tus cuando se hable al cliente.
- Priorizar frases cortas.
- Hacer foco en resultado, autenticidad y proceso.
- Mantener energia, sin sonar exagerado.

## SEO y Open Graph

Titulo:

- `Charlando | Entrevistas callejeras para marcas`

OG title:

- `Charlando | Conversaciones que convierten`

Descripcion:

- `Personas reales, reacciones reales y videos verticales listos para redes y campañas digitales.`

Imagen OG:

- `public/charlando-og-v2.jpg`
- URL esperada: `https://www.charlando.com.ar/charlando-og-v2.jpg`
- Tamano: 1200 x 638
- Tipo: JPEG

Reglas:

- Cuando se actualice la imagen OG, cambiar tambien el nombre del archivo para evitar cache de WhatsApp.
- Usar URL absoluta en `og:image`.
- Mantener peso bajo, idealmente menor a 300 KB.

## Assets de marcas colaboradoras

Carrusel actual:

- `public/cafe-delirante-logo.png`
- `public/arcor-logo.png`
- `public/sao-medialunas-logo.png`
- `public/ogham-logo.png`

Reglas:

- Los logos de clientes deben tener menor peso visual que el hero.
- Mantenerlos en carrusel con movimiento horizontal suave.
- No usar fondo negro en el carrusel.
- El CTA final debe decir `Agendar llamada`.

## Checklist rapido para nuevas piezas

- Usa `Bricolage Grotesque` para titulares.
- Usa `DM Sans` para textos.
- Respeta blanco, negro, gris y turquesa.
- El turquesa funciona como acento, no como color total.
- Las imagenes muestran personas/productos reales.
- El CTA principal es negro o turquesa.
- El copy es corto y directo.
- El logo no se deforma ni se separa demasiado del texto.
- El contenido funciona en mobile antes de aprobarlo.
- Si se cambia OG, usar filename nuevo para romper cache.
