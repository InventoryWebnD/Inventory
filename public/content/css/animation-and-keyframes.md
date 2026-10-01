# Animation & Keyframes

## Introduction
CSS animations allow multi-step, looping, or complex motion sequences using `@keyframes`, going beyond what simple transitions can achieve (which only animate between two states).

## Subtopics
- `@keyframes` rule definition
- `animation-name`, `animation-duration`
- `animation-timing-function`, `animation-delay`
- `animation-iteration-count`, `animation-direction`
- `animation-fill-mode`, `animation-play-state`
- `animation` shorthand
- Percentage-based keyframe steps vs `from`/`to`

## Syntax

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-20px); }
  100% { transform: translateY(0); }
}

.fade-el {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}

.bounce-el {
  animation: bounce 0.6s ease-in-out infinite;
}

.paused {
  animation-play-state: paused;
}
```

- `@keyframes name { ... }` — defines the animation sequence; steps can use `from`/`to` (equivalent to `0%`/`100%`) or explicit percentages for multi-step motion.
- `animation-name` — links an element to a defined `@keyframes` sequence.
- `animation-duration` — how long one cycle of the animation takes.
- `animation-timing-function` — easing curve applied across the animation.
- `animation-delay` — wait time before the animation starts.
- `animation-iteration-count` — number of times it plays (`1`, `3`, or `infinite`).
- `animation-direction` — `normal`, `reverse`, `alternate` (ping-pongs back and forth each iteration).
- `animation-fill-mode` — determines what styles apply before/after the animation runs (`forwards` keeps the final keyframe's styles).
- `animation-play-state` — `running` or `paused`, can be toggled (e.g., on hover) to pause an animation.
- `animation` — shorthand combining name, duration, timing-function, delay, iteration-count, direction, fill-mode.

## Important Properties

| Property | Purpose | Syntax | Example |
|---|---|---|---|
| `@keyframes` | Define animation steps | `@keyframes name {}` | `@keyframes spin {}` |
| `animation-name` | Link to keyframes | `animation-name: value;` | `animation-name: fadeIn;` |
| `animation-duration` | Cycle length | `animation-duration: value;` | `animation-duration: 2s;` |
| `animation-iteration-count` | Repeat count | `animation-iteration-count: value;` | `infinite` |
| `animation-direction` | Play direction | `animation-direction: value;` | `alternate` |
| `animation-fill-mode` | State before/after | `animation-fill-mode: value;` | `forwards` |
| `animation` | Shorthand | `animation: name dur timing delay count dir fill;` | `animation: spin 2s linear infinite;` |

## Common Use Cases
- **Beginner:** a fade-in effect on page load using `@keyframes fadeIn` and `animation-fill-mode: forwards`.
- **Practical UI:** a loading spinner using `@keyframes spin { to { transform: rotate(360deg); } }` with `animation-iteration-count: infinite`.
- **Real-world:** a notification toast that slides in, pauses, then fades out using multiple percentage-based keyframe steps combined with `animation-fill-mode: both` for clean start/end states.

## Common Errors
1. ❌ `.el { animation: fadeIn 1s; }` with no `@keyframes fadeIn` defined anywhere → ✅ define `@keyframes fadeIn { from {...} to {...} }` before referencing it, or the animation silently does nothing.
2. ❌ `@keyframes bounce { 0% {...} 50% {...} }` missing a `100%` step, leaving the end state undefined → ✅ always define a clear final step (`100%` or `to`) for predictable looping/ending behavior.
3. ❌ Expecting the element to stay in its final animated state after completion → ✅ add `animation-fill-mode: forwards;` — by default, the element reverts to its original (pre-animation) styles once finished.
4. ❌ `animation-iteration-count: unlimited;` (invalid keyword) → ✅ the correct keyword is `infinite`.
5. ❌ Animating `top`/`left`/`width` for motion effects, causing janky performance → ✅ animate `transform`/`opacity` within `@keyframes` instead, since they're GPU-accelerated.

## Common Mistakes
- Referencing an `animation-name` that doesn't match any defined `@keyframes`.
- Forgetting `animation-fill-mode: forwards` when the end state should persist.
- Using `unlimited` instead of the correct `infinite` keyword.
- Animating layout-triggering properties instead of `transform`/`opacity`.
- Overcomplicating with too many keyframe steps instead of using `animation-timing-function` for smoother easing.

## Quick Reference
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.el {
  animation: fadeIn 0.6s ease-out forwards;
}
.spinner {
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```
