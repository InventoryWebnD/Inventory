# Flexbox

## Introduction
Flexbox is a one-dimensional layout system for arranging items in a row or column, distributing space, and aligning content — ideal for navbars, cards, and centering.

## Subtopics
- `display: flex` container setup
- Main axis vs cross axis, `flex-direction`
- `justify-content` (main axis alignment)
- `align-items` / `align-content` (cross axis alignment)
- `flex-wrap`
- Item properties: `flex-grow`, `flex-shrink`, `flex-basis`, `flex` shorthand
- `gap`
- `align-self`
- `order`

## Syntax

```css
.container {
  display: flex;
  flex-direction: row;         /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;             /* nowrap | wrap | wrap-reverse */
  justify-content: space-between; /* main-axis alignment */
  align-items: center;         /* cross-axis alignment */
  gap: 16px;
}

.item {
  flex: 1 1 200px;   /* grow shrink basis */
  order: 2;
  align-self: flex-end;
}
```

- `display: flex` — makes the element a flex container; direct children become flex items.
- `flex-direction` — sets the main axis direction (row = horizontal, column = vertical).
- `justify-content` — aligns items along the main axis (`flex-start`, `center`, `space-between`, `space-around`, `space-evenly`).
- `align-items` — aligns items along the cross axis (`stretch`, `flex-start`, `center`, `flex-end`, `baseline`).
- `flex-wrap` — allows items to wrap onto multiple lines instead of shrinking indefinitely.
- `flex-grow` — how much an item grows relative to siblings when extra space exists.
- `flex-shrink` — how much an item shrinks relative to siblings when space is tight.
- `flex-basis` — the item's initial size before growing/shrinking.
- `flex` — shorthand for `grow shrink basis` (e.g., `flex: 1;` = `1 1 0%`).
- `gap` — sets spacing between flex items without needing margins.
- `order` — changes visual order without altering HTML source order.
- `align-self` — overrides `align-items` for a single item.

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `display: flex` | Create flex container | `display: flex;` | `display: flex;` |
| `flex-direction` | Main axis direction | `flex-direction: value;` | `flex-direction: column;` |
| `justify-content` | Main-axis alignment | `justify-content: value;` | `justify-content: center;` |
| `align-items` | Cross-axis alignment | `align-items: value;` | `align-items: stretch;` |
| `flex-wrap` | Multi-line wrapping | `flex-wrap: value;` | `flex-wrap: wrap;` |
| `flex` | Grow/shrink/basis shorthand | `flex: g s b;` | `flex: 1 0 auto;` |
| `gap` | Space between items | `gap: value;` | `gap: 12px;` |

## Common Use Cases
- **Beginner:** centering a single `<div>` both horizontally and vertically with `justify-content: center; align-items: center;`.
- **Practical UI:** a navbar with `justify-content: space-between` for logo/links split apart.
- **Real-world:** a responsive card grid using `flex-wrap: wrap` with `flex: 1 1 300px` so cards reflow automatically across screen sizes.

## Common Errors
1. ❌ `justify-content: center;` on a container without `display: flex;` → ✅ `display: flex;` must be set first; alignment properties only work on flex containers.
2. ❌ Confusing `justify-content` and `align-items` axes on a `column` layout → ✅ remember `flex-direction: column` swaps main/cross axes, so `justify-content` becomes vertical and `align-items` becomes horizontal.
3. ❌ `flex: 1;` on items expecting fixed width to remain → ✅ use `flex: 0 0 200px;` if a fixed, non-growing/shrinking width is desired.
4. ❌ Using margins to space flex items instead of `gap` → ✅ `gap: 16px;` is simpler and avoids extra margin on the last/first item.
5. ❌ `align-items: center;` expected to center along main axis in a row layout → ✅ `align-items` controls the cross axis; use `justify-content: center;` for main-axis centering.

## Common Mistakes
- Forgetting `display: flex` before applying flex properties.
- Mixing up main vs cross axis after changing `flex-direction`.
- Using old float/margin hacks instead of `gap`.
- Applying `flex` shorthand incorrectly (wrong argument order).

## Quick Reference
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.item { flex: 1 1 200px; }
```
