# State and useState

## Introduction
State is data that a component **remembers between renders** and that, when changed, makes React render the component again. You create it with the `useState` hook, which returns the current value and a setter function. Regular variables are reset on every render and never trigger an update, so anything that changes the UI over time belongs in state.

## Subtopics
- `useState` basics and array destructuring
- Setter function and re-rendering
- State is a snapshot per render
- Functional updates (`setX(prev => ...)`)
- Lazy initial state
- Updating objects and arrays immutably
- Batching of updates
- Rules of Hooks

## Syntax
```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);        // [value, setter]

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev - 1)}>-1</button>
    </div>
  );
}
```

```jsx
// Objects and arrays: always create a NEW value
const [user, setUser] = useState({ name: "Asha", age: 20 });
setUser({ ...user, age: 21 });

const [items, setItems] = useState([]);
setItems([...items, "new"]);                     // add
setItems(items.filter(i => i !== "old"));        // remove
setItems(items.map(i => i.id === 2 ? { ...i, done: true } : i)); // update
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `useState(initial)` | Create a state variable | `const [n, setN] = useState(0)` |
| Setter | Replace state and schedule a render | `setN(5)` |
| Functional update | Base the new value on the latest one | `setN(prev => prev + 1)` |
| Lazy initial | Run expensive setup only once | `useState(() => load())` |
| Spread `...` | Copy objects/arrays | `{ ...user, age: 21 }` |
| `key` reset | Give a different `key` to reset a component's state | `<Form key={id} />` |

## Common Use Cases
- **Beginner:** a counter or a like button.
- **Practical UI:** toggling a menu open/closed, tracking input text, selected tab.
- **Real-world application:** a shopping cart held as an array of items in state.

## Common Errors
1. ❌
```jsx
const [count, setCount] = useState(0);
function add3() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);   // count is still 0 in this render
}
```
**Why it fails:** State is a snapshot. All three calls use the same `count`, so the result is `1`, not `3`.
✅
```jsx
function add3() {
  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);
}
```
**Explanation:** Use the functional form when the next value depends on the previous one.

2. ❌
```jsx
const [items, setItems] = useState([]);
items.push("new");        // mutates the existing array
setItems(items);          // same reference
```
**Why it fails:** React compares by reference. The same array means "nothing changed", so no re-render.
✅
```jsx
setItems([...items, "new"]);
```
**Explanation:** Never mutate state; always provide a new object or array.

3. ❌
```jsx
const [n, setN] = useState(0);
setN(n + 1);
console.log(n);   // still the old value
```
**Why it fails:** `setN` schedules a re-render; the current variable `n` does not change.
✅
```jsx
const next = n + 1;
setN(next);
console.log(next);
```
**Explanation:** Use a local variable if you need the new value immediately.

4. ❌
```jsx
if (loggedIn) {
  const [name, setName] = useState("");   // hook inside a condition
}
```
**Why it fails:** Hooks must run in the same order on every render.
✅
```jsx
const [name, setName] = useState("");
if (loggedIn) { /* use name */ }
```
**Explanation:** Call hooks only at the top level of a component or custom hook.

## Common Mistakes
- Mutating arrays/objects (`push`, `splice`, `obj.x = 1`) instead of copying.
- Expecting the variable to change right after calling the setter.
- Storing values that can be calculated from other state ("derived state").
- Calling `setState` directly in the render body (infinite loop).

## Quick Reference
```jsx
const [value, setValue] = useState(initial);
setValue(newValue);
setValue(prev => prev + 1);
setObj({ ...obj, key: v });
setArr([...arr, item]);
setArr(arr.filter(x => x.id !== id));
setArr(arr.map(x => x.id === id ? { ...x, ...changes } : x));
```
