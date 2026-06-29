import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-26'})
const coverPath = fileURLToPath(new URL('../../public/blog-publicidad-tradicional-cover-v8.jpg', import.meta.url))

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
      'Durante años, la publicidad de marca se construyó alrededor de una idea muy prolija: escribir un guion, contratar actores, producir una pieza impecable y esperar que la audiencia creyera en esa historia. Ese modelo funcionó mientras los medios eran más previsibles y la atención estaba concentrada en pocos lugares. Pero en redes sociales el usuario no espera una promesa perfecta: decide en menos de un segundo si algo merece quedarse en pantalla o si sigue scrolleando.'
    ),
  ]),
  block('normal', [
    span(
      'El problema de muchas piezas tradicionales no es que estén mal producidas. Es que se sienten demasiado controladas. La iluminación, el guion, el casting y la edición comunican “esto es un anuncio” antes de comunicar el beneficio. Cuando eso pasa, la audiencia activa una defensa automática: entiende que alguien le quiere vender algo y baja la curiosidad. La creatividad puede ser linda, pero la conversación ya arrancó cuesta arriba.'
    ),
  ]),
  block('h2', [span('La publicidad tradicional no murió: perdió el monopolio de la atención')]),
  block('normal', [
    span(
      'Decir que la publicidad tradicional murió sería exagerado. Las campañas producidas todavía sirven para construir una estética, explicar una categoría, ordenar un lanzamiento o instalar una identidad visual. Lo que cambió es que ya no pueden ser el único motor creativo de una marca. En feeds saturados, una pieza demasiado pulida compite contra conversaciones, memes, creadores, noticias, recomendaciones y momentos reales. La marca ya no pelea solo contra otras marcas: pelea contra todo lo que el usuario considera más humano.'
    ),
  ]),
  block('normal', [
    span(
      'Por eso muchas marcas empiezan a buscar formatos que se parezcan menos a una interrupción y más a algo que uno encontró. La diferencia parece sutil, pero es enorme. Una interrupción pide permiso después de aparecer. Una conversación genera curiosidad antes de vender. En plataformas como TikTok, Reels y Shorts, esa curiosidad inicial suele ser más valiosa que la producción misma.'
    ),
  ]),
  block('blockquote', [
    span('La atención ya no se compra solo con producción. Se gana con tensión, contexto y verdad.'),
  ]),
  block('h2', [span('Por qué las reacciones reales funcionan')]),
  block('normal', [
    span(
      'Cuando una persona recibe una pregunta directa frente a cámara, aparece una microhistoria inmediata. El espectador quiere saber qué va a decir, cómo va a reaccionar, si va a estar de acuerdo, si se va a sorprender o si va a responder algo inesperado. Esa expectativa es más fuerte que una afirmación de marca porque no está cerrada desde el inicio. Hay tensión. Hay posibilidad de error. Hay una respuesta pendiente.'
    ),
  ]),
  block('normal', [
    span(
      'Ahí aparece el valor de las reacciones reales. La marca deja de decir “mirá qué bueno soy” y crea una situación donde otra persona descubre, discute, prueba o interpreta el producto. El mensaje no desaparece, pero cambia de lugar. Ya no vive solamente en la voz de la marca: vive en la reacción de alguien que no parece estar actuando para vender.'
    ),
  ]),
  block('normal', [
    span(
      'Esto es especialmente potente para productos que necesitan confianza. Si una marca dice que algo sorprende, suena a promesa. Si una persona real se sorprende frente a cámara, se siente como evidencia. No es una prueba científica, pero sí es una señal social. Y en redes, muchas decisiones empiezan con señales: “esto parece real”, “esto le pasó a alguien como yo”, “quiero ver cómo termina”.'
    ),
  ]),
  block('h2', [span('Qué cambia para las marcas')]),
  block('normal', [
    span(
      'El desafío ya no es solamente producir más contenido. Es producir contenido que parezca parte natural del feed, pero que siga teniendo intención estratégica. Ahí es donde las entrevistas callejeras, las pruebas de producto y las preguntas simples se vuelven herramientas de performance. No porque sean “casuales”, sino porque permiten testear ángulos creativos con una velocidad que las campañas tradicionales no siempre tienen.'
    ),
  ]),
  block('normal', [
    span(
      'Una marca puede grabar distintas preguntas, diferentes perfiles de personas y varias formas de presentar el producto. Después puede observar qué tensión retiene más, qué frase genera comentarios, qué objeción aparece seguido y qué beneficio se entiende sin explicación extra. Ese aprendizaje creativo vale mucho, porque convierte la producción de contenido en un sistema de prueba y no en una apuesta aislada.'
    ),
  ]),
  bullet([span('La pregunta funciona como hook porque abre una respuesta pendiente.')]),
  bullet([span('La persona real baja la barrera de desconfianza.')]),
  bullet([span('La reacción le da al producto un contexto social, no solo visual.')]),
  bullet([span('El formato permite testear ángulos distintos sin depender de una sola gran campaña.')]),
  block('h2', [span('De anuncio a conversación')]),
  block('normal', [
    span(
      'Una buena pieza de contenido para redes no tiene que sentirse como una interrupción. Tiene que sentirse como algo que el usuario encontró y quiere terminar de ver. Por eso la conversación es tan potente: no fuerza una conclusión desde el inicio, la construye en pantalla. El producto puede aparecer dentro de una pregunta, una comparación, una reacción, una duda o una prueba rápida.'
    ),
  ]),
  block('normal', [
    span(
      'Para una marca, eso cambia todo. En vez de pedirle al público que crea un beneficio, puede mostrar cómo ese beneficio aparece en una reacción real: sorpresa, risa, duda, aprobación, rechazo, curiosidad. Incluso cuando la respuesta no es perfecta, la escena puede ser más creíble que una promesa impecable. La imperfección, bien editada, suele sumar confianza porque le recuerda al espectador que está viendo una persona, no un libreto.'
    ),
  ]),
  block('h2', [span('Cómo se ve una estrategia de contenido más actual')]),
  block('normal', [
    span(
      'Una estrategia moderna no tiene que elegir entre marca y performance. Puede construir identidad con piezas más producidas y, al mismo tiempo, generar volumen de contenido real para descubrir qué argumentos funcionan. El error es pensar que una sola campaña perfecta va a resolver todos los aprendizajes creativos. En redes, muchas veces gana la marca que más rápido aprende qué conversación quiere tener su audiencia.'
    ),
  ]),
  block('normal', [
    span(
      'Las reacciones reales ayudan a esa velocidad porque producen material diverso: clips de humor, respuestas honestas, frases inesperadas, objeciones, comparaciones y momentos de prueba. Cada pieza puede transformarse en contenido orgánico, anuncio pago, insight para landing pages o punto de partida para la siguiente tanda de grabación.'
    ),
  ]),
  block('h2', [span('Cómo usar este formato sin perder estrategia')]),
  block('normal', [
    span(
      'La autenticidad no significa improvisar todo. Lo que se diseña es el contexto: qué se pregunta, a quién se le pregunta, cómo aparece el producto, qué reacción se busca observar y qué aprendizaje queremos sacar de cada pieza. La respuesta debe ser real, pero el marco tiene que estar pensado. Si no hay estrategia, la calle se vuelve ruido. Si hay demasiada dirección, se pierde naturalidad.'
    ),
  ]),
  block('normal', [
    span(
      'La magia está en dejar que la respuesta sea real, pero que la situación tenga una intención clara. Ese equilibrio es lo que separa un video simpático de una pieza que puede mover métricas. Antes de grabar conviene definir una hipótesis: qué creencia queremos validar, qué objeción queremos escuchar, qué momento del producto puede generar sorpresa y qué tipo de clip sería útil para pauta.'
    ),
  ]),
  block('h2', [span('Qué métricas mirar después')]),
  block('normal', [
    span(
      'Para evaluar este tipo de contenido no alcanza con mirar views. Conviene medir tasa de retención, porcentaje de usuarios que pasan los primeros tres segundos, comentarios cualitativos, guardados, clics y costo por resultado si se pauta. También hay que leer las respuestas del público. Muchas veces el valor está en una pregunta que se repite, una objeción que no esperábamos o una frase que podría convertirse en el próximo hook.'
    ),
  ]),
  block('normal', [
    span(
      'Cuando una marca combina datos de performance con observación creativa, empieza a construir una ventaja. No solo sabe qué video funcionó, sino por qué pudo haber funcionado. Esa lectura permite producir mejor la próxima vez, no simplemente repetir lo mismo.'
    ),
  ]),
  block('h2', [span('Preguntas frecuentes')]),
  block('h3', [span('¿Esto reemplaza a la publicidad tradicional?')]),
  block('normal', [
    span(
      'No necesariamente. La complementa. Las campañas tradicionales pueden construir identidad, estética y reconocimiento; las conversaciones reales pueden generar prueba social, retención y nuevos ángulos para testear. Lo más fuerte suele aparecer cuando ambas partes conviven dentro de un sistema creativo.'
    ),
  ]),
  block('h3', [span('¿Qué pasa si la reacción no es la esperada?')]),
  block('normal', [
    span(
      'También puede servir. Una reacción honesta muestra objeciones, lenguaje real del consumidor y oportunidades para ajustar el mensaje. No todo aprendizaje tiene que venir de una respuesta perfecta. A veces una duda real ayuda más que una aprobación exagerada, porque muestra qué necesita explicar mejor la marca.'
    ),
  ]),
  block('h3', [span('¿Por dónde empieza una marca?')]),
  block('normal', [
    span(
      'Por una pregunta simple. Una que cualquier persona pueda responder, pero que revele algo importante sobre el producto, la categoría o el problema que la marca quiere resolver. Después conviene grabar varias respuestas, editar distintos hooks y medir cuál genera más retención. La primera tanda no debería buscar perfección: debería buscar aprendizaje.'
    ),
  ]),
  block('h3', [span('¿Cuántos videos necesita una marca para aprender?')]),
  block('normal', [
    span(
      'Depende de la categoría, pero conviene pensar en volumen. Un solo video puede funcionar por azar; una serie de piezas permite comparar preguntas, perfiles, aperturas y cierres. Cuanto más rápido se genera variedad, más rápido aparece el patrón creativo que vale la pena escalar.'
    ),
  ]),
]

