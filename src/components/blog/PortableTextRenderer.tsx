import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getImageUrl } from "@/integrations/sanity/image";
import type { SanityImage } from "@/integrations/sanity/types";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as SanityImage;
      const url = getImageUrl(image, 1400);
      if (!url) return null;

      return (
        <figure className="my-10">
          <img
            src={url}
            alt={image.alt || ""}
            className="w-full rounded-3xl object-cover shadow-xl shadow-foreground/5"
            loading="lazy"
          />
          {image.alt ? (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {image.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-display text-2xl font-bold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-lg leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary pl-5 font-display text-2xl font-semibold leading-snug text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-5 list-disc space-y-2 text-lg leading-relaxed text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-5 list-decimal space-y-2 text-lg leading-relaxed text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  },
};

export function PortableTextRenderer({ value }: { value?: unknown[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={portableTextComponents} />;
}
