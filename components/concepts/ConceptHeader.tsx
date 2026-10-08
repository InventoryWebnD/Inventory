import { Concept, Technology } from "@/types/content";
import { Clock } from "lucide-react";

interface ConceptHeaderProps {
  concept: Concept;
  technology: Technology;
}

export default function ConceptHeader({
  concept,
  technology,
}: ConceptHeaderProps) {
  return (
    <header className="space-y-4 pb-8 mb-8 border-b border-border">
      {/* Category / Context indicator */}
      <div className="flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
        <span className="text-foreground font-semibold">{technology.title}</span>
        {concept.category && (
          <>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-accent-ink font-semibold">{concept.category}</span>
          </>
        )}
      </div>

      {/* Main Title - Strongest visual element */}
      <h1 className="font-serif text-[1.9rem] sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.12] rise">
        {concept.title}
      </h1>

      {/* Summary */}
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed rise d1">
        {concept.summary}
      </p>

      {concept.author && (
        <div className="byline-chip" title="Author">
          <b aria-hidden="true">{concept.author.split(" ").map((n) => n[0]).join("")}</b>
          <span>By <span className="font-semibold text-foreground">{concept.author}</span></span>
        </div>
      )}

      {/* Compact Rectangular Metadata & Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {concept.estimatedTime && (
          <span className="inline-flex items-center text-xs font-mono px-2 py-0.5 rounded-lg border border-border bg-card text-muted-foreground">
            <Clock className="w-3 h-3 mr-1.5 opacity-60 text-accent-ink" />
            <span>{concept.estimatedTime} min read</span>
          </span>
        )}

        <span className="inline-flex items-center text-xs font-mono uppercase px-2 py-0.5 rounded-lg border border-border bg-card text-foreground font-medium">
          {concept.tech}
        </span>

        {concept.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center text-xs font-mono px-2 py-0.5 rounded-lg border border-border/80 bg-muted/40 text-muted-foreground"
          >
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
}
