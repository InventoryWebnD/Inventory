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
        className="btn-shine w-full max-w-xl flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-lg border-2 border-foreground bg-card hover:bg-muted/40 text-foreground transition-all cursor-pointer shadow-hard hover:shadow-hard-lg active:translate-y-0.5 active:shadow-hard-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Search all concepts"
      >
        <div className="flex min-w-0 items-center gap-3 text-muted-foreground text-sm">
          <Search className="w-4 h-4 text-accent-ink" />
          <span className="text-muted-foreground font-sans truncate">
            <span className="sm:hidden">Search flexbox, hooks, grid…</span>
            <span className="hidden sm:inline">Search concepts… (e.g. flexbox, useState, tailwind grid)</span>
          </span>
        </div>
        <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg bg-muted border border-border font-mono text-[11px] text-muted-foreground">
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
