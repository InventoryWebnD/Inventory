"use client";

import { useState, useEffect } from "react";
import { TocItem } from "@/lib/markdown";
import { AlignLeft, ChevronDown } from "lucide-react";

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -75% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      {/* Mobile collapsible button */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-card text-xs font-mono font-medium text-foreground cursor-pointer shadow-hard-xs hover:shadow-hard active:translate-y-0.5 transition-all"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent inline-block" />
            <span>On this page ({headings.length} sections)</span>
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpenMobile ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpenMobile && (
          <div className="mt-1.5 p-3 border border-border rounded-lg bg-card space-y-1.5 text-xs font-mono shadow-hard-xs max-h-72 overflow-y-auto animate-in fade-in-0 slide-in-from-top-2 duration-200">
            {headings.map((heading) => (
              <button
                key={heading.id}
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left py-1 pl-2.5 transition-colors cursor-pointer border-l-2 ${
                  heading.level === 3 ? "ml-2 text-[11px]" : ""
                } ${
                  activeId === heading.id
                    ? "border-accent text-foreground font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {heading.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-2 pb-2 mb-3 border-b border-border/60">
          <AlignLeft className="w-3.5 h-3.5 text-accent-ink" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            On this page
          </h4>
        </div>
        <ul className="space-y-1.5 text-xs border-l border-border/60">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                className={`${heading.level === 3 ? "pl-2" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left line-clamp-1 py-1 pl-3 transition-colors cursor-pointer w-full border-l-2 -ml-[1px] ${
                    isActive
                      ? "border-accent text-foreground font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
