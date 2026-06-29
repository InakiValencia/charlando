import { sanityFetch } from "./client";
import type { BlogPost, BlogPostSummary } from "./types";

const postSummaryFields = `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt,
  seoTitle,
  seoDescription,
  ogImage,
  body
`;

export const publishedPostsQuery = `
*[
  _type == "post" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  !(_id in path("drafts.**"))
] | order(publishedAt desc) {
  ${postSummaryFields}
}`;

export const postBySlugQuery = `
*[
  _type == "post" &&
  slug.current == $slug &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  !(_id in path("drafts.**"))
][0] {
  ${postSummaryFields}
}`;

export async function getPublishedPosts() {
  return sanityFetch<BlogPostSummary[]>(publishedPostsQuery);
}

export async function getPostBySlug(slug: string) {
  return sanityFetch<BlogPost | null>(postBySlugQuery, { slug });
}
