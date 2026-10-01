# Functions

## Introduction
CSS functions let values be computed dynamically instead of hard-coded — performing math, choosing responsive values, or referencing variables. `calc()`, `clamp()`, `min()`, and `max()` are the modern core set.

## Subtopics
- `calc()` — arithmetic between mixed units
- `min()` — smallest of a list of values
- `max()` — largest of a list of values
- `clamp()` — a responsive value with min/preferred/max
- `var()` — referencing custom properties (see also Variables)
- Color functions: `rgb()`, `rgba()`, `hsl()`

## Syntax

```css
.calc-box {
  width: calc(100% - 40px);
}

.min-box {
  width: min(90%, 500px);
}

.max-box {
  width: max(300px, 50%);
}

.clamp-box {
  font-size: clamp(1rem, 2vw + 1rem, 2.5rem);
}

.var-box {
  color: var(--main-color, black);
}

.color-box {
  background: rgba(0, 0, 0, 0.5);
  color: hsl(210, 100%, 50%);
}
```

- `calc(expr)` — performs math combining different units (e.g., `%` and `px`); requires spaces around `+`/`-` operators.
- `min(a, b, ...)` — resolves to the smallest value, useful for capping a fluid size.
- `max(a, b, ...)` — resolves to the largest value, useful for setting a floor.
- `clamp(min, preferred, max)` — a single fluid value that never goes below `min` or above `max`.
- `var(--name, fallback)` — inserts a custom property's value, with an optional fallback.
- `rgba(r,g,b,a)` — RGB color plus alpha transparency.
- `hsl(h,s%,l%)` — hue, saturation, lightness color model.

## Important Properties

| Function | Purpose | Syntax | Example |
|---|---|---|---|
| `calc()` | Mixed-unit math | `calc(expr)` | `calc(100% - 20px)` |
| `min()` | Smallest value | `min(a, b)` | `min(50%, 400px)` |
| `max()` | Largest value | `max(a, b)` | `max(200px, 10%)` |
| `clamp()` | Fluid responsive value | `clamp(min, val, max)` | `clamp(1rem, 4vw, 3rem)` |
| `var()` | Custom property reference | `var(--name)` | `var(--gap, 8px)` |
| `rgba()`/`hsl()` | Color with transparency/HSL | `rgba(r,g,b,a)` | `rgba(255,0,0,0.4)` |

## Common Use Cases
- **Beginner:** `calc(100% - 20px)` to subtract fixed padding from a fluid width.
- **Practical UI:** `clamp()` for fluid heading font sizes across screen sizes without media queries.
- **Real-world:** a design system using `min()`/`max()` to cap container widths responsively and `var()` to theme colors dynamically.

## Common Errors
1. ❌ `calc(100%-20px)` (no spaces around operator) → ✅ `calc(100% - 20px)` — spaces are required around `+`/`-`.
2. ❌ `clamp(2.5rem, 1rem, 2vw)` with arguments in wrong order → ✅ `clamp(1rem, 2vw, 2.5rem)` — order must be min, preferred, max.
3. ❌ `width: min(90%);` with only one argument → ✅ `min()`/`max()` need at least two comma-separated values to compare.
4. ❌ `color: var(--brand-color)` when `--brand-color` was never defined and no fallback given → ✅ `color: var(--brand-color, #000);` — always provide a fallback for safety.
5. ❌ `background: rgba(255 0 0 / 0.5);` mixing legacy comma syntax expectations incorrectly → ✅ use consistent syntax: either `rgba(255, 0, 0, 0.5)` (legacy) or `rgb(255 0 0 / 0.5)` (modern space syntax) — don't mix comma and slash in the same call.

## Common Mistakes
- Forgetting required spaces in `calc()` expressions.
- Misordering `clamp()` arguments.
- Not providing fallback values in `var()`.
- Overusing `calc()` where a simpler unit (like `%` or `rem`) would work.

## Quick Reference
```css
width: calc(100% - 2rem);
width: min(600px, 90%);
width: max(300px, 40%);
font-size: clamp(1rem, 2vw, 2rem);
color: var(--text-color, #111);
background: rgba(0,0,0,0.6);
```
