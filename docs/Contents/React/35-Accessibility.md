# Accessibility in React

## Introduction

Accessible React interfaces use semantic HTML, correct labels, keyboard support, visible focus and appropriate ARIA only when necessary. Accessibility is part of UI quality, not an optional add-on.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Semantic HTML
- Labels
- `alt` text
- Keyboard navigation
- Focus management
- Buttons vs clickable divs
- ARIA basics
- Accessible forms
- Accessible modals
- Color contrast concepts

## Syntax / Core Pattern

```jsx
<label htmlFor="search">Search products</label>
<input
  id="search"
  name="search"
  value={query}
  onChange={e => setQuery(e.target.value)}
  aria-describedby="search-help"
/>
<p id="search-help">Search by product name.</p>
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Semantic element | Meaningful HTML | `button`, `nav`, `main` |
| Label | Associates text with control | `htmlFor` + `id` |
| `alt` | Image alternative | Describe meaningful images |
| ARIA | Adds accessibility semantics | Use when native HTML is insufficient |

## Common Use Cases

- **Beginner:** Accessible search forms.
- **Practical UI:** Keyboard-friendly modals.
- **Real-world:** Navigation with active state.

## Common Errors

1. ❌ **Clickable div**

```jsx
Poor keyboard semantics
```
**Why it is a problem:** Use `<button>` for actions.

2. ❌ **Missing label**

```jsx
Screen reader cannot identify input
```
**Why it is a problem:** Use visible/associated label.

3. ❌ **ARIA replacing native HTML**

```jsx
More complexity
```
**Why it is a problem:** Prefer semantic elements first.

## Common Mistakes

- Using `tabIndex` everywhere.
- Removing focus outlines without replacement.
- Making custom widgets without keyboard interaction.

## Quick Reference

```text
Semantic HTML
   +
Keyboard access
   +
Labels / names
   +
Visible focus
   =
Accessible UI
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
