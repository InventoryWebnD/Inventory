# `useCallback`

## Introduction

`useCallback` caches a function reference between renders until dependencies change. It is most useful when function identity affects memoized children or another dependency-sensitive optimization.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Function identity
- Dependencies
- `React.memo`
- Stable callbacks
- Callback factories
- When not to use it

## Syntax / Core Pattern

```jsx
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);

return <ProductList onSelect={handleSelect} />;
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `useCallback` | Memoize function reference | `useCallback(fn, deps)` |
| Identity | Function references are objects | New function each render normally |
| Dependency | Values captured by callback | Include state/props used |

## Common Use Cases

- **Beginner:** Passing callbacks to memoized child components.
- **Practical UI:** Stable event handlers for expensive subtrees.
- **Real-world:** Dependency-sensitive APIs.

## Common Errors

1. ❌ **No dependencies when values are captured**

```jsx
Stale closure
```
**Why it is a problem:** Include captured reactive values.

2. ❌ **Using with no performance reason**

```jsx
Complexity without benefit
```
**Why it is a problem:** Prefer normal functions unless stability matters.

3. ❌ **Thinking it makes function execution faster**

```jsx
It primarily stabilizes identity
```
**Why it is a problem:** The function body still runs when called.

## Common Mistakes

- Wrapping every handler in `useCallback`.
- Ignoring dependency correctness.
- Using callback memoization to hide architectural problems.

## Quick Reference

```jsx
const fn = useCallback(() => {
  // use reactive values
}, [dependencies]);
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
