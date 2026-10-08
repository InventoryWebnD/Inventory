# Layout & Positioning

## Introduction
Before reaching for flexbox or grid, you need Tailwind's core layout utilities: `display`, `position`, `z-index`, overflow and visibility. They decide how elements flow, stack and overlap on the page.

## Subtopics
- Display: `block`, `inline-block`, `hidden`, `flex`, `grid`
- Position: `static`, `relative`, `absolute`, `fixed`, `sticky`
- Offsets: `top-*`, `inset-*`, `start-*`
- Stacking with `z-*`
- Overflow and scrolling
- `container` utility
- Floating and columns (`columns-*`)

## Syntax

```html
<div class="hidden md:block">Visible from md up</div>

<div class="relative">
  <span class="absolute top-2 right-2">Badge</span>
</div>

<header class="sticky top-0 z-50 bg-white">Sticky header</header>

<div class="fixed inset-x-0 bottom-0">Bottom bar</div>

<div class="absolute inset-0 grid place-items-center">Perfectly centered</div>

<div class="max-h-64 overflow-y-auto">Scrollable area</div>

<div class="columns-3 gap-6">Newspaper-style columns</div>
```

- `absolute` positions relative to the nearest `relative` ancestor.
- `inset-0` = `top:0; right:0; bottom:0; left:0`.
- `sticky top-0` sticks the element when scrolling past it.
- `z-10`, `z-50` control stacking order (only affects positioned elements).
- `container` sets `max-width` at each breakpoint (center it with `mx-auto`).

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `block` / `hidden` | Display value | `{display}` | `hidden` |
| `relative` / `absolute` | Positioning | `{position}` | `absolute` |
| `inset-*` | All offsets | `inset-{n}` | `inset-0` |
| `z-*` | Stack order | `z-{n}` | `z-50` |
| `overflow-*` | Overflow | `overflow-{value}` | `overflow-hidden` |
| `container` | Responsive max-width | `container mx-auto` | page wrapper |

## Common Use Cases
- **Beginner:** show or hide content with `hidden` and `md:block`.
- **Practical UI:** place a notification dot on an avatar with `relative` parent + `absolute` child.
- **Real-world:** a sticky site header with `sticky top-0 z-50 backdrop-blur`.

## Common Errors
1. ❌ `absolute` child escaping to the page corner → ✅ add `relative` to the intended parent.
2. ❌ `z-50` having no effect → ✅ the element needs a position (`relative`, `absolute`, `fixed`, `sticky`) — flex/grid children are also affected by `z`.
3. ❌ `sticky` doing nothing → ✅ give it `top-0` (or another offset) and make sure no ancestor has `overflow: hidden`.
4. ❌ `container` not centered → ✅ use `container mx-auto px-4`.

## Common Mistakes
- Overusing `absolute` for layouts that flex or grid solve more cleanly.
- Giant z-index values such as `z-[99999]` instead of a small consistent scale.
- Hiding important content with `hidden` and leaving screen-reader users without it (use `sr-only` for visually hidden text).
- Forgetting mobile when using `fixed` elements that can cover content.

## Quick Reference
```html
<div class="relative h-64 overflow-hidden rounded-xl">
  <img class="absolute inset-0 size-full object-cover" src="/photo.jpg" alt="" />
  <div class="absolute inset-x-0 bottom-0 bg-black/50 p-4 text-white">Caption</div>
</div>
```
