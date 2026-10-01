const fs = require("fs");
const path = require("path");

const docsDir = path.join(__dirname, "../docs/Contents");
const publicContentDir = path.join(__dirname, "../public/content");
const conceptsJsonPath = path.join(__dirname, "../data/concepts.json");

const techMap = {
  HTML: "html",
  CSS: "css",
  JS: "js",
};

// Curated category maps
const htmlCategories = {
  boilerplate: "structure",
  "headings-and-paragraphs": "text",
  lists: "text",
  tables: "structure",
  media: "media",
  "buttons-and-inputs": "forms",
  forms: "forms",
};

const cssCategories = {
  types: "basics",
  selectors: "selectors",
  inheritance: "basics",
  "box-model": "box-model",
  units: "box-model",
  functions: "properties",
  variables: "properties",
  "colour-and-background": "styling",
  "display-and-layout": "layout",
  flexbox: "layout",
  grid: "layout",
  positioning: "layout",
  typography: "styling",
  "borders-and-effects": "styling",
  "pseudo-selectors": "selectors",
  responsiveness: "responsive",
  "transition-and-transform": "animation",
  "animation-and-keyframes": "animation",
};

const jsCategories = {
  fundamentals: "basics",
  "data-types": "basics",
  operators: "basics",
  "control-structures": "basics",
  functions: "core",
  arrays: "data-structures",
  objects: "data-structures",
  strings: "data-structures",
  "dom-introduction": "dom",
  events: "dom",
  "forms-and-inputs": "dom",
  "async-javascript": "async",
  "json-and-data": "async",
  "error-handling": "core",
  modules: "architecture",
  "browser-storage": "browser",
  timers: "browser",
  "classes-and-oop": "architecture",
};

const categoryMaps = {
  html: htmlCategories,
  css: cssCategories,
  js: jsCategories,
};

function slugifyFilename(fileName) {
  // e.g. "01-Boilerplate.md" -> "boilerplate"
  // "02-Headings-and-Paragraphs.md" -> "headings-and-paragraphs"
  return fileName
    .replace(/^\d+-/, "")
    .replace(/\.md$/, "")
    .toLowerCase()
    .trim();
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

function extractSummary(content, defaultSummary) {
  // Extract text under ## Introduction
  const introMatch = content.match(/##\s+Introduction\s+([\s\S]+?)(?=\n##|\n$)/);
  if (introMatch) {
    const raw = introMatch[1].trim();
    // Get first non-empty paragraph
    const paras = raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (paras.length > 0) {
      let firstPara = paras[0].replace(/\*\*/g, "").replace(/`/g, "").replace(/\n/g, " ");
      if (firstPara.length > 180) {
        firstPara = firstPara.slice(0, 177) + "...";
      }
      return firstPara;
    }
  }
  return defaultSummary;
}

function extractTagsAndKeywords(content, title, tech) {
  const tags = new Set([tech]);
  const keywords = new Set(title.toLowerCase().split(/[\s-]+/));

  const subtopicsMatch = content.match(/##\s+Subtopics\s+([\s\S]+?)(?=\n##|\n$)/);
  if (subtopicsMatch) {
    const items = subtopicsMatch[1].match(/- (.+)/g);
    if (items) {
      items.forEach((item) => {
        const clean = item.replace(/^- /, "").replace(/[`*]/g, "").trim().toLowerCase();
        clean.split(/[\s,()]+/).forEach((word) => {
          if (word.length > 3 && !["with", "and", "the", "from", "each"].includes(word)) {
            keywords.add(word);
          }
        });
      });
    }
  }

  // Derive relevant tags
  title.toLowerCase().split(/[\s-]+/).forEach((t) => {
    if (t.length > 2 && !["and", "the", "for"].includes(t)) tags.add(t);
  });

  return {
    tags: Array.from(tags).slice(0, 5),
    keywords: Array.from(keywords).slice(0, 8),
  };
}

const concepts = [];

Object.entries(techMap).forEach(([folderName, techSlug]) => {
  const folderPath = path.join(docsDir, folderName);
  if (!fs.existsSync(folderPath)) return;

  const targetDir = path.join(publicContentDir, techSlug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const techConceptList = [];

  files.forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const slug = slugifyFilename(fileName);
    const id = `${techSlug}-${slug}`;
    const title = extractTitle(content);
    const summary = extractSummary(content, `${title} in ${techSlug.toUpperCase()}.`);
    const { tags, keywords } = extractTagsAndKeywords(content, title, techSlug);
    const category = (categoryMaps[techSlug] && categoryMaps[techSlug][slug]) || "general";
    const wordCount = content.split(/\s+/).length;
    const estimatedTime = Math.max(3, Math.round(wordCount / 180));

    // Save into public/content/<tech>/<slug>.md
    const targetFilePath = path.join(targetDir, `${slug}.md`);
    fs.writeFileSync(targetFilePath, content, "utf-8");

    const concept = {
      id,
      title,
      slug,
      tech: techSlug,
      mdPath: `/content/${techSlug}/${slug}.md`,
      summary,
      tags,
      keywords,
      category,
      estimatedTime,
      related: [],
    };

    techConceptList.push(concept);
    concepts.push(concept);
  });

  // Assign related concepts within the same technology
  techConceptList.forEach((concept, index) => {
    const related = [];
    if (index > 0) related.push(techConceptList[index - 1].id);
    if (index < techConceptList.length - 1) related.push(techConceptList[index + 1].id);
    // Add third related from same category if available
    const sameCat = techConceptList.find(
      (c) => c.category === concept.category && c.id !== concept.id && !related.includes(c.id)
    );
    if (sameCat) related.push(sameCat.id);

    concept.related = related;
  });
});

fs.writeFileSync(conceptsJsonPath, JSON.stringify(concepts, null, 2), "utf-8");
console.log(`Successfully synced ${concepts.length} concepts into data/concepts.json and public/content/`);
