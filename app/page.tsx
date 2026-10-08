import Image from "next/image";
import { getTechnologies } from "@/lib/content";
import Container from "@/components/layout/Container";
import TechCard from "@/components/tech/TechCard";
import RecentConcepts from "@/components/concepts/RecentConcepts";
import HomeSearchTrigger from "@/components/search/HomeSearchTrigger";

import HeroCube from "@/components/home/HeroCube";
import Ticker from "@/components/home/Ticker";

export default function HomePage() {
  const technologies = getTechnologies();
  // Every face links to a technology. With fewer than 6 technologies they repeat,
  // so any new tech added to data/techs.json (e.g. React) appears on the cube automatically.
  const cubeFaces = Array.from({ length: 6 }, (_, i) => {
    const t = technologies[i % technologies.length];
    return { label: t.id.toUpperCase(), href: `/learn/${t.slug}` };
  });

  return (
    <>
      {/* HERO — full-bleed yellow */}
      <section className="zone-yellow dots hero-glow relative overflow-hidden border-b-2 border-border">
        <Container size="default">
          <div className="grid md:grid-cols-12 gap-12 items-center py-14 sm:py-20 md:py-28">
            <div className="md:col-span-7 space-y-6">
              <div className="rise inline-flex items-center gap-2.5 px-3 py-1.5 border-2 border-border bg-card text-xs font-mono uppercase tracking-wider shadow-hard-sm rounded-lg">
                <span className="w-5 h-5 flex items-center justify-center bg-logo border border-border p-0.5">
                  <Image
                    src="/icons/logo.png"
                    alt="WebnD Logo"
                    width={16}
                    height={16}
                    className="w-full h-full object-contain"
                  />
                </span>
                <span>Search-first developer reference</span>
              </div>

              <h1 className="rise d1 font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight">
                WebnD <span className="stamp">Inventory</span>
              </h1>

              <p className="rise d2 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
                Focused, self-contained concepts across web technologies. Search
                for what you need, understand it in minutes, and move on.
              </p>

              <div className="rise d3 pt-2">
                <HomeSearchTrigger />
              </div>
            </div>

            {/* 3D cube — rotates on hover / drag, never on its own */}
            <div className="rise d2 flex md:col-span-5 justify-center pt-4 md:pt-0">
              <HeroCube faces={cubeFaces} />
            </div>
          </div>
        </Container>
      </section>

      {/* TICKER */}
      <Ticker technologies={technologies} />

      {/* TECHNOLOGIES */}
      <div className="py-12 sm:py-16">
        <Container size="default">
          <section className="space-y-8">
            <div className="inventory-bar flex items-center justify-between px-4 py-2.5 border-2 border-border rounded-lg shadow-hard text-xs font-mono uppercase tracking-wider">
              <span className="font-bold">Technology Inventory</span>
              <span className="text-accent">
                {technologies.length} technologies available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {technologies.map((tech, i) => (
                <div key={tech.id} className={`rise d${Math.min(i + 1, 4)}`}>
                  <TechCard technology={tech} index={i} />
                </div>
              ))}
            </div>
          </section>

          <RecentConcepts />
        </Container>
      </div>
    </>
  );
}
