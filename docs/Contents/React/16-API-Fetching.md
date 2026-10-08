# API Fetching in React

## Introduction

React applications frequently load remote data and represent at least three UI states: loading, success and error. API code should be separated enough that components remain understandable.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `fetch`
- GET requests
- POST/PUT/PATCH/DELETE
- JSON
- Loading state
- Error state
- AbortController
- Response validation
- Retries
- API service functions

## Syntax / Core Pattern

```jsx
async function getProducts(signal) {
  const response = await fetch("/api/products", { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

useEffect(() => {
  const controller = new AbortController();
  setLoading(true);

  getProducts(controller.signal)
    .then(setProducts)
    .catch(error => {
      if (error.name !== "AbortError") setError(error.message);
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, []);
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| GET | Read resources | `fetch('/api/products')` |
| POST | Create | `method: 'POST'` |
| PUT/PATCH | Update | Send JSON body |
| DELETE | Remove | `method: 'DELETE'` |
| AbortController | Cancel obsolete request | Cleanup on unmount/change |

## Common Use Cases

- **Beginner:** Inventory CRUD.
- **Practical UI:** Weather/movie API.
- **Real-world:** Dashboard analytics.

## Common Errors

1. ❌ **No `response.ok` check**

```jsx
404/500 may still resolve
```
**Why it is a problem:** Check status explicitly.

2. ❌ **Race condition**

```jsx
Old search response overwrites new one
```
**Why it is a problem:** Abort or track request identity.

3. ❌ **No loading state**

```jsx
UI appears broken
```
**Why it is a problem:** Represent request lifecycle explicitly.

4. ❌ **Hardcoded API URL everywhere**

```jsx
Difficult deployment/configuration
```
**Why it is a problem:** Centralize API base configuration.

## Common Mistakes

- Fetching directly from many components with duplicated code.
- Ignoring cleanup for rapidly changing queries.
- Displaying raw error objects to users.

## Quick Reference

```text
Request
  ↓
Loading
  ├── Error → Retry
  └── Success → Data
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
