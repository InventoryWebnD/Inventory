# Transitions & Animations

## Introduction
Tailwind makes motion easy: `transition` utilities smooth state changes, `transform` utilities move, scale and rotate elements, and built-in `animate-*` classes provide spinners, pulses, bounces and more. You can also define your own keyframes in `@theme`.

## Subtopics
- `transition`, `duration-*`, `ease-*`, `delay-*`
- Transforms: `scale-*`, `rotate-*`, `translate-*`
- Built-in animations: `animate-spin`, `animate-ping`, `animate-pulse`, `animate-bounce`
- Custom animations with `@theme` and `@keyframes`
- Starting styles with `starting:`
- Respecting reduced motion: `motion-safe:` / `motion-reduce:`
- Performance (animate `transform` and `opacity`)

## Syntax

```html
<button class="transition duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
  Hover me
</button>

<div class="size-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
<div class="animate-pulse rounded bg-slate-200 h-4 w-40"></div>

<p class="motion-safe:animate-bounce">Only if motion is allowed</p>

<div class="starting:opacity-0 transition-opacity duration-500">Fades in when inserted</div>
```

```css
@import "tailwindcss";

@theme {
  --animate-fade-up: fade-up 0.6s ease-out both;

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(1rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

```html
<h1 class="animate-fade-up">Custom animation</h1>
```

- `transition` animates color, background, border, shadow, opacity and transform by default.
- `duration-300`, `ease-in-out`, `delay-150` fine-tune timing.
- `--animate-*` theme variables become `animate-*` utilities automatically.
- `motion-reduce:` lets you turn motion off for users who prefer less movement.

## Important Properties

| Utility | Purpose | Syntax | Example |
|---|---|---|---|
| `transition` | Enable transitions | `transition` | `transition-colors` |
| `duration-*` | Length of transition | `duration-{ms}` | `duration-300` |
| `ease-*` | Timing function | `ease-{type}` | `ease-in-out` |
| `scale-*` / `rotate-*` | Transform | `scale-{n}` | `hover:scale-110` |
| `animate-*` | Keyframe animation | `animate-{name}` | `animate-spin` |
| `motion-safe:` | Respect preferences | `motion-safe:{utility}` | `motion-safe:animate-pulse` |

## Common Use Cases
- **Beginner:** smooth button hover with `transition hover:bg-sky-500`.
- **Practical UI:** loading spinner and skeleton placeholders with `animate-spin` and `animate-pulse`.
- **Real-world:** staggered fade-up reveals with a custom `--animate-fade-up` and `delay-*` classes.

## Common Errors
1. ❌ Adding `hover:scale-110` with no `transition` → ✅ add `transition` (or `transition-transform`) so it animates.
2. ❌ `animate-bounce` on important text for every user → ✅ wrap in `motion-safe:` and keep it subtle.
3. ❌ `transition-all` on large elements causing jank → ✅ transition only the properties you need (`transition-transform`).
4. ❌ Defining `@keyframes` outside `@theme` and expecting `animate-*` → ✅ define `--animate-name` in `@theme`.

## Common Mistakes
- Overusing animation until the interface feels slow.
- Animating `width`, `height`, `top` or `left` instead of transforms.
- Ignoring `prefers-reduced-motion`.
- Very long durations (over about 500ms) on interactive feedback.

## Quick Reference
```html
<a class="group inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg motion-reduce:transition-none">
  Get started
  <span class="transition group-hover:translate-x-1">→</span>
</a>
```
