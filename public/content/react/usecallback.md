# useCallback

## Introduction
Every render creates new function objects. `useCallback` returns the **same function reference** between renders as long as its dependencies do not change. This matters when the function is passed to a `memo` child or listed in a hook dependency array, where a changing reference would cause extra renders or effect runs.

## Subtopics
- `useCallback(fn, [deps])`
- Function identity in JavaScript
- Passing stable callbacks to memoized children
- Callbacks in dependency arrays
- Functional state updates to reduce dependencies
- `useCallback` vs `useMemo`
- When it is unnecessary
- React Compiler

## Syntax
```jsx
import { useCallback, useState, memo } from "react";

const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  console.log("render", todo.id);
  return <li onClick={() => onToggle(todo.id)}>{todo.text}</li>;
});

function Todos() {
  const [todos, setTodos] = useState([{ id: 1, text: "A", done: false }]);
  const [draft, setDraft] = useState("");

  // functional update => no dependency on todos => stable forever
  const toggle = useCallback(id => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }, []);

  return (
    <>
      <input value={draft} onChange={e => setDraft(e.target.value)} />   {/* typing does not re-render items */}
      <ul>{todos.map(t => <TodoItem key={t.id} todo={t} onToggle={toggle} />)}</ul>
    </>
  );
}
```

```jsx
// Stable function used inside an effect
const load = useCallback(() => fetch(`/api/users/${id}`).then(r => r.json()).then(setUser), [id]);
useEffect(() => { load(); }, [load]);
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `useCallback(fn, deps)` | Cache a function | `useCallback(() => {...}, [id])` |
| Dependencies | Recreate the function when they change | `[id]` |
| `memo` | Child uses the stable reference | `memo(Child)` |
| Functional update | Remove state from dependencies | `setX(prev => ...)` |
| `useMemo` | Cache values, not functions | `useMemo(() => v, deps)` |

## Common Use Cases
- **Beginner:** seeing why a memoized child still re-renders.
- **Practical UI:** a stable `onDelete` for hundreds of list rows.
- **Real-world application:** callbacks used in `useEffect` dependencies, debounced handlers.

## Common Errors
1. ❌
```jsx
const handle = useCallback(() => setCount(count + 1), []);   // stale count
```
**Why it fails:** `count` is captured from the first render, so every call sets the same value.
✅
```jsx
const handle = useCallback(() => setCount(c => c + 1), []);
```
**Explanation:** Use a functional update or add `count` to the dependencies.

2. ❌
```jsx
const Child = memo(...);
<Child onClick={useCallback(fn, [])} />    // hook inside JSX
```
**Why it fails:** Hooks must be called at the top level of the component, not inside JSX expressions or conditions.
✅
```jsx
const handleClick = useCallback(fn, []);
<Child onClick={handleClick} />
```
**Explanation:** Create the callback first, then use it.

3. ❌
```jsx
const handler = useCallback(() => {...}, []);
<button onClick={handler}>OK</button>        // plain DOM element, nothing is memoized
```
**Why it fails:** Nothing benefits from the stable reference; it only adds overhead.
✅
```jsx
<button onClick={() => {...}}>OK</button>
```
**Explanation:** Use `useCallback` only when a memoized child or dependency array needs the stable reference.

## Common Mistakes
- Using `useCallback` without a `memo` child or dependency use.
- Wrong or missing dependencies (stale closures).
- Thinking it prevents the function from running (it only caches the function).
- Adding it everywhere "just in case".

## Quick Reference
```jsx
const fn = useCallback((arg) => { /* use arg */ }, [dep]);
const fn2 = useCallback(() => setX(prev => prev + 1), []);
<MemoChild onAction={fn} />
```
