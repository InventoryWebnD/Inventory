# Utility-First Fundamentals

## Introduction
The utility-first workflow means styling by combining many small classes, each doing one job. It keeps styles next to the markup, removes the need to invent class names, and keeps your CSS from growing as the project grows.

## Subtopics
- Utility classes vs traditional CSS classes
- Reading a class list (spacing, color, size, state)
- Arbitrary values with square brackets
- Arbitrary properties
- The `!important` modifier
- Class order and conflicts
- Extracting repetition into components

## Syntax

```html
<!-- Traditional CSS -->
<div class="chat-notification">...</div>

<!-- Utility-first -->
<div class="flex items-center gap-4 rounded-xl bg-white p-6 shadow-lg">
  <img class="size-12 shrink-0" src="/logo.svg" alt="Logo" />
  <p class="text-slate-500">You have a new message!</p>
</div>

<!-- Arbitrary values -->
<div class="top-[117px] w-[calc(100%-2rem)] bg-[#316ff6]"></div>

<!-- Arbitrary property -->
<div class="[mask-type:luminance]"></div>

<!-- Important modifier -->
<p class="font-bold!">Always bold</p>
```

- Each utility maps to one declaration (`p-4` → `padding: 1rem`).
- `[...]` lets you use any one-off value without leaving the markup.
- A trailing `!` (v4 syntax) makes a utility `!important`.
- Conflicting utilities are resolved by Tailwind's CSS order, not the order you type them in.

## Important Properties

| Feature | Purpose | Syntax | Example |
|---|---|---|---|
| Utility | Single-purpose style | `name-value` | `mt-4` |
| Arbitrary value | One-off value | `name-[value]` | `w-[42rem]` |
| Arbitrary property | Any CSS property | `[prop:value]` | `[scroll-snap-type:x]` |
| Important | Force priority | `utility!` | `hidden!` |
| Spacing scale | Consistent steps | number × 0.25rem | `p-4` = 1rem |

## Common Use Cases
- **Beginner:** replace a custom `.card` class with `rounded-lg border p-4 shadow`.
- **Practical UI:** build a one-off hero section with `bg-[url(/hero.jpg)] min-h-[60vh]` without touching a stylesheet.
- **Real-world:** wrap repeated markup in a React component so the long class list lives in exactly one place.

## Common Errors
1. ❌ `class="p-4 p-8"` expecting the last one to win → ✅ keep only one value per property, or use a conditional helper such as `clsx`/`tailwind-merge`.
2. ❌ `w-[calc(100% - 2rem)]` with spaces → ✅ use underscores for spaces: `w-[calc(100%_-_2rem)]` (or no spaces where valid).
3. ❌ Overusing arbitrary values for everything → ✅ prefer the scale and add design tokens with `@theme` for repeated values.
4. ❌ Copy-pasting the same 15 classes in many places → ✅ extract a component (React, Vue, partial) instead.

## Common Mistakes
- Fighting the framework by writing custom CSS for things utilities already cover.
- Thinking long class lists are "messy" — they are readable once extracted into components.
- Using `!` everywhere to win specificity wars rather than fixing the cause.
- Forgetting that spaces inside arbitrary values must be written as underscores.

## Quick Reference
```html
<div class="mx-auto max-w-md rounded-xl bg-white p-6 shadow-lg ring-1 ring-black/5">
  <h2 class="text-xl font-semibold text-slate-900">Card title</h2>
  <p class="mt-2 text-slate-600">Card description.</p>
</div>
```
