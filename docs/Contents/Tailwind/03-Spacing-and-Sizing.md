# Spacing & Sizing

## Introduction
Tailwind uses one spacing scale for padding, margin, gap, width, height and more. Learning that scale and a handful of sizing helpers lets you build consistent layouts quickly.

## Subtopics
- The spacing scale (`1` = 0.25rem)
- Padding: `p-*`, `px-*`, `py-*`, `pt-*`
- Margin: `m-*`, `mx-auto`, negative margins
- `space-x-*` and `space-y-*`
- Width and height: `w-*`, `h-*`, `size-*`
- Fractions, `full`, `screen`, `min-*`, `max-*`
- Container and `max-w-*` for readable widths

## Syntax

```html
<div class="p-4 px-6 mt-8 mb-2">Padding and margin</div>

<div class="mx-auto max-w-3xl px-4">Centered container</div>

<div class="flex flex-col space-y-4">
  <p>One</p>
  <p>Two</p>
</div>

<img class="size-16 rounded-full" src="/avatar.png" alt="" />
<div class="w-1/2 min-h-screen max-w-prose"></div>
<div class="-mt-4">Negative margin</div>
```

- `p-4` → `padding: 1rem`; `px` = left/right, `py` = top/bottom.
- `mx-auto` centers a block that has a width or `max-width`.
- `size-16` sets width and height together (`4rem`).
- `w-1/2` = 50%, `w-full` = 100%, `w-screen` = 100vw, `min-h-screen` = at least the viewport height.
- `-mt-4` flips the sign for negative margins.

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `p-*` | Padding | `p-{n}` | `p-6` |
| `m-*` | Margin | `m-{n}` | `mt-4` |
| `gap-*` | Gap in flex/grid | `gap-{n}` | `gap-3` |
| `space-y-*` | Vertical spacing between children | `space-y-{n}` | `space-y-4` |
| `w-*` / `h-*` | Width / height | `w-{n}` | `w-64` |
| `size-*` | Width and height | `size-{n}` | `size-10` |
| `max-w-*` | Maximum width | `max-w-{size}` | `max-w-xl` |

## Common Use Cases
- **Beginner:** add breathing room with `p-4` on cards and `mt-4` between sections.
- **Practical UI:** center page content using `mx-auto max-w-5xl px-4 sm:px-6`.
- **Real-world:** make a square avatar and an icon button with `size-10` instead of repeating `w-10 h-10`.

## Common Errors
1. ❌ `mx-auto` on an element with no width → ✅ add `max-w-*` or `w-*` so there is free space to distribute.
2. ❌ Using `space-y-4` on a flex/grid layout with wrapping → ✅ prefer `gap-4`, which works for both axes and wrapped rows.
3. ❌ `w-100` expecting 100 pixels → ✅ the number is a scale step, use `w-[100px]` or a scale value like `w-24`.
4. ❌ `h-screen` on mobile cutting off content behind browser bars → ✅ use `min-h-dvh` or `h-dvh`.

## Common Mistakes
- Setting fixed heights where `min-h-*` would let content grow.
- Mixing many different spacing values instead of sticking to a few scale steps.
- Forgetting that `gap` belongs on the container, not the children.
- Using `margin` for separation inside flex/grid when `gap` is cleaner.

## Quick Reference
```html
<section class="mx-auto max-w-5xl px-4 py-12">
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="p-6">Item</div>
    <div class="p-6">Item</div>
  </div>
</section>
```
