# Positioning

## Introduction
The `position` property controls how an element is placed relative to its normal position, its nearest positioned ancestor, or the viewport — enabling overlays, sticky headers, and precise placement, alongside `z-index` for stacking order.

## Subtopics
- `position: static` (default)
- `position: relative`
- `position: absolute`
- `position: fixed`
- `position: sticky`
- Offset properties: `top`, `right`, `bottom`, `left`
- `z-index` and stacking context

## Syntax

```css
.static-el   { position: static; }              /* default, offsets ignored */

.relative-el {
  position: relative;
  top: 10px;
  left: 20px;    /* shifts from its normal position, keeps its space */
}

.absolute-el {
  position: absolute;
  top: 0;
  right: 0;      /* positioned relative to nearest positioned ancestor */
}

.fixed-el {
  position: fixed;
  bottom: 20px;
  right: 20px;   /* stays fixed relative to the viewport, ignores scroll */
}

.sticky-el {
  position: sticky;
  top: 0;        /* behaves relative until scroll threshold, then sticks */
}

.stack {
  position: relative;
  z-index: 10;   /* higher value renders above lower siblings */
}
```

- `static` — default flow position; `top`/`left`/etc. have no effect.
- `relative` — positioned relative to its own normal position; still occupies its original space, and becomes a positioning context for absolutely positioned children.
- `absolute` — removed from normal flow, positioned relative to the nearest ancestor with `position` other than `static` (or the viewport if none exists).
- `fixed` — removed from normal flow, positioned relative to the viewport; stays in place during scrolling.
- `sticky` — hybrid: acts relative until the scroll position reaches a threshold (e.g., `top: 0`), then acts fixed within its parent's bounds.
- `z-index` — controls stacking order among overlapping positioned elements; only works on elements with a `position` value other than `static`.

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `position` | Positioning scheme | `position: value;` | `position: absolute;` |
| `top`/`right`/`bottom`/`left` | Offset from reference edge | `top: value;` | `top: 10px;` |
| `z-index` | Stacking order | `z-index: value;` | `z-index: 100;` |

## Common Use Cases
- **Beginner:** a small "badge" positioned in the corner of a card using `position: absolute` inside a `position: relative` parent.
- **Practical UI:** a sticky page header using `position: sticky; top: 0;`.
- **Real-world:** a modal overlay using `position: fixed` covering the full viewport, with a `z-index` high enough to appear above all other page content.

## Common Errors
1. ❌ `.child { position: absolute; top: 0; }` with no positioned parent → ✅ set `position: relative;` on the parent so the child positions relative to it, not the whole page.
2. ❌ `z-index: 999;` on a `position: static` element expecting it to stack above others → ✅ `z-index` only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`).
3. ❌ `position: sticky;` without a `top`/`bottom`/etc. offset → ✅ sticky requires at least one offset (e.g., `top: 0;`) to know when to "stick."
4. ❌ Two overlapping elements with the same `z-index` and unexpected stacking → ✅ assign distinct `z-index` values, and be aware source order breaks ties.
5. ❌ Using `position: fixed` inside a parent with `transform` applied, expecting it to stick to the viewport → ✅ a `transform` on an ancestor creates a new containing block, causing `fixed` children to position relative to that ancestor instead of the viewport — remove the transform or adjust the approach.

## Common Mistakes
- Forgetting to set `position: relative` on the parent before using `absolute` on a child.
- Using `z-index` on non-positioned elements (has no effect).
- Not providing an offset for `sticky` positioning.
- Overusing `position: absolute` for layout instead of Flexbox/Grid.

## Quick Reference
```css
.parent  { position: relative; }
.badge   { position: absolute; top: 0; right: 0; }
.header  { position: sticky; top: 0; z-index: 50; }
.modal   { position: fixed; inset: 0; z-index: 1000; }
```
