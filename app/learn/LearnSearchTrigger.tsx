"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import SearchCommand from "@/components/search/SearchCommand";

export default function LearnSearchTrigger() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-card hover:bg-muted/60 text-xs text-muted-foreground transition-all cursor-pointer shadow-hard-xs hover:shadow-hard active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex-shrink-0"
      >
        <Search className="w-3.5 h-3.5 text-accent-ink" />
        <span>Search all concepts...</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-lg bg-muted border border-border font-mono text-[10px] text-muted-foreground">
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
