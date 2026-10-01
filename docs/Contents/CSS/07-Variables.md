# Variables

## Introduction
CSS **custom properties** (variables) let you store reusable values — colors, spacing, fonts — in one place and reference them throughout a stylesheet, making themes and maintenance far easier.

## Subtopics
- Declaring custom properties (`--name: value;`)
- Scope: `:root` (global) vs local (component-scoped)
- Using `var()` with fallbacks
- Overriding variables per selector/media query
- Dynamic theming (e.g., light/dark mode)

## Syntax

```css
:root {
  --main-color: #3366ff;
  --spacing: 16px;
  --font-stack: 'Segoe UI', sans-serif;
}

.button {
  background: var(--main-color);
  padding: var(--spacing);
  font-family: var(--font-stack);
}

.card {
  --card-padding: 24px;   /* locally scoped, only affects .card and descendants */
  padding: var(--card-padding);
}

.fallback-example {
  color: var(--undefined-color, black);
}

@media (prefers-color-scheme: dark) {
  :root {
    --main-color: #99aaff;
    --bg-color: #111;
  }
}
```

- `--name: value;` — defines a custom property; must start with `--` and can hold any valid CSS value.
- `:root` — the highest-level scope (the `<html>` element), making variables globally available.
- `var(--name, fallback)` — retrieves the variable's value; the optional second argument is used if the variable is undefined.
- Local declarations inside a selector (like `.card`) override the global value only within that selector's scope.

## Important Properties

| Concept | Purpose | Syntax | Example |
|---|---|---|---|
| Custom property | Store reusable value | `--name: value;` | `--gap: 12px;` |
| `var()` | Retrieve variable | `var(--name)` | `var(--gap)` |
| Fallback | Default if unset | `var(--name, fallback)` | `var(--gap, 10px)` |
| `:root` scope | Global availability | `:root { --x: y; }` | `:root { --brand: teal; }` |
| Local scope | Component-limited override | `.selector { --x: y; }` | `.card { --pad: 20px; }` |

## Common Use Cases
- **Beginner:** a single `--main-color` variable reused across headings and buttons.
- **Practical UI:** a `.card` component with its own `--card-padding` that can be overridden per instance.
- **Real-world:** a full light/dark theming system toggled via `prefers-color-scheme` or a `data-theme` attribute, swapping dozens of variables at once.

## Common Errors
1. ❌ `main-color: blue;` (missing `--` prefix) → ✅ `--main-color: blue;` — custom properties must start with two dashes.
2. ❌ `color: --main-color;` (forgetting `var()`) → ✅ `color: var(--main-color);` — variables must be read through `var()`.
3. ❌ Declaring `--spacing: 16px;` inside `.card` but expecting it to be usable in unrelated `.footer` → ✅ declare shared variables on `:root` for global access.
4. ❌ `var(--missing)` with no fallback breaking the layout silently → ✅ `var(--missing, 10px);` — always provide sensible fallbacks for optional variables.
5. ❌ Using a variable before it's declared later in the same cascade without scope awareness → ✅ declare variables in `:root` or an ancestor before they're referenced in descendant selectors.

## Common Mistakes
- Forgetting the `--` prefix on declarations.
- Trying to use variables directly without `var()`.
- Declaring important shared variables too locally, breaking reuse.
- Not accounting for cascade/scope when a variable seems to "not work" in a specific nested context.

## Quick Reference
```css
:root {
  --primary: #2563eb;
  --radius: 8px;
}
.box {
  background: var(--primary);
  border-radius: var(--radius, 4px);
}
```
