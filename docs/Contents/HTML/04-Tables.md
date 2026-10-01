# Tables

## Introduction

HTML tables display **tabular data** — information organized into rows and columns, such as schedules, pricing charts, or reports. Tables should be reserved for genuine tabular data (not page layout), and support merging cells via `rowspan`/`colspan` plus accessibility features like captions and header scoping.

## Subtopics

- Table structure: `<table>`, `<tr>`, `<td>`, `<th>`
- Table sections: `<thead>`, `<tbody>`, `<tfoot>`
- Table caption `<caption>`
- Merging cells: `colspan` and `rowspan`
- Header association: `scope` attribute
- Column grouping: `<colgroup>` and `<col>`
- Accessibility best practices for data tables
- Styling tables with CSS (borders, spacing) vs. semantic markup
- When *not* to use tables (layout tables are deprecated practice)

## Syntax

### 1. Basic Table

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>28</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>34</td>
  </tr>
</table>
```

- `<table>` — The container for the entire table.
- `<tr>` — Defines a table row.
- `<th>` — Defines a header cell (bold and centered by default; also announced as a "header" by screen readers).
- `<td>` — Defines a standard data cell.

### 2. Table with Caption and Sections

```html
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$12,500</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$22,500</td>
    </tr>
  </tfoot>
</table>
```

- `<caption>` — Provides a title/description for the table; must be the first child of `<table>`.
- `<thead>` — Groups header row(s), semantically separating them from data.
- `<tbody>` — Groups the main body of data rows.
- `<tfoot>` — Groups footer row(s), often used for totals/summaries.

### 3. Column and Row Spanning

```html
<table>
  <tr>
    <th>Name</th>
    <th colspan="2">Contact</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>Phone</td>
    <td>Email</td>
  </tr>
  <tr>
    <td rowspan="2">Team A</td>
    <td>Bob</td>
    <td>bob@example.com</td>
  </tr>
  <tr>
    <td>Carol</td>
    <td>carol@example.com</td>
  </tr>
</table>
```

- `colspan="2"` — Makes a cell span across 2 columns horizontally.
- `rowspan="2"` — Makes a cell span across 2 rows vertically.

### 4. Header Scope for Accessibility

```html
<table>
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
  </tr>
  <tr>
    <th scope="row">Laptop</th>
    <td>$999</td>
  </tr>
</table>
```

- `scope="col"` — Indicates the header applies to the entire column below it.
- `scope="row"` — Indicates the header applies to the entire row beside it.

### 5. Column Grouping

```html
<table>
  <colgroup>
    <col style="background-color: #f0f0f0;">
    <col>
  </colgroup>
  <tr>
    <th>Item</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Pen</td>
    <td>$1</td>
  </tr>
</table>
```

- `<colgroup>` — Groups one or more `<col>` elements for shared styling.
- `<col>` — Represents a single column, allowing CSS to target it without touching every cell.

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<table>` | Table container | `<table>...</table>` | `<table><tr><td>1</td></tr></table>` |
| `<tr>` | Table row | `<tr>...</tr>` | `<tr><td>A</td></tr>` |
| `<th>` | Header cell | `<th>Text</th>` | `<th>Name</th>` |
| `<td>` | Data cell | `<td>Text</td>` | `<td>25</td>` |
| `<caption>` | Table title | `<caption>Text</caption>` | `<caption>Report</caption>` |
| `<thead>` | Header section | `<thead>...</thead>` | `<thead><tr><th>A</th></tr></thead>` |
| `<tbody>` | Body section | `<tbody>...</tbody>` | `<tbody><tr><td>1</td></tr></tbody>` |
| `<tfoot>` | Footer section | `<tfoot>...</tfoot>` | `<tfoot><tr><td>Sum</td></tr></tfoot>` |
| `colspan` | Merge columns | `<td colspan="2">` | `<td colspan="3">Total</td>` |
| `rowspan` | Merge rows | `<td rowspan="2">` | `<td rowspan="2">Team</td>` |
| `scope` | Header association | `<th scope="col">` | `<th scope="row">Total</th>` |

## Common Use Cases

