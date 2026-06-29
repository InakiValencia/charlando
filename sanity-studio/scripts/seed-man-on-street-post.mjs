import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-26'})
const coverPath = fileURLToPath(new URL('../../public/blog-entrevistas-callejeras-cover-v2.jpg', import.meta.url))

const key = (() => {
  let index = 0
  return (prefix) => `${prefix}-${String(index++).padStart(3, '0')}`
})()

const span = (text, marks = []) => ({_key: key('span'), _type: 'span', marks, text})
const block = (style, children) => ({_key: key('block'), _type: 'block', style, markDefs: [], children})
const bullet = (children) => ({
  _key: key('block'),
  _type: 'block',
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children,
})

const body = [
  block('normal', [
    span(
      'El marketing de entrevistas callejeras parte de una premisa simple: en vez de pedirle al público que crea un mensaje de marca, se crea una situación real donde una persona responde, prueba, opina o reacciona frente a cámara. El producto no aparece como una promesa aislada, sino dentro de una conversación que puede sorprender, incomodar, divertir o confirmar algo que la audiencia ya estaba pensando.'
    ),
  ]),
  block('normal', [
    span(
      'Ese pequeño cambio mueve todo. La marca deja de estar en modo anuncio y empieza a estar en modo conversación. El contenido se siente menos fabricado porque incluye pausas, dudas, humor, sorpresa y lenguaje real. En un feed lleno de piezas cada vez más parecidas, esa sensación de realidad es una ventaja creativa: ayuda a que el usuario se quede unos segundos más para entender qué está pasando.'
    ),
  ]),
  block('h2', [span('Qué es realmente este formato')]),
  block('normal', [
    span(
      'No es solamente salir con un micrófono a la calle. Una buena entrevista callejera para marcas combina tres capas: una pregunta con tensión, una persona real que pueda responder sin guion y una edición que convierta esa respuesta en una pieza clara para redes. La cámara registra una reacción, pero la estrategia define qué reacción vale la pena buscar.'
    ),
  ]),
  block('normal', [
    span(
      'La calle funciona porque agrega contexto. Cuando alguien responde en un entorno real, el espectador siente que está viendo algo menos controlado. Y cuando algo se siente menos controlado, también se siente más creíble. Esa credibilidad no depende de que la persona sea famosa ni de que diga exactamente lo que la marca quiere escuchar. Depende de que la escena parezca posible, cercana y humana.'
    ),
  ]),
  block('blockquote', [
    span('La pregunta es el hook. La reacción es la prueba. La edición convierte la escena en contenido.'),
  ]),
  block('h2', [span('Por qué detiene el scroll')]),
  block('normal', [
    span(
      'En un feed lleno de piezas parecidas, una pregunta directa abre una historia incompleta. El usuario quiere saber qué va a contestar la persona, si va a coincidir, si se va a equivocar o si va a decir algo inesperado. Esa tensión inicial es el combustible del formato. Antes de que la marca explique nada, ya existe una razón para mirar.'
    ),
  ]),
  block('normal', [
    span(
      'Esa curiosidad inicial es muy difícil de conseguir con una placa estática o una pieza excesivamente producida. En cambio, una conversación real instala una tensión inmediata: ¿qué va a pasar ahora? La respuesta puede ser graciosa, honesta, incómoda o sorprendente. Lo importante es que todavía no está cerrada, y eso obliga al usuario a esperar un poco más antes de scrollear.'
    ),
  ]),
  block('h2', [span('Qué lo diferencia del UGC tradicional')]),
  block('normal', [
    span(
      'El UGC tradicional suele depender de un creador hablando a cámara con un guion o una estructura conocida. Puede funcionar, pero también se volvió fácil de reconocer. Muchas veces el usuario ya sabe que está viendo una venta antes de escuchar el argumento. Esa familiaridad puede bajar la atención, sobre todo cuando todos los anuncios usan la misma estructura de problema, promesa y beneficio.'
    ),
  ]),
  block('normal', [
    span(
      'La entrevista callejera cambia el punto de partida. No empieza con una promesa, empieza con una pregunta. No muestra a alguien explicando un beneficio, muestra a alguien reaccionando ante una situación. La marca puede aparecer como disparador, como objeto de prueba, como comparación o como parte de una dinámica. Eso hace que el contenido parezca menos lineal y más vivo.'
    ),
  ]),
  block('h2', [span('Cómo se arma una pieza que funciona')]),
  block('normal', [
    span(
      'La ejecución parece espontánea, pero la estrategia no debería serlo. Antes de grabar hay que definir qué tensión queremos abrir, qué objeción queremos escuchar, qué parte del producto conviene mostrar y qué respuesta podría transformarse en un buen corte. La calle aporta imprevisibilidad; la marca aporta dirección.'
    ),
  ]),
  bullet([span('Definir una pregunta que cualquier persona pueda responder sin contexto previo.')]),
  bullet([span('Elegir una ubicación donde la escena se sienta natural y tenga energía.')]),
  bullet([span('Registrar reacciones suficientes para encontrar patrones reales, no solo una respuesta linda.')]),
  bullet([span('Editar con foco en claridad: hook rápido, reacción visible y cierre accionable.')]),
  block('normal', [
    span(
      'La pregunta es la parte más importante. Si es demasiado amplia, la respuesta se vuelve genérica. Si es demasiado técnica, la persona necesita pensar demasiado y el ritmo cae. Una buena pregunta callejera tiene que ser simple de responder, pero interesante de mirar. Tiene que abrir una diferencia, una elección, una sorpresa o una tensión relacionada con la categoría.'
    ),
  ]),
  block('normal', [
    span(
      'Después viene la edición. No alcanza con capturar una buena respuesta si el video tarda demasiado en llegar al punto. El primer segundo debe dejar claro que algo está pasando. La reacción tiene que verse. Los subtítulos tienen que acompañar el ritmo. Y el cierre debe conectar la escena con el objetivo de la marca, sin convertir todo en una venta rígida.'
    ),
  ]),
  block('h2', [span('Qué puede aprender una marca')]),
  block('normal', [
    span(
      'Además de generar piezas para publicar, este formato funciona como investigación viva. Las respuestas muestran palabras que la audiencia usa, objeciones que aparecen sin pedirlas y ángulos que quizá la marca no había considerado. En vez de imaginar cómo habla el público, la marca puede escucharlo en contexto.'
    ),
  ]),
  block('normal', [
    span(
      'Una campaña callejera bien pensada puede revelar qué pregunta despierta más interés, qué beneficio se entiende más rápido y qué tipo de reacción vale la pena convertir en pauta. También puede mostrar qué parte del mensaje no se entiende, qué comparación aparece naturalmente y qué frases reales podrían convertirse en futuros hooks.'
    ),
  ]),
  block('normal', [
    span(
      'Ese aprendizaje tiene mucho valor para performance. Si una respuesta retiene más que otra, hay una hipótesis creativa. Si un comentario se repite, hay una objeción para trabajar. Si una reacción genera shares, puede haber un insight cultural. El contenido deja de ser solo una publicación y se transforma en un sistema para descubrir qué conversación quiere tener la audiencia.'
    ),
  ]),
  block('h2', [span('Cuándo conviene usarlo')]),
  block('normal', [
    span(
      'Sirve especialmente cuando una marca necesita explicar algo simple de una manera más humana: probar un producto, validar una idea, mostrar una reacción, abrir una conversación sobre una categoría o generar material para testear en redes. También funciona cuando la marca quiere salir de una comunicación demasiado perfecta y mostrar más calle, más contexto y más uso real.'
    ),
  ]),
  block('normal', [
    span(
      'No reemplaza toda la comunicación de marca. Pero cuando el objetivo es atención, retención y prueba social, pocas cosas compiten con una reacción auténtica bien capturada. El formato puede usarse para lanzamientos, productos de consumo, experiencias, locales gastronómicos, apps, servicios, eventos o cualquier marca que tenga una pregunta simple para poner en la calle.'
    ),
  ]),
  block('h2', [span('Errores comunes en entrevistas callejeras para marcas')]),
  block('normal', [
    span(
      'El primer error es copiar la estética del formato sin pensar la estrategia. Un micrófono y una pregunta no alcanzan. Si la pregunta no tiene tensión o no está conectada con un objetivo de marca, el video puede ser entretenido pero no necesariamente útil.'
    ),
  ]),
  block('normal', [
    span(
      'El segundo error es dirigir demasiado la respuesta. Cuando la persona parece estar diciendo una frase preparada, se pierde la fuerza del formato. La autenticidad no significa desorden, pero sí requiere dejar espacio para que aparezca algo no escrito. Si todo está cerrado de antemano, el video vuelve a sentirse como un anuncio.'
    ),
  ]),
  block('normal', [
    span(
      'El tercer error es medir solo views. Un video puede tener muchas reproducciones y poca intención. Conviene mirar retención, tasa de hook, comentarios, guardados, clics y calidad de las respuestas. El objetivo no es solamente que más gente vea el contenido, sino entender qué escena hizo que se quedaran.'
    ),
  ]),
  block('h2', [span('Preguntas frecuentes')]),
  block('h3', [span('¿Tiene que ser completamente improvisado?')]),
  block('normal', [
    span(
      'No. La respuesta debe ser real, pero la situación se diseña. La estrategia está en la pregunta, el contexto, la selección de clips y la edición. Lo importante es que la persona no actúe una reacción, sino que responda dentro de un marco pensado.'
    ),
  ]),
  block('h3', [span('¿Funciona para cualquier producto?')]),
  block('normal', [
    span(
      'Funciona mejor cuando hay algo que una persona pueda entender, probar, opinar o comparar rápidamente. Si el producto es muy complejo, el formato puede usarse para abrir una tensión o explicar una parte concreta. No hace falta contar todo: alcanza con encontrar el momento más simple, visual o discutible.'
    ),
  ]),
  block('h3', [span('¿Qué mide una marca después?')]),
  block('normal', [
    span(
      'Retención, tasa de hook, comentarios, saves, CTR y performance si se pauta. También conviene mirar qué palabras o reacciones se repiten, porque ahí suelen aparecer nuevos ángulos creativos. Las métricas explican qué pasó; las respuestas ayudan a entender por qué.'
    ),
  ]),
]

