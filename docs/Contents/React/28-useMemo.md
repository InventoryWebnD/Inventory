# `useMemo`

## Introduction

`useMemo` caches the result of a calculation between renders until its dependencies change. It is intended for expensive calculations or maintaining stable derived references when that stability is useful.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Memoized values
- Dependencies
- Expensive calculations
- Reference stability
- Performance tradeoffs
- Derived data

## Syntax / Core Pattern

```jsx
const visibleProducts = useMemo(() => {
  return products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.price - b.price);
}, [products, query]);
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `useMemo` | Memoize calculation result | `useMemo(fn, deps)` |
| Dependency | Determines when recalculation occurs | `[products, query]` |
| Reference stability | Can preserve object/array identity | Useful for memoized children |

## Common Use Cases

- **Beginner:** Expensive filtering over very large data.
- **Practical UI:** Derived chart data.
- **Real-world:** Stable calculated configuration passed to memoized children.

## Common Errors

1. ❌ **Using for every calculation**

```jsx
Adds overhead/complexity
```
**Why it is a problem:** Use normal calculation unless there is a reason.

2. ❌ **Missing dependency**

```jsx
Stale result
```
**Why it is a problem:** Include every reactive value used.

3. ❌ **Mutating memoized result**

```jsx
Unexpected behavior
```
**Why it is a problem:** Treat returned values as immutable.

## Common Mistakes

- Using `useMemo` as a correctness fix.
- Memoizing cheap expressions.
- Forgetting that memoization is an optimization.

## Quick Reference

```jsx
const value = useMemo(() => expensiveCalculation(input), [input]);
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
