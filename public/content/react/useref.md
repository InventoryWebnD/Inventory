# useRef

## Introduction
`useRef` gives you a mutable box (`ref.current`) that **survives re-renders without causing one**. It has two main jobs: holding a reference to a DOM element (to focus an input or scroll to a section) and storing a value that should persist but does not affect the UI (a timer id, the previous value, a flag).

## Subtopics
- Creating a ref: `useRef(initial)`
- Attaching a ref to a DOM element
- Focusing, scrolling, measuring and playing media
- Storing mutable values (timer ids, previous values)
- Refs vs state
- Not reading/writing `ref.current` during render
- Ref as a prop in React 19
- Uncontrolled inputs with refs

## Syntax
```jsx
import { useRef, useEffect } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();           // focus on mount
  }, []);

  return (
    <>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={() => inputRef.current.select()}>Select text</button>
    </>
  );
}
```

```jsx
// Persist a value without re-rendering
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef(null);

  const start = () => { timerId.current = setInterval(() => setSeconds(s => s + 1), 1000); };
  const stop = () => clearInterval(timerId.current);
  return <button onClick={start}>Start {seconds}</button>;
}

// React 19: ref is a normal prop on function components
function FancyInput({ ref, ...props }) { return <input ref={ref} {...props} />; }
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `useRef(initial)` | Create a ref object | `const r = useRef(null)` |
| `ref.current` | The stored value / DOM node | `r.current.focus()` |
| `ref` attribute | Attach to a DOM element | `<input ref={r} />` |
| DOM methods | Use browser APIs | `focus()`, `scrollIntoView()`, `play()` |
| Persisted value | Keep data across renders | `timerId.current = id` |
| `forwardRef` | Pass ref through in React 18 and earlier | `forwardRef((props, ref) => ...)` |

## Common Use Cases
- **Beginner:** focusing an input when a button is clicked.
- **Practical UI:** scrolling a chat to the latest message.
- **Real-world application:** keeping a debounce timer, a video player control or a previous-value tracker.

## Common Errors
1. ❌
```jsx
const count = useRef(0);
<button onClick={() => count.current++}>{count.current}</button>
```
**Why it fails:** Changing `ref.current` does not re-render, so the screen stays the same.
✅
```jsx
const [count, setCount] = useState(0);
<button onClick={() => setCount(c => c + 1)}>{count}</button>
```
**Explanation:** Use state for values that appear on screen; use refs for values that do not.

2. ❌
```jsx
function Box() {
  const ref = useRef(null);
  ref.current.focus();       // during render, DOM does not exist yet
  return <input ref={ref} />;
}
```
**Why it fails:** The ref is `null` until React attaches the DOM node after rendering.
✅
```jsx
useEffect(() => { ref.current?.focus(); }, []);
```
**Explanation:** Access DOM refs in effects or event handlers.

3. ❌
```jsx
function Wrapper() {
  const inputRef = useRef(null);
  return <CustomInput ref={inputRef} />;   // React 18: ref is not passed to CustomInput
}
```
**Why it fails:** Before React 19, function components do not receive `ref` as a prop.
✅
```jsx
const CustomInput = forwardRef((props, ref) => <input ref={ref} {...props} />);
// React 19: function CustomInput({ ref, ...props }) { return <input ref={ref} {...props} />; }
```
**Explanation:** Use `forwardRef` on older versions; on React 19 accept `ref` as a prop.

## Common Mistakes
- Using a ref instead of state for UI data.
- Reading or writing `ref.current` while rendering.
- Forgetting the `?.` when the ref may still be `null`.
- Overusing refs to control DOM when state and props would do.

## Quick Reference
```jsx
const ref = useRef(initialValue);
ref.current;                     // read
ref.current = newValue;          // write (no re-render)
<input ref={ref} />
ref.current.focus();
```
