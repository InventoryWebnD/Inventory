import { Concept } from "@/types/content";
import ConceptCard from "./ConceptCard";

interface ConceptGridProps {
  concepts: Concept[];
  emptyMessage?: string;
}

export default function ConceptGrid({
  concepts,
  emptyMessage = "No concepts available yet.",
}: ConceptGridProps) {
  if (concepts.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-border rounded-none bg-muted/20">
        <p className="text-muted-foreground text-xs font-mono">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {concepts.map((concept) => (
        <ConceptCard key={concept.id} concept={concept} />
      ))}
    </div>
  );
}
