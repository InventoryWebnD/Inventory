import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTechnologyBySlug,
  getConceptBySlug,
  getRelatedConcepts,
} from "@/lib/content";
import { getMarkdownContent, extractHeadings } from "@/lib/markdown";
import Container from "@/components/layout/Container";
import ConceptBreadcrumbs from "@/components/concepts/ConceptBreadcrumbs";
import ConceptHeader from "@/components/concepts/ConceptHeader";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import TableOfContents from "@/components/markdown/TableOfContents";
import RelatedConcepts from "@/components/concepts/RelatedConcepts";
import ConceptFooterNav from "@/components/concepts/ConceptFooterNav";
import ReadingProgress from "@/components/markdown/ReadingProgress";
import RecentTracker from "@/components/concepts/RecentTracker";

interface ConceptPageProps {
  params: Promise<{
    tech: string;
    conceptSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ConceptPageProps): Promise<Metadata> {
  const { tech: techSlug, conceptSlug } = await params;
  const concept = getConceptBySlug(techSlug, conceptSlug);
  const technology = getTechnologyBySlug(techSlug);

  if (!concept || !technology) {
    return {
      title: "Concept Not Found",
    };
  }

  const title = `${concept.title} (${technology.title})`;
  const description = concept.summary;
  const url = `/learn/${techSlug}/${conceptSlug}`;

  return {
    title,
    description,
    keywords: [
      concept.title,
      technology.title,
      ...(concept.category ? [concept.category] : []),
      ...(concept.tags || []),
      ...(concept.keywords || []),
      `${concept.title} tutorial`,
      `${technology.title} documentation`,
      "web development",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | WebnD Inventory`,
      description,
      url,
      type: "article",
      images: [
        {
          url: technology.icon || "/icons/logo.png",
          alt: `${concept.title} - ${technology.title}`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | WebnD Inventory`,
      description,
    },
  };
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  const { tech: techSlug, conceptSlug } = await params;

  const technology = getTechnologyBySlug(techSlug);
  if (!technology) {
    notFound();
  }

  const concept = getConceptBySlug(techSlug, conceptSlug);
  if (!concept) {
    notFound();
  }

  const markdownContent = getMarkdownContent(concept.mdPath);
  const headings = extractHeadings(markdownContent);
  const relatedConcepts = getRelatedConcepts(concept);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inventory.webnd.org";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: concept.title,
    description: concept.summary,
    articleSection: concept.category,
    inLanguage: "en-US",
    url: `${siteUrl}/learn/${techSlug}/${conceptSlug}`,
    author: {
      "@type": "Organization",
      name: "Web & Design Society",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Web & Design Society",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons/logo.png`,
      },
    },
  };

  return (
    <div className="py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Scroll Reading Progress Bar */}
      <ReadingProgress />

      {/* Record visit for Recently Viewed concepts */}
      <RecentTracker
        id={concept.id}
        tech={concept.tech}
        slug={concept.slug}
        title={concept.title}
      />

      <Container size="wide">
        {/* Breadcrumb Navigation */}
        <ConceptBreadcrumbs
          items={[
            { label: "Learn", href: "/learn" },
            { label: technology.title, href: `/learn/${technology.slug}` },
            { label: concept.title },
          ]}
        />

        {/* 3-Column Reading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start mt-4">
          {/* Left Column: Table of Contents (sticky on desktop, collapsible on mobile) */}
          <div className="lg:col-span-3 xl:col-span-2 lg:sticky lg:top-20 order-2 lg:order-1">
            <TableOfContents headings={headings} />
          </div>

          {/* Center Column: Educational Content */}
          <article className="lg:col-span-6 xl:col-span-7 2xl:col-span-8 min-w-0 order-1 lg:order-2 w-full">
            <ConceptHeader concept={concept} technology={technology} />

            {markdownContent ? (
              <div className="mt-6">
                <MarkdownRenderer content={markdownContent} />
              </div>
            ) : (
              <div className="p-6 rounded-none border border-destructive/40 bg-destructive/5 text-destructive text-sm shadow-hard-xs">
                <p className="font-semibold font-mono">Failed to load concept content</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  Could not find educational material at {concept.mdPath}.
                </p>
              </div>
            )}

            {/* Concept Author Byline */}
            {concept.author && (
              <div className="mt-12 p-4 sm:p-5 rounded-none border border-border bg-card shadow-hard-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-none border border-border bg-muted flex items-center justify-center font-mono text-xs font-bold text-foreground">
                    {concept.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-accent inline-block" />
                      <span>Author</span>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-foreground">
                      {concept.author}
                    </span>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-mono text-muted-foreground border border-border px-2.5 py-1 bg-muted/40">
                    WebnD Inventory
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Related Navigation */}
            <ConceptFooterNav
              relatedConcepts={relatedConcepts}
              techTitle={technology.title}
              techSlug={technology.slug}
            />
          </article>

          {/* Right Column: Related Concepts (sticky on desktop, bottom on mobile) */}
          <div className="lg:col-span-3 xl:col-span-3 2xl:col-span-2 lg:sticky lg:top-20 order-3">
            <RelatedConcepts concepts={relatedConcepts} />
          </div>
        </div>
      </Container>
    </div>
  );
}
