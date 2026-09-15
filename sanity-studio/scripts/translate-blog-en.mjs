import {readFile} from 'node:fs/promises'
import {join} from 'node:path'
import {homedir} from 'node:os'

const projectId = 'irdg3uqh'
const dataset = 'production'
const apiVersion = '2026-06-26'

const readSanityToken = async () => {
  if (process.env.SANITY_AUTH_TOKEN) {
    return process.env.SANITY_AUTH_TOKEN
  }

  const configPath = join(homedir(), '.config', 'sanity', 'config.json')
  const config = JSON.parse(await readFile(configPath, 'utf8'))
  return config.authToken
}

const mutate = async (mutations) => {
  const token = await readSanityToken()
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        mutations,
        returnDocuments: false,
      }),
    },
  )

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Sanity mutation failed (${response.status}): ${details}`)
  }

  return response.json()
}

const makeKeyFactory = () => {
  let index = 0
  return (prefix) => `${prefix}-${String(index++).padStart(3, '0')}`
}

const makePortableText = (items) => {
  const key = makeKeyFactory()
  const span = (text) => ({
    _key: key('span'),
    _type: 'span',
    marks: [],
    text,
  })
  const block = (style, text) => ({
    _key: key('block'),
    _type: 'block',
    style,
    markDefs: [],
    children: [span(text)],
  })

  return items.map((item) => {
    if (item.type === 'bullet') {
      return {
        ...block('normal', item.text),
        listItem: 'bullet',
        level: 1,
      }
    }

    return block(item.type, item.text)
  })
}

const normal = (text) => ({type: 'normal', text})
const h2 = (text) => ({type: 'h2', text})
const h3 = (text) => ({type: 'h3', text})
const quote = (text) => ({type: 'blockquote', text})
const bullet = (text) => ({type: 'bullet', text})

const posts = [
  {
    id: 'post-que-es-el-marketing-de-entrevistas-callejeras',
    titleEn: 'What Is Street Interview Marketing and Why Does It Work for Brands?',
    slugEn: 'what-is-street-interview-marketing',
    excerptEn:
      'A clear guide to understanding street interview marketing, why it stops the scroll, and how one real question can become content, social proof, and new creative angles for a brand.',
    categoryEn: 'Insights',
    seoTitleEn: 'What Is Street Interview Marketing? A Guide for Brands | Charlando',
    seoDescriptionEn:
      'A clear guide to street interview marketing: why it stops the scroll, how it differs from traditional UGC, and how real questions become content and social proof.',
    bodyEn: makePortableText([
      normal(
        'Street interview marketing starts from a simple premise: instead of asking people to believe a brand message, you create a real situation where a person answers, tests, shares an opinion, or reacts on camera. The product does not appear as an isolated promise, but inside a conversation that can surprise, challenge, entertain, or confirm something the audience was already thinking.',
      ),
      normal(
        'That small shift changes everything. The brand stops being in ad mode and starts being in conversation mode. The content feels less manufactured because it includes pauses, doubts, humor, surprise, and real language. In a feed full of pieces that increasingly look the same, that sense of reality becomes a creative advantage: it helps the user stay a few seconds longer to understand what is happening.',
      ),
      h2('What this format really is'),
      normal(
        'It is not just going out with a microphone. A good street interview for brands combines three layers: a question with tension, a real person who can answer without a script, and an edit that turns that answer into a clear piece for social. The camera records a reaction, but strategy defines which reaction is worth looking for.',
      ),
      normal(
        'The street works because it adds context. When someone answers in a real environment, the viewer feels they are watching something less controlled. And when something feels less controlled, it also feels more credible. That credibility does not depend on the person being famous or saying exactly what the brand wants to hear. It depends on the scene feeling possible, close, and human.',
      ),
      quote('The question is the hook. The reaction is the proof. The edit turns the scene into content.'),
      h2('Why it stops the scroll'),
      normal(
        'In a feed full of similar pieces, a direct question opens an unfinished story. The viewer wants to know what the person will answer, whether they will agree, whether they will be wrong, or whether they will say something unexpected. That initial tension fuels the format. Before the brand explains anything, there is already a reason to watch.',
      ),
      normal(
        'That first curiosity is very hard to create with a static graphic or an overproduced piece. A real conversation, on the other hand, creates immediate tension: what is going to happen now? The answer can be funny, honest, awkward, or surprising. What matters is that it is not closed yet, and that makes the user wait a little longer before scrolling.',
      ),
      h2('How it differs from traditional UGC'),
      normal(
        'Traditional UGC usually depends on a creator speaking to camera with a script or a familiar structure. It can work, but it has also become easy to recognize. Many times, the user already knows they are watching a sale before hearing the argument. That familiarity can lower attention, especially when every ad uses the same problem, promise, and benefit structure.',
      ),
      normal(
        'The street interview changes the starting point. It does not begin with a promise, it begins with a question. It does not show someone explaining a benefit, it shows someone reacting to a situation. The brand can appear as a trigger, a product to test, a comparison, or part of a dynamic. That makes the content feel less linear and more alive.',
      ),
      h2('How to build a piece that works'),
      normal(
        'The execution may look spontaneous, but the strategy should not be. Before recording, you need to define what tension you want to open, what objection you want to hear, which part of the product is worth showing, and what kind of answer could become a strong cut. The street brings unpredictability; the brand brings direction.',
      ),
      bullet('Define a question that anyone can answer without prior context.'),
      bullet('Choose a location where the scene feels natural and has energy.'),
      bullet('Record enough reactions to find real patterns, not just one nice answer.'),
      bullet('Edit for clarity: fast hook, visible reaction, and actionable ending.'),
      normal(
        'The question is the most important part. If it is too broad, the answer becomes generic. If it is too technical, the person needs to think too much and the rhythm drops. A good street question has to be simple to answer but interesting to watch. It has to open a difference, a choice, a surprise, or a tension related to the category.',
      ),
      normal(
        'Then comes the edit. Capturing a good answer is not enough if the video takes too long to get to the point. The first second must make it clear that something is happening. The reaction has to be visible. Subtitles have to match the rhythm. And the ending has to connect the scene with the brand objective without turning everything into a stiff sales pitch.',
      ),
      h2('What a brand can learn'),
      normal(
        'Beyond generating pieces to publish, this format works as live research. The answers reveal words the audience uses, objections that appear without being requested, and angles the brand may not have considered. Instead of imagining how people speak, the brand can hear them in context.',
      ),
      normal(
        'A well-designed street campaign can reveal which question creates more interest, which benefit is understood faster, and what kind of reaction is worth turning into paid media. It can also show which part of the message is not understood, which comparison appears naturally, and which real phrases could become future hooks.',
      ),
      normal(
        'That learning has a lot of value for performance. If one answer retains better than another, there is a creative hypothesis. If one comment repeats, there is an objection to work on. If a reaction generates shares, there may be a cultural insight. The content stops being just a post and becomes a system for discovering what conversation the audience wants to have.',
      ),
      h2('When to use it'),
      normal(
        'It is especially useful when a brand needs to explain something simple in a more human way: testing a product, validating an idea, showing a reaction, opening a conversation around a category, or generating material to test on social. It also works when the brand wants to move away from communication that feels too perfect and show more street, more context, and more real use.',
      ),
      normal(
        'It does not replace all brand communication. But when the goal is attention, retention, and social proof, few things compete with a well-captured authentic reaction. The format can be used for launches, consumer products, experiences, restaurants, apps, services, events, or any brand with a simple question to put on the street.',
      ),
      h2('Common mistakes in street interviews for brands'),
      normal(
        'The first mistake is copying the look of the format without thinking through the strategy. A microphone and a question are not enough. If the question has no tension or is not connected to a brand objective, the video may be entertaining but not necessarily useful.',
      ),
      normal(
        'The second mistake is directing the answer too much. When the person seems to be saying a prepared line, the format loses its strength. Authenticity does not mean disorder, but it does require leaving room for something unwritten to appear. If everything is closed in advance, the video starts feeling like an ad again.',
      ),
      normal(
        'The third mistake is measuring only views. A video can have many views and little intent. It is better to look at retention, hook rate, comments, saves, clicks, and the quality of the answers. The goal is not only for more people to see the content, but to understand which scene made them stay.',
      ),
      h2('Frequently asked questions'),
      h3('Does it have to be completely improvised?'),
      normal(
        'No. The answer has to be real, but the situation is designed. The strategy lives in the question, the context, the clip selection, and the edit. What matters is that the person is not acting out a reaction, but responding inside a thoughtful frame.',
      ),
      h3('Does it work for any product?'),
      normal(
        'It works best when there is something a person can understand, test, give an opinion on, or compare quickly. If the product is very complex, the format can be used to open a tension or explain one concrete part. You do not need to tell everything: it is enough to find the simplest, most visual, or most discussable moment.',
      ),
      h3('What should a brand measure afterward?'),
      normal(
        'Retention, hook rate, comments, saves, CTR, and performance if the piece runs as an ad. It is also useful to look at which words or reactions repeat, because that is where new creative angles often appear. Metrics explain what happened; answers help explain why.',
      ),
    ]),
  },
  {
    id: 'post-la-publicidad-tradicional-ya-no-alcanza',
    titleEn: "Traditional Advertising Isn't Enough: Why Brands Need Real Reactions",
    slugEn: 'traditional-advertising-isnt-enough-real-reactions',
    excerptEn:
      'Attention has become too expensive to waste on pieces that feel like ads. The brands winning on social are using real reactions, street interviews, and authentic content to create conversations people actually stay for.',
    categoryEn: 'Strategy',
    seoTitleEn: 'Traditional Advertising vs. Real Reactions: What Works on Social | Charlando',
    seoDescriptionEn:
      'Why traditional advertising is losing attention on social, and how brands can use street interviews, real reactions, and authentic content to improve retention.',
    bodyEn: makePortableText([
      normal(
        'For years, brand advertising was built around a very polished idea: write a script, hire actors, produce a flawless piece, and hope the audience believed the story. That model worked when media was more predictable and attention was concentrated in fewer places. But on social, people do not wait for a perfect promise. They decide in less than a second whether something deserves to stay on screen or whether they keep scrolling.',
      ),
      normal(
        'The problem with many traditional pieces is not that they are badly produced. It is that they feel too controlled. The lighting, script, casting, and editing communicate “this is an ad” before they communicate the benefit. When that happens, the audience activates an automatic defense: they understand that someone is trying to sell them something, and curiosity drops. The creative may look beautiful, but the conversation already starts uphill.',
      ),
      h2('Traditional advertising did not die. It lost its monopoly on attention'),
      normal(
        'Saying traditional advertising is dead would be an exaggeration. Produced campaigns still help build an aesthetic, explain a category, organize a launch, or establish a visual identity. What changed is that they can no longer be the only creative engine for a brand. In saturated feeds, an overly polished piece competes with conversations, memes, creators, news, recommendations, and real moments. The brand is no longer fighting only other brands. It is fighting everything the user considers more human.',
      ),
      normal(
        'That is why many brands are looking for formats that feel less like an interruption and more like something you found. The difference sounds subtle, but it is huge. An interruption asks for permission after it appears. A conversation creates curiosity before it sells. On platforms like TikTok, Reels, and Shorts, that first spark of curiosity is often more valuable than the production itself.',
      ),
      quote('Attention is no longer bought only with production. It is earned with tension, context, and truth.'),
      h2('Why real reactions work'),
      normal(
        'When a person receives a direct question on camera, an immediate micro-story appears. The viewer wants to know what they will say, how they will react, whether they will agree, whether they will be surprised, or whether they will answer something unexpected. That expectation is stronger than a brand statement because it is not closed from the start. There is tension. There is room for error. There is an answer pending.',
      ),
      normal(
        'That is where real reactions create value. The brand stops saying “look how good I am” and creates a situation where someone else discovers, discusses, tests, or interprets the product. The message does not disappear, but it changes place. It no longer lives only in the brand’s voice. It lives in the reaction of someone who does not seem to be acting to sell.',
      ),
      normal(
        'This is especially powerful for products that need trust. If a brand says something is surprising, it sounds like a promise. If a real person is surprised on camera, it feels like evidence. It is not scientific proof, but it is a social signal. And on social, many decisions begin with signals: “this feels real,” “this happened to someone like me,” “I want to see how it ends.”',
      ),
      h2('What changes for brands'),
      normal(
        'The challenge is no longer just producing more content. It is producing content that feels native to the feed while still carrying strategic intent. That is where street interviews, product tests, and simple questions become performance tools. Not because they are “casual,” but because they let brands test creative angles at a speed traditional campaigns do not always allow.',
      ),
      normal(
        'A brand can record different questions, different types of people, and different ways of presenting the product. Then it can observe which tension retains better, which phrase creates comments, which objection appears often, and which benefit is understood without extra explanation. That creative learning matters because it turns content production into a testing system, not a one-off bet.',
      ),
      bullet('The question works as a hook because it opens a pending answer.'),
      bullet('The real person lowers the barrier of distrust.'),
      bullet('The reaction gives the product a social context, not only a visual one.'),
      bullet('The format lets brands test different angles without relying on one big campaign.'),
      h2('From ad to conversation'),
      normal(
        'A good piece of social content should not feel like an interruption. It should feel like something the user found and wants to finish watching. That is why conversation is so powerful: it does not force a conclusion from the start, it builds one on screen. The product can appear inside a question, a comparison, a reaction, a doubt, or a quick test.',
      ),
      normal(
        'For a brand, that changes everything. Instead of asking people to believe a benefit, it can show how that benefit appears in a real reaction: surprise, laughter, doubt, approval, rejection, curiosity. Even when the answer is not perfect, the scene can be more believable than a flawless promise. Imperfection, when edited well, often adds trust because it reminds viewers they are watching a person, not a script.',
      ),
      h2('What a more current content strategy looks like'),
      normal(
        'A modern strategy does not have to choose between brand and performance. It can build identity with more produced pieces while also generating a volume of real content to discover which arguments work. The mistake is thinking one perfect campaign will solve all creative learning. On social, the brand that learns fastest what conversation its audience wants to have often wins.',
      ),
      normal(
        'Real reactions help that speed because they produce varied material: humor clips, honest answers, unexpected phrases, objections, comparisons, and test moments. Each piece can become organic content, a paid ad, an insight for landing pages, or the starting point for the next recording batch.',
      ),
      h2('How to use this format without losing strategy'),
      normal(
        'Authenticity does not mean improvising everything. What gets designed is the context: what is asked, who is asked, how the product appears, what reaction we want to observe, and what learning we want from each piece. The answer should be real, but the frame has to be intentional. Without strategy, the street becomes noise. With too much direction, the format loses naturalness.',
      ),
      normal(
        'The magic is letting the answer be real while giving the situation a clear intention. That balance separates a nice video from a piece that can move metrics. Before recording, it is worth defining a hypothesis: what belief we want to validate, what objection we want to hear, what product moment could create surprise, and what kind of clip would be useful for paid media.',
      ),
      h2('What metrics to look at afterward'),
      normal(
        'To evaluate this type of content, views are not enough. It is worth measuring retention rate, the percentage of users who pass the first three seconds, qualitative comments, saves, clicks, and cost per result if the piece runs as an ad. It is also important to read the audience’s answers. Very often, the value is in a repeated question, an objection we did not expect, or a phrase that could become the next hook.',
      ),
      normal(
        'When a brand combines performance data with creative observation, it starts building an advantage. It does not only know which video worked, but why it may have worked. That reading makes the next production better instead of simply repeating the same thing.',
      ),
      h2('Frequently asked questions'),
      h3('Does this replace traditional advertising?'),
      normal(
        'Not necessarily. It complements it. Traditional campaigns can build identity, aesthetics, and recognition; real conversations can generate social proof, retention, and new angles to test. The strongest work usually appears when both sides live inside the same creative system.',
      ),
      h3('What happens if the reaction is not what we expected?'),
      normal(
        'It can still be useful. An honest reaction reveals objections, real consumer language, and opportunities to adjust the message. Not every learning has to come from a perfect answer. Sometimes a real doubt helps more than exaggerated approval, because it shows what the brand needs to explain better.',
      ),
      h3('Where should a brand start?'),
      normal(
        'With a simple question. One that anyone can answer, but that reveals something important about the product, the category, or the problem the brand wants to solve. Then it is worth recording several answers, editing different hooks, and measuring which one creates more retention. The first batch should not aim for perfection. It should aim for learning.',
      ),
      h3('How many videos does a brand need to learn?'),
      normal(
        'It depends on the category, but it is better to think in volume. A single video can work by chance; a series of pieces lets you compare questions, profiles, openings, and endings. The faster you generate variety, the faster the creative pattern worth scaling appears.',
      ),
    ]),
  },
]

for (const post of posts) {
  const {id, slugEn, ...fields} = post

  await mutate([
    {
      patch: {
        id,
        set: {
          ...fields,
          slugEn: {
            _type: 'slug',
            current: slugEn,
          },
        },
      },
    },
  ])

  console.log(`Updated ${id} -> /en/blog/${slugEn}`)
}
