"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SearchCommand from "@/components/search/SearchCommand";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header className={`border-b border-border zone-yellow sticky top-0 z-40 border-b-2 transition-colors${scrolled ? " is-scrolled" : ""}`}>
        <Container size="wide">
          <div className="h-13 sm:h-14 flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              className="font-bold text-foreground tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap text-sm sm:text-base flex items-center gap-2.5 group"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-border bg-[#fbfbfa] bg-logo shadow-hard-xs group-hover:border-accent/70 transition-all p-1">
                <Image
                  src="/icons/logo.png"
                  alt="WebnD Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <span className="font-semibold tracking-tight max-[380px]:hidden">WebnD Inventory</span>
            </Link>

            {/* Nav, Search & Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-5">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-muted-foreground bg-card hover:bg-muted/70 rounded-lg border border-border hover:border-accent/70 transition-all cursor-pointer shadow-hard-xs hover:shadow-hard active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Search concepts"
              >
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="hidden sm:inline">Search concepts...</span>
                <span className="sm:hidden max-[380px]:sr-only">Search</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-lg bg-background border border-border font-mono text-[10px] text-muted-foreground">
                  Ctrl K
                </kbd>
              </button>

              <nav className="flex items-center gap-4 sm:gap-5">
                <Link
                  href="/learn"
                  aria-current={isLearnActive ? "page" : undefined}
                  className={`nav-link text-xs sm:text-sm font-medium transition-colors ${
                    isLearnActive
                      ? "text-foreground font-semibold"
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
