import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { Button } from "@/components/ui/button";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { getImageUrl } from "@/integrations/sanity/image";
import { getPostBySlug, getPublishedPosts } from "@/integrations/sanity/queries";
import { isSanityConfigured } from "@/integrations/sanity/client";
import { DEFAULT_OG_IMAGE, getCanonicalUrl, usePageSeo } from "@/lib/seo";

const formatDate = (date?: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const getPortableText = (value?: unknown[]) => {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((block) => {
      if (!block || typeof block !== "object" || !("children" in block)) return [];
      const children = (block as { children?: unknown[] }).children;
      if (!Array.isArray(children)) return [];
      return children.map((child) => {
        if (!child || typeof child !== "object" || !("text" in child)) return "";
        return String((child as { text?: unknown }).text || "");
      });
    })
    .join(" ");
};

const getReadingTime = (text?: string) => {
  const wordCount = text?.trim().split(/\s+/).filter(Boolean).length || 180;
  return `${Math.max(4, Math.ceil(wordCount / 180))} min`;
};

const BlogPost = () => {
  const { slug = "" } = useParams();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: isSanityConfigured && Boolean(slug),
  });
  const { data: posts = [] } = useQuery({
    queryKey: ["blog-posts", "related"],
    queryFn: getPublishedPosts,
    enabled: isSanityConfigured,
  });

  const seoImage = post ? getImageUrl(post.ogImage || post.coverImage, 1200, 630) || DEFAULT_OG_IMAGE : DEFAULT_OG_IMAGE;
  const relatedPosts = posts.filter((candidate) => candidate.slug !== slug).slice(0, 3);
  const articleText = post ? `${post.excerpt} ${getPortableText(post.body)}` : "";
  const readingTime = getReadingTime(articleText);
  const canonicalUrl = getCanonicalUrl(`/blog/${slug}`);

  usePageSeo({
    title: post?.seoTitle || post?.title || "Blog | Charlando",
    description: post?.seoDescription || post?.excerpt || "Ideas de Charlando sobre contenido vertical y conversaciones reales.",
    image: seoImage,
    canonicalPath: `/blog/${slug}`,
    type: "article",
    publishedTime: post?.publishedAt,
    modifiedTime: post?._updatedAt,
    author: post?.author || "Charlando",
    section: post?.category,
  });

  useEffect(() => {
    const scriptId = "article-json-ld";
    document.getElementById(scriptId)?.remove();
    if (!post) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      image: seoImage,
      datePublished: post.publishedAt,
      dateModified: post._updatedAt || post.publishedAt,
      author: {
        "@type": "Organization",
        name: post.author || "Charlando",
      },
      publisher: {
        "@type": "Organization",
        name: "Charlando",
        logo: {
          "@type": "ImageObject",
          url: getCanonicalUrl("/openmic-logo.png"),
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      articleSection: post.category,
      inLanguage: "es-AR",
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [canonicalUrl, post, seoImage]);

  return (
    <div className="min-h-screen bg-background">
      <PublicSiteHeader source="blog-post" />

      <main>
        {!isSanityConfigured ? (
          <div className="mx-auto my-12 max-w-2xl rounded-[28px] bg-muted/60 p-8 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            <h1 className="font-display text-3xl font-bold text-foreground">Sanity no está configurado</h1>
            <p className="mt-3 text-muted-foreground">Agregá `VITE_SANITY_PROJECT_ID` para cargar este artículo.</p>
          </div>
        ) : isLoading ? (
          <article className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="mb-10 h-5 w-44 animate-pulse rounded-full bg-muted" />
                <div className="mb-6 h-20 max-w-2xl animate-pulse rounded-2xl bg-muted" />
                <div className="mb-10 h-6 max-w-xl animate-pulse rounded-full bg-muted" />
                <div className="h-14 w-48 animate-pulse rounded-full bg-muted" />
              </div>
              <div className="aspect-[16/9] animate-pulse rounded-[24px] bg-muted" />
            </div>
          </article>
        ) : error || !post ? (
          <div className="mx-auto my-12 max-w-2xl rounded-[28px] bg-muted/60 p-8 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            <h1 className="font-display text-3xl font-bold text-foreground">Artículo no encontrado</h1>
            <p className="mt-3 text-muted-foreground">Puede que todavía no esté publicado o que el slug no exista.</p>
            <Button className="mt-6 bg-foreground text-background hover:bg-primary" asChild>
              <Link to="/blog">Volver al blog</Link>
            </Button>
          </div>
        ) : (
          <article>
            <header className="border-b border-border/70 bg-muted/35 px-6 py-12 lg:px-8 lg:py-14">
              <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                  <Link to="/blog" className="inline-flex min-h-10 items-center rounded-full bg-background px-4 text-sm font-semibold text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_10px_22px_-18px_rgba(0,0,0,0.45)] transition-[box-shadow,color,transform] hover:text-primary hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_14px_26px_-18px_rgba(0,0,0,0.5)] active:scale-[0.96]">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al blog
                  </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                  <div className="order-2 lg:order-1">
                    <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      <Link to="/blog" className="transition-colors hover:text-primary">Blog</Link>
                      <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      {post.category ? <span className="text-primary">{post.category}</span> : <span className="text-primary">Insights</span>}
                    </div>

                    {post.publishedAt ? (
                      <time className="mb-7 block text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground" dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    ) : null}

                    <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[0.98] tracking-tight text-foreground sm:text-5xl lg:text-[56px] xl:text-[60px]">
                      {post.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                      {post.excerpt}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_10px_22px_-18px_rgba(0,0,0,0.45)]">
                        <img src="/openmic-logo.png" alt="" className="no-image-outline h-9 w-9 rounded-full object-contain" draggable={false} />
                      </div>
                      <div>
                        {post.author ? <p className="font-semibold leading-tight text-foreground">{post.author}</p> : null}
                        <p className="text-sm leading-tight text-muted-foreground">Equipo Charlando</p>
                      </div>
                      <span className="inline-flex min-h-9 items-center gap-1 rounded-full bg-primary/10 px-3 text-sm font-semibold text-primary">
                        <Clock3 className="h-3.5 w-3.5" />
                        {readingTime}
                      </span>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2">
                    {post.coverImage ? (
                      <img
                        src={getImageUrl(post.coverImage, 1400, 735)}
                        alt={post.coverImage.alt || post.title}
                        className="aspect-[40/21] w-full rounded-[24px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_26px_70px_-44px_rgba(0,0,0,0.58)]"
                      />
                    ) : (
                      <div className="flex aspect-[40/21] w-full items-center justify-center rounded-[24px] bg-primary/10 px-8 text-center font-display text-4xl font-bold text-primary shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_26px_70px_-44px_rgba(0,0,0,0.58)]">
                        Charlando
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.28fr_0.72fr] lg:px-8 lg:py-16">
              <aside className="hidden text-sm text-muted-foreground lg:block">
                <div className="sticky top-28 rounded-[24px] bg-muted/55 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_16px_34px_-28px_rgba(0,0,0,0.4)]">
                  <p className="font-semibold text-foreground">En esta nota</p>
                  <p className="mt-3 text-pretty leading-relaxed">
                    Una mirada práctica para marcas que quieren dejar de interrumpir y empezar a provocar conversaciones.
                  </p>
                </div>
              </aside>

              <div className="prose-readable max-w-none">
                <PortableTextRenderer value={post.body} />
              </div>
            </div>

            <section className="mx-6 max-w-5xl rounded-[28px] bg-foreground px-6 py-10 text-background shadow-[0_18px_60px_-32px_rgba(0,0,0,0.55)] sm:px-10 lg:mx-auto">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-background/70">¿Querés probar este formato con tu marca?</p>
                  <h2 className="mt-2 max-w-2xl text-balance font-display text-3xl font-bold sm:text-4xl">
                    Salimos a la calle, hacemos la pregunta correcta y convertimos la reacción en contenido.
                  </h2>
                </div>
                <a href="/#cta" className="inline-flex min-h-11 items-center justify-center rounded-full bg-background px-5 py-3 text-sm font-bold text-foreground transition-transform hover:scale-[0.98] active:scale-[0.96]">
                  Agendar llamada <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </section>

            {relatedPosts.length > 0 ? (
              <section className="mx-auto mt-16 max-w-5xl px-6 pb-16 lg:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Seguir leyendo</p>
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {relatedPosts.map((related) => {
                    const coverUrl = getImageUrl(related.coverImage, 700, 368);
                    return (
                      <Link key={related._id} to={`/blog/${related.slug}`} className="group overflow-hidden rounded-[24px] bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_30px_-22px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1">
                        <div className="aspect-[40/21] bg-muted">
                          {coverUrl ? <img src={coverUrl} alt={related.coverImage?.alt || related.title} className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10" loading="lazy" /> : null}
                        </div>
                        <div className="p-5">
                          <h3 className="text-balance font-display text-xl font-bold leading-tight text-foreground group-hover:text-primary">
                            {related.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </article>
        )}
      </main>
    </div>
  );
};

export default BlogPost;
