# Introduction & Setup

## Introduction
Tailwind CSS is a utility-first CSS framework: instead of writing custom CSS classes, you compose small single-purpose classes like `flex`, `p-4`, and `text-center` directly in your HTML. Tailwind v4 scans your files, generates only the CSS you actually use, and is configured from CSS rather than a JavaScript file.

## Subtopics
- What "utility-first" means
- Installing Tailwind v4 with Vite
- Installing Tailwind v4 with PostCSS (Next.js)
- The `@import "tailwindcss"` entry point
- Automatic content detection
- Using the Play CDN for quick experiments
- Editor setup (IntelliSense and Prettier plugin)

## Syntax

```bash
# Vite
npm install tailwindcss @tailwindcss/vite

# Next.js / PostCSS
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

```css
/* src/index.css */
@import "tailwindcss";
```

```html
<h1 class="text-3xl font-bold text-sky-600 underline">Hello, Tailwind!</h1>
```

- `@import "tailwindcss";` — one line that pulls in Tailwind's base, components and utilities layers.
- `@tailwindcss/vite` — the first-party Vite plugin (fastest option for Vite projects).
- `@tailwindcss/postcss` — the PostCSS plugin used by Next.js and other PostCSS setups.
- Class names are detected automatically; there is no `content` array to maintain in v4.

## Important Properties

| Concept | Purpose | Syntax | Example |
|---|---|---|---|
| Utility class | One class, one CSS declaration | `class="utility"` | `class="p-4"` |
| `@import "tailwindcss"` | Loads Tailwind | `@import "tailwindcss";` | in your main CSS file |
| Preflight | Built-in CSS reset | automatic | removes default margins |
| Play CDN | No-build prototyping | `<script src="https://cdn.tailwindcss.com">` | quick demos only |
| `@source` | Add extra files to scan | `@source "../node_modules/lib";` | scan a UI library |

## Common Use Cases
- **Beginner:** style a button with `class="bg-sky-600 text-white px-4 py-2 rounded"` without opening a CSS file.
- **Practical UI:** build a responsive navbar, card or form by combining utilities straight in JSX or HTML.
- **Real-world:** ship a production site where the generated CSS is only a few kilobytes because unused utilities are never emitted.

## Common Errors
1. ❌ Forgetting `@import "tailwindcss";` in the CSS file → ✅ add it and make sure that CSS file is imported by your app entry.
2. ❌ Using the old `@tailwind base; @tailwind components; @tailwind utilities;` directives in v4 → ✅ replace them with the single `@import "tailwindcss";`.
3. ❌ Building class names dynamically like `` `text-${color}-500` `` → ✅ write complete class names (`text-red-500`) so the scanner can find them.
4. ❌ Installing `tailwindcss` but not the Vite/PostCSS plugin → ✅ install `@tailwindcss/vite` or `@tailwindcss/postcss` and register it.
5. ❌ Shipping the Play CDN to production → ✅ use the build tooling; the CDN is for prototypes only.

## Common Mistakes
- Mixing v3 configuration habits (`tailwind.config.js`, `content` arrays) into a v4 project.
- Expecting Preflight to keep browser default heading sizes and list bullets.
- Not installing editor IntelliSense, which makes class names much harder to discover.
- Treating utility classes as "inline styles" — they support states, breakpoints and themes that inline styles cannot.

## Quick Reference
```css
@import "tailwindcss";
```
```html
<button class="rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700">
  Save
</button>
```
