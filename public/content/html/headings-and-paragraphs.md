# Headings & Paragraphs

## Introduction

Headings and paragraphs are the backbone of textual content in HTML. Headings (`<h1>`–`<h6>`) create a hierarchical outline of a page, while paragraphs (`<p>`) group related sentences into readable blocks. Used correctly, they improve readability, SEO, and accessibility for screen-reader users.

## Subtopics

- Heading levels `<h1>` to `<h6>`
- Document outline / heading hierarchy rules
- The `<p>` paragraph element
- Line breaks with `<br>`
- Thematic breaks with `<hr>`
- Text-level semantics: `<strong>`, `<em>`, `<small>`, `<mark>`, `<abbr>`, `<sub>`, `<sup>`
- Block quotations with `<blockquote>` and `<cite>`
- Preformatted text with `<pre>`
- Accessibility of headings (one `<h1>` per page, no skipped levels)
- SEO relevance of heading structure

## Syntax

### 1. Basic Headings

```html
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Minor Heading</h4>
<h5>Smaller Heading</h5>
<h6>Smallest Heading</h6>
```

- `<h1>` through `<h6>` — Six levels of headings, `<h1>` being the most important (largest, top of hierarchy) and `<h6>` the least. Browsers render them in decreasing font size by default, but their real purpose is **structural**, not visual.

### 2. Paragraphs

```html
<p>This is a paragraph of text. It can contain multiple sentences that are grouped together as one logical block.</p>
<p>This is a second, separate paragraph.</p>
```

- `<p>` — Defines a paragraph. Browsers automatically add margin space above and below each `<p>`.

### 3. Line Breaks and Horizontal Rules

```html
<p>Roses are red<br>Violets are blue</p>
<hr>
```

- `<br>` — Inserts a single line break *within* a block of text (a "void" element with no closing tag). Use sparingly; it should not be used to create paragraph spacing.
- `<hr>` — Represents a thematic break (e.g., a scene change or topic shift), rendered as a horizontal line.

### 4. Inline Text Semantics

```html
<p><strong>Warning:</strong> This action cannot be undone.</p>
<p>The word <em>really</em> is emphasized here.</p>
<p><small>Terms and conditions apply.</small></p>
<p>Search results for <mark>HTML</mark> tutorials.</p>
<p><abbr title="HyperText Markup Language">HTML</abbr> is the standard markup language.</p>
<p>E = mc<sup>2</sup> and H<sub>2</sub>O</p>
```

- `<strong>` — Marks text of strong importance (rendered bold; also carries semantic weight for screen readers).
- `<em>` — Marks stress emphasis (rendered italic).
- `<small>` — Represents side comments/fine print.
- `<mark>` — Highlights text relevant to the current context.
- `<abbr title="...">` — Marks an abbreviation; the `title` attribute provides the full expansion on hover.
- `<sup>` / `<sub>` — Superscript and subscript text.

### 5. Blockquotes and Citations

```html
<blockquote cite="https://example.com/source">
  <p>The only limit to our realization of tomorrow is our doubts of today.</p>
  <footer>— <cite>Franklin D. Roosevelt</cite></footer>
</blockquote>
```

- `<blockquote cite="URL">` — Denotes an extended quotation from another source; `cite` (attribute) holds the source URL.
- `<cite>` — Marks the title of a creative work being referenced (e.g., a book, speech, or article).

### 6. Preformatted Text

```html
<pre>
function greet() {
  console.log("Hello");
}
</pre>
```

