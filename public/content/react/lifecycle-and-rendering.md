# Lifecycle and Rendering

## Introduction
A function component goes through three phases: **mount** (first appears), **update** (re-renders because state, props or context changed) and **unmount** (removed). Understanding how React renders is the key to avoiding most bugs: React *calls your component*, compares the new output with the old one, then updates the DOM. After that it runs effects.

## Subtopics
- Render phase vs commit phase
- Mounting, updating, unmounting
- What triggers a re-render (state, props, parent, context)
- Re-render vs DOM update
- State is preserved by position and type
- Resetting state with `key`
- `useEffect` mapped to lifecycle
- Batching of state updates
- Pure rendering

## Syntax
```jsx
function Profile({ userId }) {
  const [name, setName] = useState("");

  console.log("render");                 // 1. render: runs on every render

  useEffect(() => {
    console.log("effect: mount or userId changed");   // 3. after commit
    return () => console.log("cleanup: before next effect or unmount");
  }, [userId]);

  return <h1>{name}</h1>;                // 2. commit: React updates the DOM
}
```

```jsx
// Mount, update, unmount
{show && <Profile userId={1} />}   // show becomes true: mount; false: unmount

// Reset all state of a component by changing its key
<Profile key={userId} userId={userId} />
```

## Important Methods & Properties
| Phase | When | Hook equivalent |
|---|---|---|
| Mount | First render | `useEffect(fn, [])` |
| Update | State/props/context change | `useEffect(fn, [dep])` or no deps |
| Unmount | Component removed | `useEffect` cleanup |
| Render | Call component, compute JSX | Component body |
| Commit | Apply changes to the DOM | After render |
| `key` | Identity for resetting/remounting | `<Form key={id} />` |

## Common Use Cases
- **Beginner:** explaining why `console.log` prints many times.
- **Practical UI:** resetting a form when the selected item changes.
- **Real-world application:** subscriptions and timers that start on mount and clean up on unmount.

## Common Errors
1. ❌
```jsx
function Counter() {
  const [n, setN] = useState(0);
  setN(n + 1);          // set state during render
  return <p>{n}</p>;
}
```
**Why it fails:** Setting state in render triggers another render immediately: "Too many re-renders".
✅
```jsx
<button onClick={() => setN(n + 1)}>{n}</button>
```
**Explanation:** Change state in events or effects, not in render.

2. ❌
```jsx
function Parent() {
  function Child() { return <input />; }     // new component type each render
  return <Child />;
}
```
**Why it fails:** A new function means a new component type, so the input is remounted and loses its state on every render.
✅
```jsx
function Child() { return <input />; }
function Parent() { return <Child />; }
```
**Explanation:** Define components at module level.

3. ❌
```jsx
<EditForm user={user} />     // switching users keeps old typed text
```
**Why it fails:** Same component in the same position keeps its state.
✅
```jsx
<EditForm key={user.id} user={user} />
```
**Explanation:** A different `key` resets the component.

4. ❌
```jsx
const [n, setN] = useState(0);
function inc() { setN(n + 1); console.log(n); }   // logs old value
```
**Why it fails:** State updates apply on the next render; the variable is a snapshot.
✅
```jsx
useEffect(() => { console.log(n); }, [n]);
```
**Explanation:** Use an effect or compute the next value in a variable.

## Common Mistakes
- Thinking "re-render" means the whole DOM is rebuilt.
- Expecting state to update instantly.
- Side effects inside the render body.
- Forgetting that effects run after the screen updates.
- Not understanding why state resets or persists (position, type and key).

## Quick Reference
```text
State/props change -> React calls component -> new JSX
-> React diffs with previous JSX -> updates DOM -> runs effects
Mount -> effect(setup) | Update -> cleanup, effect | Unmount -> cleanup
```
