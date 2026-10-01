# Lists

## Introduction

Lists organize related items into a structured, scannable format. HTML provides three list types: **unordered** (bullets), **ordered** (numbered), and **description lists** (term/definition pairs). Lists can also be nested to represent hierarchical data such as menus or outlines.

## Subtopics

- Unordered lists `<ul>` and list items `<li>`
- Ordered lists `<ol>` and numbering attributes (`start`, `type`, `reversed`)
- Description lists `<dl>`, `<dt>`, `<dd>`
- Nested lists (lists inside lists)
- Styling lists with CSS `list-style`
- Accessibility of lists (screen readers announce list length/position)
- Semantic use cases: navigation menus, table of contents, FAQs

## Syntax

### 1. Unordered List

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>
```

- `<ul>` — Wraps a group of items with no numerical order (rendered with bullet points by default).
- `<li>` — Defines each individual "list item" inside `<ul>` or `<ol>`.

### 2. Ordered List

```html
<ol>
  <li>Preheat the oven</li>
  <li>Mix the ingredients</li>
  <li>Bake for 20 minutes</li>
</ol>
```

- `<ol>` — Wraps a group of items in sequential order (rendered with numbers by default).

### 3. Ordered List Attributes

```html
<ol start="5">
  <li>Fifth item</li>
  <li>Sixth item</li>
</ol>

<ol type="A">
  <li>First (shows as A)</li>
  <li>Second (shows as B)</li>
</ol>

<ol reversed>
  <li>Third</li>
  <li>Second</li>
  <li>First</li>
</ol>
```

- `start="5"` — Begins numbering at 5 instead of 1.
- `type="A"` — Changes numbering style: `1` (default), `A`, `a`, `I`, `i`.
- `reversed` — A boolean attribute that counts numbers downward instead of upward.

### 4. Nested Lists

```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Potato</li>
    </ul>
  </li>
</ul>
```

- A `<ul>` or `<ol>` placed *inside* an `<li>` creates a sub-list, forming a hierarchy (e.g., categories and sub-categories).

### 5. Description List

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language, used to structure web content.</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets, used to style web content.</dd>
</dl>
```

- `<dl>` — Wraps a list of term/description pairs.
- `<dt>` — The "description term" (the item being defined).
- `<dd>` — The "description details" (the definition or explanation of the term).

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<ul>` | Unordered (bulleted) list container | `<ul>...</ul>` | `<ul><li>Item</li></ul>` |
| `<ol>` | Ordered (numbered) list container | `<ol>...</ol>` | `<ol><li>Step 1</li></ol>` |
| `<li>` | List item | `<li>Text</li>` | `<li>Milk</li>` |
| `start` | Sets starting number of `<ol>` | `<ol start="n">` | `<ol start="10">` |
| `type` | Numbering style of `<ol>` | `<ol type="I">` | `<ol type="i">` |
| `reversed` | Counts list downward | `<ol reversed>` | `<ol reversed>` |
| `<dl>` | Description list container | `<dl>...</dl>` | `<dl><dt>A</dt><dd>B</dd></dl>` |
| `<dt>` | Description term | `<dt>Term</dt>` | `<dt>API</dt>` |
| `<dd>` | Description detail | `<dd>Detail</dd>` | `<dd>Application Programming Interface</dd>` |

## Common Use Cases

- **Beginner example:** A simple shopping list using `<ul>` with three or four `<li>` items.
- **Practical website example:** A recipe page using `<ol>` for numbered cooking steps and `<ul>` for the ingredients list.
- **Real-world implementation:** A site navigation bar built from a `<ul>` of `<li><a>` links (semantically a list of links), or an FAQ section using `<dl>` where each `<dt>` is a question and `<dd>` is the answer.

## Common Errors

1. ❌
```html
<ul>
  <p>Apple</p>
  <p>Banana</p>
</ul>
```
**Why it's wrong:** `<ul>` can only directly contain `<li>` elements, not `<p>` tags.
✅
```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>
```
**Explanation:** Wrap each item in `<li>`; put any additional formatting inside the `<li>` if needed.

2. ❌
```html
<li>Apple</li>
<li>Banana</li>
```
**Why it's wrong:** `<li>` elements are used without a parent `<ul>` or `<ol>` wrapper, which is invalid HTML.
✅
```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>
```
**Explanation:** Every `<li>` must be nested inside a `<ul>` or `<ol>`.

3. ❌
```html
<ul>
  <li>Fruits
  <ul>
    <li>Apple</li>
  </ul>
</ul>
```
**Why it's wrong:** The nested `<ul>` is placed as a sibling instead of being properly closed inside the parent `<li>`; the outer `<li>` is never closed.
✅
```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
    </ul>
  </li>
</ul>
```
**Explanation:** A nested list must live *inside* the `<li>` it belongs to, and that `<li>` must be properly closed afterward.

4. ❌
```html
<ol type="1" start="one">
  <li>Item</li>
</ol>
```
**Why it's wrong:** `start` must be a number, not a word like `"one"`.
✅
```html
<ol type="1" start="1">
  <li>Item</li>
</ol>
```
**Explanation:** The `start` attribute only accepts integer values.

5. ❌
```html
<dl>
  <dt>HTML</dt>
</dl>
```
**Why it's wrong:** A `<dt>` without a matching `<dd>` provides an incomplete definition and confuses assistive technology expecting term/description pairs.
✅
```html
<dl>
  <dt>HTML</dt>
  <dd>A markup language for structuring web pages.</dd>
</dl>
```
**Explanation:** Each `<dt>` should generally be paired with at least one `<dd>`.

6. ❌
```html
<ul style="list-style: none;">
  <li><a href="#">Home</a></li>
</ul>
```
(flagged as wrong only when developers assume removing bullets removes the semantic meaning)
**Why it's wrong:** Some beginners think adding `list-style: none` turns the list into a non-list, and stop using `<ul>/<li>` for menus altogether, losing accessibility benefits.
✅
```html
<nav>
  <ul style="list-style: none;">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>
```
**Explanation:** Removing bullet styling with CSS is fine — the list remains semantically a list and should still use `<ul>`/`<li>` for navigation menus.

## Common Mistakes

- Placing non-`<li>` elements directly inside `<ul>`/`<ol>`.
- Using `<li>` without any parent list container.
- Forgetting to close nested `<ul>`/`<ol>` before closing the parent `<li>`.
- Passing non-numeric values to `start`.
- Leaving `<dt>` without a corresponding `<dd>`.
- Using `<br>` inside `<li>` items to fake multiple list items instead of separate `<li>` tags.

## Quick Reference

```html
<ul>
  <li>Item</li>
</ul>

<ol start="1" type="1" reversed>
  <li>Item</li>
</ol>

<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

| Tag | Meaning |
|---|---|
| `ul` | Unordered list |
| `ol` | Ordered list |
| `li` | List item |
| `dl` | Description list |
| `dt` | Term |
| `dd` | Definition |
| `start`, `type`, `reversed` | `ol`-only attributes |
