# Types

## Introduction
CSS can be applied in three ways: inline, internal, and external. Each has different scope, priority, and use cases.

## Subtopics
- Inline CSS
- Internal CSS
- External CSS
- Cascade & specificity of each type
- `!important`

## Syntax

**Inline** — written directly on an element via `style` attribute:
```html
<p style="color: red;">Text</p>
```

**Internal** — inside a `<style>` tag in `<head>`:
```html
<style>
  p { color: blue; }
</style>
```

**External** — separate `.css` file linked via `<link>`:
```html
<link rel="stylesheet" href="styles.css">
```
```css
/* styles.css */
p { color: green; }
```

## Important Properties

| Type | Purpose | Syntax | Example |
|---|---|---|---|
| Inline | Highest priority, single element | `style="prop: val;"` | `<div style="margin:0;">` |
| Internal | Page-scoped styles | `<style>...</style>` | `<style>body{margin:0;}</style>` |
| External | Reusable across pages | `<link rel="stylesheet" href="">` | `<link rel="stylesheet" href="main.css">` |
| `!important` | Overrides cascade | `prop: val !important;` | `color: red !important;` |

## Common Use Cases
- **Beginner:** quick inline color test on one element.
- **Practical UI:** internal `<style>` for a single landing page.
- **Real-world:** external stylesheet shared across an entire site.

## Common Errors
1. ❌ `<p style="color: red">` (missing semicolon before closing quote is fine, but multiple props need `;` between them) → ✅ `<p style="color:red; font-size:14px;">` — separate declarations with `;`.
2. ❌ `<style> p { color: blue }</style>` placed in `<body>` → ✅ place `<style>` inside `<head>` for valid, predictable parsing.
3. ❌ Forgetting `rel="stylesheet"` on `<link>` → ✅ `<link rel="stylesheet" href="style.css">` — required for browser to treat it as CSS.
4. ❌ Overusing `!important` everywhere → ✅ use specific selectors instead; reserve `!important` for rare overrides.
5. ❌ Linking a `.css` file with wrong path (`href="style.css"` when file is in `/css/`) → ✅ `href="css/style.css"`.

## Common Mistakes
- Relying on inline styles for large projects (hard to maintain).
- Forgetting external CSS load order affects the cascade.
- Mixing too many `!important` declarations, breaking maintainability.

## Quick Reference
```html
<p style="color:red;">Inline</p>
<style>p{color:blue;}</style>
<link rel="stylesheet" href="styles.css">
```
Priority: Inline > Internal/External (by source order) > Browser default.
