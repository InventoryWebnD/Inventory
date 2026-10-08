# React + Node.js + Express

## Introduction

A common full-stack architecture places React in the frontend and Node.js/Express behind an HTTP API. React renders UI and sends requests; Express validates requests and communicates with the database or services.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- REST API
- HTTP methods
- Request/response
- Express routes
- JSON bodies
- CORS
- CRUD
- Frontend API service layer
- Environment variables
- Error responses

## Syntax / Core Pattern

```text
React
  │ fetch()
  ▼
Express API
  │
  ▼
Database
```

Example frontend:

```jsx
const response = await fetch("/api/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(product)
});
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| GET | Read | List products |
| POST | Create | Add product |
| PATCH/PUT | Update | Edit stock |
| DELETE | Delete | Remove product |
| CORS | Cross-origin browser policy | Configure server when frontend/API origins differ |

## Common Use Cases

- **Beginner:** Inventory CRUD system.
- **Practical UI:** Admin dashboard.
- **Real-world:** Authentication-backed portal.

## Common Errors

1. ❌ **Trusting client input**

```jsx
Frontend validation is bypassable
```
**Why it is a problem:** Validate on server too.

2. ❌ **CORS misunderstanding**

```jsx
CORS is not authentication
```
**Why it is a problem:** Configure origins and credentials correctly.

3. ❌ **Exposing server secrets**

```jsx
Putting DB credentials in React
```
**Why it is a problem:** Keep secrets server-side.

## Common Mistakes

- Putting database credentials in frontend code.
- Returning inconsistent API response shapes.
- Mixing UI concerns with raw fetch logic everywhere.

## Quick Reference

```text
React UI
  ↓
API client
  ↓
Express route
  ↓
Validation / business logic
  ↓
Database
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
