# React Strict Mode

## Introduction

Strict Mode is a development-time tool that helps surface unsafe patterns and side-effect bugs. It does not mean production users experience the exact same development checks.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `StrictMode`
- Development checks
- Effect stress testing
- Impure rendering
- Finding unsafe patterns
- Production distinction

## Syntax / Core Pattern

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| StrictMode | Development-only checks | Wrap application subtree |
| Impure render | Render has side effects | Should be avoided |
| Cleanup | Effect should correctly stop/restart | Useful for exposing missing cleanup |

## Common Use Cases

- **Beginner:** Finding event listener leaks.
- **Practical UI:** Detecting impure component logic.
- **Real-world:** Testing whether effects are correctly reversible.

## Common Errors

1. ❌ **Assuming duplicate development behavior is necessarily a production bug**

```jsx
Understand Strict Mode checks
```
**Why it is a problem:** Inspect cleanup and purity first.

2. ❌ **Removing StrictMode to hide warnings**

```jsx
Problem remains
```
**Why it is a problem:** Fix the underlying side effect.

3. ❌ **Side effects during render**

```jsx
Unsafe
```
**Why it is a problem:** Move synchronization to appropriate effect/event logic.

## Common Mistakes

- Using StrictMode behavior as application business logic.
- Ignoring warnings because the UI appears fine.
- Confusing development diagnostics with production behavior.

## Quick Reference

```jsx
<StrictMode>
  <App />
</StrictMode>
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
