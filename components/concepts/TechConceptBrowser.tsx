"use client";

import { useState, useMemo } from "react";
import { Concept, Technology } from "@/types/content";
import ConceptGrid from "./ConceptGrid";
import TechHeader from "@/components/tech/TechHeader";
import SearchCommand from "@/components/search/SearchCommand";

interface TechConceptBrowserProps {
  technology: Technology;
  concepts: Concept[];
}

export default function TechConceptBrowser({
  technology,
  concepts,
}: TechConceptBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Extract available categories from concepts
  const categories = useMemo(() => {
    const set = new Set<string>();
    concepts.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["all", ...Array.from(set)];
  }, [concepts]);

  // Filter concepts by category
  const filteredConcepts = useMemo(() => {
    if (selectedCategory === "all") return concepts;
    return concepts.filter((c) => c.category === selectedCategory);
  }, [concepts, selectedCategory]);

  return (
    <div>
      <TechHeader
        technology={technology}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-2 border-b border-border/40">
          <span className="font-semibold uppercase tracking-wider text-foreground">
            {selectedCategory === "all" ? "All Concepts" : `${selectedCategory} Concepts`}
          </span>
          <span>
            {filteredConcepts.length} concept{filteredConcepts.length === 1 ? "" : "s"}
          </span>
        </div>

        <ConceptGrid
          concepts={filteredConcepts}
          emptyMessage={`No concepts found in category "${selectedCategory}".`}
        />
      </div>

      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialTechFilter={technology.slug}
      />
    </div>
  );
}
