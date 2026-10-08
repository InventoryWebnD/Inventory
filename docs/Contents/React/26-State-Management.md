# State Management

## Introduction

State management is about deciding where application data should live, who owns it, and how other components access or update it. The right solution depends on scope and complexity.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Local state
- Lifted state
- Context
- Reducer
- Global state
- Server state
- Client state
- Derived state
- State ownership
- Redux Toolkit/Zustand concepts

## Syntax / Core Pattern

```text
Local
  ↓ if shared
Lift state
  ↓ if distant/shared broadly
Context or store
  ↓ if remote/server-owned
Server-state/data-fetching solution
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Local state | One component/feature | Modal open |
| Lifted state | Related siblings | Selected product |
| Context | Broad shared concern | Theme/auth |
| Store | Complex cross-feature state | Large app cart/workflow |
| Server state | Owned by backend | Products from API |

## Common Use Cases

- **Beginner:** Small inventory app: local state + lifted state.
- **Practical UI:** Medium app: context for auth/theme + local feature state.
- **Real-world:** Large app: dedicated state/data-fetching architecture.

## Common Errors

1. ❌ **Everything global**

```jsx
Hard to reason about
```
**Why it is a problem:** Keep state near its owner.

2. ❌ **Duplicate state**

```jsx
Two sources of truth
```
**Why it is a problem:** Derive or centralize.

3. ❌ **Server data in local store without plan**

```jsx
Stale cache problems
```
**Why it is a problem:** Treat remote data differently from UI state.

## Common Mistakes

- Choosing Redux just because it is popular.
- Using context for high-frequency data without considering render impact.
- Persisting every state value.

## Quick Reference

```text
Ask:
1. Who owns it?
2. Who needs it?
3. Is it derived?
4. Is it server-owned?
5. How often does it change?
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
