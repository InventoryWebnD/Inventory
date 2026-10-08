# Typography

## Introduction
Tailwind gives you utilities for font size, weight, line height, spacing, alignment and decoration, so you can set up a complete type system without writing CSS.

## Subtopics
- Font size: `text-sm`, `text-xl`, `text-4xl`
- Font weight: `font-light` to `font-black`
- Font family: `font-sans`, `font-serif`, `font-mono`
- Line height and letter spacing: `leading-*`, `tracking-*`
- Text alignment, transform and decoration
- Truncating and clamping text
- The `@tailwindcss/typography` plugin (`prose`)

## Syntax

```html
<h1 class="text-4xl font-extrabold tracking-tight">Big heading</h1>
<p class="text-base leading-7 text-slate-600">Readable paragraph text.</p>
<p class="text-sm font-medium uppercase tracking-widest">Label</p>
<p class="truncate">A very long line that gets cut with an ellipsis…</p>
<p class="line-clamp-3">Only three lines are shown, then it adds an ellipsis.</p>
<code class="font-mono text-sm">npm run dev</code>
<a class="underline decoration-sky-500 underline-offset-4" href="#">Link</a>

<article class="prose lg:prose-lg dark:prose-invert">
  <!-- markdown / CMS content -->
</article>
```

- `text-xl` sets font-size and a matching line-height.
- `text-xl/8` sets font-size and an explicit line-height in one class.
- `truncate` = overflow hidden + ellipsis + no-wrap; `line-clamp-N` limits multi-line text.
- `prose` styles raw HTML you cannot add classes to (needs `@plugin "@tailwindcss/typography";`).

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `text-*` | Font size | `text-{size}` | `text-2xl` |
| `font-*` | Weight / family | `font-{weight}` | `font-semibold` |
| `leading-*` | Line height | `leading-{n}` | `leading-relaxed` |
| `tracking-*` | Letter spacing | `tracking-{size}` | `tracking-tight` |
| `text-left/center/right` | Alignment | `text-{align}` | `text-center` |
| `uppercase` etc. | Text transform | `uppercase` | `capitalize` |
| `line-clamp-*` | Limit lines | `line-clamp-{n}` | `line-clamp-2` |

## Common Use Cases
- **Beginner:** create a heading with `text-3xl font-bold` and body copy with `text-slate-600`.
- **Practical UI:** show card descriptions with `line-clamp-2` so all cards stay the same height.
- **Real-world:** wrap blog or markdown content in `prose` to get beautiful default typography instantly.

## Common Errors
1. ❌ `text-bold` or `text-center-xl` → ✅ weight is `font-bold`; size is `text-xl`; alignment is `text-center`.
2. ❌ Using `prose` without installing the typography plugin → ✅ add `@plugin "@tailwindcss/typography";` to your CSS.
3. ❌ `truncate` on a flex child that still overflows → ✅ add `min-w-0` to the flex child.
4. ❌ Dark text inside `prose` on a dark background → ✅ add `dark:prose-invert`.

## Common Mistakes
- Using headings only for their size instead of their meaning (choose the right `<h*>` then style it).
- Very long lines of text; limit width with `max-w-prose`.
- Tiny text with poor contrast.
- Forgetting that Preflight removes default heading sizes, so every heading needs explicit utilities.

## Quick Reference
```html
<article class="mx-auto max-w-prose">
  <h1 class="text-4xl font-bold tracking-tight">Title</h1>
  <p class="mt-4 text-lg leading-8 text-slate-600">Intro paragraph.</p>
</article>
```
