# Pseudo Selectors

## Introduction
Pseudo-classes select elements based on **state or position** (like `:hover` or `:first-child`), while pseudo-elements target a **specific part** of an element (like `::before` or `::first-line`).

## Subtopics
- Pseudo-classes: `:hover`, `:focus`, `:active`, `:visited`
- Structural pseudo-classes: `:first-child`, `:last-child`, `:nth-child()`
- Form-related pseudo-classes: `:checked`, `:disabled`, `:required`, `:invalid`
- Pseudo-elements: `::before`, `::after`, `::first-line`, `::first-letter`
- The `content` property (used with pseudo-elements)

## Syntax

```css
a:hover        { color: red; }
a:focus        { outline: 2px solid blue; }
a:active       { color: darkred; }
a:visited      { color: purple; }

li:first-child { font-weight: bold; }
li:last-child  { border-bottom: none; }
li:nth-child(2n) { background: #f5f5f5; }  /* even items */
li:nth-child(odd) { background: #fff; }    /* odd items */

input:checked  { accent-color: green; }
input:disabled { opacity: 0.5; }
input:required { border-color: red; }
input:invalid  { border-color: crimson; }

.box::before {
  content: "★ ";
}
.box::after {
  content: "";
  display: block;
}
p::first-line   { font-weight: bold; }
p::first-letter { font-size: 2em; }
```

- `:hover` — applies while the pointer is over the element.
- `:focus` — applies when the element has keyboard/click focus (important for accessibility).
- `:active` — applies during the moment of activation (e.g., mouse button down).
- `:visited` — styles links the user has already visited (limited properties allowed for privacy).
- `:nth-child(n)` — matches elements based on their position among siblings; accepts keywords (`odd`, `even`) or formulas (`2n+1`).
- `:checked` — matches a checked checkbox/radio.
- `:disabled` / `:required` / `:invalid` — match form controls in those respective states.
- `::before` / `::after` — insert generated content before/after an element's actual content; **require** the `content` property to render (even if empty `""`).
- `::first-line` / `::first-letter` — style just the first line or first letter of a text block.

## Important Properties

| Selector | Purpose | Syntax | Example |
|---|---|---|---|
| `:hover` | Mouse-over state | `sel:hover {}` | `button:hover {}` |
| `:focus` | Keyboard/click focus | `sel:focus {}` | `input:focus {}` |
| `:nth-child()` | Positional match | `sel:nth-child(n) {}` | `li:nth-child(3) {}` |
| `:checked` | Checked input state | `input:checked {}` | `input:checked {}` |
| `:disabled` | Disabled form control | `input:disabled {}` | `input:disabled {}` |
| `::before`/`::after` | Generated content | `sel::before { content: ""; }` | `.tag::after { content: "→"; }` |
| `content` | Required for pseudo-elements | `content: value;` | `content: "New!";` |

## Common Use Cases
- **Beginner:** `a:hover { color: red; }` for a simple link hover effect.
- **Practical UI:** `li:nth-child(odd)` for zebra-striped table/list rows.
- **Real-world:** a required form field showing a red asterisk via `label::after { content: " *"; color: red; }`, combined with `input:invalid` styling for real-time validation feedback.

## Common Errors
1. ❌ `.box::before { color: red; }` with no `content` property → ✅ add `content: "";` (or actual text) — pseudo-elements need `content` to render at all.
2. ❌ `a:visited { background-image: url(x.png); }` expecting it to work → ✅ `:visited` only allows a limited set of properties (mainly color-related) for user privacy reasons.
3. ❌ `li:nth-child(2)` expecting to match the second `<li>` regardless of other sibling elements mixed in → ✅ `:nth-child()` counts *all* sibling elements, not just same-type ones; use `:nth-of-type()` if mixed element types are involved.
4. ❌ `button:hover:active` order assumed to matter → ✅ chaining pseudo-classes works regardless of order; `:hover:active` and `:active:hover` behave the same.
5. ❌ Single colon used for pseudo-elements: `.box:before { content: ""; }` → ✅ modern CSS3 convention uses double colons for pseudo-elements: `.box::before { content: ""; }` (single colon is legacy but still often works — double colon is correct and unambiguous).

## Common Mistakes
- Forgetting the required `content` property on `::before`/`::after`.
- Confusing `:nth-child()` with `:nth-of-type()`.
- Assuming `:visited` supports all CSS properties.
- Using single colon for pseudo-elements instead of the modern double-colon syntax.

## Quick Reference
```css
a:hover, a:focus { color: teal; }
li:nth-child(odd) { background: #f9f9f9; }
input:disabled { opacity: 0.5; }
.badge::after { content: "New"; }
```
