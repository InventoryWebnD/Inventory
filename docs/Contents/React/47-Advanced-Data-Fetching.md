# Advanced Data Fetching and Server State

## Introduction

Server state differs from local UI state because it is remote, asynchronous, cacheable and potentially stale. Advanced applications often use a data-fetching library to manage caching, refetching, mutations and synchronization.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Server state vs client state
- Caching
- Stale data
- Refetching
- Query keys
- Mutations
- Invalidation
- Pagination
- Infinite queries
- Optimistic updates
- TanStack Query concepts

## Syntax / Core Pattern

```text
Component
   ↓
Query key + fetch function
   ↓
Cache
   ↓
Server
   ↓
Cached result
   ↓
Component
```

Conceptual mutation:

```js
// create product
// on success: invalidate/refetch the products query
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Query | Read server data | Products list |
| Mutation | Change server data | Create product |
| Cache | Reuse fetched data | Products query |
| Invalidation | Mark cached data stale | After create/update/delete |
| Optimistic update | Temporarily update UI | Fast-feeling mutation |

## Common Use Cases

- **Beginner:** Admin dashboards.
- **Practical UI:** Paginated product catalogs.
- **Real-world:** Applications with repeated navigation to the same data.

## Common Errors

1. ❌ **Treating cache as permanent truth**

```jsx
Server can change
```
**Why it is a problem:** Define freshness/refetch strategy.

2. ❌ **Wrong query key**

```jsx
Data does not invalidate correctly
```
**Why it is a problem:** Keys must represent query inputs.

3. ❌ **Optimistic update without rollback**

```jsx
Failed request leaves fake UI
```
**Why it is a problem:** Keep previous state and handle failure.

## Common Mistakes

- Adding a data-fetching library to a tiny static project.
- Using global client state as a cache without a plan.
- Ignoring stale data.

## Quick Reference

```text
Remote data
 ├── fetch
 ├── cache
 ├── stale
 ├── refetch
 └── mutate
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
