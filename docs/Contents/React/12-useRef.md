# `useRef`

## Introduction

`useRef` stores a mutable value that persists across renders without itself causing a re-render. It is also the standard way to obtain a reference to a DOM node.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- DOM references
- Focus management
- Mutable values
- Previous values
- Timer IDs
- `ref.current`
- `useRef` vs `useState`
- Avoiding unnecessary renders

## Syntax / Core Pattern

```jsx
function Search() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `useRef(initial)` | Returns stable ref object | `const ref = useRef(null)` |
| `ref.current` | Mutable stored value | DOM node or timer ID |
| `ref` prop | Connect ref to DOM node | `ref={inputRef}` |

## Common Use Cases

- **Beginner:** Auto-focus an input.
- **Practical UI:** Store timeout/interval IDs.
- **Real-world:** Remember a previous value for comparison.

## Common Errors

1. ❌ **Expecting ref changes to render**

```jsx
`ref.current = x` does not trigger render
```
**Why it is a problem:** Use state when UI must update.

2. ❌ **Accessing before mount**

```jsx
`ref.current` is null
```
**Why it is a problem:** Use it after mount/event.

3. ❌ **Using refs as global state**

```jsx
Refs can hide data flow
```
**Why it is a problem:** Prefer state/context for shared application state.

## Common Mistakes

- Using refs for ordinary display state.
- Mutating DOM manually when declarative state would be simpler.
- Forgetting optional null checks.

## Quick Reference

```jsx
const ref = useRef(null);
ref.current = value;
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
