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
