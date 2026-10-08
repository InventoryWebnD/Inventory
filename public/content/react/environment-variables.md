# Environment Variables with Vite

## Introduction

Environment variables allow configuration such as API base URLs to differ between development and deployment. Frontend variables are bundled into client code, so anything exposed to the browser must be treated as public.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `.env` files
- Vite `VITE_` prefix
- Development configuration
- Production configuration
- API base URLs
- Public vs secret values
- `.env.local` concept

## Syntax / Core Pattern

```env
VITE_API_BASE_URL=https://api.example.com
```

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

A request:

```js
fetch(`${API_BASE_URL}/products`);
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `.env` | Environment configuration | Local/deployment settings |
| `VITE_` | Client-exposed Vite variable prefix | `VITE_API_BASE_URL` |
| `import.meta.env` | Read Vite environment values | `import.meta.env.VITE_API_BASE_URL` |

## Common Use Cases

- **Beginner:** Switching API URL between local and production.
- **Practical UI:** Feature configuration that is safe to expose.
- **Real-world:** Deployment-specific public settings.

## Common Errors

1. ❌ **Putting secrets in `VITE_` variables**

```jsx
Browser can access them
```
**Why it is a problem:** Keep secrets on server.

2. ❌ **Changing `.env` without restarting dev server**

```jsx
Existing process may retain old values
```
**Why it is a problem:** Restart as needed.

3. ❌ **Committing secrets**

```jsx
Repository exposure
```
**Why it is a problem:** Use proper secret management.

## Common Mistakes

- Calling public variables secrets.
- Hardcoding production URLs throughout code.
- Assuming environment variables hide frontend data.

## Quick Reference

```text
.env
 ↓
Vite build
 ↓
Browser bundle
```

Anything in the browser bundle should be considered public.

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
