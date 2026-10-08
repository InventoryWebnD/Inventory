import Link from "next/link";
import Image from "next/image";
import { Technology } from "@/types/content";
import { ArrowRight } from "lucide-react";
import { getConceptsByTechnology } from "@/lib/content";

interface TechCardProps {
  technology: Technology;
  index?: number;
}

export default function TechCard({ technology, index }: TechCardProps) {
  const concepts = getConceptsByTechnology(technology.slug);
  const preview = concepts.slice(0, 3);
  const extra = concepts.length - preview.length;

  return (
    <Link
      href={`/learn/${technology.slug}`}
      className="tech-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="tc-icon">
          {technology.icon ? (
            <Image
              src={technology.icon}
              alt={`${technology.title} logo`}
              width={36}
              height={36}
              className="object-contain w-full h-full"
            />
          ) : (
            <span className="font-mono font-extrabold text-lg text-black">
              {technology.title.slice(0, 2)}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {typeof index === "number" && (
            <span className="tc-index">{String(index + 1).padStart(2, "0")}</span>
          )}
          <span className="tc-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {concepts.length} {concepts.length === 1 ? "concept" : "concepts"}
          </span>
        </div>
      </div>

      <h3 className="font-serif text-3xl tracking-tight text-foreground mt-6">
        {technology.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed mt-2">
        {technology.description}
      </p>

      {preview.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {preview.map((c) => (
            <span key={c.id} className="tc-topic">
              {c.title}
            </span>
          ))}
          {extra > 0 && <span className="tc-topic">+{extra} more</span>}
        </div>
      )}

      <div className="mt-auto pt-6 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] font-bold text-foreground">
          Explore
        </span>
        <span className="tc-go" aria-hidden="true">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
