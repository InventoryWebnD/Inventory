# React Design Patterns

## Introduction

React patterns are recurring ways to structure components and logic. The most useful patterns for inventory students are composition, controlled components, custom hooks and feature-oriented organization.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Composition
- Controlled components
- Uncontrolled components
- Custom Hooks
- Compound components
- Render props
- Higher-order components
- Container/presentation concepts

## Syntax / Core Pattern

```jsx
// Composition
<Card>
  <Card.Header>Inventory</Card.Header>
  <Card.Body>
    <ProductList />
  </Card.Body>
</Card>
```

Controlled pattern:

```jsx
<SearchInput value={query} onChange={setQuery} />
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Composition | Combine components through children | Flexible layouts |
| Controlled | Parent owns important value | Forms/inputs |
| Custom Hook | Extract reusable behavior | `useFetch` |
| Compound | Related components share implicit context | Tabs-like APIs |

## Common Use Cases

- **Beginner:** Reusable modal system.
- **Practical UI:** Tabs component.
- **Real-world:** Complex form controls.

## Common Errors

1. ❌ **Pattern for pattern's sake**

```jsx
More abstraction than value
```
**Why it is a problem:** Start simple.

2. ❌ **Render props everywhere**

```jsx
Hooks often provide simpler reuse
```
**Why it is a problem:** Choose modern simplest approach.

3. ❌ **HOC stacking**

```jsx
Harder component tree
```
**Why it is a problem:** Use when existing library/API calls for it.

## Common Mistakes

- Copying architecture from a large app into a small task.
- Abstracting before requirements are clear.
- Ignoring ordinary composition because a pattern sounds advanced.

## Quick Reference

```text
Simple component
   ↓
Composition
   ↓
Custom Hook / shared state
   ↓
More specialized pattern only if needed
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
