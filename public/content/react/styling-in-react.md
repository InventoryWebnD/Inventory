# Styling in React

## Introduction
React does not force a styling method. You can use plain CSS files, **CSS Modules** (locally scoped class names), inline `style` objects, utility CSS like **Tailwind**, or CSS-in-JS libraries. For most Vite projects, CSS Modules or Tailwind are the practical default choices because they avoid global class name collisions.

## Subtopics
- Global CSS (`import "./index.css"`)
- `className` instead of `class`
- CSS Modules (`*.module.css`)
- Inline styles (`style={{ }}`)
- Conditional classes
- Tailwind CSS
- CSS variables and theming
- CSS-in-JS overview
- Responsive design and media queries

## Syntax
```jsx
// Button.module.css
// .btn { padding: 8px 16px; border-radius: 6px; }
// .primary { background: royalblue; color: white; }

import styles from "./Button.module.css";

function Button({ primary, children }) {
  return (
    <button className={`${styles.btn} ${primary ? styles.primary : ""}`}>
      {children}
    </button>
  );
}
```

```jsx
// Inline style: object with camelCase keys, numbers become px
<div style={{ backgroundColor: "teal", padding: 16, marginTop: "1rem" }} />

// Conditional classes
<li className={`item ${done ? "done" : ""} ${selected ? "selected" : ""}`} />

// Tailwind
<button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Save</button>

// CSS variable driven from state
<div style={{ "--accent": color }} className="card" />
```

## Important Methods & Properties
| Method | Strength | Example |
|---|---|---|
| Global CSS | Simple, base styles | `import "./index.css"` |
| CSS Modules | Scoped class names | `styles.card` |
| Inline style | Dynamic values | `style={{ width: pct + "%" }}` |
| Tailwind | Fast utility classes | `className="p-4 flex"` |
| CSS variables | Themes | `var(--accent)` |
| `clsx` / `classnames` | Clean conditional classes | `clsx("btn", { active })` |

## Common Use Cases
- **Beginner:** a single `App.css` for the whole page.
- **Practical UI:** scoped styles for a reusable `Card`.
- **Real-world application:** a design system with Tailwind or CSS Modules and theme variables.

## Common Errors
1. ❌
```jsx
<div class="card" style="color: red">Hi</div>
```
**Why it fails:** JSX needs `className`, and `style` must be an object.
✅
```jsx
<div className="card" style={{ color: "red" }}>Hi</div>
```
**Explanation:** Use JSX property names.

2. ❌
```jsx
<div style={{ background-color: "red" }} />
```
**Why it fails:** Hyphenated names are invalid JavaScript object keys.
✅
```jsx
<div style={{ backgroundColor: "red" }} />
```
**Explanation:** Use camelCase for CSS properties.

3. ❌
```jsx
// Header.css: .title { color: red }      Footer.css: .title { color: blue }
```
**Why it fails:** Plain CSS is global, so the two `.title` classes collide.
✅
```jsx
import styles from "./Header.module.css";
<h1 className={styles.title}>...</h1>
```
**Explanation:** CSS Modules give each file its own scope.

4. ❌
```jsx
<div className="box" style={{ ":hover": { color: "red" } }} />
```
**Why it fails:** Inline styles cannot express hover, media queries or pseudo-elements.
✅
```jsx
<div className="box" />   /* .box:hover { color: red } */
```
**Explanation:** Use CSS (or Tailwind variants) for pseudo-classes and media queries.

## Common Mistakes
- Using `class` instead of `className`.
- Putting all styling inline.
- Global class names clashing across components.
- Building `"btn " + undefined` class strings (use `clsx`).
- Forgetting to import the CSS file.

## Quick Reference
```jsx
import "./App.css";
import styles from "./Card.module.css";
<div className={styles.card} />
<div className={clsx("btn", isActive && "active")} />
<div style={{ fontSize: 20, color: "tomato" }} />
```