- `<pre>` — Preserves whitespace and line breaks exactly as written, commonly used for code blocks.

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<h1>`–`<h6>` | Section headings, hierarchy | `<h1>Text</h1>` | `<h1>Welcome</h1>` |
| `<p>` | Paragraph block | `<p>Text</p>` | `<p>Hello world.</p>` |
| `<br>` | Line break | `<br>` | `Line1<br>Line2` |
| `<hr>` | Thematic break | `<hr>` | `<hr>` |
| `<strong>` | Strong importance | `<strong>Text</strong>` | `<strong>Danger</strong>` |
| `<em>` | Emphasis | `<em>Text</em>` | `<em>very</em>` |
| `<abbr title="">` | Abbreviation with tooltip | `<abbr title="full form">ABBR</abbr>` | `<abbr title="World Wide Web">WWW</abbr>` |
| `<blockquote cite="">` | Long quotation | `<blockquote cite="url">Text</blockquote>` | `<blockquote cite="https://x.com">Quote</blockquote>` |
| `<cite>` | Work title reference | `<cite>Text</cite>` | `<cite>The Odyssey</cite>` |
| `<pre>` | Preformatted text | `<pre>Text</pre>` | `<pre>  spaced  text</pre>` |
| `<mark>` | Highlighted text | `<mark>Text</mark>` | `<mark>result</mark>` |

## Common Use Cases

- **Beginner example:** A simple page with one `<h1>` title and a few `<p>` paragraphs describing "About Me."
- **Practical website example:** A blog article using `<h1>` for the article title, `<h2>` for each section, `<h3>` for sub-sections, and `<blockquote>` to cite an external source.
- **Real-world implementation:** A news homepage where each article card uses a single logical heading level (e.g., `<h2>` for headline), consistent paragraph structure for previews, and `<abbr>`/`<time>`-style semantics for accessibility and SEO crawlers.

## Common Errors

1. ❌
```html
<h3>Page Title</h3>
<h1>Section</h1>
```
**Why it's wrong:** Skipping/reversing heading order breaks the logical document outline; `<h1>` should typically come first, and levels shouldn't jump arbitrarily.
✅
```html
<h1>Page Title</h1>
<h2>Section</h2>
```
**Explanation:** Headings should descend in order (`h1` → `h2` → `h3`) to preserve a clear, accessible hierarchy.

2. ❌
```html
<h2>Big Text</h2>
```
used only because it "looks bigger" than a paragraph.
**Why it's wrong:** Using headings purely for visual styling instead of structural meaning confuses screen readers and SEO crawlers.
✅
```html
<p style="font-size: 1.5em; font-weight: bold;">Big Text</p>
```
**Explanation:** If it's not really a section heading, style a paragraph with CSS instead of misusing heading tags.

3. ❌
```html
<p>First line<p>Second line</p>
```
**Why it's wrong:** The first `<p>` is never closed before the second one opens, creating invalid nested/malformed markup.
✅
```html
<p>First line</p>
<p>Second line</p>
```
**Explanation:** Every `<p>` must be properly closed before starting a new one.

4. ❌
```html
<p>Address:<br><br><br>123 Main Street</p>
```
**Why it's wrong:** Using multiple `<br>` tags to create vertical spacing is a misuse of semantic markup; spacing should be controlled with CSS.
✅
```html
<p>Address:<br>123 Main Street</p>
<style>p { margin-bottom: 1em; }</style>
```
**Explanation:** `<br>` is for genuine line breaks within content (like an address), not for layout spacing.

5. ❌
```html
<h1>Home</h1>
<h1>About</h1>
<h1>Contact</h1>
```
**Why it's wrong:** Using multiple `<h1>` elements as generic section titles removes the single, clear top-level heading a page should have (in most page-level contexts, one `<h1>` best represents the main topic).
✅
```html
<h1>My Portfolio</h1>
<h2>About</h2>
<h2>Contact</h2>
```
**Explanation:** Keep one primary `<h1>` describing the page's main subject, with `<h2>` for major sections.

6. ❌
```html
<strong>This whole paragraph of text is wrapped only for bold styling, with no real semantic importance intended by the author at all.</strong>
```
**Why it's wrong:** Overusing `<strong>` for large blocks dilutes its semantic meaning of "importance" and is disorienting for screen reader users.
✅
```html
<p>This paragraph has <strong>one key phrase</strong> that truly matters.</p>
```
**Explanation:** Reserve `<strong>`/`<em>` for meaningful emphasis, not entire blocks of text.

## Common Mistakes

- Choosing heading levels based on font size rather than document structure.
- Forgetting to close `<p>` tags, causing invalid nesting.
- Overusing `<br>` instead of proper paragraph or CSS spacing.
- Using `<b>`/`<i>` (purely visual) when `<strong>`/`<em>` (semantic) are more appropriate.
- Nesting block-level elements like `<div>` or another `<p>` inside a `<p>` (not allowed).
- Forgetting the `title` attribute on `<abbr>`, losing its accessibility benefit.

## Quick Reference

```html
<h1>Main Title</h1>
<h2>Section</h2>
<p>Paragraph text with <strong>bold importance</strong> and <em>emphasis</em>.</p>
<hr>
<blockquote cite="url"><p>Quoted text</p></blockquote>
<pre>preformatted text</pre>
```

| Tag | Use |
|---|---|
| `h1`–`h6` | Headings, one logical hierarchy |
| `p` | Paragraph text |
| `br` | Single line break |
| `hr` | Thematic break |
| `strong` / `em` | Semantic bold / italic |
| `blockquote` / `cite` | Quotations |
| `pre` | Preformatted / code text |
