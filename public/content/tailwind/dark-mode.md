# Dark Mode

## Introduction
Tailwind's `dark:` variant applies styles when dark mode is active. By default it follows the operating system preference, and you can switch to a manual toggle (class or data attribute) with one line of CSS.

## Subtopics
- The `dark:` variant
- System preference (`prefers-color-scheme`) default
- Manual toggle with a `.dark` class
- Persisting the choice in `localStorage`
- Avoiding the flash of the wrong theme
- Designing with semantic color tokens
- `color-scheme` utilities

## Syntax

```html
<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
  Adapts to the theme
</div>
```

```css
/* Manual toggle: dark mode when an ancestor has .dark */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```js
// toggle + persist
function setTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

// run early in <head> to avoid a flash
if (localStorage.theme === "dark" ||
   (!("theme" in localStorage) && matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
}
```

- With no configuration, `dark:` uses the OS setting.
- `@custom-variant dark (...)` redefines what "dark" means (class or `data-theme`).
- Put the early script in `<head>` so the page is themed before it paints.

## Important Properties

| Feature | Purpose | Syntax | Example |
|---|---|---|---|
| `dark:` | Dark-only styles | `dark:{utility}` | `dark:bg-slate-900` |
| `@custom-variant` | Redefine dark | `@custom-variant dark (...)` | class strategy |
| `.dark` class | Manual switch | `<html class="dark">` | theme toggle |
| `color-scheme` | Native controls | `scheme-dark` | dark scrollbars |
| CSS variables | Semantic tokens | `bg-(--surface)` | one class, both themes |

## Common Use Cases
- **Beginner:** add `dark:bg-slate-900 dark:text-white` to the page wrapper.
- **Practical UI:** a sun/moon toggle button that flips the `dark` class and saves the choice.
- **Real-world:** semantic tokens (`--background`, `--foreground`) defined for both themes so components need no `dark:` classes at all.

## Common Errors
1. ❌ Toggling `.dark` but nothing changes in v4 → ✅ declare `@custom-variant dark (&:where(.dark, .dark *));`.
2. ❌ A white flash on load for dark users → ✅ set the class with an inline script in `<head>` before first paint.
3. ❌ Pure black text on pure white backgrounds in light theme only → ✅ define both themes explicitly and check contrast in each.
4. ❌ Forgetting borders and shadows in dark mode → ✅ review borders, rings and shadows; they often need a `dark:` counterpart.

## Common Mistakes
- Adding `dark:` to every element rather than using shared color tokens.
- Not testing form controls and scrollbars in dark mode.
- Storing the theme but ignoring the system preference on first visit.
- Using pure `#000` backgrounds, which look harsh next to white text.

## Quick Reference
```html
<html class="dark">
  <body class="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <button class="rounded bg-slate-900 px-3 py-1 text-white dark:bg-white dark:text-slate-900">
      Toggle
    </button>
  </body>
</html>
```
