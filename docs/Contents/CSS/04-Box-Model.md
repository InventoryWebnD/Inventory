# Box Model

## Introduction
Every HTML element is rendered as a rectangular box made of **content, padding, border, and margin**. Understanding this model is essential for controlling spacing and sizing accurately.

## Subtopics
- Content, padding, border, margin layers
- `box-sizing`: `content-box` vs `border-box`
- Margin collapsing
- `overflow` handling
- Shorthand vs longhand box properties

## Syntax

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
  box-sizing: border-box;
}
```
- `width` — defines content width (or total width, if `border-box` is set).
- `padding` — space between content and border.
- `border` — the visible edge around padding.
- `margin` — space outside the border, separating from other elements.
- `box-sizing: content-box` (default) — `width`/`height` apply only to content; padding/border add on top.
- `box-sizing: border-box` — `width`/`height` include padding and border, making sizing more predictable.

```css
.spaced {
  margin: 10px 20px;        /* top/bottom 10px, left/right 20px */
  padding: 5px 10px 15px 20px; /* top right bottom left */
}

.scroll {
  overflow: auto;   /* scrollbars appear only if needed */
  overflow-x: hidden;
  overflow-y: scroll;
}
```

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `width` / `height` | Content size | `width: value;` | `width: 300px;` |
| `padding` | Inner spacing | `padding: t r b l;` | `padding: 10px 20px;` |
| `border` | Edge line | `border: width style color;` | `border: 1px solid #000;` |
| `margin` | Outer spacing | `margin: t r b l;` | `margin: 0 auto;` |
| `box-sizing` | Sizing model | `box-sizing: value;` | `box-sizing: border-box;` |
| `overflow` | Content overflow handling | `overflow: value;` | `overflow: hidden;` |

## Common Use Cases
- **Beginner:** a `<div>` with padding and border to create a simple card look.
- **Practical UI:** `box-sizing: border-box` applied globally so widths stay predictable when adding borders/padding.
- **Real-world:** a scrollable card list using `overflow-y: auto` with fixed `height` and `border-box` sizing across a design system.

## Common Errors
1. ❌ `width: 300px; padding: 20px;` expecting total width to stay 300px → ✅ add `box-sizing: border-box;` so padding is included in the 300px.
2. ❌ `margin: 10px 20px 30px;` misunderstood order → ✅ shorthand order is top, right, bottom (left mirrors right when 3 values given); for full control use `margin: 10px 20px 30px 20px;`.
3. ❌ Two stacked `<div>`s each with `margin: 20px` expecting 40px gap → ✅ adjacent vertical margins **collapse** to the larger single value (20px); use padding or flex/grid gap to avoid this.
4. ❌ `border: solid;` missing width/color → ✅ `border: 1px solid black;` — specify all three for reliable rendering.
5. ❌ Content overflowing a fixed-size box invisibly → ✅ add `overflow: auto;` or `overflow: hidden;` to control the overflow explicitly.

## Common Mistakes
- Forgetting `box-sizing: border-box`, causing layout width miscalculations.
- Misreading shorthand order for `margin`/`padding`.
- Not accounting for margin collapsing between block elements.
- Leaving `overflow` as default (`visible`), causing content to spill out unexpectedly.

## Quick Reference
```css
* { box-sizing: border-box; }
.box {
  width: 200px;
  padding: 15px;
  border: 1px solid #ccc;
  margin: 10px auto;
  overflow: hidden;
}
```
Shorthand order: `top right bottom left` (clockwise).
