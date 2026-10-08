# useReducer

## Introduction
`useReducer` is an alternative to `useState` for **complex state** where many different actions update related values. You write one pure `reducer(state, action)` function that describes every possible change; components just `dispatch` actions such as `{ type: "add" }`. This keeps all update logic in one predictable place.

## Subtopics
- `useReducer(reducer, initialState)`
- Reducer function and action objects
- `dispatch` and action `type`
- Immutable updates inside reducers
- Payloads
- `useReducer` vs `useState`
- Reducer + Context pattern
- Lazy initial state

## Syntax
```jsx
import { useReducer } from "react";

const initialState = { items: [], filter: "all" };

function reducer(state, action) {
  switch (action.type) {
    case "added":
      return { ...state, items: [...state.items, { id: Date.now(), text: action.text, done: false }] };
    case "toggled":
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, done: !i.done } : i) };
    case "removed":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "filter_set":
      return { ...state, filter: action.filter };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function Todos() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <button onClick={() => dispatch({ type: "added", text: "Learn React" })}>Add</button>
      <ul>
        {state.items.map(i => (
          <li key={i.id} onClick={() => dispatch({ type: "toggled", id: i.id })}>{i.text}</li>
        ))}
      </ul>
    </>
  );
}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `reducer(state, action)` | Compute the next state | `return { ...state, count: state.count + 1 }` |
| `dispatch(action)` | Request a change | `dispatch({ type: "added" })` |
| `action.type` | Name of what happened | `"added"`, `"removed"` |
| `action.payload` / fields | Extra data | `{ type: "toggled", id: 3 }` |
| Initial state | Starting value | `useReducer(reducer, { count: 0 })` |
| Pure function | No side effects, no mutation | Same state + action gives same result |

## Common Use Cases
- **Beginner:** a counter with increment, decrement and reset.
- **Practical UI:** a multi-step form or todo list.
- **Real-world application:** a shopping cart reducer shared with Context.

## Common Errors
1. ❌
```jsx
case "added":
  state.items.push(action.item);     // mutation
  return state;
```
**Why it fails:** Returning the same state object means React sees no change.
✅
```jsx
case "added":
  return { ...state, items: [...state.items, action.item] };
```
**Explanation:** A reducer must return a **new** object.

2. ❌
```jsx
function reducer(state, action) {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
  }                                  // no default: returns undefined for unknown actions
}
```
**Why it fails:** An unknown action returns `undefined`, wiping the state.
✅
```jsx
default: throw new Error("Unknown action " + action.type);
```
**Explanation:** Handle unknown actions explicitly (return state or throw).

3. ❌
```jsx
case "load":
  fetch("/api").then(r => r.json());   // side effect in a reducer
```
**Why it fails:** Reducers must be pure; React may call them more than once (Strict Mode).
✅
```jsx
useEffect(() => { fetch("/api").then(r => r.json()).then(data => dispatch({ type: "loaded", data })); }, []);
```
**Explanation:** Do async work outside the reducer, then dispatch the result.

4. ❌
```jsx
<button onClick={dispatch({ type: "inc" })}>+</button>
```
**Why it fails:** `dispatch` runs during render, causing an infinite loop.
✅
```jsx
<button onClick={() => dispatch({ type: "inc" })}>+</button>
```
**Explanation:** Wrap `dispatch` in a function.

## Common Mistakes
- Mutating state inside the reducer.
- Putting API calls or `Math.random()` in a reducer.
- Using `useReducer` for tiny state where `useState` is enough.
- Dispatching without a consistent action shape.

## Quick Reference
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "name", payload });
function reducer(state, action) {
  switch (action.type) {
    case "name": return { ...state /* changes */ };
    default: throw new Error("Unknown action");
  }
}
```
