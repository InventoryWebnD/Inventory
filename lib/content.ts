import { Technology, Concept } from "@/types/content";
import rawTechs from "@/data/techs.json";
import rawConcepts from "@/data/concepts.json";

const technologies: Technology[] = rawTechs as Technology[];
const concepts: Concept[] = rawConcepts as Concept[];

export function getTechnologies(): Technology[] {
  return technologies;
}

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return technologies.find((tech) => tech.slug === slug);
}

export function getConcepts(): Concept[] {
  return concepts;
}

export function getConceptBySlug(
  techSlug: string,
  conceptSlug: string
): Concept | undefined {
  return concepts.find(
    (concept) => concept.tech === techSlug && concept.slug === conceptSlug
  );
}

export function getConceptsByTechnology(techSlug: string): Concept[] {
  return concepts.filter((concept) => concept.tech === techSlug);
}

export function getRelatedConcepts(concept: Concept): Concept[] {
  if (!concept.related || concept.related.length === 0) {
    return [];
  }
  const relatedIds = new Set(concept.related);
  return concepts.filter((c) => relatedIds.has(c.id));
}