- **Beginner example:** A simple 2-column table listing names and ages.
- **Practical website example:** A pricing table comparing subscription tiers with merged header cells using `colspan`.
- **Real-world implementation:** A financial dashboard rendering a data table with `<thead>` for column labels, `<tbody>` for rows fetched dynamically from a database, and `<tfoot>` displaying calculated totals — with `scope` attributes ensuring screen readers announce row/column context correctly.

## Common Errors

1. ❌
```html
<table>
  <td>Name</td>
  <td>Age</td>
</table>
```
**Why it's wrong:** `<td>` elements are placed directly inside `<table>` without a wrapping `<tr>`.
✅
```html
<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
  </tr>
</table>
```
**Explanation:** Cells must always be wrapped in a `<tr>` row element.

2. ❌
```html
<table>
  <tr>
    <th>Name<th>Age
  </tr>
</table>
```
**Why it's wrong:** The `<th>` tags are never closed, causing malformed/nested markup.
✅
```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
</table>
```
**Explanation:** Every `<th>`/`<td>` must have a proper closing tag.

3. ❌
```html
<table>
  <caption>Report</caption>
  <tr><th>Name</th></tr>
</table>
<caption>Extra Caption</caption>
```
**Why it's wrong:** A second `<caption>` is placed outside `<table>`; captions are only valid as the first child *inside* `<table>`, and only one is allowed.
✅
```html
<table>
  <caption>Report</caption>
  <tr><th>Name</th></tr>
</table>
```
**Explanation:** Use exactly one `<caption>`, and place it immediately after the opening `<table>` tag.

4. ❌
```html
<tr>
  <td colspan="two">Total</td>
</tr>
```
**Why it's wrong:** `colspan` must be a positive integer, not a word.
✅
```html
<tr>
  <td colspan="2">Total</td>
</tr>
```
**Explanation:** Use numeric values for `colspan`/`rowspan`.

5. ❌
```html
<table>
  <tr>
    <td rowspan="2">Team A</td>
    <td>Bob</td>
  </tr>
  <tr>
    <td>Team A</td>
    <td>Carol</td>
  </tr>
</table>
```
**Why it's wrong:** The cell is repeated manually in the second row instead of letting `rowspan` merge it, resulting in duplicate/misaligned data.
✅
```html
<table>
  <tr>
    <td rowspan="2">Team A</td>
    <td>Bob</td>
  </tr>
  <tr>
    <td>Carol</td>
  </tr>
</table>
```
**Explanation:** When using `rowspan`, omit the merged cell entirely from subsequent rows — do not repeat it.

6. ❌
```html
<table>
  <div>
    <tr><td>Data</td></tr>
  </div>
</table>
```
**Why it's wrong:** A `<div>` cannot be a direct child of `<table>`; only `<caption>`, `<colgroup>`, `<thead>`, `<tbody>`, `<tfoot>`, and `<tr>` are valid direct children.
✅
```html
<table>
  <tbody>
    <tr><td>Data</td></tr>
  </tbody>
</table>
```
**Explanation:** Use only the table-specific elements as direct children of `<table>`.

## Common Mistakes

- Using tables for visual page layout instead of tabular data (use CSS Grid/Flexbox for layout).
- Forgetting `<th>` for headers and using `<td>` everywhere, hurting accessibility.
- Repeating data manually instead of using `rowspan`/`colspan`.
- Omitting `scope` on headers in complex tables, making them hard to navigate with a screen reader.
- Forgetting `<caption>` on data-heavy tables, leaving users without context.
- Mismatched cell counts across rows after adding `colspan`/`rowspan`.

## Quick Reference

```html
<table>
  <caption>Title</caption>
  <thead>
    <tr><th scope="col">Header</th></tr>
  </thead>
  <tbody>
    <tr><td>Data</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Footer</td></tr>
  </tfoot>
</table>
```

| Tag/Attr | Meaning |
|---|---|
| `table` | Table wrapper |
| `tr` | Row |
| `th` / `td` | Header / data cell |
| `caption` | Table title |
| `thead/tbody/tfoot` | Table sections |
| `colspan` / `rowspan` | Merge cells |
| `scope` | Header-to-cell relationship |
