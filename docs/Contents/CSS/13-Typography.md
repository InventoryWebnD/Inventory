# Typography

## Introduction
Typography properties control how text looks and reads: font family, size, weight, spacing, and alignment — key to readability and visual hierarchy.

## Subtopics
- `font-family` and font stacks / web fonts (`@font-face`)
- `font-size`, `font-weight`, `font-style`
- `line-height`
- `letter-spacing` / `word-spacing`
- `text-align`, `text-decoration`, `text-transform`
- `white-space` and text overflow (`text-overflow`, `overflow-wrap`)

## Syntax

```css
@font-face {
  font-family: "CustomFont";
  src: url("custom-font.woff2") format("woff2");
}

.text {
  font-family: "CustomFont", Arial, sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  font-style: italic;
  line-height: 1.6;
  letter-spacing: 0.5px;
  word-spacing: 2px;
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

- `font-family` — a prioritized list of fonts; the browser uses the first available one, ending with a generic fallback (`sans-serif`, `serif`, `monospace`).
- `@font-face` — defines a custom web font to load and use by name.
- `font-size` — text size; best set with `rem` for scalability.
- `font-weight` — thickness of characters (`normal` = 400, `bold` = 700, or numeric 100–900).
- `line-height` — vertical spacing between lines of text; unitless values scale with font-size.
- `letter-spacing`/`word-spacing` — adjusts spacing between characters/words.
- `text-align` — horizontal alignment of text (`left`, `center`, `right`, `justify`).
- `text-decoration` — adds/removes lines like underline, strikethrough.
- `text-transform` — changes casing (`uppercase`, `lowercase`, `capitalize`).
- `white-space: nowrap` + `overflow: hidden` + `text-overflow: ellipsis` — classic combo for single-line text truncation with "...".

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `font-family` | Typeface stack | `font-family: list;` | `font-family: Arial, sans-serif;` |
| `font-size` | Text size | `font-size: value;` | `font-size: 1rem;` |
| `font-weight` | Boldness | `font-weight: value;` | `font-weight: 700;` |
| `line-height` | Line spacing | `line-height: value;` | `line-height: 1.5;` |
| `text-align` | Horizontal alignment | `text-align: value;` | `text-align: center;` |
| `text-decoration` | Underline/strike/none | `text-decoration: value;` | `text-decoration: none;` |
| `text-transform` | Casing | `text-transform: value;` | `text-transform: uppercase;` |
| `text-overflow` | Truncation indicator | `text-overflow: value;` | `text-overflow: ellipsis;` |

## Common Use Cases
- **Beginner:** setting a readable `font-family` and `line-height` on `body`.
- **Practical UI:** styled buttons with `text-transform: uppercase` and `letter-spacing` for a polished look.
- **Real-world:** a card title with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` to truncate long titles gracefully in a fixed-width layout.

## Common Errors
1. ❌ `font-family: Arial;` with no fallback → ✅ `font-family: Arial, Helvetica, sans-serif;` — always include a generic fallback in case the primary font fails to load.
2. ❌ `line-height: 20px;` across varying font sizes causing cramped or excessive spacing → ✅ use a unitless value like `line-height: 1.5;` so it scales with font-size.
3. ❌ `text-overflow: ellipsis;` alone without `white-space: nowrap` and `overflow: hidden` → ✅ all three properties are required together for the ellipsis effect to work.
4. ❌ `font-weight: heavy;` (invalid keyword) → ✅ use valid values like `bold` or numeric `700`.
5. ❌ Custom font not displaying because `@font-face` `src` path is wrong or format mismatched → ✅ verify the file path and `format()` hint match the actual font file type (e.g., `woff2`).

## Common Mistakes
- Forgetting a fallback generic font family.
- Using pixel `line-height` instead of unitless values.
- Applying only one of the three properties needed for text truncation.
- Overusing multiple font weights/styles, hurting page load performance.

## Quick Reference
```css
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
