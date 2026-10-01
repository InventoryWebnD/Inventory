import Link from "next/link";
import Image from "next/image";
import { Technology } from "@/types/content";
import { ArrowRight } from "lucide-react";
import { getConceptsByTechnology } from "@/lib/content";

interface TechCardProps {
  technology: Technology;
}

export default function TechCard({ technology }: TechCardProps) {
  const conceptsCount = getConceptsByTechnology(technology.slug).length;

  return (
    <Link
      href={`/learn/${technology.slug}`}
      className="group block rounded-none border border-border bg-card p-6 transition-all duration-150 hover:border-foreground/80 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
    >
      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-serif text-2xl font-normal tracking-tight text-foreground group-hover:text-accent transition-colors">
              {technology.title}
            </h3>
            {technology.icon && (
              <div className="w-8 h-8 relative flex items-center justify-center p-1 rounded-none border border-border/60 bg-muted/40">
                <Image
                  src={technology.icon}
                  alt={`${technology.title} logo`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {technology.description}
          </p>
        </div>

        <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
          <span>{conceptsCount} concepts</span>
          <span className="flex items-center gap-1 group-hover:text-accent font-sans font-medium text-xs">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
