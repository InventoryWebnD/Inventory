# Flexbox

## Introduction
Flexbox in Tailwind is a handful of intuitive classes that arrange items in a row or column, align them, space them out and let them grow or shrink. It is the go-to tool for navbars, toolbars, cards and any one-dimensional layout.

## Subtopics
- `flex`, `inline-flex`
- Direction: `flex-row`, `flex-col`, `flex-row-reverse`
- Wrapping: `flex-wrap`
- Main-axis alignment: `justify-*`
- Cross-axis alignment: `items-*`, `self-*`
- Gap: `gap-*`
- Grow / shrink / basis: `flex-1`, `grow`, `shrink-0`, `basis-*`
- `order-*`

## Syntax

```html
<nav class="flex items-center justify-between gap-4">
  <a href="/">Logo</a>
  <ul class="flex gap-6">
    <li>Home</li>
    <li>Docs</li>
  </ul>
</nav>

<div class="flex flex-col gap-4 sm:flex-row">
  <div class="flex-1">Grows</div>
  <div class="w-48 shrink-0">Fixed</div>
</div>

<div class="flex flex-wrap gap-2">
  <span>Tag</span><span>Tag</span><span>Tag</span>
</div>

<div class="flex h-screen items-center justify-center">Centered</div>
```

- `justify-*` works on the main axis (`start`, `center`, `end`, `between`, `around`, `evenly`).
- `items-*` works on the cross axis (`start`, `center`, `end`, `stretch`, `baseline`).
- `flex-1` = `flex: 1 1 0%` — fill the remaining space.
- `shrink-0` stops an item from being squeezed.

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `flex` | Create a flex container | `flex` | `flex gap-4` |
| `flex-col` | Column direction | `flex-col` | mobile stack |
| `justify-*` | Main-axis alignment | `justify-{value}` | `justify-between` |
| `items-*` | Cross-axis alignment | `items-{value}` | `items-center` |
| `flex-1` | Fill space | `flex-1` | main column |
| `shrink-0` | Prevent shrinking | `shrink-0` | icon / avatar |
| `flex-wrap` | Wrap items | `flex-wrap` | tag lists |

## Common Use Cases
- **Beginner:** center anything with `flex items-center justify-center`.
- **Practical UI:** a navbar with logo on the left and links on the right using `justify-between`.
- **Real-world:** responsive stack-to-row layouts with `flex-col md:flex-row`.

## Common Errors
1. ❌ `justify-center` having no vertical effect → ✅ vertical centering in a row uses `items-center`, and the container needs a height.
2. ❌ Children shrinking an image or icon → ✅ add `shrink-0` to the child.
3. ❌ Long text overflowing a flex child → ✅ add `min-w-0` (and `truncate`) so it can shrink.
4. ❌ Forgetting `flex` on the parent and using `justify-*` → ✅ these classes only work on flex/grid containers.

## Common Mistakes
- Using margins for spacing instead of `gap`.
- Reaching for `absolute` positioning for things flexbox does easily.
- Not making the layout mobile-first (`flex-col` then `md:flex-row`).
- Mixing up the main and cross axes after changing `flex-direction`.

## Quick Reference
```html
<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <h2 class="text-xl font-bold">Dashboard</h2>
  <button class="rounded bg-indigo-600 px-4 py-2 text-white">New</button>
</div>
```
