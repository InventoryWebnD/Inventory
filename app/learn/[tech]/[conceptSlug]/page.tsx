import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getConcepts,
  getTechnologyBySlug,
  getConceptBySlug,
  getRelatedConcepts,
} from "@/lib/content";
import {
  SITE_URL,
  NOT_FOUND_METADATA,
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  metaDescription,
} from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
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

export const dynamicParams = false;

export function generateStaticParams() {
  return getConcepts().map((concept) => ({
    tech: concept.tech,
    conceptSlug: concept.slug,
  }));
}

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
    return NOT_FOUND_METADATA;
  }

  return buildPageMetadata({
    title: `${concept.title} (${technology.title})`,
    description: metaDescription(concept.summary),
    path: `/learn/${technology.slug}/${concept.slug}`,
    type: "article",
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
  });
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

  const pagePath = `/learn/${technology.slug}/${concept.slug}`;
  const modified =
    concept.updatedAt && !Number.isNaN(new Date(concept.updatedAt).getTime())
      ? concept.updatedAt
      : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${absoluteUrl(pagePath)}#article`,
        mainEntityOfPage: absoluteUrl(pagePath),
        url: absoluteUrl(pagePath),
        headline: concept.title,
        description: concept.summary,
        articleSection: concept.category,
        about: technology.title,
        inLanguage: "en-US",
        ...(concept.estimatedTime
          ? { timeRequired: `PT${concept.estimatedTime}M` }
          : {}),
        ...(modified ? { dateModified: modified } : {}),
        author: concept.author
          ? { "@type": "Person", name: concept.author }
          : { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Learn", path: "/learn" },
        { name: technology.title, path: `/learn/${technology.slug}` },
        { name: concept.title, path: pagePath },
      ]),
    ],
  };

  return (
    <div className="py-8 sm:py-10">
      <JsonLd data={articleJsonLd} />
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
              <div className="p-6 rounded-lg border border-destructive/40 bg-destructive/5 text-destructive text-sm shadow-hard-xs">
                <p className="font-semibold font-mono">Failed to load concept content</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  Could not find educational material at {concept.mdPath}.
                </p>
              </div>
            )}

            {/* Concept Author Byline */}
            {concept.author && (
              <div className="author-card reveal mt-12 p-4 sm:p-5 rounded-xl border-2 border-border bg-card shadow-hard-sm flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="author-avatar" aria-hidden="true">
                    {concept.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-accent inline-block" />
                      <span>Written by</span>
                    </div>
                    <span className="block font-serif text-xl sm:text-2xl text-foreground leading-tight">
                      {concept.author}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {technology.title} · {concept.estimatedTime ?? 5} min read
                    </span>
                  </div>
                </div>

                <span className="self-start min-[480px]:self-auto text-xs font-mono text-muted-foreground border border-border px-2.5 py-1 bg-muted/40 rounded-md whitespace-nowrap">
                  WebnD Inventory
                </span>
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
