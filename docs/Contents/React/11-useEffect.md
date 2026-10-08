# `useEffect` and Side Effects

## Introduction

`useEffect` synchronizes a component with external systems such as network requests, browser APIs, subscriptions and timers. It should not be used as a general-purpose place for every piece of logic.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Effect purpose
- Dependency array
- Initial effect
- Effects with dependencies
- Cleanup
- API requests
- Subscriptions
- Timers
- Event listeners
- Infinite loops
- Derived state vs effect

## Syntax / Core Pattern

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadProducts() {
    const response = await fetch("/api/products", {
      signal: controller.signal
    });
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    setProducts(data);
  }

  loadProducts().catch(error => {
    if (error.name !== "AbortError") setError(error.message);
  });

  return () => controller.abort();
}, []);
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| No dependency array | Runs after every render | Usually avoid unless intentionally syncing every render. |
| `[]` | Runs after initial mount in the usual lifecycle | Common for initial synchronization. |
| `[id]` | Re-runs when `id` changes | Fetch product for selected ID |
| Cleanup | Stops old external work | Remove listener/abort request |

## Common Use Cases

- **Beginner:** Fetching data for a page.
- **Practical UI:** Subscribing to browser events.
- **Real-world:** Synchronizing document title.

## Common Errors

1. ❌ **Effect dependency loop**

```jsx
Effect sets state that changes a dependency
```
**Why it is a problem:** Check whether the effect is actually needed and what it synchronizes.

2. ❌ **Async effect callback**

```jsx
`useEffect(async () => ...)`
```
**Why it is a problem:** Keep callback synchronous and define an inner async function.

3. ❌ **Missing cleanup**

```jsx
Old listener/timer remains
```
**Why it is a problem:** Return cleanup function.

4. ❌ **Ignoring HTTP errors**

```jsx
Only catching network failures
```
**Why it is a problem:** Check `response.ok`.

## Common Mistakes

- Using effects to calculate `fullName` from first/last name.
- Using effects for event-specific actions that belong in event handlers.
- Suppressing dependency warnings without understanding the data flow.

## Quick Reference

```jsx
useEffect(() => {
  // synchronize with external system

  return () => {
    // cleanup
  };
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
