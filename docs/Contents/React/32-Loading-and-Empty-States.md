# Loading, Empty and Skeleton States

## Introduction

A polished application communicates what is happening. Loading, empty, error and success are separate UI states and should be designed intentionally.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Loading indicators
- Skeleton UI
- Empty state
- No search results
- Error state
- Retry
- Disabled controls
- Optimistic UI basics

## Syntax / Core Pattern

```jsx
if (loading) return <ProductSkeleton />;
if (error) return <ErrorState onRetry={reload} />;
if (products.length === 0) return <EmptyState />;

return <ProductList products={products} />;
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Loading | Request in progress | Spinner/skeleton |
| Empty | Request succeeded but no data | No products |
| Error | Request failed | Retry |
| Success | Data available | Main UI |

## Common Use Cases

- **Beginner:** Inventory list while loading.
- **Practical UI:** No products in a category.
- **Real-world:** Search query with zero results.

## Common Errors

1. ❌ **One generic spinner everywhere**

```jsx
Poor context
```
**Why it is a problem:** Use contextual loading UI.

2. ❌ **Empty confused with error**

```jsx
Wrong message
```
**Why it is a problem:** Different states mean different things.

3. ❌ **Button can be clicked repeatedly**

```jsx
Duplicate mutation
```
**Why it is a problem:** Disable or track submitting state.

## Common Mistakes

- Designing only the success state.
- Showing skeletons that jump layout dramatically.
- Removing useful previous data during every refetch without reason.

## Quick Reference

```text
Loading → Success
        ↘ Error
Success + zero records → Empty
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
