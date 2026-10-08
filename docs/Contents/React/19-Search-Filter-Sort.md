# Search, Filter and Sort

## Introduction

Search, filtering and sorting are core interactive patterns for inventory applications. The cleanest design keeps the source data unchanged and derives a visible list from the current controls.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Text search
- Category filters
- Checkbox filters
- Range filters
- Sorting
- Multiple filters
- Derived data
- Case-insensitive search
- Stable sort expectations
- Reset filters
- Debounced search basics

## Syntax / Core Pattern

```jsx
const visible = products
  .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  .filter(p => category === "all" || p.category === category)
  .sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Search | Text-based inclusion | `includes(query)` |
| Filter | Boolean predicate | `filter(item => ...)` |
| Sort | Ordering | `sort((a,b)=>...)` |
| Derived data | Computed from source + controls | `visibleProducts` |

## Common Use Cases

- **Beginner:** Inventory dashboard.
- **Practical UI:** Movie/product search.
- **Real-world:** Admin table with filters.

## Common Errors

1. ❌ **Mutating source**

```jsx
Calling `.sort()` directly on state array
```
**Why it is a problem:** Use a copy or non-mutating strategy.

2. ❌ **Case-sensitive search**

```jsx
Unexpected misses
```
**Why it is a problem:** Normalize both sides.

3. ❌ **Too many state variables**

```jsx
Store visible list separately
```
**Why it is a problem:** Prefer deriving visible list when feasible.

4. ❌ **Unstable filter interactions**

```jsx
Each filter overwrites previous filter
```
**Why it is a problem:** Compose predicates.

## Common Mistakes

- Storing filtered data in state when it can be calculated.
- Filtering after rendering.
- Not providing a clear reset option.

## Quick Reference

```text
Source data
 + search
 + filters
 + sort
      ↓
visibleData
      ↓
map()
      ↓
UI
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
