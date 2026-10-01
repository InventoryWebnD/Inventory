import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ConceptBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function ConceptBreadcrumbs({ items }: ConceptBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center text-xs font-mono text-muted-foreground gap-1.5">
      <Link
        href="/"
        className="hover:text-foreground transition-colors"
      >
        home
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="text-muted-foreground/40 font-mono">/</span>
            {isLast || !item.href ? (
              <span className="font-semibold text-foreground tracking-tight">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
