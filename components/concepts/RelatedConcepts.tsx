import Link from "next/link";
import { Concept } from "@/types/content";
import { ArrowRight, Compass } from "lucide-react";

interface RelatedConceptsProps {
  concepts: Concept[];
}

export default function RelatedConcepts({ concepts }: RelatedConceptsProps) {
  if (concepts.length === 0) return null;

  return (
    <aside className="space-y-3.5">
      <div className="flex items-center gap-2 pb-2 border-b border-border/60">
        <Compass className="w-3.5 h-3.5 text-accent-ink" />
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          Related Concepts
        </h4>
      </div>

      <div className="space-y-2.5">
        {concepts.map((item) => (
          <Link
            key={item.id}
            href={`/learn/${item.tech}/${item.slug}`}
            className="block p-3 rounded-lg border border-border bg-card hover:border-accent hover:-translate-y-1 hover:shadow-hard-xs transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold text-foreground group-hover:text-accent-ink transition-colors">
                {item.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent-ink group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}
