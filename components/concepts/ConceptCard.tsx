import Link from "next/link";
import { Concept } from "@/types/content";
import { ArrowRight } from "lucide-react";

interface ConceptCardProps {
  concept: Concept;
}

export default function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <Link
      href={`/learn/${concept.tech}/${concept.slug}`}
      className="group block rounded-none border border-border bg-card p-5 transition-all duration-150 hover:border-foreground/80 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
    >
      <div className="flex flex-col justify-between h-full space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
              {concept.title}
            </h3>
            {concept.estimatedTime && (
              <span className="inline-flex items-center text-[11px] font-mono text-muted-foreground whitespace-nowrap pt-0.5">
                {concept.estimatedTime} min
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {concept.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
          {/* Subtle rectangular metadata / tags */}
          <div className="flex items-center gap-1.5 overflow-hidden text-[11px] font-mono text-muted-foreground">
            <span className="uppercase font-semibold text-foreground/80">{concept.tech}</span>
            {concept.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="flex items-center">
                <span className="mx-1 text-muted-foreground/30">·</span>
                <span>#{tag}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center text-xs font-semibold text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-transform flex-shrink-0">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
