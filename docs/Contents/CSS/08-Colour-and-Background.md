# Colour & Background

## Introduction
CSS offers multiple color formats and a rich set of background properties for controlling fills, images, gradients, and positioning behind content.

## Subtopics
- Color formats: keyword, hex, `rgb()`/`rgba()`, `hsl()`/`hsla()`
- `background-color`
- `background-image` and gradients
- `background-repeat`, `background-size`, `background-position`
- `background-attachment`
- Shorthand `background`

## Syntax

```css
.color-formats {
  color: tomato;               /* keyword */
  color: #ff6347;              /* hex */
  color: rgb(255, 99, 71);     /* rgb */
  color: rgba(255, 99, 71, 0.6); /* rgb + alpha */
  color: hsl(9, 100%, 64%);    /* hsl */
}

.bg-basic {
  background-color: #f5f5f5;
}

.bg-image {
  background-image: url("hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.bg-gradient {
  background-image: linear-gradient(to right, #ff7e5f, #feb47b);
}

.bg-shorthand {
  background: #fff url("pattern.png") no-repeat center / cover;
}
```

- `background-color` — fills the element's background with a solid color.
- `background-image: url()` — sets an image as the background.
- `background-size: cover` — scales the image to fully cover the box (may crop); `contain` fits the whole image without cropping.
- `background-position` — positions the image (e.g., `center`, `top left`, or coordinates).
- `background-repeat: no-repeat` — prevents tiling.
- `background-attachment: fixed` — keeps the background fixed during scroll.
- `linear-gradient()` / `radial-gradient()` — generates a gradient image without needing an actual file.

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `color` | Text color | `color: value;` | `color: #333;` |
| `background-color` | Fill color | `background-color: value;` | `background-color: white;` |
| `background-image` | Image/gradient fill | `background-image: url()/gradient();` | `background-image: linear-gradient(red, blue);` |
| `background-size` | Scale background image | `background-size: value;` | `background-size: cover;` |
| `background-position` | Position image | `background-position: value;` | `background-position: center;` |
| `background-repeat` | Tiling behavior | `background-repeat: value;` | `background-repeat: no-repeat;` |
| `background` (shorthand) | Combine all bg properties | `background: color image repeat position/size;` | `background: #fff url(x.png) center/cover;` |

## Common Use Cases
- **Beginner:** a solid `background-color` on a `<div>` card.
- **Practical UI:** a hero banner using `background-image` with `cover` sizing and `center` positioning.
- **Real-world:** a full-width parallax section combining `background-attachment: fixed` with a gradient overlay via layered `linear-gradient()` and an image.

## Common Errors
1. ❌ `background-image: hero.jpg;` (missing `url()`) → ✅ `background-image: url("hero.jpg");` — image paths must be wrapped in `url()`.
2. ❌ `background-size: 100%;` expecting full crop-fill behavior → ✅ use `background-size: cover;` to fill the box while preserving aspect ratio.
3. ❌ `color: rgb(255, 99, 71, 0.5);` mixing rgb with alpha incorrectly → ✅ use `rgba(255, 99, 71, 0.5)` (or modern `rgb(255 99 71 / 0.5)`) for transparency.
4. ❌ Forgetting `background-repeat: no-repeat`, causing an unintended tiled pattern → ✅ explicitly set `no-repeat` when a single centered image is intended.
5. ❌ `background: red url(bg.png);` overriding a previously set `background-color` unexpectedly → ✅ remember the shorthand `background` resets *all* background sub-properties; use longhand if you only want to change one.

## Common Mistakes
- Forgetting quotes or `url()` wrapper on image paths.
- Confusing `cover` vs `contain` for `background-size`.
- Using shorthand `background` and unintentionally resetting other background properties.
- Not testing gradient color stops on different screen widths.

## Quick Reference
```css
color: hsl(210, 90%, 50%);
background-color: #fafafa;
background-image: linear-gradient(135deg, #667eea, #764ba2);
background: #fff url("bg.jpg") no-repeat center / cover;
```
