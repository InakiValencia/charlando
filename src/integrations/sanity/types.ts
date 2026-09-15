export type SanityImageAsset = {
  _ref?: string;
  _id?: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
};

export type SanityImage = {
  _type?: "image";
  asset?: SanityImageAsset;
  alt?: string;
  crop?: Record<string, number>;
  hotspot?: Record<string, number>;
};

export type BlogPostSummary = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  excerpt: string;
  language?: "es" | "en";
  titleEn?: string;
  slugEn?: string;
  excerptEn?: string;
  coverImage?: SanityImage;
  category?: string;
  categoryEn?: string;
  author?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoTitleEn?: string;
  seoDescriptionEn?: string;
  ogImage?: SanityImage;
  body?: unknown[];
  bodyEn?: unknown[];
};

export type BlogPost = BlogPostSummary;
