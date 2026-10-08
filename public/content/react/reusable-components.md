# Reusable Component Design

## Introduction

Reusable components expose a clear API through props and composition. Good reusable components are flexible enough for multiple contexts but not so generic that their behavior becomes difficult to understand.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Component API
- Props design
- Composition
- `children`
- Variants
- Controlled components
- Defaults
- Reusable buttons/cards/modals/tables
- Separation of concerns

## Syntax / Core Pattern

```jsx
function Button({ variant = "primary", disabled = false, children, onClick }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Composition | Pass JSX as children | `<Card><Info /></Card>` |
| Variant | Controlled visual mode | `variant="danger"` |
| Controlled | Parent owns value | `value` + `onChange` |
| API | Props contract | Inputs/outputs of component |

## Common Use Cases

- **Beginner:** Button system.
- **Practical UI:** Reusable modal.
- **Real-world:** Data table with configurable columns.

## Common Errors

1. ❌ **Too many boolean props**

```jsx
`large`, `danger`, `outline`, `rounded` combinations
```
**Why it is a problem:** Use a clear variant API.

2. ❌ **Hidden behavior**

```jsx
Component silently fetches unrelated data
```
**Why it is a problem:** Keep reusable UI predictable.

3. ❌ **Over-generic component**

```jsx
Hard-to-understand prop matrix
```
**Why it is a problem:** Extract domain-specific components when needed.

## Common Mistakes

- Making components reusable before a second use case exists.
- Passing dozens of props.
- Coupling generic components to one page.

## Quick Reference

```jsx
<Component
  variant="primary"
  size="md"
  onClick={handleClick}
>
  Save
</Component>
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
