import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTechnologies,
  getTechnologyBySlug,
  getConceptsByTechnology,
} from "@/lib/content";
import {
  SITE_URL,
  NOT_FOUND_METADATA,
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  metaDescription,
} from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/layout/Container";
import TechConceptBrowser from "@/components/concepts/TechConceptBrowser";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTechnologies().map((tech) => ({ tech: tech.slug }));
}

interface TechPageProps {
  params: Promise<{
    tech: string;
  }>;
}

export async function generateMetadata({
  params,
}: TechPageProps): Promise<Metadata> {
  const { tech: techSlug } = await params;
  const technology = getTechnologyBySlug(techSlug);

  if (!technology) {
    return NOT_FOUND_METADATA;
  }

  return buildPageMetadata({
    title: `${technology.title} Concepts`,
    description: metaDescription(technology.description),
    path: `/learn/${technology.slug}`,
    keywords: [
      technology.title,
      `${technology.title} reference`,
      `${technology.title} concepts`,
      `${technology.title} cheat sheet`,
      "web development",
      "developer guide",
    ],
  });
}

export default async function TechPage({ params }: TechPageProps) {
  const { tech: techSlug } = await params;
  const technology = getTechnologyBySlug(techSlug);

  if (!technology) {
    notFound();
  }

  const concepts = getConceptsByTechnology(techSlug);
  const pagePath = `/learn/${technology.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(pagePath)}#webpage`,
        url: absoluteUrl(pagePath),
        name: `${technology.title} Concepts`,
        description: technology.description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: concepts.map((concept, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/learn/${concept.tech}/${concept.slug}`),
            name: concept.title,
          })),
        },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
        { name: technology.title, path: pagePath },
      ]),
    ],
  };

  return (
    <div className="py-10">
      <JsonLd data={jsonLd} />
      <Container size="default">
        <TechConceptBrowser
          technology={technology}
          concepts={concepts}
        />
      </Container>
    </div>
  );
}
