# Full-Stack React CRUD

## Introduction

CRUD applications combine React state, forms, API calls, routing and backend persistence. This is one of the best practical inventory topics because it tests whether students can connect concepts into a real application.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Create
- Read
- Update
- Delete
- Forms
- API requests
- Loading/error states
- Optimistic updates
- Routing
- Validation
- IDs
- Refresh/synchronization

## Syntax / Core Pattern

```jsx
async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Delete failed");
}
```

Typical flow:

```text
Form → POST → database → response → state update
List → GET → state → render
Edit → PATCH → response → state update
Delete → DELETE → response → remove item
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Create | Add record | POST |
| Read | Load records | GET |
| Update | Edit record | PATCH/PUT |
| Delete | Remove record | DELETE |
| Sync | Keep UI consistent with server | Refetch/update cache |

## Common Use Cases

- **Beginner:** Inventory manager.
- **Practical UI:** Event registration admin.
- **Real-world:** Task manager.

## Common Errors

1. ❌ **Only changing UI**

```jsx
Database unchanged
```
**Why it is a problem:** Call backend and handle response.

2. ❌ **Deleting by array index**

```jsx
Wrong after sorting/filtering
```
**Why it is a problem:** Use stable record ID.

3. ❌ **No error recovery**

```jsx
UI becomes inconsistent
```
**Why it is a problem:** Handle failed mutation and restore/refetch.

## Common Mistakes

- Mixing form state with fetched list unnecessarily.
- Ignoring duplicate submissions.
- Not validating both frontend and backend.

## Quick Reference

```text
React form
   ↓
HTTP request
   ↓
Express/API
   ↓
Database
   ↓
Response
   ↓
React state/cache
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
