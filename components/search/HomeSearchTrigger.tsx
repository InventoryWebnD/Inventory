"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SearchCommand from "@/components/search/SearchCommand";

export default function HomeSearchTrigger() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="w-full max-w-xl mx-auto flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-none border-2 border-foreground bg-card hover:bg-muted/40 text-foreground transition-all cursor-pointer shadow-hard hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search all concepts"
      >
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <Search className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground font-sans">
            Search concepts... (e.g. flexbox, box-model, dom)
          </span>
        </div>
        <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-none bg-muted border border-border font-mono text-[11px] text-muted-foreground">
          Ctrl K
        </kbd>
      </button>

      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
