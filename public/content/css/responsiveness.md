# Responsiveness

## Introduction
Responsive CSS makes layouts adapt gracefully across screen sizes and devices, primarily through **media queries**, flexible units, and fluid layout techniques.

## Subtopics
- Mobile-first vs desktop-first approach
- `@media` queries: `min-width`, `max-width`
- Combining conditions (`and`, comma for `or`)
- `prefers-color-scheme` media feature
- Fluid layouts with `%`, `clamp()`, Flexbox/Grid
- The viewport meta tag (HTML) as a prerequisite

## Syntax

```css
/* Mobile-first: base styles for small screens, then scale up */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}

/* Desktop-first alternative using max-width */
@media (max-width: 600px) {
  .nav { flex-direction: column; }
}

/* Combining conditions */
@media (min-width: 600px) and (max-width: 900px) {
  .sidebar { display: none; }
}

/* Multiple queries (OR) */
@media (max-width: 480px), (orientation: portrait) {
  .banner { font-size: 1rem; }
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body { background: #111; color: #eee; }
}
```

- `@media (min-width: Npx) { }` — applies styles when viewport width is **at least** N (common in mobile-first design).
- `@media (max-width: Npx) { }` — applies styles when viewport width is **at most** N (common in desktop-first design).
- `and` — combines multiple conditions that must all be true.
- Comma-separated queries — act as an "or," applying if any listed condition matches.
- `prefers-color-scheme` — detects the user's OS-level light/dark mode preference.
- Fluid techniques (`%`, `clamp()`, Flexbox, Grid `auto-fit`) reduce reliance on breakpoints entirely.

## Important Properties

| Feature | Purpose | Syntax | Example |
|---|---|---|---|
| `@media (min-width)` | Apply above a width | `@media (min-width: Npx){}` | `@media (min-width: 768px){}` |
| `@media (max-width)` | Apply below a width | `@media (max-width: Npx){}` | `@media (max-width: 600px){}` |
| `and` | Combine conditions | `(cond) and (cond)` | `(min-width:600px) and (max-width:900px)` |
| `,` | OR combination | `query, query` | `(max-width:480px), (orientation:portrait)` |
| `prefers-color-scheme` | Dark/light mode detection | `(prefers-color-scheme: value)` | `(prefers-color-scheme: dark)` |

## Common Use Cases
- **Beginner:** stacking a two-column layout into one column below 600px using `max-width`.
- **Practical UI:** a mobile-first navbar that starts as a stacked column and switches to a horizontal row at `min-width: 768px`.
- **Real-world:** a full design system supporting multiple breakpoints (mobile/tablet/desktop) plus `prefers-color-scheme` for automatic dark mode, combined with `clamp()` typography to minimize the number of breakpoints needed.

## Common Errors
1. ❌ Forgetting the HTML viewport meta tag, causing media queries to behave incorrectly on mobile → ✅ ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` exists in the document head.
2. ❌ Mixing mobile-first (`min-width`) and desktop-first (`max-width`) queries inconsistently across the same project → ✅ pick one strategy (commonly mobile-first) and apply it consistently.
3. ❌ `@media (min-width: 768px)` `{ .container { width: 750px; } }` placed *before* the base mobile styles in the stylesheet → ✅ base/mobile styles should come first, with larger-breakpoint overrides listed after, so the cascade applies correctly.
4. ❌ `@media (min-width: 768px), (max-width: 1024px)` intending "between" but writing an OR by mistake → ✅ use `and` for a range: `@media (min-width: 768px) and (max-width: 1024px)`.
5. ❌ Using only `px` breakpoints without testing real device widths, causing awkward layout breaks → ✅ test at common breakpoints (480px, 768px, 1024px, 1280px) and adjust based on actual content needs, not arbitrary numbers.

## Common Mistakes
- Forgetting the viewport meta tag in HTML.
- Mixing mobile-first and desktop-first strategies inconsistently.
- Wrong cascade order causing overrides not to apply.
- Using comma (OR) when a range (AND) was intended.
- Relying solely on media queries instead of combining with fluid units (`%`, `clamp()`, `fr`).

## Quick Reference
```css
/* Mobile-first pattern */
.el { font-size: 1rem; }

@media (min-width: 600px) { .el { font-size: 1.125rem; } }
@media (min-width: 900px) { .el { font-size: 1.25rem; } }

@media (prefers-color-scheme: dark) {
  body { background: #111; }
}
```
