import Link from "next/link";
import { Technology } from "@/types/content";

const PHRASES = [
  "Ctrl + K",
  "Free forever",
  "Search first",
  "One concept at a time",
  "Find it. Understand it. Move on.",
];

type Item =
  | { kind: "text"; label: string }
  | { kind: "tech"; label: string; href: string };

/** Interleaves phrases with technologies. Every tech in techs.json shows up (and is a link) automatically. */
function buildItems(technologies: Technology[]): Item[] {
  const items: Item[] = [];
  const n = Math.max(PHRASES.length, technologies.length);
  for (let i = 0; i < n; i++) {
    if (PHRASES[i]) items.push({ kind: "text", label: PHRASES[i] });
    if (technologies[i]) {
      items.push({
        kind: "tech",
        label: technologies[i].title,
        href: `/learn/${technologies[i].slug}`,
      });
    }
  }
  return items;
}

export default function Ticker({ technologies }: { technologies: Technology[] }) {
  const items = buildItems(technologies);

  return (
    <nav className="marquee" aria-label="Technologies">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-set" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                {item.kind === "tech" ? (
                  <Link
                    href={item.href}
                    className="marquee-link"
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                <span aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
