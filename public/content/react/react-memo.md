# React.memo

## Introduction
By default, when a component re-renders, all its children re-render too, even if their props did not change. `React.memo` wraps a component so React **skips re-rendering it when its props are shallowly equal** to the previous ones. It is a performance tool for expensive components that re-render often with the same props, not something to add everywhere.

## Subtopics
- Default re-render behaviour
- `memo(Component)`
- Shallow prop comparison (`Object.is`)
- Stable props: `useMemo`, `useCallback`
- Custom comparison function
- When memo helps (and when it does not)
- Measuring with React DevTools Profiler
- React Compiler (automatic memoization)

## Syntax
```jsx
import { memo, useState, useCallback } from "react";

const ExpensiveList = memo(function ExpensiveList({ items, onSelect }) {
  console.log("ExpensiveList rendered");
  return (
    <ul>
      {items.map(i => <li key={i.id} onClick={() => onSelect(i.id)}>{i.name}</li>)}
    </ul>
  );
});

function Page({ items }) {
  const [count, setCount] = useState(0);                       // unrelated state
  const handleSelect = useCallback(id => console.log(id), []);  // stable function

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Clicked {count}</button>
      <ExpensiveList items={items} onSelect={handleSelect} />   {/* skipped on count change */}
    </>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `memo(Component)` | Skip render if props unchanged | `const Row = memo(RowBase)` |
| Shallow compare | Compares each prop with `Object.is` | `{a: 1}` vs a new `{a: 1}` are different |
| `useMemo` | Keep an object/array reference stable | `useMemo(() => ({...}), [x])` |
| `useCallback` | Keep a function reference stable | `useCallback(fn, [])` |
| Custom comparer | Second argument to `memo` | `memo(C, (prev, next) => prev.id === next.id)` |

## Common Use Cases
- **Beginner:** understanding why a child logs on every parent update.
- **Practical UI:** a big table row component in a list of hundreds.
- **Real-world application:** charts and heavy widgets next to a fast-changing input.

## Common Errors
1. ❌
```jsx
const Child = memo(function Child({ onClick }) { ... });
<Child onClick={() => doSomething()} />    // new function every render
```
**Why it fails:** A new function is a new reference, so props always look different and `memo` never skips.
✅
```jsx
const handle = useCallback(() => doSomething(), []);
<Child onClick={handle} />
```
**Explanation:** Memoized children need stable props.

2. ❌
```jsx
<Child style={{ color: "red" }} items={data.filter(x => x.ok)} />
```
**Why it fails:** The object and the filtered array are recreated each render.
✅
```jsx
const style = useMemo(() => ({ color: "red" }), []);
const okItems = useMemo(() => data.filter(x => x.ok), [data]);
<Child style={style} items={okItems} />
```
**Explanation:** Stabilise non-primitive props.

3. ❌
```jsx
// memo on every tiny component
const Label = memo(({ text }) => <span>{text}</span>);
```
**Why it fails:** The comparison costs about as much as re-rendering and adds complexity.
✅
```jsx
// Profile first; memoize only slow components.
```
**Explanation:** Measure before optimizing.

## Common Mistakes
- Wrapping everything in `memo`.
- Passing inline objects/functions to memoized children.
- Expecting `memo` to stop re-renders caused by the child's own state or context.
- Optimizing without measuring.

## Quick Reference
```jsx
const Child = memo(function Child(props) { /* ... */ });
<Child onAction={useCallback(fn, [])} data={useMemo(() => compute(), [dep])} />
```
