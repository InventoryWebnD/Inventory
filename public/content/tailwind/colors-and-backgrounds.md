# Colors & Backgrounds

## Introduction
Tailwind ships with a carefully designed color palette (each color has shades from 50 to 950) and utilities for text, background, border and gradient colors, plus opacity modifiers.

## Subtopics
- Palette and shades (`sky-500`, `slate-900`)
- Text, background and border colors
- Opacity modifier (`bg-black/50`)
- Arbitrary colors (`bg-[#ff6b6b]`)
- Gradients: `bg-linear-to-r`, `from-*`, `via-*`, `to-*`
- Background images, size, position and repeat
- `currentColor` and `accent-*`, `caret-*`

## Syntax

```html
<p class="text-slate-700">Text color</p>
<div class="bg-sky-500 text-white">Background color</div>
<div class="bg-black/50">50% black overlay</div>
<div class="border border-rose-300">Border color</div>

<div class="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
<div class="bg-linear-65 from-amber-400 to-rose-500"></div>

<div class="bg-[url(/hero.jpg)] bg-cover bg-center"></div>
<input type="checkbox" class="accent-pink-500" />
```

- Shade 50 is the lightest, 950 the darkest; 500 is the "base".
- `/50` after a color sets its alpha (opacity) to 50%.
- v4 renames the gradient helpers: `bg-linear-to-r` (v3 was `bg-gradient-to-r`); use `bg-linear-<angle>` for custom angles.
- `bg-cover`, `bg-center`, `bg-no-repeat` control background images.

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `text-{color}` | Text color | `text-{color}-{shade}` | `text-emerald-600` |
| `bg-{color}` | Background | `bg-{color}-{shade}` | `bg-slate-100` |
| `border-{color}` | Border color | `border-{color}-{shade}` | `border-slate-200` |
| `{color}/{n}` | Opacity | `bg-black/40` | `text-white/80` |
| `bg-linear-to-*` | Gradient | `bg-linear-to-r` | with `from-` `to-` |
| `bg-cover` etc. | Background image sizing | `bg-cover` | `bg-center` |

## Common Use Cases
- **Beginner:** a primary button with `bg-indigo-600 text-white hover:bg-indigo-700`.
- **Practical UI:** a hero image overlay using `bg-black/50` on top of a photo.
- **Real-world:** gradient headline text with `bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent`.

## Common Errors
1. ❌ `bg-gradient-to-r` in a v4 project → ✅ use `bg-linear-to-r`.
2. ❌ Text unreadable on a light background (`text-slate-300` on white) → ✅ check contrast; use 600+ shades on light backgrounds.
3. ❌ `bg-blue` without a shade → ✅ use `bg-blue-500` (or define a custom color in `@theme`).
4. ❌ `from-pink-500` without `bg-linear-to-*` → ✅ gradient stops need a gradient direction class.

## Common Mistakes
- Picking random shades across the UI instead of a small consistent set.
- Using color alone to convey meaning (add icons or text).
- Forgetting `text-transparent` when using `bg-clip-text`.
- Hard-coding hex values repeatedly instead of defining theme colors.

## Quick Reference
```html
<button class="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
  Primary
</button>
<h1 class="bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-5xl font-black text-transparent">
  Gradient
</h1>
```
