# Reusing Styles & Components

## Introduction
Long class lists are fine when they live in one place. This lesson covers the right ways to avoid repetition in Tailwind: components first, then `@apply`, `@utility` and `@layer`, plus helpers for merging classes safely.

## Subtopics
- Extracting components (React, Vue, templates)
- `@apply` for small repeated patterns
- `@layer base` and `@layer components`
- Custom utilities with `@utility`
- Custom variants with `@custom-variant`
- `clsx` and `tailwind-merge` (`cn` helper)
- `class-variance-authority` for variants

## Syntax

```jsx
// 1. Component (preferred)
function Button({ children, className }) {
  return (
    <button className={`rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 ${className ?? ""}`}>
      {children}
    </button>
  );
}
```

```css
@import "tailwindcss";

/* 2. Base styles for plain elements */
@layer base {
  h1 { @apply text-4xl font-bold tracking-tight; }
}

/* 3. A small component class */
@layer components {
  .btn { @apply rounded-lg px-4 py-2 font-semibold; }
}

/* 4. A custom utility that supports variants (v4) */
@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

/* 5. A custom variant */
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

```js
// cn helper: conditional classes + conflict resolution
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs) => twMerge(clsx(inputs));

<button className={cn("px-4 py-2", isBig && "px-6 py-3", className)} />
```

- Components keep markup and styles together and are the best form of reuse.
- `@apply` inlines utilities into your own class — use sparingly.
- `@utility` registers a real utility that works with `hover:`, `md:`, etc.
- `twMerge` makes the *last* conflicting utility win (`px-4` + `px-6` → `px-6`).

## Important Properties

| Tool | Purpose | Syntax | Example |
|---|---|---|---|
| Component | Reuse markup + styles | function / partial | `<Button />` |
| `@apply` | Inline utilities in CSS | `@apply {utilities};` | `@apply p-4 rounded` |
| `@layer` | Control CSS ordering | `@layer components {}` | base / components |
| `@utility` | Define custom utility | `@utility name {}` | `scrollbar-hidden` |
| `cn()` | Merge classes | `cn(a, b)` | `clsx` + `twMerge` |
| `cva` | Variant APIs | `cva(base, {variants})` | button sizes |

## Common Use Cases
- **Beginner:** wrap a repeated button in a `Button` component.
- **Practical UI:** a `cn()` helper so components accept a `className` that can safely override defaults.
- **Real-world:** shadcn/ui-style components built from `cva` variants for size, color and state.

## Common Errors
1. ❌ Overusing `@apply` to rebuild Bootstrap-style classes → ✅ extract components instead; keep CSS for base styles and rare cases.
2. ❌ Passing `className="p-8"` to a component that already has `p-4` and seeing no change → ✅ merge with `twMerge`/`cn`.
3. ❌ Defining `.btn` outside a layer and having it override utilities → ✅ put it in `@layer components`.
4. ❌ Using `@apply` with a variant in a separate file without `@reference` → ✅ add `@reference "../app.css";` at the top of that stylesheet (or Vue/Svelte `<style>` block).

## Common Mistakes
- Creating abstractions too early, before the pattern repeats.
- Building a huge custom CSS layer that defeats utility-first benefits.
- Not documenting variants, so components grow inconsistent.
- Forgetting that `@apply` bakes values in at build time.

## Quick Reference
```jsx
import { cva } from "class-variance-authority";

const button = cva("rounded-lg font-semibold transition", {
  variants: {
    intent: { primary: "bg-indigo-600 text-white hover:bg-indigo-500", ghost: "hover:bg-slate-100" },
    size: { sm: "px-3 py-1 text-sm", md: "px-4 py-2" },
  },
  defaultVariants: { intent: "primary", size: "md" },
});

<button className={button({ intent: "ghost", size: "sm" })}>Cancel</button>
```
