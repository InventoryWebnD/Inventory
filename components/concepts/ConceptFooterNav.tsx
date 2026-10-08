import Link from "next/link";
import { Concept } from "@/types/content";
import { ArrowLeft, Compass } from "lucide-react";

interface ConceptFooterNavProps {
  relatedConcepts: Concept[];
  techTitle: string;
  techSlug: string;
}

export default function ConceptFooterNav({
  relatedConcepts,
  techTitle,
  techSlug,
}: ConceptFooterNavProps) {
  return (
    <footer className="mt-14 pt-8 border-t border-border space-y-6">
      {relatedConcepts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            <Compass className="w-3.5 h-3.5 text-accent-ink" />
            <span>Explore Related Concepts</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {relatedConcepts.map((item) => (
              <Link
                key={item.id}
                href={`/learn/${item.tech}/${item.slug}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-card hover:border-accent hover:-translate-y-1 hover:shadow-hard-xs text-xs font-medium text-foreground transition-all cursor-pointer"
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="pt-2 flex items-center justify-between">
        <Link
          href={`/learn/${techSlug}`}
          className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          <span>All {techTitle} Concepts</span>
        </Link>
      </div>
    </footer>
  );
}
