# Grid

## Introduction
Tailwind's grid utilities let you build two-dimensional layouts with a single line: define columns with `grid-cols-*`, space them with `gap-*`, and make items span multiple tracks with `col-span-*`.

## Subtopics
- `grid` and `inline-grid`
- Columns and rows: `grid-cols-*`, `grid-rows-*`
- Spanning: `col-span-*`, `row-span-*`
- Gap: `gap-*`, `gap-x-*`, `gap-y-*`
- Auto-fit responsive grids with arbitrary values
- Alignment: `place-items-*`, `place-content-*`
- Auto flow and dense packing

## Syntax

```html
<div class="grid grid-cols-3 gap-4">
  <div>1</div><div>2</div><div>3</div>
</div>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <div>Card</div><div>Card</div><div>Card</div><div>Card</div>
</div>

<div class="grid grid-cols-12 gap-4">
  <aside class="col-span-12 md:col-span-3">Sidebar</aside>
  <main class="col-span-12 md:col-span-9">Content</main>
</div>

<div class="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6">
  <div>Auto-fit card</div>
</div>

<div class="grid min-h-screen place-items-center">Centered</div>
```

- `grid-cols-3` = `repeat(3, minmax(0, 1fr))`.
- `col-span-2` makes an item span two columns; `col-span-full` spans all.
- `grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]` makes a grid that adds/removes columns by itself — no breakpoints needed.
- `place-items-center` centers items horizontally and vertically.

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `grid-cols-*` | Number of columns | `grid-cols-{n}` | `grid-cols-3` |
| `grid-rows-*` | Number of rows | `grid-rows-{n}` | `grid-rows-2` |
| `col-span-*` | Span columns | `col-span-{n}` | `col-span-2` |
| `gap-*` | Spacing | `gap-{n}` | `gap-6` |
| `place-items-*` | Center items | `place-items-center` | one-line centering |
| `auto-rows-*` | Implicit row size | `auto-rows-fr` | equal-height rows |

## Common Use Cases
- **Beginner:** a three-column card grid with `grid grid-cols-3 gap-4`.
- **Practical UI:** responsive gallery using `grid-cols-2 md:grid-cols-4`.
- **Real-world:** 12-column page layout with a sidebar and content column.

## Common Errors
1. ❌ `grid-cols-3` on mobile causing tiny squashed cards → ✅ start with `grid-cols-1` and add `sm:`/`md:` columns.
2. ❌ `col-span-3` in a 2-column grid creating extra implicit columns → ✅ keep the span within the declared column count.
3. ❌ `gap-4` forgotten and items touching → ✅ always set a gap on the grid container.
4. ❌ Children with long content blowing out the grid → ✅ add `min-w-0` to the child.

## Common Mistakes
- Using grid for simple one-dimensional rows where flex is lighter.
- Hard-coding pixel widths instead of `fr`/`minmax()`.
- Forgetting the mobile-first order of breakpoints.
- Not using `auto-fit` for card layouts that need to adapt to any width.

## Quick Reference
```html
<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-xl border p-6">One</article>
  <article class="rounded-xl border p-6">Two</article>
  <article class="rounded-xl border p-6">Three</article>
</section>
```
