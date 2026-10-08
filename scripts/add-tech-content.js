// Safe, additive content importer.
// Usage: node scripts/add-tech-content.js <techId>      (e.g. react)
// Reads docs/Contents/<folder matching techId>/*.md, copies them to public/content/<techId>/,
// and ADDS/REPLACES only that tech's entries in data/concepts.json.
// All other technologies (html/css/js) and their hand-written fields (author, related...) are untouched.
const fs = require("fs");
const path = require("path");

const techId = (process.argv[2] || "").toLowerCase();
if (!techId) { console.error("Usage: node scripts/add-tech-content.js <techId>"); process.exit(1); }

const root = path.join(__dirname, "..");
const docsDir = path.join(root, "docs/Contents");
const conceptsPath = path.join(root, "data/concepts.json");
const techs = JSON.parse(fs.readFileSync(path.join(root, "data/techs.json"), "utf-8"));
const tech = techs.find((t) => t.id.toLowerCase() === techId);
if (!tech) { console.error(`"${techId}" is missing in data/techs.json - add it first.`); process.exit(1); }

const folder = fs.readdirSync(docsDir).find((f) => f.toLowerCase() === techId);
if (!folder) { console.error(`No folder docs/Contents/${techId} (any letter case).`); process.exit(1); }

const categories = {
  react: {
    "react-fundamentals": "basics", jsx: "basics", components: "basics", props: "basics", events: "basics",
    "state-and-usestate": "state", "lifting-state-up": "state", "component-communication": "state",
    usereducer: "state", "state-management": "state", "persisting-state-with-localstorage": "state",
    "conditional-rendering": "rendering", "lists-and-keys": "rendering", "forms-and-controlled-components": "rendering",
    "search-filter-sort": "rendering", "lifecycle-and-rendering": "rendering",
    useeffect: "hooks", useref: "hooks", usecontext: "hooks", "custom-hooks": "hooks",
    "data-fetching-in-react": "data", "advanced-data-fetching": "data", "crud-in-react": "data",
    "react-router": "routing", "protected-routes-and-auth-ui": "routing",
    "react-memo": "performance", usememo: "performance", usecallback: "performance", "performance-optimization": "performance",
    "error-boundaries": "quality", "loading-empty-and-error-states": "quality", strictmode: "quality",
    accessibility: "quality", "devtools-and-debugging": "quality", "testing-react": "quality",
    "styling-in-react": "architecture", "project-setup-with-vite": "architecture", "project-architecture": "architecture",
    "reusable-components-and-composition": "architecture", "design-patterns": "architecture",
    "modern-react": "modern", "professional-react-practices": "modern",
  },
  tailwind: {
    "introduction-and-setup": "basics", "utility-first-fundamentals": "basics",
    "spacing-and-sizing": "styling", typography: "styling", "colors-and-backgrounds": "styling", "borders-shadows-and-effects": "styling",
    "layout-and-positioning": "layout", flexbox: "layout", grid: "layout",
    "responsive-design": "responsive", "state-variants": "responsive", "dark-mode": "responsive",
    "transitions-and-animations": "motion",
    "customization-with-theme": "customization", "reusing-styles-and-components": "customization",
  },
}[techId] || {};

// Author shown on each lesson page (same as HTML / CSS / JS)
const authors = { react: "Lakshya Bansal", tailwind: "Lakshya Bansal" };

const slugify = (f) => f.replace(/^\d+-/, "").replace(/\.md$/, "").toLowerCase().trim();
const title = (c) => (c.match(/^#\s+(.+)$/m) || [, "Untitled"])[1].trim();
function summary(c, d) {
  const m = c.match(/##\s+Introduction\s+([\s\S]+?)(?=\n##|\n$)/);
  if (m) {
    const p = m[1].trim().split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean)[0];
    if (p) {
      const s = p.replace(/\*\*/g, "").replace(/`/g, "").replace(/\n/g, " ");
      return s.length > 180 ? s.slice(0, 177) + "..." : s;
    }
  }
  return d;
}
function kw(c, t) {
  const tags = new Set([techId]);
  const keywords = new Set(t.toLowerCase().split(/[\s-]+/));
  const m = c.match(/##\s+Subtopics\s+([\s\S]+?)(?=\n##|\n$)/);
  if (m) (m[1].match(/- (.+)/g) || []).forEach((i) =>
    i.replace(/^- /, "").replace(/[`*]/g, "").toLowerCase().split(/[\s,()]+/).forEach((w) => {
      { w = w.replace(/[^a-z0-9.+#-]/g, ""); if (w.length > 3 && !["with", "and", "the", "from", "each", "that", "when", "your", "into", "creating", "using", "inside"].includes(w)) keywords.add(w); }
    }));
  t.toLowerCase().split(/[\s-]+/).forEach((w) => { if (w.length > 2 && !["and", "the", "for"].includes(w)) tags.add(w); });
  return { tags: [...tags].slice(0, 5), keywords: [...keywords].slice(0, 8) };
}

const outDir = path.join(root, "public/content", techId);
fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync(path.join(docsDir, folder)).filter((f) => f.endsWith(".md")).sort();
const list = files.map((f) => {
  const c = fs.readFileSync(path.join(docsDir, folder, f), "utf-8");
  const slug = slugify(f), t = title(c);
  fs.writeFileSync(path.join(outDir, `${slug}.md`), c, "utf-8");
  const { tags, keywords } = kw(c, t);
  return {
    id: `${techId}-${slug}`, title: t, slug, tech: techId, mdPath: `/content/${techId}/${slug}.md`,
    summary: summary(c, `${t} in ${tech.title}.`), tags, keywords,
    category: categories[slug] || "general",
    ...(authors[techId] ? { author: authors[techId] } : {}),
    estimatedTime: Math.max(3, Math.round(c.split(/\s+/).length / 130)), related: [],
  };
});
list.forEach((c, i) => {
  const r = [];
  if (i > 0) r.push(list[i - 1].id);
  if (i < list.length - 1) r.push(list[i + 1].id);
  const same = list.find((x) => x.category === c.category && x.id !== c.id && !r.includes(x.id));
  if (same) r.push(same.id);
  c.related = r;
});

const existing = JSON.parse(fs.readFileSync(conceptsPath, "utf-8")).filter((c) => c.tech !== techId);
fs.writeFileSync(conceptsPath, JSON.stringify([...existing, ...list], null, 2), "utf-8");
console.log(`Added ${list.length} "${techId}" concepts. Kept ${existing.length} existing concepts untouched.`);
