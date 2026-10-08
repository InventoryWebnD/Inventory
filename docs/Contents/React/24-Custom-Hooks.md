# Custom Hooks

## Introduction

Custom Hooks extract reusable stateful logic into functions whose names start with `use`. They allow multiple components to share behavior without sharing component UI.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Rules of Hooks
- Hook naming
- Extracting logic
- Return values
- Parameters
- `useFetch`
- `useLocalStorage`
- `useDebounce`
- Hook composition

## Syntax / Core Pattern

```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = () => setValue(v => !v);

  return { value, toggle, setValue };
}

function ModalButton() {
  const { value: open, toggle } = useToggle();
  return (
    <>
      <button onClick={toggle}>Open</button>
      {open && <Modal onClose={toggle} />}
    </>
  );
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Custom Hook | Reusable Hook logic | `useToggle()` |
| Rule | Hooks called at top level | Not inside loops/conditions |
| Composition | Hook uses other hooks | `useFetch` can use `useState` + `useEffect` |

## Common Use Cases

- **Beginner:** Reusable fetch logic.
- **Practical UI:** Debounced search.
- **Real-world:** Persistent storage.

## Common Errors

1. ❌ **Calling conditionally**

```jsx
`if (...) useThing()`
```
**Why it is a problem:** Call hooks unconditionally.

2. ❌ **Sharing state accidentally**

```jsx
Two hook calls don't share local state
```
**Why it is a problem:** A custom hook shares logic, not state instance.

3. ❌ **Returning too much**

```jsx
Huge API
```
**Why it is a problem:** Expose a clear minimal contract.

## Common Mistakes

- Naming hooks without `use`.
- Building custom hooks that contain unrelated UI.
- Hiding important side effects behind unclear names.

## Quick Reference

```jsx
function useSomething(input) {
  const [state, setState] = useState(...);
  useEffect(...);
  return { state, action };
}
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
