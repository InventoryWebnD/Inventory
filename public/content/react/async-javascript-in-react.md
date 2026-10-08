# Async JavaScript in React

## Introduction

React relies on JavaScript promises and `async`/`await` for network requests and other asynchronous work. The important skill is coordinating asynchronous work with React state and lifecycle.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Promises
- `async`/`await`
- `try/catch/finally`
- `Promise.all`
- Sequential vs parallel requests
- Request cancellation
- Race conditions
- Async event handlers

## Syntax / Core Pattern

```jsx
async function loadDashboard() {
  try {
    setLoading(true);
    const [products, users] = await Promise.all([
      fetch("/api/products").then(r => {
        if (!r.ok) throw new Error("Products failed");
        return r.json();
      }),
      fetch("/api/users").then(r => {
        if (!r.ok) throw new Error("Users failed");
        return r.json();
      })
    ]);
    setProducts(products);
    setUsers(users);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Promise | Future result | API request |
| `async` | Function returns Promise | `async function load(){}` |
| `await` | Waits inside async function | `const data = await request()` |
| `Promise.all` | Run independent tasks together | Dashboard requests |

## Common Use Cases

- **Beginner:** Parallel dashboard loading.
- **Practical UI:** Form submission.
- **Real-world:** Search requests.

## Common Errors

1. ❌ **Sequential independent calls**

```jsx
Slower than necessary
```
**Why it is a problem:** Use `Promise.all` when independent.

2. ❌ **Unhandled rejection**

```jsx
No error path
```
**Why it is a problem:** Use `try/catch` or `.catch`.

3. ❌ **Updating unmounted/obsolete workflow**

```jsx
Old result wins
```
**Why it is a problem:** Cancel or identify stale requests.

## Common Mistakes

- Putting async logic directly into render.
- Forgetting that async functions return promises.
- Using `await` for operations that could safely run in parallel.

## Quick Reference

```text
Event/effect
   ↓
async operation
   ↓
Promise
   ├── success → set data
   └── failure → set error
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
