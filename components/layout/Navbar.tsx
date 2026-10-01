"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Container from "@/components/layout/Container";
import SearchCommand from "@/components/search/SearchCommand";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLearnActive = pathname.startsWith("/learn");

  return (
    <>
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40 transition-colors">
        <Container size="wide">
          <div className="h-13 sm:h-14 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="font-bold text-foreground tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap text-sm sm:text-base flex items-center gap-2 group"
            >
              <span className="w-2.5 h-2.5 bg-accent inline-block transition-transform group-hover:scale-110" />
              <span>WebnD Inventory</span>
            </Link>

            {/* Nav, Search & Theme Toggle */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-muted-foreground bg-card hover:bg-muted/70 rounded-none border border-border hover:border-foreground/40 transition-all cursor-pointer shadow-hard-xs hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Search concepts"
              >
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="hidden sm:inline">Search concepts...</span>
                <span className="sm:hidden">Search</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-none bg-background border border-border font-mono text-[10px] text-muted-foreground">
                  Ctrl K
                </kbd>
              </button>

              <nav className="flex items-center gap-4 sm:gap-5">
                <Link
                  href="/learn"
                  className={`text-xs sm:text-sm font-medium transition-colors relative py-1 ${
                    isLearnActive
                      ? "text-foreground font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Learn
                </Link>

                <ThemeToggle />
              </nav>
            </div>
          </div>
        </Container>
      </header>

      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
