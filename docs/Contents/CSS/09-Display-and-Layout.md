# Display & Layout

## Introduction
The `display` property determines how an element participates in the page's layout — whether it takes a full line, sits inline, or becomes a flex/grid container. It's the foundation before diving into Flexbox or Grid.

## Subtopics
- `display: block`, `inline`, `inline-block`
- `display: none` vs `visibility: hidden`
- `display: flex` / `grid` (overview; detailed in their own chapters)
- Normal document flow
- `overflow` and its values

## Syntax

```css
.block-el     { display: block; }
.inline-el    { display: inline; }
.inline-block { display: inline-block; }
.hidden-none  { display: none; }
.hidden-vis   { visibility: hidden; }
.flex-parent  { display: flex; }
.grid-parent  { display: grid; }

.scrollable {
  overflow: auto;
}
```

- `block` — takes up the full available width, starts on a new line (e.g., `div`, `p`).
- `inline` — takes only as much width as its content, doesn't start a new line, ignores `width`/`height` (e.g., `span`, `a`).
- `inline-block` — flows inline but respects `width`, `height`, and vertical `margin`/`padding`.
- `none` — removes the element entirely from layout (no space reserved).
- `visibility: hidden` — hides the element visually but **keeps** its space in the layout.
- `flex` / `grid` — turns the element into a flex/grid container for its children (see dedicated chapters).
- `overflow` — controls what happens when content exceeds its box (`visible`, `hidden`, `scroll`, `auto`).

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `display` | Layout behavior type | `display: value;` | `display: flex;` |
| `visibility` | Show/hide, keeps space | `visibility: value;` | `visibility: hidden;` |
| `overflow` | Handle content overflow | `overflow: value;` | `overflow: auto;` |
| `overflow-x`/`overflow-y` | Axis-specific overflow | `overflow-x: value;` | `overflow-x: scroll;` |

## Common Use Cases
- **Beginner:** switching a `<span>` to `display: block` to force it onto its own line.
- **Practical UI:** `inline-block` nav items so links sit side by side but accept padding/width.
- **Real-world:** a dashboard layout combining `display: none` for a collapsed sidebar (removed from flow) versus `visibility: hidden` for a tooltip that should still reserve space.

## Common Errors
1. ❌ Setting `width`/`height` on an `inline` element expecting it to resize → ✅ change to `display: inline-block;` since plain `inline` ignores box dimensions.
2. ❌ Using `display: none` when the element should just be visually hidden but still take up space → ✅ use `visibility: hidden;` instead.
3. ❌ Forgetting `overflow: auto` on a fixed-height container, causing content to spill outside visually → ✅ add `overflow: auto;` or `overflow-y: scroll;`.
4. ❌ `display: block inline;` (invalid combined value) → ✅ use a single valid keyword, e.g. `display: inline-block;`.
5. ❌ Expecting `display: none` elements to still be accessible/focusable → ✅ understand `display: none` removes the element from both the visual layout and the accessibility tree entirely.

## Common Mistakes
- Confusing `display: none` with `visibility: hidden` (different layout impact).
- Applying `width`/`height` to `inline` elements and expecting them to work.
- Forgetting that `overflow: hidden` clips content, which can unintentionally hide dropdowns/tooltips.

## Quick Reference
```css
.block        { display: block; }
.inline       { display: inline; }
.inline-block { display: inline-block; }
.hide-space   { visibility: hidden; }
.hide-remove  { display: none; }
.scroll-box   { overflow: auto; }
```
