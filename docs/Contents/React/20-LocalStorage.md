# Browser Storage with React

## Introduction

`localStorage` and `sessionStorage` let a browser persist small amounts of string data. React applications commonly combine them with state to remember themes, drafts, preferences and carts.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `localStorage`
- `sessionStorage`
- `setItem`
- `getItem`
- `removeItem`
- JSON serialization
- Hydrating state
- Persistence effects
- Storage limitations
- Storage events

## Syntax / Core Pattern

```jsx
function useStoredTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `setItem` | Store string | `localStorage.setItem('key', value)` |
| `getItem` | Read string | `localStorage.getItem('key')` |
| JSON | Store structured data | `JSON.stringify(obj)` |
| Remove | Delete key | `removeItem('key')` |

## Common Use Cases

- **Beginner:** Persisting a cart.
- **Practical UI:** Remembering dark mode.
- **Real-world:** Saving form drafts.

## Common Errors

1. ❌ **Storing objects directly**

```jsx
Becomes `[object Object]`
```
**Why it is a problem:** Use JSON serialization.

2. ❌ **Parsing invalid JSON**

```jsx
Throws
```
**Why it is a problem:** Guard parsing and handle corrupt storage.

3. ❌ **Storing secrets**

```jsx
Client storage is accessible to scripts
```
**Why it is a problem:** Never treat localStorage as a secure secret vault.

4. ❌ **Reading on every render**

```jsx
Unnecessary work
```
**Why it is a problem:** Use lazy state initialization.

## Common Mistakes

- Storing passwords/tokens without understanding the security model.
- Assuming storage is always available.
- Forgetting that values are strings.

## Quick Reference

```jsx
const value = localStorage.getItem("key");
localStorage.setItem("key", JSON.stringify(data));
const data = JSON.parse(value);
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
