import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock3 } from "lucide-react";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { getImageUrl } from "@/integrations/sanity/image";
import { getPublishedPosts } from "@/integrations/sanity/queries";
import { isSanityConfigured } from "@/integrations/sanity/client";
import { SITE_URL, usePageSeo } from "@/lib/seo";
import type { BlogPostSummary } from "@/integrations/sanity/types";

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

const getReadingTime = (post: BlogPostSummary) => {
  const text = `${post.excerpt} ${getPortableText(post.body)}`;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(4, Math.ceil(wordCount / 180))} min`;
};

const BlogCard = ({ post }: { post: BlogPostSummary }) => {
  const coverUrl = getImageUrl(post.coverImage, 1000, 525);

  return (
    <article className="group overflow-hidden rounded-[28px] bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_30px_-22px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_18px_42px_-22px_rgba(0,0,0,0.45)]">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-[40/21] bg-muted">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={post.coverImage?.alt || post.title}
              className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-primary/10 px-6 text-center font-display text-3xl font-bold text-primary">
              Charlando
            </div>
          )}
        </div>
        <div className="p-6 sm:p-7">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
            {post.category ? <span className="rounded-full bg-primary/10 px-3 py-1">{post.category}</span> : null}
            {post.publishedAt ? <time className="text-muted-foreground" dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> : null}
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              {getReadingTime(post)}
            </span>
          </div>
          <h2 className="text-balance font-display text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-pretty leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            Leer artículo <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </Link>
    </article>
  );
};

const BlogIndex = () => {
  usePageSeo({
    title: "Blog | Charlando",
    description: "Ideas, aprendizajes y ejemplos sobre entrevistas callejeras, contenido vertical y reacciones reales para marcas.",
    canonicalPath: "/blog",
  });

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: getPublishedPosts,
    enabled: isSanityConfigured,
  });

  return (
    <div className="min-h-screen bg-background">
      <PublicSiteHeader source="blog" />

      <main className="px-6 py-12 lg:px-8 lg:py-16">
        <section className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 flex max-w-5xl flex-col items-center text-center">
              <div className="mb-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Blog
              </div>
              <h1 className="max-w-5xl text-balance font-display text-4xl font-bold leading-[0.96] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                La calle también tiene algo para decir
              </h1>
              <p className="mt-5 max-w-4xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Ideas, aprendizajes y observaciones sobre contenido vertical, entrevistas callejeras y marcas que quieren generar atención real.
              </p>
          </div>

          {!isSanityConfigured ? (
            <div className="mx-auto max-w-2xl rounded-[28px] bg-muted/60 p-8 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
              <h2 className="font-display text-2xl font-bold text-foreground">Sanity todavía no está configurado</h2>
              <p className="mt-3 text-muted-foreground">
                Agregá `VITE_SANITY_PROJECT_ID` en el entorno para cargar los posts del dataset `production`.
              </p>
            </div>
          ) : isLoading ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-[440px] animate-pulse rounded-[28px] bg-muted" />
              ))}
            </div>
          ) : error ? (
            <div className="mx-auto max-w-2xl rounded-[28px] bg-muted/60 p-8 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
              <h2 className="font-display text-2xl font-bold text-foreground">No pudimos cargar el blog</h2>
              <p className="mt-3 text-muted-foreground">Revisá la configuración de Sanity y que el dataset sea público para lectura.</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-[28px] bg-muted/60 p-8 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
              <h2 className="font-display text-2xl font-bold text-foreground">Todavía no hay posts publicados</h2>
              <p className="mt-3 text-muted-foreground">Cuando publiques artículos en Sanity, van a aparecer acá ordenados por fecha.</p>
            </div>
          ) : (
            <div className="space-y-14">
              <div className="grid gap-6 lg:grid-cols-2">
                {posts.map((post) => <BlogCard key={post._id} post={post} />)}
              </div>

              <section className="rounded-[28px] bg-foreground px-6 py-10 text-center text-background shadow-[0_18px_60px_-32px_rgba(0,0,0,0.55)] sm:px-10">
                <p className="text-sm font-semibold text-background/70">Para marcas que quieren atención real</p>
                <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-bold sm:text-5xl">
                  Convertí una conversación en tu próximo contenido ganador.
                </h2>
                <a href="/#cta" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-background px-5 py-3 text-sm font-bold text-foreground transition-transform hover:scale-[0.98] active:scale-[0.96]">
                  Agendar llamada <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </section>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        <Link to="/" className="font-semibold text-foreground transition-colors hover:text-primary">Charlando</Link>
        <span className="mx-2">·</span>
        <a href={SITE_URL} className="transition-colors hover:text-primary">{SITE_URL.replace("https://", "")}</a>
      </footer>
    </div>
  );
};

export default BlogIndex;
