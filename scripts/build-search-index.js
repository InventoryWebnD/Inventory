const fs = require("fs");
const path = require("path");

const conceptsPath = path.join(__dirname, "../data/concepts.json");
const outputPath = path.join(__dirname, "../data/search-index.json");

try {
  const conceptsData = JSON.parse(fs.readFileSync(conceptsPath, "utf-8"));

  const searchIndex = conceptsData.map((concept) => ({
    id: concept.id,
    title: concept.title,
    tech: concept.tech,
    slug: concept.slug,
    summary: concept.summary,
    tags: concept.tags || [],
    keywords: concept.keywords || [],
    category: concept.category || undefined,
  }));

  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2), "utf-8");
  console.log(`Successfully generated search-index.json with ${searchIndex.length} items.`);
} catch (error) {
  console.error("Failed to build search index:", error);
  process.exit(1);
}
