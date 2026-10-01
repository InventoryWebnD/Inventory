import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTechnologyBySlug, getConceptsByTechnology } from "@/lib/content";
import Container from "@/components/layout/Container";
import TechConceptBrowser from "@/components/concepts/TechConceptBrowser";

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
    return { title: "Technology Not Found" };
  }

  const title = `${technology.title} Concepts`;
  const description = technology.description;
  const url = `/learn/${techSlug}`;

  return {
    title,
    description,
    keywords: [
      technology.title,
      `${technology.title} reference`,
      `${technology.title} concepts`,
      `${technology.title} cheat sheet`,
      "web development",
      "developer guide",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | WebnD Inventory`,
      description,
      url,
      type: "website",
      images: [
        {
          url: technology.icon || "/icons/logo.png",
          alt: `${technology.title} logo`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | WebnD Inventory`,
      description,
    },
  };
}

export default async function TechPage({ params }: TechPageProps) {
  const { tech: techSlug } = await params;
  const technology = getTechnologyBySlug(techSlug);

  if (!technology) {
    notFound();
  }

  const concepts = getConceptsByTechnology(techSlug);

  return (
    <div className="py-10">
      <Container size="default">
        <TechConceptBrowser
          technology={technology}
          concepts={concepts}
        />
      </Container>
    </div>
  );
}
