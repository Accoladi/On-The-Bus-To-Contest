import type { MetadataRoute } from "next";
import { articleCatalog } from "@/content/articles/articleCatalog";
import { seoPages, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...Object.keys(seoPages), ...articleCatalog.map(({ slug }) => `/read/${slug}`)].map((path) => ({ url: `${siteUrl}${path}` }));
}
