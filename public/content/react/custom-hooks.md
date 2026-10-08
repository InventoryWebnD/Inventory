# Custom Hooks

## Introduction
A custom hook is a JavaScript function whose name starts with `use` and that calls other hooks. It lets you **extract and reuse stateful logic** (not UI) between components: fetching, form handling, toggles, window size, debounce and so on. Each component that calls the hook gets its own separate copy of the state.

## Subtopics
- Rules: name starts with `use`, call only at the top level
- Extracting logic from a component
- Returning values (array vs object)
- Passing parameters
- Combining built-in hooks
- Common hooks: `useToggle`, `useDebounce`, `useLocalStorage`, `useFetch`, `useWindowSize`
- Hooks share logic, not state
- Testing and naming

## Syntax
```jsx
// useToggle.js
import { useState, useCallback } from "react";

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(v => !v), []);
  return [on, toggle];
}

// usage
function Menu() {
  const [open, toggleOpen] = useToggle();
  return <button onClick={toggleOpen}>{open ? "Close" : "Open"}</button>;
}
```

```jsx
// useWindowSize.js
export function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `useXxx` name | Lets React and linters recognise hooks | `useToggle` |
| Returns | Expose state and actions | `return [value, setValue]` or `{ data, loading }` |
| Arguments | Configure the hook | `useFetch(url)` |
| Built-in hooks inside | Compose existing hooks | `useState`, `useEffect`, `useRef` |
| Own state per call | Each component has independent state | Two `useToggle()` calls are independent |

## Common Use Cases
- **Beginner:** `useToggle` for opening/closing panels.
- **Practical UI:** `useDebounce` for a search input.
- **Real-world application:** `useAuth`, `useCart`, `useFetch` shared across many pages.

## Common Errors
1. ❌
```jsx
function toggle() {                // does not start with "use"
  const [on, setOn] = useState(false);
  return [on, setOn];
}
```
**Why it fails:** Without the `use` prefix, the linter cannot check the Rules of Hooks, and the code does not follow the convention.
✅
```jsx
function useToggle() { const [on, setOn] = useState(false); return [on, setOn]; }
```
**Explanation:** Always name custom hooks `useSomething`.

2. ❌
```jsx
function Page({ show }) {
  if (show) {
    const size = useWindowSize();   // conditional hook call
  }
}
```
**Why it fails:** Hooks must be called in the same order on every render.
✅
```jsx
const size = useWindowSize();
if (show) { /* use size */ }
```
**Explanation:** Call hooks at the top level, never in conditions, loops or nested functions.

3. ❌
```jsx
let count = 0;                      // module-level variable
export function useCounter() { return [count, () => count++]; }
```
**Why it fails:** A plain variable is shared between components and never triggers a re-render.
✅
```jsx
export function useCounter() {
  const [count, setCount] = useState(0);
  return [count, () => setCount(c => c + 1)];
}
```
**Explanation:** Use `useState` inside the hook so each component gets its own state.

## Common Mistakes
- Believing two components using the same hook share the same state (they do not; use Context for that).
- Creating a custom hook for code that is not reusable or has no hooks inside.
- Returning unstable objects/functions that cause needless effects.
- Calling hooks inside event handlers.

## Quick Reference
```jsx
function useThing(arg) {
  const [state, setState] = useState(initial);
  useEffect(() => { /* sync */ return () => { /* cleanup */ }; }, [arg]);
  return { state, setState };      // or [state, setState]
}
const { state } = useThing(x);
```
