# Styling React Applications

## Introduction

React does not force one styling method. A project can use regular CSS, CSS Modules, inline styles, utility classes such as Tailwind, or a component library. The important skill is predictable, maintainable styling.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- External CSS
- CSS Modules
- Inline styles
- Conditional classes
- Tailwind CSS
- CSS variables
- Responsive classes
- Theme classes
- Component-scoped styles

## Syntax / Core Pattern

```jsx
// CSS class
<div className="card">...</div>

// CSS Module
import styles from "./Card.module.css";
<div className={styles.card}>...</div>

// Inline style
<div style={{ padding: 16, borderRadius: 8 }}>...</div>

// Conditional class
<div className={isActive ? "card active" : "card"} />
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| CSS | Traditional stylesheet | `className="card"` |
| CSS Module | Locally scoped class names | `styles.card` |
| Inline style | JS object | `style={{ color: 'red' }}` |
| Utility CSS | Small utility classes | Tailwind |

## Common Use Cases

- **Beginner:** Reusable card components.
- **Practical UI:** Dark/light themes.
- **Real-world:** Responsive dashboard layout.

## Common Errors

1. ❌ **Using `class`**

```jsx
JSX requires `className`
```
**Why it is a problem:** Use React attribute.

2. ❌ **Dynamic style as string**

```jsx
Invalid style object
```
**Why it is a problem:** Use object syntax.

3. ❌ **Conflicting styling systems**

```jsx
Hard to debug
```
**Why it is a problem:** Define project conventions.

## Common Mistakes

- Huge inline style objects.
- Mixing Tailwind and CSS without a convention.
- Encoding complex state logic inside class strings.

## Quick Reference

```jsx
<div className={isActive ? "card active" : "card"}>
  ...
</div>
```

## Inventory Checkpoints

A strong candidate should be able to:

1. **Explain** the concept in simple words.
2. **Write** a working implementation without blindly copying a tutorial.
3. **Debug** at least one common mistake.
4. **Combine** this topic with previously learned React concepts.
5. **Recognize** when the concept should *not* be used.

## Practical Challenge Ideas

- Build a small feature using this topic from scratch.
- Modify an existing component so the topic becomes necessary.
- Debug a deliberately broken implementation.
- Combine this topic with state, props, events and API data where appropriate.
