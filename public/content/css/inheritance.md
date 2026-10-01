# Inheritance

## Introduction
Inheritance lets certain CSS properties automatically pass from a parent element to its children, reducing repetition. Not all properties inherit by default — mostly text-related ones do.

## Subtopics
- Inherited vs. non-inherited properties
- Controlling inheritance: `inherit`, `initial`, `unset`, `revert`
- The cascade and how inheritance fits into it

## Syntax

```css
body {
  font-family: Arial, sans-serif;
  color: #333;
}
/* p and span inherit font-family and color automatically */

.child {
  color: inherit;   /* explicitly inherit from parent */
}

.reset {
  all: initial;     /* reset to browser default, ignoring inheritance */
}

.flexible {
  border: unset;    /* removes any set/inherited value */
}
```

- `inherit` — forces a property to take its parent's computed value, even if it doesn't inherit by default (e.g., `border`).
- `initial` — resets the property to the CSS specification's default value.
- `unset` — acts as `inherit` if the property naturally inherits, or `initial` if it doesn't.
- `revert` — resets to the browser's built-in stylesheet value.

## Important Properties

| Keyword | Purpose | Syntax | Example |
|---|---|---|---|
| `inherit` | Force inherit from parent | `prop: inherit;` | `border: inherit;` |
| `initial` | Reset to spec default | `prop: initial;` | `color: initial;` |
| `unset` | Smart reset | `prop: unset;` | `margin: unset;` |
| `revert` | Reset to browser default | `prop: revert;` | `display: revert;` |
| `all` | Applies to every property at once | `all: value;` | `all: unset;` |

## Common Use Cases
- **Beginner:** setting `font-family` once on `body` so all text inherits it.
- **Practical UI:** a button component using `color: inherit` to match surrounding text color.
- **Real-world:** a design-system reset using `all: unset` on `<button>` to strip browser defaults before applying custom styles.

## Common Errors
1. ❌ Expecting `border` to inherit automatically → ✅ `border` is non-inherited by default; explicitly set `border: inherit;` if needed.
2. ❌ `.box { all: initial; }` on a component expecting inherited fonts to remain → ✅ use `all: revert;` or set fonts explicitly afterward.
3. ❌ Assuming `width`/`height` inherit → ✅ box-model properties do not inherit; set them explicitly per element.
4. ❌ `color: inherit;` on `<a>` expected to look like plain text but link still shows default blue/underline → ✅ also reset `text-decoration: inherit;` since links have separate defaults.
5. ❌ Confusing `unset` with `initial` and getting unexpected inherited values → ✅ check whether the property inherits by default before choosing `unset` vs `initial`.

## Common Mistakes
- Assuming every property inherits (only text/typography-related ones mostly do).
- Overusing `!important` instead of relying on natural inheritance.
- Not resetting inherited link/button styles when needed.

## Quick Reference
```css
body { color: #333; font-family: sans-serif; } /* inherited by children */
.child { color: inherit; }
.reset-all { all: unset; }
```
Inherited by default: `color`, `font-*`, `line-height`, `text-align`, `visibility`.
Not inherited: `margin`, `padding`, `border`, `width`, `height`, `background`.
