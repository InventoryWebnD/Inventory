# Customization with @theme

## Introduction
Tailwind v4 is configured in CSS. The `@theme` directive defines design tokens — colors, fonts, spacing, breakpoints, shadows, animations — as CSS variables, and Tailwind automatically generates matching utilities for each one.

## Subtopics
- The `@theme` directive
- Theme variable namespaces (`--color-*`, `--font-*`, `--spacing`, `--breakpoint-*`)
- Adding custom colors and fonts
- Overriding or resetting the default theme
- `@theme inline` and referencing other variables
- Using theme variables in plain CSS (`var(--color-brand)`)
- Loading plugins with `@plugin`

## Syntax

```css
@import "tailwindcss";

@theme {
  /* new colors → bg-brand, text-brand, border-brand ... */
  --color-brand: #6d28d9;
  --color-brand-light: #a78bfa;

  /* new font → font-display */
  --font-display: "Bricolage Grotesque", sans-serif;

  /* new breakpoint → 3xl: */
  --breakpoint-3xl: 120rem;

  /* custom spacing base */
  --spacing: 0.25rem;
}

/* remove all default colors, keep only yours */
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-brand: #6d28d9;
}

@plugin "@tailwindcss/typography";
```

```html
<h1 class="font-display text-brand">Custom tokens</h1>
<div class="bg-brand-light/30 3xl:text-xl">Works with variants too</div>
```

```css
.hero { background: var(--color-brand); }   /* tokens are real CSS variables */
```

- A variable named `--color-brand` creates `bg-brand`, `text-brand`, `border-brand`, `ring-brand`, etc.
- `--color-*: initial;` clears a whole namespace before you define your own.
- `@theme inline` inlines values instead of referencing variables — useful when mapping to variables like `var(--background)`.
- `@plugin` loads official or community plugins.

## Important Properties

| Namespace | Generates | Syntax | Example |
|---|---|---|---|
| `--color-*` | Color utilities | `--color-name: value;` | `bg-brand` |
| `--font-*` | Font families | `--font-name: ...;` | `font-display` |
| `--breakpoint-*` | Responsive variants | `--breakpoint-3xl: 120rem;` | `3xl:flex` |
| `--spacing` | Spacing scale base | `--spacing: 0.25rem;` | `p-4` |
| `--shadow-*` | Shadows | `--shadow-glow: ...;` | `shadow-glow` |
| `--animate-*` | Animations | `--animate-wiggle: ...;` | `animate-wiggle` |

## Common Use Cases
- **Beginner:** add a brand color once and use it everywhere with `bg-brand`.
- **Practical UI:** register your Google Font as `--font-display` and apply it with `font-display`.
- **Real-world:** map semantic tokens (`--background`, `--primary`) to theme colors so light/dark themes change without touching markup.

## Common Errors
1. ❌ Creating `tailwind.config.js` and expecting v4 to read it automatically → ✅ prefer `@theme`; load a legacy config explicitly with `@config` if you must.
2. ❌ `@theme` placed inside a selector or media query → ✅ `@theme` must be at the top level.
3. ❌ Naming a color `--brand` and wondering why `bg-brand` does not exist → ✅ use the right namespace: `--color-brand`.
4. ❌ Referencing a runtime variable in `@theme` and getting the wrong value → ✅ use `@theme inline` for variable references.

## Common Mistakes
- Redefining every default instead of extending the ones you need.
- Using hex values throughout components instead of tokens.
- Forgetting that custom tokens are also usable in arbitrary CSS via `var(--…)`.
- Letting the theme grow without naming conventions.

## Quick Reference
```css
@import "tailwindcss";
@theme {
  --color-brand: #6d28d9;
  --font-display: "Inter", sans-serif;
  --animate-fade-up: fade-up .6s ease-out both;
  @keyframes fade-up { from { opacity: 0; translate: 0 1rem; } to { opacity: 1; translate: 0 0; } }
}
```
