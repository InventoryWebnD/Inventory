"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft, Sparkles, Compass } from "lucide-react";
import { searchConcepts } from "@/lib/search";
import { SearchItem } from "@/types/search";
import SearchResult from "./SearchResult";

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
  initialTechFilter?: string;
}

const SEARCH_SUGGESTIONS = [
  "boilerplate",
  "flexbox",
  "grid",
  "async",
  "events",
  "forms",
  "box-model",
  "dom",
];

export default function SearchCommand({
  isOpen,
  onClose,
  initialTechFilter,
}: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTechFilter, setActiveTechFilter] = useState<string | undefined>(
    initialTechFilter
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Sync tech filter with initialTechFilter on open
  const effectiveFilter = activeTechFilter ?? initialTechFilter;

  // Derive search results directly with useMemo
  const results = useMemo(() => {
    if (!isOpen) return [];
    return searchConcepts(query, effectiveFilter);
  }, [query, effectiveFilter, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setQuery("");
    setActiveTechFilter(undefined);
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      handleClose();
      router.push(`/learn/${item.tech}/${item.slug}`);
    },
    [router, handleClose]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev + 1) % results.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-100"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl bg-card border-2 border-foreground shadow-hard-lg rounded-none flex flex-col max-h-[82vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b-2 border-border gap-3 bg-card">
          <Search className="w-4 h-4 text-accent flex-shrink-0" />
          {effectiveFilter && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-none bg-accent/15 text-foreground border border-accent">
              <span>{effectiveFilter}</span>
              <button
                type="button"
                onClick={() => setActiveTechFilter("")}
                className="hover:text-destructive transition-colors ml-0.5 cursor-pointer"
                title="Clear technology filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              effectiveFilter
                ? `Search ${effectiveFilter.toUpperCase()} concepts...`
                : "Search concepts (e.g. flexbox, grid, dom)..."
            }
            className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground text-foreground font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="text-muted-foreground hover:text-foreground p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded-none border border-border">
            ESC
          </kbd>
        </div>

        {/* Results List or Empty Suggestions */}
        <div
          ref={listRef}
          role="listbox"
          className="flex-1 overflow-y-auto p-2 space-y-1 min-h-[160px] max-h-[380px]"
        >
          {results.length > 0 ? (
            results.map((item, idx) => (
              <SearchResult
                key={item.id}
                item={item}
                isSelected={idx === selectedIndex}
                onSelect={handleSelect}
              />
            ))
          ) : (
            <div className="py-8 px-4 text-center space-y-4">
              <div className="text-muted-foreground text-sm">
                <Sparkles className="w-5 h-5 mx-auto mb-2 text-accent" />
                <p className="font-semibold text-foreground font-sans">No concepts found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {query
                    ? `No matches found for "${query}"`
                    : "Type a keyword to begin searching"}
                </p>
              </div>

              <div className="pt-3 border-t border-border max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-2.5">
                  <Compass className="w-3.5 h-3.5 text-accent" />
                  <span>Popular searches:</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {SEARCH_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setQuery(sug)}
                      className="px-2.5 py-1 rounded-none bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 transition-colors cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-border bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded-none bg-card border border-border text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded-none bg-card border border-border text-[10px]">
                ↓
              </kbd>{" "}
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded-none bg-card border border-border text-[10px]">
                <CornerDownLeft className="w-2.5 h-2.5 inline" />
              </kbd>{" "}
              select
            </span>
          </div>
          <span>
            {results.length} concept{results.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
