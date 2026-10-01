"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { History, ArrowRight } from "lucide-react";
import { subscribeRecent, getRecentSnapshot } from "@/lib/recent";

const emptyServerList: [] = [];

export default function RecentConcepts() {
  const recentItems = useSyncExternalStore(
    subscribeRecent,
    getRecentSnapshot,
    () => emptyServerList
  );

  if (recentItems.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-3.5 h-3.5 text-accent" />
        <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
          Recently Viewed Concepts
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {recentItems.map((item) => (
          <Link
            key={item.id}
            href={`/learn/${item.tech}/${item.slug}`}
            className="flex items-center justify-between p-3 rounded-none border border-border bg-card hover:border-foreground/80 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-xs transition-all group cursor-pointer"
          >
            <div className="min-w-0 pr-2">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-none border border-border bg-muted text-muted-foreground mr-2">
                {item.tech}
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors truncate inline-block align-middle">
                {item.title}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
