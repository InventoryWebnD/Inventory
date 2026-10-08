import Image from "next/image";
import { Technology } from "@/types/content";
import ConceptBreadcrumbs from "@/components/concepts/ConceptBreadcrumbs";
import { Search } from "lucide-react";

interface TechHeaderProps {
  technology: Technology;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenSearch: () => void;
}

export default function TechHeader({
  technology,
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenSearch,
}: TechHeaderProps) {
  return (
    <header className="space-y-6 pb-6 mb-8 border-b border-border">
      {/* Breadcrumb */}
      <ConceptBreadcrumbs
        items={[
          { label: "learn", href: "/learn" },
          { label: technology.title.toLowerCase() },
        ]}
      />

      {/* Technology Title, Icon, & Description */}
      <div className="flex items-start gap-4">
        {technology.icon && (
          <div className="w-12 h-12 relative flex-shrink-0 flex items-center justify-center rounded-lg bg-muted/40 p-2.5 border border-border shadow-hard-xs">
            <Image
              src={technology.icon}
              alt={`${technology.title} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        )}
        <div className="space-y-1.5">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
            {technology.title}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            {technology.description}
          </p>
        </div>
      </div>

      {/* Scoped Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Category chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedCategory === cat
                  ? "bg-foreground text-background border-foreground font-semibold shadow-hard-xs"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/70 hover:bg-muted/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scoped Search Trigger */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center justify-between sm:justify-start gap-3 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted/60 text-xs text-muted-foreground hover:text-foreground hover:border-accent/70 transition-all cursor-pointer w-full sm:w-auto shadow-hard-xs hover:shadow-hard active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-accent-ink" />
            <span>Search {technology.title} concepts...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-muted rounded-lg border border-border text-muted-foreground">
            /
          </kbd>
        </button>
      </div>
    </header>
  );
}
