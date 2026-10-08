# React + Database Integration

## Introduction

React normally should not connect directly to a private database. It talks to a backend/API or a managed client SDK that enforces the appropriate access model. The key inventory skill is understanding CRUD and data flow.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Database concepts
- Records and IDs
- CRUD
- API/SDK boundary
- Create/read/update/delete
- Loading states
- Optimistic UI basics
- Data consistency
- Supabase/Firebase-style managed services
- Server-side security

## Syntax / Core Pattern

```jsx
async function createProduct(product) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (!response.ok) throw new Error("Create failed");
  return response.json();
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Create | Insert record | POST |
| Read | Fetch record(s) | GET |
| Update | Change record | PATCH/PUT |
| Delete | Remove record | DELETE |
| ID | Unique record identity | `product.id` |

## Common Use Cases

- **Beginner:** Inventory database.
- **Practical UI:** Student registration.
- **Real-world:** Event management.

## Common Errors

1. ❌ **Direct DB credentials in browser**

```jsx
Security risk
```
**Why it is a problem:** Use server-side access or managed security rules.

2. ❌ **No stable IDs**

```jsx
Updates target wrong record
```
**Why it is a problem:** Use database-generated IDs.

3. ❌ **UI says success before server confirms**

```jsx
Inconsistent state
```
**Why it is a problem:** Handle request result explicitly.

## Common Mistakes

- Treating database data as trusted user input.
- Deleting locally without handling API failure.
- Ignoring concurrency/conflict cases in shared data.

## Quick Reference

```text
UI
 ↓
API / SDK
 ↓
Auth + validation
 ↓
Database
 ↓
Response
 ↓
React state
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
