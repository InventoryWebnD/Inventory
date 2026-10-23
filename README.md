# WebnD Inventory

A search-first, concept-based web development learning platform where each concept is a focused, independent Markdown document.

> **Design Principle**: *Find one thing. Understand it. Move on.*

## Tech Stack

* **Framework**: Next.js (App Router, React Server Components)
* **Language**: TypeScript
* **Styling**: Tailwind CSS & shadcn/ui
* **Search**: Fuse.js client-side fuzzy search
* **Content**: Educational Markdown (`react-markdown`, `remark-gfm`, `rehype-highlight`)
* **Icons**: Lucide React

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Scripts

```bash
npm run dev               # Start local Next.js dev server
npm run build             # Build optimized production bundle
npm run lint              # Run ESLint validation
npm run build:search      # Rebuild data/search-index.json from concepts.json
npm run validate:content  # Validate integrity of technologies, concepts, and markdown
```

## Content Architecture & Manual Authoring

The repository strictly separates **discovery metadata** from **educational content**:

```text
data/
  techs.json          # Technology definitions (id, title, slug, description, icon)
  concepts.json       # Concept metadata (id, title, slug, tech, tags, keywords, related, category, estimatedTime)
  search-index.json   # Prebuilt lightweight fuzzy search index

public/content/
  <tech>/<slug>.md    # Self-contained educational Markdown content
```

### Content Authoring Workflow

Adding a new concept requires **zero React component modifications**:

1. **Create Markdown File** in `public/content/<tech>/<slug>.md`:
   - Follow self-contained structure: *What It Is, Basic Syntax, Example, Best Practices, Common Mistakes*.
   - Use headings (`##`, `###`), practical code snippets, lists, and tables.
2. **Add Concept Metadata** in `data/concepts.json`:
   ```json
   {
     "id": "html-forms",
     "title": "HTML Forms and Inputs",
     "slug": "forms",
     "tech": "html",
     "mdPath": "/content/html/forms.md",
     "summary": "Collect user input with labels, input types, and validation attributes.",
     "tags": ["html", "forms", "inputs"],
     "keywords": ["form", "input", "label", "submit"],
     "related": ["html-buttons", "html-tables"],
     "category": "forms",
     "estimatedTime": 7
   }
   ```
3. **Regenerate Search Index & Validate Content**:
   ```bash
   npm run build:search
   npm run validate:content
   ```

## Global Search & Keyboard Shortcuts

- Press `Ctrl + K` (or `⌘K` on macOS) anywhere to open the global search modal.
- Use `↑` / `↓` arrow keys to navigate matching concepts.
- Press `Enter` to jump directly into the selected concept.
- Press `Esc` to dismiss.
- Technology-scoped search is also available directly on each technology hub (e.g., `/learn/html`).

## Recently Viewed Concepts

- Visited concepts are stored locally in the browser's `localStorage` (client-side only, no account or server persistence required).
- Displays your last 6 recently visited concepts on `/learn` for immediate jump-back access.

## SEO Setup

All SEO configuration lives in `lib/seo.ts`; pages call `buildPageMetadata()` so titles, canonicals, Open Graph and Twitter cards stay consistent.

| Concern | Where |
| --- | --- |
| Production origin, site name, default OG image | `lib/seo.ts` |
| Title template, site-wide Organization + WebSite JSON-LD | `app/layout.tsx` |
| Per-page metadata + canonical | `generateMetadata()` in `app/learn/[tech]/**/page.tsx`, `metadata` in `app/page.tsx` and `app/learn/page.tsx` |
| Page JSON-LD (TechArticle, CollectionPage, BreadcrumbList) | `app/learn/[tech]/page.tsx`, `app/learn/[tech]/[conceptSlug]/page.tsx` |
| `/robots.txt`, `/sitemap.xml` | `app/robots.ts`, `app/sitemap.ts` (generated from `data/*.json`) |
| `noindex` for raw Markdown under `/content/*` | `next.config.ts` (`X-Robots-Tag`) |

### Environment variable

```bash
NEXT_PUBLIC_SITE_URL=https://inventory.webnd.org   # no trailing slash
```

Set it in your hosting provider for production. If unset, `https://inventory.webnd.org` (the value that was already in the code) is used. It must be set at **build** time because it is a `NEXT_PUBLIC_` variable.

### Adding content

Adding a concept to `data/concepts.json` automatically adds it to the sitemap, static params, metadata and JSON-LD. Optionally set `"updatedAt": "YYYY-MM-DD"` on a concept to emit a real `lastmod` and `dateModified`; without it, no date is published.

### Validate after deploying

```bash
npm install && npm run validate:content && npm run lint && npm run build
curl -s https://<your-domain>/robots.txt
curl -s https://<your-domain>/sitemap.xml | head
curl -sI https://<your-domain>/content/css/flexbox.md | grep -i x-robots-tag   # noindex
curl -s -o /dev/null -w "%{http_code}\n" https://<your-domain>/learn/css/not-a-real-slug   # 404
```

Then check a concept page in Google's Rich Results Test and the Schema Markup Validator, and verify `<link rel="canonical">` matches the page URL.

### Search Console / Bing

1. Add the domain as a property in Google Search Console and verify it (DNS TXT record recommended).
2. Submit `https://<your-domain>/sitemap.xml` under Sitemaps.
3. Use URL Inspection on `/`, `/learn`, one tech page and one concept page, then Request Indexing.
4. Import the site into Bing Webmaster Tools from Search Console, or add and verify it manually, then submit the same sitemap.
