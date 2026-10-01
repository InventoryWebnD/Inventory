import fs from "fs";
import path from "path";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "") // remove HTML tags if any
    .replace(/[^\w\s-]/g, "") // remove non-word chars except hyphens/spaces
    .trim()
    .replace(/\s+/g, "-");
}

export function getMarkdownContent(mdPath: string): string {
  try {
    // Strip leading slash if present
    const cleanPath = mdPath.startsWith("/") ? mdPath.slice(1) : mdPath;
    const fullPath = path.join(process.cwd(), "public", cleanPath);

    if (!fs.existsSync(fullPath)) {
      console.error(`Markdown file not found at: ${fullPath}`);
      return "";
    }

    return fs.readFileSync(fullPath, "utf-8");
  } catch (error) {
    console.error(`Error reading markdown file at ${mdPath}:`, error);
    return "";
  }
}

export function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = markdown.split("\n");

  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Track code blocks so code comments like # or ## are ignored
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    // Match ## or ###
    const h2Match = trimmed.match(/^##\s+(.+)$/);
    const h3Match = trimmed.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].trim();
      headings.push({
        id: slugify(text),
        text,
        level: 2,
      });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      headings.push({
        id: slugify(text),
        text,
        level: 3,
      });
    }
  }

  return headings;
}
