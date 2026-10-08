# Responsive Design

## Introduction
Tailwind is mobile-first: unprefixed utilities apply to every screen size, and breakpoint prefixes like `md:` apply from that width and up. This makes responsive design a matter of adding a few prefixed classes.

## Subtopics
- Mobile-first approach
- Default breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Targeting a range with `max-*`
- Custom breakpoints in `@theme`
- Container queries: `@container`, `@md:`
- Responsive visibility, spacing and typography
- Testing with the `<meta name="viewport">` tag

## Syntax

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />

<div class="text-base md:text-lg lg:text-xl">Responsive text</div>

<div class="flex flex-col gap-4 md:flex-row">Stack, then row</div>

<nav class="hidden md:flex">Desktop menu</nav>
<button class="md:hidden">Mobile menu button</button>

<div class="md:max-lg:bg-sky-100">Only between md and lg</div>

<div class="@container">
  <div class="grid grid-cols-1 @md:grid-cols-2">Responds to parent width</div>
</div>
```

```css
@theme {
  --breakpoint-3xl: 120rem;
}
```

- `sm` 40rem (640px), `md` 48rem (768px), `lg` 64rem (1024px), `xl` 80rem (1280px), `2xl` 96rem (1536px).
- `max-md:` applies below `md`; `md:max-lg:` applies only in that range.
- `@container` + `@md:` style an element by its container's width instead of the viewport.

## Important Properties

| Prefix | Purpose | Syntax | Example |
|---|---|---|---|
| `sm:` | ≥ 640px | `sm:{utility}` | `sm:px-6` |
| `md:` | ≥ 768px | `md:{utility}` | `md:grid-cols-2` |
| `lg:` | ≥ 1024px | `lg:{utility}` | `lg:flex` |
| `max-md:` | < 768px | `max-md:{utility}` | `max-md:hidden` |
| `@md:` | Container ≥ md | `@md:{utility}` | `@md:flex-row` |

## Common Use Cases
- **Beginner:** one column on phones, two on tablets, four on desktop with `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- **Practical UI:** a hamburger button on mobile (`md:hidden`) and full menu on desktop (`hidden md:flex`).
- **Real-world:** reusable cards that adapt to their sidebar or main-column width with container queries.

## Common Errors
1. ❌ `sm:text-center` expecting it to target only small screens → ✅ `sm:` means "small and up"; use `max-sm:` or `sm:max-md:` for ranges.
2. ❌ Designing desktop first with `lg:` overrides everywhere → ✅ write the mobile layout unprefixed, then enhance upward.
3. ❌ Missing the viewport meta tag → ✅ add it or breakpoints will not behave on phones.
4. ❌ Using viewport breakpoints for components reused in different widths → ✅ use container queries (`@container`).

## Common Mistakes
- Testing only at desktop width.
- Adding too many breakpoints when fluid utilities (`max-w-*`, `auto-fit`) would do.
- Forgetting touch-target size on mobile (use at least `h-10`/`p-3`).
- Hiding critical content on small screens.

## Quick Reference
```html
<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl border p-6">Card</div>
  </div>
</div>
```
