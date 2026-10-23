import { getTechnologies, getConcepts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const routes = [{ url: absoluteUrl("/") }, { url: absoluteUrl("/learn") }];

  for (const tech of getTechnologies()) {
    routes.push({ url: absoluteUrl(`/learn/${tech.slug}`) });
  }

  for (const concept of getConcepts()) {
    const updated = concept.updatedAt ? new Date(concept.updatedAt) : null;
    routes.push({
      url: absoluteUrl(`/learn/${concept.tech}/${concept.slug}`),
      ...(updated && !Number.isNaN(updated.getTime())
        ? { lastModified: updated }
        : {}),
    });
  }

  return routes;
}
