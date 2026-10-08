# Component Lifecycle and Rendering

## Introduction

React components render when their inputs change. Understanding render, commit, mount, update and cleanup helps explain why effects run and why components sometimes re-render more often than expected.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Render phase concept
- Commit phase concept
- Mount
- Update
- Unmount
- Effects
- Cleanup
- State-triggered renders
- Parent-triggered renders
- Context-triggered renders

## Syntax / Core Pattern

```text
Initial render
   ↓
Render component tree
   ↓
Commit DOM changes
   ↓
Effects run
   ↓
State/props/context change
   ↓
Render again
   ↓
Commit changes
   ↓
Effect cleanup / re-run as needed
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Render | Calculate next UI | Component function executes |
| Commit | Apply necessary DOM changes | Browser-visible update |
| Mount | Component appears | Initial render |
| Unmount | Component removed | Cleanup external resources |
| Cleanup | Stop previous external work | Remove listener/abort request |

## Common Use Cases

- **Beginner:** Debugging effects.
- **Practical UI:** Understanding why a child renders again.
- **Real-world:** Cleaning subscriptions and timers.

## Common Errors

1. ❌ **Thinking every render means full DOM replacement**

```jsx
React reconciles updates
```
**Why it is a problem:** Only necessary DOM changes are committed.

2. ❌ **Missing cleanup**

```jsx
Old subscriptions remain
```
**Why it is a problem:** Return cleanup from effect.

3. ❌ **Assuming parent render always means DOM change**

```jsx
Render calculation != DOM mutation
```
**Why it is a problem:** Separate render from commit.

## Common Mistakes

- Putting side effects directly in render.
- Using lifecycle language without understanding state/props flow.
- Forgetting that development tooling can expose unsafe patterns.

## Quick Reference

```text
render ≠ commit
render → calculate
commit → apply
effect → synchronize external system
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
