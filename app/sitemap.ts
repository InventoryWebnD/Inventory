import type { MetadataRoute } from "next";
import { getTechnologies, getConcepts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventory.webnd.org";
  const now = new Date();

  const technologies = getTechnologies();
  const concepts = getConcepts();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/learn`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // All technology hubs
  for (const tech of technologies) {
    routes.push({
      url: `${siteUrl}/learn/${tech.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // All individual concepts
  for (const concept of concepts) {
    routes.push({
      url: `${siteUrl}/learn/${concept.tech}/${concept.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
