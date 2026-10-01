import Image from "next/image";
import { getTechnologies } from "@/lib/content";
import Container from "@/components/layout/Container";
import TechCard from "@/components/tech/TechCard";
import RecentConcepts from "@/components/concepts/RecentConcepts";
import HomeSearchTrigger from "@/components/search/HomeSearchTrigger";

export default function HomePage() {
  const technologies = getTechnologies();

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Container size="default">
        {/* Hero Section */}
        <section className="text-center space-y-5 pb-12 sm:pb-16 border-b border-border">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-border bg-card text-xs font-mono uppercase tracking-wider text-muted-foreground shadow-hard-xs">
            <span className="w-5 h-5 flex items-center justify-center bg-[#fbfbfa] bg-logo border border-border/80 p-0.5">
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

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.08] max-w-3xl mx-auto font-normal">
            WebnD Inventory
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Focused, self-contained concepts across web technologies.
            Search for what you need, understand it in minutes, and move on.
          </p>

          <div className="pt-4">
            <HomeSearchTrigger />
          </div>
        </section>

        {/* Technology Exploration */}
        <section className="pt-10 sm:pt-14 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-border text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <span className="font-semibold text-foreground">Technology Inventory</span>
            <span>{technologies.length} technologies available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <TechCard key={tech.id} technology={tech} />
            ))}
          </div>
        </section>

        {/* Lightweight Recent / Popular Concepts */}
        <RecentConcepts />
      </Container>
    </div>
  );
}
