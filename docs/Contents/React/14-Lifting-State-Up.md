# Lifting State Up

## Introduction

When two or more sibling components need the same changing data, move the state to their closest common parent and pass the data and callbacks down as props. This creates a single source of truth.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Shared state
- Closest common parent
- Callback props
- Single source of truth
- Controlled child components
- Sibling communication
- Avoiding duplicated state

## Syntax / Core Pattern

```jsx
function ProductsPage() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchBar query={query} onQueryChange={setQuery} />
      <ProductList query={query} />
    </>
  );
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Lift | Move state to common parent | Search query owned by page |
| Callback prop | Child requests state change | `onQueryChange` |
| Single source of truth | One authoritative state owner | Avoid two copies of selected item |

## Common Use Cases

- **Beginner:** Search bar + result list.
- **Practical UI:** Selected tab + tab panel.
- **Real-world:** Parent-controlled modal.

## Common Errors

1. ❌ **Duplicate state**

```jsx
Two components each store same selection
```
**Why it is a problem:** Lift it to common owner.

2. ❌ **Child mutates parent state directly**

```jsx
Impossible without shared reference
```
**Why it is a problem:** Pass callback setter/action.

3. ❌ **Over-lifting**

```jsx
State moved too high
```
**Why it is a problem:** Keep state as low as possible while still shared.

## Common Mistakes

- Lifting state all the way to `App` by default.
- Passing setters everywhere instead of intent-based callbacks when architecture gets complex.
- Duplicating derived values in children.

## Quick Reference

```text
Sibling A ── data/callback ── Parent ── data/callback ── Sibling B
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