const title = 'La publicidad tradicional ya no alcanza: por qué las marcas necesitan reacciones reales'
const slug = 'la-publicidad-tradicional-ya-no-alcanza'
const excerpt =
  'La atención se volvió demasiado cara para gastarla en piezas que parecen anuncios. Las marcas que ganan en redes están usando reacciones reales, entrevistas callejeras y contenido auténtico para crear conversaciones que retienen.'

const asset = await client.assets.upload('image', createReadStream(coverPath), {
  filename: 'charlando-blog-publicidad-tradicional-cover-v8.jpg',
  contentType: 'image/jpeg',
})

const image = {
  _type: 'image',
  asset: {
    _type: 'reference',
    _ref: asset._id,
  },
  alt: 'Portada de Charlando sobre publicidad tradicional y reacciones reales',
}

const post = {
  _id: `post-${slug}`,
  _type: 'post',
  title,
  slug: {_type: 'slug', current: slug},
  excerpt,
  coverImage: image,
  category: 'Estrategia',
  author: 'Charlando',
  publishedAt: (await client.getDocument(`post-${slug}`))?.publishedAt || new Date().toISOString(),
  body,
  seoTitle: 'Publicidad tradicional vs reacciones reales: qué funciona en redes | Charlando',
  seoDescription:
    'Por qué la publicidad tradicional pierde atención en redes y cómo las marcas pueden usar entrevistas callejeras, reacciones reales y contenido auténtico para mejorar retención.',
  ogImage: image,
}

await client.createOrReplace(post)
await client.delete(`post.${slug}`).catch(() => undefined)
console.log(`Published post: ${post._id}`)