const title = 'Qué es el marketing de entrevistas callejeras y por qué funciona'
const slug = 'que-es-el-marketing-de-entrevistas-callejeras'
const excerpt =
  'Una guía clara para entender qué es el marketing de entrevistas callejeras, por qué detiene el scroll y cómo una pregunta real puede convertirse en contenido, prueba social y nuevos ángulos creativos para una marca.'

const asset = await client.assets.upload('image', createReadStream(coverPath), {
  filename: 'charlando-blog-entrevistas-callejeras-cover-v2.jpg',
  contentType: 'image/jpeg',
})

const image = {
  _type: 'image',
  asset: {
    _type: 'reference',
    _ref: asset._id,
  },
  alt: 'Portada de Charlando sobre marketing de entrevistas callejeras',
}

const post = {
  _id: `post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  excerpt,
  coverImage: image,
  category: 'Insights',
  author: 'Charlando',
  publishedAt: (await client.getDocument(`post-${slug}`))?.publishedAt || new Date().toISOString(),
  body,
  seoTitle: 'Marketing de entrevistas callejeras: qué es y cómo usarlo | Charlando',
  seoDescription:
    'Guía para entender qué es el marketing de entrevistas callejeras, por qué detiene el scroll y cómo usar preguntas, reacciones reales y edición para crecer en redes.',
  ogImage: image,
}

await client.createOrReplace(post)
await client.delete(`post.${slug}`).catch(() => undefined)
console.log(`Published post: ${post._id}`)
