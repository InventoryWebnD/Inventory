# Selectors

## Introduction
Selectors target HTML elements for styling. Understanding selector types and **specificity** (which rule wins when several apply) is core to writing predictable CSS.

## Subtopics
- Universal, type, class, ID selectors
- Grouping and combinators (descendant, child, sibling)
- Attribute selectors
- Specificity & the cascade
- Cascade order (source order, importance, specificity)

## Syntax

```css
* { margin: 0; }                 /* universal */
p { color: black; }              /* type/element */
.card { padding: 1rem; }         /* class */
#header { background: #fff; }    /* ID */
h1, h2 { font-weight: bold; }    /* grouping */
div p { color: gray; }           /* descendant combinator */
div > p { color: gray; }         /* direct child combinator */
h1 + p { margin-top: 0; }        /* adjacent sibling */
h1 ~ p { color: blue; }          /* general sibling */
input[type="text"] { border: 1px solid; } /* attribute selector */
```

- `*` — matches every element.
- `.class` — matches elements with that class attribute.
- `#id` — matches the single element with that ID.
- `A B` — B anywhere inside A (descendant).
- `A > B` — B is a direct child of A.
- `A + B` — B immediately follows A (same parent).
- `A ~ B` — B follows A anywhere among siblings.
- `[attr="value"]` — matches by attribute value.

## Important Properties

| Selector | Purpose | Syntax | Example |
|---|---|---|---|
| Type | Tag name match | `tag {}` | `p {}` |
| Class | Reusable style hook | `.name {}` | `.btn {}` |
| ID | Unique element | `#name {}` | `#nav {}` |
| Descendant | Nested match | `A B {}` | `nav a {}` |
| Child | Direct child | `A > B {}` | `ul > li {}` |
| Attribute | Match by attribute | `[attr]{}` | `[disabled]{}` |

## Common Use Cases
- **Beginner:** style all `<p>` tags with a type selector.
- **Practical UI:** `.btn.primary` combining classes for a styled button variant.
- **Real-world:** `nav > ul > li > a:hover` targeting nav links precisely without extra classes.

## Common Errors
1. ❌ `.Card { }` vs HTML `class="card"` (case mismatch) → ✅ match case exactly; class names are case-sensitive.
2. ❌ `#header, .header { }` assuming same specificity → ✅ know ID (0,1,0,0) beats class (0,0,1,0); write selectors deliberately.
3. ❌ `div p { color: red }` when only direct child intended → ✅ `div > p { color: red }` for direct children only.
4. ❌ `a:hover color: blue;` missing braces → ✅ `a:hover { color: blue; }`.
5. ❌ Overqualifying: `ul.nav li.item a.link {}` → ✅ simplify to `.nav .link {}` to reduce specificity conflicts.

## Common Mistakes
- Overusing IDs for styling (hard to override later).
- Not understanding specificity, leading to excessive `!important`.
- Forgetting commas when grouping selectors (changes meaning entirely).

## Quick Reference
```css
* {}            /* all elements */
tag {}          /* type */
.class {}       /* class */
#id {}          /* id */
A B {}          /* descendant */
A > B {}        /* child */
A + B {}        /* adjacent sibling */
A ~ B {}        /* general sibling */
[attr=val] {}   /* attribute */
```
Specificity order (low→high): type < class/attribute/pseudo-class < ID < inline style < `!important`.
