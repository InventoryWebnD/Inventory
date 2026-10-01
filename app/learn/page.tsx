import Image from "next/image";
import { getTechnologies } from "@/lib/content";
import Container from "@/components/layout/Container";
import TechCard from "@/components/tech/TechCard";
import RecentConcepts from "@/components/concepts/RecentConcepts";
import LearnSearchTrigger from "./LearnSearchTrigger";

export const metadata = {
  title: "Learn Web Technologies | WebnD Inventory",
  description:
    "Explore web technologies and browse focused, self-contained educational concepts.",
};

export default function LearnPage() {
  const technologies = getTechnologies();

  return (
    <div className="py-10 sm:py-14">
      <Container size="default">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-border">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center bg-[#fbfbfa] bg-logo border border-border/80 p-0.5">
                <Image
                  src="/icons/logo.png"
                  alt="WebnD Logo"
                  width={14}
                  height={14}
                  className="w-full h-full object-contain"
                />
              </span>
              <span>Library</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              Technologies
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Explore web technologies and browse focused, self-contained educational concepts.
              Pick a domain to explore or search directly.
            </p>
          </div>

          <LearnSearchTrigger />
        </div>

        {/* Technologies Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground pb-2">
            <span>Technologies</span>
            <span>{technologies.length} available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <TechCard key={tech.id} technology={tech} />
            ))}
          </div>
        </section>

        {/* Recently Viewed Concepts */}
        <RecentConcepts />
      </Container>
    </div>
  );
}
