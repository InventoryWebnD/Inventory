# `React.memo`

## Introduction

`React.memo` can skip re-rendering a component when its props are considered equal. It is a performance optimization, not a default requirement.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Memoized components
- Shallow prop comparison
- Stable props
- Function/object identity
- `useCallback` relationship
- When memoization helps
- When it hurts

## Syntax / Core Pattern

```jsx
const ProductRow = React.memo(function ProductRow({ product, onSelect }) {
  return (
    <button onClick={() => onSelect(product.id)}>
      {product.name}
    </button>
  );
});
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `React.memo` | Memoize component rendering | `memo(Component)` |
| Reference equality | Objects/functions can change identity | `{}` !== `{}` |
| Optimization | Avoid unnecessary renders | Useful for expensive stable children |

## Common Use Cases

- **Beginner:** Large tables/lists.
- **Practical UI:** Expensive child components.
- **Real-world:** Stable props with frequent parent renders.

## Common Errors

1. ❌ **Assuming memo prevents all renders**

```jsx
Context/state changes can still affect component
```
**Why it is a problem:** Understand its scope.

2. ❌ **Passing new objects/functions every render**

```jsx
Props are always different
```
**Why it is a problem:** Stabilize only when measurement justifies it.

3. ❌ **Memoizing everything**

```jsx
Adds complexity
```
**Why it is a problem:** Optimize real bottlenecks.

## Common Mistakes

- Using memo without profiling.
- Combining memoization with unstable props and expecting a benefit.
- Treating memo as correctness logic.

## Quick Reference

```jsx
const Memoized = memo(Component);
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
