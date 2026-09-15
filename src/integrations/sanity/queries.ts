import { sanityFetch } from "./client";
import type { BlogPost, BlogPostSummary } from "./types";
import type { Locale } from "@/i18n/locales";

const postSummaryFields = `
  _id,
  _updatedAt,
  "title": select($locale == "en" && defined(titleEn) => titleEn, title),
  "slug": select($locale == "en" && defined(slugEn.current) => slugEn.current, slug.current),
  "excerpt": select($locale == "en" && defined(excerptEn) => excerptEn, excerpt),
  coverImage,
  "category": select($locale == "en" && defined(categoryEn) => categoryEn, category),
  author,
  publishedAt,
  "seoTitle": select($locale == "en" && defined(seoTitleEn) => seoTitleEn, seoTitle),
  "seoDescription": select($locale == "en" && defined(seoDescriptionEn) => seoDescriptionEn, seoDescription),
  ogImage,
  "body": select($locale == "en" && defined(bodyEn) => bodyEn, body)
`;

export const publishedPostsQuery = `
*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  ($locale != "en" || (defined(titleEn) && defined(slugEn.current) && defined(excerptEn) && defined(bodyEn))) &&
  !(_id in path("drafts.**"))
] | order(publishedAt desc) {
  ${postSummaryFields}
}`;

export const postBySlugQuery = `
*[
  _type == "post" &&
  (
    ($locale == "en" && slugEn.current == $slug && defined(titleEn) && defined(excerptEn) && defined(bodyEn)) ||
    ($locale != "en" && slug.current == $slug)
  ) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  !(_id in path("drafts.**"))
][0] {
  ${postSummaryFields}
}`;

export async function getPublishedPosts(locale: Locale = "es") {
  return sanityFetch<BlogPostSummary[]>(publishedPostsQuery, { locale });
}

export async function getPostBySlug(slug: string, locale: Locale = "es") {
  return sanityFetch<BlogPost | null>(postBySlugQuery, { slug, locale });
}
