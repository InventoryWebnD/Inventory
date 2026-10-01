# Units

## Introduction
CSS units define lengths, sizes, and proportions. They're split into **absolute** units (fixed size) and **relative** units (scale based on context, like parent font size or viewport).

## Subtopics
- Absolute units: `px`, `cm`, `in`, `pt`
- Relative units: `%`, `em`, `rem`
- Viewport units: `vw`, `vh`, `vmin`, `vmax`
- Unitless values (`line-height`, `z-index`, `opacity`)

## Syntax

```css
.absolute { width: 300px; }         /* fixed pixels */
.percent  { width: 50%; }           /* relative to parent */
.em-unit  { font-size: 1.5em; }     /* relative to parent font-size */
.rem-unit { font-size: 1.5rem; }    /* relative to root <html> font-size */
.viewport { width: 100vw; height: 100vh; } /* relative to viewport */
.vmin-box { font-size: 5vmin; }     /* relative to smaller of vw/vh */
.line     { line-height: 1.5; }     /* unitless multiplier */
```

- `px` — absolute pixel value; does not scale with user font settings.
- `%` — relative to the parent element's corresponding property.
- `em` — relative to the **current element's** font-size (compounds when nested).
- `rem` — relative to the **root** (`html`) font-size; avoids compounding issues.
- `vw` / `vh` — 1% of viewport width/height respectively.
- `vmin` / `vmax` — 1% of the smaller/larger viewport dimension.
- Unitless numbers — used for properties like `line-height` where the value is a multiplier of the font-size.

## Important Properties

| Unit | Purpose | Syntax | Example |
|---|---|---|---|
| `px` | Fixed pixel size | `prop: Npx;` | `font-size: 16px;` |
| `%` | Relative to parent | `prop: N%;` | `width: 50%;` |
| `em` | Relative to element font-size | `prop: Nem;` | `padding: 2em;` |
| `rem` | Relative to root font-size | `prop: Nrem;` | `font-size: 1rem;` |
| `vw`/`vh` | Relative to viewport | `prop: Nvw;` | `width: 100vw;` |
| `vmin`/`vmax` | Relative to smaller/larger viewport axis | `prop: Nvmin;` | `font-size: 4vmin;` |

## Common Use Cases
- **Beginner:** fixed `px` sizing for a simple static button.
- **Practical UI:** `rem` for typography scale so the whole site resizes when root font-size changes.
- **Real-world:** a hero section using `100vh` height and `clamp()`-driven `rem` typography for full responsiveness.

## Common Errors
1. ❌ Using `em` recursively across deeply nested elements, causing unpredictable compounding sizes → ✅ use `rem` for consistent sizing independent of nesting depth.
2. ❌ `width: 100vw;` on a page with a vertical scrollbar, causing horizontal overflow → ✅ use `width: 100%;` on body-level containers instead, or account for scrollbar width.
3. ❌ `line-height: 20px;` on varying font sizes causing inconsistent spacing → ✅ use a unitless `line-height: 1.5;` so it scales proportionally with font-size.
4. ❌ Mixing `%` for `height` without the parent having a defined height → ✅ percentage heights need an ancestor with an explicit height, or use `vh` instead.
5. ❌ `margin: 2;` missing a unit → ✅ always include a unit (`margin: 2px;`) except for unitless properties or `0`.

## Common Mistakes
- Forgetting units on non-zero values (invalid CSS).
- Overusing `px` everywhere, hurting accessibility/zoom scaling.
- Not understanding `em` compounding vs `rem` stability.
- Using `vh` without considering mobile browser UI chrome affecting actual viewport height.

## Quick Reference
```css
html { font-size: 16px; }        /* 1rem = 16px */
.text { font-size: 1.25rem; }
.box  { width: 80%; padding: 1em; }
.hero { height: 100vh; }
```
`0` never needs a unit: `margin: 0;` is valid.
