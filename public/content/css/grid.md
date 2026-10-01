# Grid

## Introduction
CSS Grid is a two-dimensional layout system that arranges items into rows **and** columns simultaneously, making it ideal for full page layouts and complex UI structures.

## Subtopics
- `display: grid` container setup
- `grid-template-columns` / `grid-template-rows`
- The `fr` unit and `repeat()`
- `gap` (row-gap, column-gap)
- Placing items: `grid-column`, `grid-row`, spanning
- Named grid areas: `grid-template-areas`
- `auto-fill` / `auto-fit` with `minmax()`
- Alignment: `justify-items`, `align-items`, `justify-content`, `align-content`

## Syntax

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 200px auto;
  gap: 20px;
}

.spanning-item {
  grid-column: 1 / 3;   /* spans column line 1 to 3 */
  grid-row: 2 / 4;      /* spans row line 2 to 4 */
}

.repeat-grid {
  grid-template-columns: repeat(3, 1fr);
}

.responsive-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.named-areas {
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
```

- `display: grid` — creates a grid container; direct children become grid items.
- `grid-template-columns`/`-rows` — defines the size of each column/row track.
- `fr` — a fractional unit representing a share of remaining free space.
- `repeat(n, value)` — repeats a track definition `n` times, reducing repetition.
- `gap` (or `row-gap`/`column-gap`) — spacing between grid tracks.
- `grid-column`/`grid-row` — places an item across specific grid lines (`start / end`).
- `grid-template-areas` — names regions of the grid as a visual ASCII map, then `grid-area` assigns an item to a named region.
- `auto-fit`/`auto-fill` with `minmax()` — creates responsive column counts without media queries.

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `display: grid` | Create grid container | `display: grid;` | `display: grid;` |
| `grid-template-columns` | Define column tracks | `grid-template-columns: value;` | `repeat(3, 1fr)` |
| `grid-template-rows` | Define row tracks | `grid-template-rows: value;` | `auto 1fr auto` |
| `gap` | Space between tracks | `gap: value;` | `gap: 16px;` |
| `grid-column`/`grid-row` | Item placement/span | `grid-column: start / end;` | `grid-column: 1 / 3;` |
| `grid-template-areas` | Named layout regions | `"name name"` | See example above |
| `minmax()` | Flexible track sizing | `minmax(min, max)` | `minmax(150px, 1fr)` |

## Common Use Cases
- **Beginner:** a simple 3-column photo grid using `repeat(3, 1fr)`.
- **Practical UI:** a card layout with `auto-fit`/`minmax()` that reflows column count based on available width.
- **Real-world:** a full page layout with `grid-template-areas` defining `header`, `sidebar`, `content`, and `footer` regions for a dashboard.

## Common Errors
1. ❌ `grid-template-columns: 1fr 1fr 1fr;` but forgetting `display: grid;` → ✅ `display: grid;` must be set for grid properties to apply.
2. ❌ `grid-column: span;` missing a number → ✅ `grid-column: span 2;` — specify how many tracks to span.
3. ❌ Mismatched quotes/row lengths in `grid-template-areas` (uneven columns per row) → ✅ every row string must have the same number of column names.
4. ❌ `grid-template-columns: repeat(auto-fill, 200px);` expecting items to stretch → ✅ use `minmax(200px, 1fr)` inside `repeat()` so tracks can grow to fill space.
5. ❌ Using margin to space grid items instead of `gap` → ✅ `gap: 16px;` handles spacing between tracks more reliably than per-item margins.

## Common Mistakes
- Forgetting `display: grid` before other grid properties take effect.
- Uneven column counts across rows in `grid-template-areas`.
- Confusing `auto-fill` (keeps empty tracks) with `auto-fit` (collapses empty tracks).
- Overcomplicating simple 1D layouts with Grid when Flexbox would suffice.

## Quick Reference
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.item { grid-column: span 2; }
```
