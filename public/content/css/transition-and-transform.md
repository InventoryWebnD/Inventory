# Transition & Transform

## Introduction
Transitions animate property changes smoothly over time, while transforms let elements move, rotate, scale, or skew without affecting document flow — together they create polished, interactive UI without JavaScript.

## Subtopics
- `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`
- `transition` shorthand
- `transform` functions: `translate()`, `rotate()`, `scale()`, `skew()`
- Combining multiple transforms
- `transform-origin`
- Performance notes (transform/opacity are GPU-accelerated)

## Syntax

```css
.button {
  background: #3366ff;
  transition: background-color 0.3s ease, transform 0.2s ease-out;
}
.button:hover {
  background-color: #254eda;
  transform: scale(1.05);
}

.moved     { transform: translate(20px, 10px); }
.rotated   { transform: rotate(45deg); }
.scaled    { transform: scale(1.5); }
.skewed    { transform: skew(10deg, 5deg); }
.combined  { transform: translateX(20px) rotate(10deg) scale(1.1); }

.origin-box {
  transform: rotate(45deg);
  transform-origin: top left;
}
```

- `transition-property` — which CSS property to animate (e.g., `background-color`, `all`).
- `transition-duration` — how long the transition takes (e.g., `0.3s`).
- `transition-timing-function` — the easing curve (`ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()`).
- `transition-delay` — wait time before the transition starts.
- `transition` — shorthand combining property, duration, timing-function, delay.
- `translate(x, y)` — moves an element without affecting layout flow.
- `rotate(deg)` — rotates an element around its origin point.
- `scale(x, y)` — resizes an element (1 = 100%, no change).
- `skew(x-deg, y-deg)` — slants an element along X/Y axes.
- Multiple transform functions can be combined in one declaration, applied left to right.
- `transform-origin` — sets the pivot point for rotate/scale/skew (default is `center`).

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `transition` | Animate property changes | `transition: prop duration timing delay;` | `transition: all 0.3s ease;` |
| `transition-timing-function` | Easing curve | `transition-timing-function: value;` | `ease-in-out` |
| `transform` | Move/rotate/scale/skew | `transform: fn();` | `transform: scale(1.2);` |
| `transform-origin` | Pivot point | `transform-origin: value;` | `transform-origin: bottom right;` |

## Common Use Cases
- **Beginner:** a button that smoothly changes `background-color` on `:hover` using `transition`.
- **Practical UI:** a card that lifts slightly with `transform: translateY(-5px)` and a shadow transition on hover.
- **Real-world:** an interactive icon menu combining `rotate()` and `scale()` transforms with staggered `transition-delay` for a polished micro-interaction sequence.

## Common Errors
1. ❌ `transition: 0.3s;` with no property specified → ✅ `transition: all 0.3s ease;` (or a specific property) — a duration alone without a valid property list may not behave as intended in all cases; be explicit.
2. ❌ Expecting `transition` to animate `display: none` to `display: block` → ✅ `display` is not animatable; use `opacity`/`visibility` combined with `transition` instead, or `transform: scale(0)`.
3. ❌ `transform: translate(20px 10px);` missing comma between values → ✅ `transform: translate(20px, 10px);` — function arguments need commas.
4. ❌ Applying `transition` to the element itself but expecting the `:hover` state transition to reverse smoothly too → ✅ the `transition` property should be on the base selector (not just `:hover`) so both directions animate.
5. ❌ Animating `width`/`height`/`top`/`left` for movement (causes layout reflow, poor performance) → ✅ prefer `transform: translate()`/`scale()`, which are GPU-accelerated and don't trigger layout recalculation.

## Common Mistakes
- Putting `transition` only on `:hover` instead of the base class.
- Trying to transition non-animatable properties like `display`.
- Forgetting commas between transform function arguments.
- Overusing layout-triggering properties (`width`, `top`) instead of `transform` for animation.

## Quick Reference
```css
.el {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.el:hover {
  transform: scale(1.05) rotate(2deg);
  opacity: 0.9;
}
```
