# React Project Architecture

## Introduction

A React project becomes easier to scale when files are organized around responsibilities and features. There is no single mandatory folder structure; consistency and ownership matter more than a fashionable layout.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `src`
- Components
- Pages
- Hooks
- Context
- Services/API
- Utils
- Assets
- Layouts
- Feature folders
- Separation of concerns

## Syntax / Core Pattern

```text
src/
├── components/
├── pages/
├── features/
├── hooks/
├── context/
├── services/
├── utils/
├── assets/
├── App.jsx
└── main.jsx
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| components | Reusable UI | Button/Card |
| pages | Route-level screens | ProductsPage |
| services | API/data access | productService.js |
| hooks | Reusable stateful logic | useProducts |
| features | Domain-specific modules | features/inventory |

## Common Use Cases

- **Beginner:** Inventory feature folder.
- **Practical UI:** Dashboard with multiple pages.
- **Real-world:** Shared design-system components.

## Common Errors

1. ❌ **Everything in `App.jsx`**

```jsx
Hard to maintain
```
**Why it is a problem:** Split by responsibility.

2. ❌ **Generic utils dumping ground**

```jsx
Unclear ownership
```
**Why it is a problem:** Keep utilities focused.

3. ❌ **Circular dependencies**

```jsx
Architecture becomes fragile
```
**Why it is a problem:** Define dependency direction.

## Common Mistakes

- Overengineering tiny projects.
- Creating folders without clear responsibility.
- Mixing API calls into every presentational component.

## Quick Reference

```text
UI → feature/page
       ↓
hooks / state
       ↓
services
       ↓
API
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
