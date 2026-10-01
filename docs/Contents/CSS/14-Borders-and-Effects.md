# Borders & Effects

## Introduction
Borders define an element's visible edge, while visual effects like shadows and `object-fit` shape how content and media appear inside their containers.

## Subtopics
- `border` shorthand and longhand (`border-width`, `border-style`, `border-color`)
- `border-radius` (rounded corners)
- `box-shadow`
- `text-shadow`
- `object-fit` / `object-position` (media sizing)
- `filter` (blur, brightness, etc.)
- `opacity`

## Syntax

```css
.bordered {
  border: 2px solid #333;
  border-radius: 8px;
}

.custom-sides {
  border-top: 1px solid red;
  border-bottom: 3px dashed blue;
}

.rounded-circle {
  border-radius: 50%;
}

.shadowed {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.text-shadowed {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.fitted-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

.blurred {
  filter: blur(4px) brightness(0.9);
}

.faded {
  opacity: 0.6;
}
```

- `border` — shorthand for `width style color` (e.g., `2px solid black`); a `style` value (`solid`, `dashed`, `dotted`) is required for the border to render.
- `border-radius` — rounds corners; `50%` on an equally sized square element creates a circle.
- `box-shadow: x y blur spread color` — adds a drop shadow outside (or `inset` for inside) the box.
- `text-shadow: x y blur color` — adds a shadow behind text.
- `object-fit` — controls how replaced content (img/video) fills its box: `cover` (crop to fill), `contain` (fit without cropping), `fill` (stretch).
- `object-position` — adjusts the focal point of the fitted content.
- `filter` — applies graphical effects like `blur()`, `brightness()`, `grayscale()`, `contrast()`.
- `opacity` — controls overall transparency (0 = invisible, 1 = fully opaque); affects the whole element including children.

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `border` | Edge line shorthand | `border: w style color;` | `border: 1px solid #000;` |
| `border-radius` | Rounded corners | `border-radius: value;` | `border-radius: 12px;` |
| `box-shadow` | Drop shadow on box | `box-shadow: x y blur color;` | `box-shadow: 0 2px 8px #0003;` |
| `text-shadow` | Shadow on text | `text-shadow: x y blur color;` | `text-shadow: 1px 1px #000;` |
| `object-fit` | Media scaling behavior | `object-fit: value;` | `object-fit: cover;` |
| `filter` | Graphical effects | `filter: fn();` | `filter: grayscale(100%);` |
| `opacity` | Transparency | `opacity: value;` | `opacity: 0.5;` |

## Common Use Cases
- **Beginner:** a rounded card with `border-radius: 8px` and a subtle `box-shadow`.
- **Practical UI:** a profile avatar image using `border-radius: 50%` combined with `object-fit: cover` so non-square photos still fill a circle correctly.
- **Real-world:** an image gallery grid where every `<img>` uses `object-fit: cover` to maintain uniform card heights regardless of original image aspect ratio, with a hover `filter: brightness(1.1)` transition.

## Common Errors
1. ❌ `border: 2px #000;` (missing style) → ✅ `border: 2px solid #000;` — a border style keyword is required or the border won't render.
2. ❌ `border-radius: 50%;` on a non-square element expecting a perfect circle → ✅ ensure equal `width` and `height` first, then apply `border-radius: 50%;`.
3. ❌ `<img>` distorted/stretched inside a fixed-size box → ✅ add `object-fit: cover;` (or `contain`) so the image scales properly without distortion.
4. ❌ `box-shadow: black 2px 2px;` with color placed first (order-sensitive in some legacy expectations) → ✅ modern syntax is flexible but the safest order is `offset-x offset-y blur spread color`, e.g. `box-shadow: 2px 2px 4px black;`.
5. ❌ Using `opacity: 0.5;` on a parent expecting only the background to fade, but child text fades too → ✅ use `rgba()`/`hsla()` on the specific `background-color` instead of `opacity` on the whole element if only the background should be transparent.

## Common Mistakes
- Forgetting `border-style`, causing an invisible border.
- Assuming `opacity` only affects background, not entire element + children.
- Not setting `object-fit` on images in fixed-aspect containers, causing distortion.
- Overusing heavy `filter`/`box-shadow` effects, hurting rendering performance.

## Quick Reference
```css
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
img { object-fit: cover; }
.avatar { border-radius: 50%; }
```
