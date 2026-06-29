import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function imageBuilder(source?: SanityImageSource | null) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format");
}

export function getImageUrl(source?: SanityImageSource | null, width = 1200, height?: number) {
  const image = imageBuilder(source);
  if (!image) return "";

  const sized = height ? image.width(width).height(height).fit("crop") : image.width(width);
  return sized.url();
}
