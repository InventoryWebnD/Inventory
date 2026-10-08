# Borders, Shadows & Effects

## Introduction
Borders, rounded corners, shadows, rings, blur and opacity add depth and polish to a design. Tailwind exposes all of them as short utilities that can be combined and animated.

## Subtopics
- Border width, style and color
- Rounded corners: `rounded-*`
- Divide utilities (`divide-y`)
- Box shadows: `shadow-*` and colored shadows
- Rings and outlines: `ring-*`, `outline-*`
- Opacity, blur and `backdrop-blur-*`
- Overflow, `object-fit` and aspect ratio

## Syntax

```html
<div class="border-2 border-slate-300 rounded-xl">Bordered box</div>
<div class="rounded-full size-12 bg-sky-500"></div>

<ul class="divide-y divide-slate-200">
  <li class="py-2">One</li>
  <li class="py-2">Two</li>
</ul>

<div class="shadow-lg shadow-sky-500/30">Soft colored shadow</div>
<button class="focus:ring-4 focus:ring-indigo-300">Focus ring</button>

<div class="bg-white/30 backdrop-blur-md">Glass card</div>
<img class="aspect-video w-full rounded-lg object-cover" src="/photo.jpg" alt="" />
```

- `border` = 1px; `border-2`, `border-4` for thicker; `border-t`, `border-x` for single sides.
- `rounded-lg`, `rounded-2xl`, `rounded-full` control the radius.
- `shadow-md` → `shadow-2xl` scale up; `shadow-{color}/{opacity}` colors the shadow.
- `ring-*` draws an outline-like shadow that does not affect layout.
- `backdrop-blur-*` blurs what is behind the element (frosted glass).

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `border-*` | Border width | `border-{n}` | `border-2` |
| `rounded-*` | Corner radius | `rounded-{size}` | `rounded-xl` |
| `shadow-*` | Box shadow | `shadow-{size}` | `shadow-lg` |
| `ring-*` | Ring outline | `ring-{n}` | `ring-2 ring-sky-500` |
| `opacity-*` | Transparency | `opacity-{n}` | `opacity-50` |
| `blur-*` | Blur the element | `blur-{size}` | `blur-sm` |
| `aspect-*` | Aspect ratio | `aspect-{ratio}` | `aspect-square` |

## Common Use Cases
- **Beginner:** round a card and add depth with `rounded-xl shadow-md`.
- **Practical UI:** show keyboard focus with `focus-visible:ring-2 focus-visible:ring-indigo-500`.
- **Real-world:** frosted navigation bar using `sticky top-0 bg-white/70 backdrop-blur`.

## Common Errors
1. ❌ `border` expecting a visible color on a dark theme → ✅ v4 defaults to `currentColor`; set a color such as `border-slate-200`.
2. ❌ `rounded-lg` on an image without clipping → ✅ add `overflow-hidden` to the wrapper or round the `<img>` itself.
3. ❌ `backdrop-blur` without a translucent background → ✅ add `bg-white/30` (or similar) so the blur shows.
4. ❌ Using `outline-none` to remove focus indication → ✅ replace it with a visible `focus-visible:ring-*` style.

## Common Mistakes
- Stacking heavy shadows and blurs that hurt performance on low-end devices.
- Using `opacity-*` on a parent when only the background should be transparent (use `bg-black/50`).
- Making focus styles invisible and breaking keyboard accessibility.
- Mixing too many radius sizes in one design.

## Quick Reference
```html
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 ring-1 ring-black/5">
  Card
</div>
```
