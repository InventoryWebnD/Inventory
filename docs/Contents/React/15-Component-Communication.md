# Component Communication

## Introduction

React communication is primarily explicit: parents pass data and callbacks to children, siblings share lifted state, and distant components can use context or a state-management library.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Parent → child
- Child → parent via callback
- Sibling → sibling
- Context
- Global state
- `children` composition
- Event callbacks
- Data ownership

## Syntax / Core Pattern

```jsx
function Parent() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <List selected={selected} onSelect={setSelected} />
      <Details id={selected} />
    </>
  );
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Parent → child | Props | `<Card item={item}/>` |
| Child → parent | Callback prop | `onSave(data)` |
| Sibling → sibling | Lifted state | Shared parent state |
| Distant components | Context/store | Theme/auth state |

## Common Use Cases

- **Beginner:** Product list selecting a product shown in a detail panel.
- **Practical UI:** Modal opened by a table row.
- **Real-world:** Navbar reflecting authenticated user state.

## Common Errors

1. ❌ **Mutating parent data**

```jsx
Child edits object directly
```
**Why it is a problem:** Call a parent action or update owner state.

2. ❌ **Callback mismatch**

```jsx
Wrong arguments
```
**Why it is a problem:** Define a clear callback contract.

3. ❌ **Prop drilling explosion**

```jsx
Many layers receive irrelevant props
```
**Why it is a problem:** Consider composition/context when justified.

## Common Mistakes

- Making everything global.
- Passing entire objects when an ID or required fields are enough.
- Hiding ownership of state.

## Quick Reference

```text
Parent owns state
    ↓
props + callbacks
    ↓
Children
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
