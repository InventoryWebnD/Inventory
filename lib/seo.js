const FALLBACK_SITE_URL = "https://inventory.webnd.org";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "");

export const SITE_NAME = "WebnD Inventory";
export const ORG_NAME = "Web & Design Society";

export const DEFAULT_TITLE =
  "WebnD Inventory — Gyan Ka Pitara";
export const DEFAULT_DESCRIPTION =
  "A search-first, concept-based web development learning platform. Focused, self-contained concepts across HTML, CSS, JavaScript, and more.";

export const DEFAULT_OG_IMAGE = {
  url: "/icons/logo.png",
  width: 1484,
  height: 1729,
  alt: "WebnD Inventory logo",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLdString(data) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function metaDescription(text, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  const wasCut = /(\.\.\.|…)$/.test(clean);
  const body = clean.replace(/(\.\.\.|…)$/, "").trimEnd();

  if (!wasCut && body.length <= max) return body;

  const limit = wasCut ? Math.min(body.length, max - 1) : max - 1;
  let cut = body.slice(0, limit);
  if (limit < body.length || wasCut) {
    const lastSpace = cut.lastIndexOf(" ");
    if (lastSpace > 40) cut = cut.slice(0, lastSpace);
  }
  return `${cut.replace(/[\s,;:–—-]+$/, "")}…`;
}

/** @returns {import("next").Metadata} */
export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
}) {
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export const NOT_FOUND_METADATA = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export function breadcrumbJsonLd(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
