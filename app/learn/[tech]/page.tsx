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
    return { title: "Technology Not Found | WebnD Inventory" };
  }

  return {
    title: `${technology.title} Concepts | WebnD Inventory`,
    description: technology.description,
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
