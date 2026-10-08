# Rendering and Transforming Data

## Introduction

React UIs are often generated from arrays of objects. This topic focuses on turning raw application data into display-ready UI using JavaScript transformations such as `map`, `filter`, `sort`, `find` and `reduce`.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `map`
- `filter`
- `find`
- `sort`
- `reduce`
- Derived data
- Nested data
- Data normalization basics
- Combining transformations
- Defensive rendering

## Syntax / Core Pattern

```jsx
const visibleProducts = products
  .filter(product => product.stock > 0)
  .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
  .sort((a, b) => a.price - b.price);

const totalValue = products.reduce(
  (sum, product) => sum + product.price * product.stock,
  0
);

return visibleProducts.map(product => (
  <ProductCard key={product.id} product={product} />
));
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `map` | Create UI from each item | Cards/table rows |
| `filter` | Choose visible items | Search/category filter |
| `sort` | Order data | Price ascending |
| `reduce` | Aggregate | Inventory value |
| `find` | Get one item | Product detail |

## Common Use Cases

- **Beginner:** Search + filter + sort pipelines.
- **Practical UI:** Dashboard totals.
- **Real-world:** Cart totals and counts.

## Common Errors

1. ❌ **Mutating source with `sort`**

```jsx
Original array changes
```
**Why it is a problem:** Copy first: `[...items].sort(...)`.

2. ❌ **Filtering after expensive rendering**

```jsx
Wasted work
```
**Why it is a problem:** Derive visible data before mapping.

3. ❌ **Assuming data is always complete**

```jsx
`product.category.name` crashes
```
**Why it is a problem:** Use validated data or guarded access.

## Common Mistakes

- Putting derived arrays into state unnecessarily.
- Mutating API data while preparing UI.
- Doing expensive transformations repeatedly without considering performance.

## Quick Reference

```text
Raw data
  ↓
filter
  ↓
sort
  ↓
map
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
