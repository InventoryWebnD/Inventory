import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { getTechnologies } from "@/lib/content";

export default function Footer() {
  const technologies = getTechnologies();

  return (
    <footer className="border-t-2 border-border zone-yellow mt-auto transition-colors">
      <Container size="wide">
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-bold text-foreground tracking-tight hover:opacity-90 transition-opacity group"
            >
              <div className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-[#fbfbfa] bg-logo shadow-hard-xs group-hover:border-accent/70 transition-all p-1">
                <Image
                  src="/icons/logo.png"
                  alt="WebnD Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold text-base sm:text-lg tracking-tight">
                WebnD Inventory
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A search-first, concept-based web development learning platform.
              Crafted by the Web &amp; Design Society to make foundational concepts clear, actionable, and rapid to reference.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono border border-border bg-background text-muted-foreground shadow-hard-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Web &amp; Design Society</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  All Technologies
                </Link>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
              Technologies
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {technologies.map((tech) => (
                <Link
                  key={tech.id}
                  href={`/learn/${tech.id}`}
                  className="hover:text-foreground hover:translate-x-1 transition-all flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 bg-accent/60 group-hover:bg-accent group-hover:rotate-45 group-hover:scale-125 transition-all" />
                  <span>{tech.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} WebnD. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
            <span>Lessons by <span className="font-semibold text-foreground">Lakshya Bansal</span></span>
            <span aria-hidden="true">·</span>
            <span>Built with Next.js &amp; Tailwind CSS</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
