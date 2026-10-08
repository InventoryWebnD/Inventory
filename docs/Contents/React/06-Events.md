# Events

## Introduction
React lets you respond to user actions (clicks, typing, submits) by passing a **function** to an event prop like `onClick`. React wraps the browser event in a consistent object and handles the listeners for you. Event handlers are where you normally update state in response to the user.

## Subtopics
- `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onMouseEnter`
- Passing a function reference vs calling it
- Handlers with arguments
- The event object (`e`)
- `e.preventDefault()` and `e.stopPropagation()`
- Event bubbling
- Inline vs named handlers
- Passing handlers as props

## Syntax
```jsx
function Demo() {
  const [text, setText] = useState("");

  function handleClick() {
    alert("Clicked");
  }

  function handleSubmit(e) {
    e.preventDefault();                 // stop page reload
    console.log("Saved:", text);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="button" onClick={handleClick}>Alert</button>
      <button type="submit">Save</button>
    </form>
  );
}
```

```jsx
// With an argument
{items.map(item => (
  <button key={item.id} onClick={() => removeItem(item.id)}>Remove</button>
))}
```

## Important Methods & Properties
| Concept | Purpose | Example |
|---|---|---|
| `onClick` | Mouse/touch click | `<button onClick={fn}>` |
| `onChange` | Input value changed | `<input onChange={fn} />` |
| `onSubmit` | Form submitted | `<form onSubmit={fn}>` |
| `e.target.value` | Current input value | `setText(e.target.value)` |
| `e.preventDefault()` | Block default browser behaviour | Stop form reload |
| `e.stopPropagation()` | Stop the event bubbling up | Click inside a card with a clickable parent |

## Common Use Cases
- **Beginner:** a button that increases a counter.
- **Practical UI:** typing in a search box and updating results.
- **Real-world application:** keyboard shortcuts, drag handles, and form submission with validation.

## Common Errors
1. ❌
```jsx
<button onClick={alert("Hi")}>Click</button>
```
**Why it fails:** `alert("Hi")` runs during render, and its result (`undefined`) is passed as the handler.
✅
```jsx
<button onClick={() => alert("Hi")}>Click</button>
```
**Explanation:** Pass a function. Wrap in an arrow if you need arguments.

2. ❌
```jsx
<form onSubmit={handleSubmit}>...</form>
function handleSubmit() { saveData(); }   // page reloads
```
**Why it fails:** The browser's default form submission reloads the page.
✅
```jsx
function handleSubmit(e) {
  e.preventDefault();
  saveData();
}
```
**Explanation:** Call `preventDefault()` for custom form handling.

3. ❌
```jsx
<button onclick={handleClick}>Click</button>
<button onClick="handleClick()">Click</button>
```
**Why it fails:** Event props are camelCase and need a function, not a string.
✅
```jsx
<button onClick={handleClick}>Click</button>
```
**Explanation:** Use `onClick`, `onChange`, etc.

4. ❌
```jsx
<div onClick={openCard}>
  <button onClick={deleteCard}>Delete</button>   // also triggers openCard
</div>
```
**Why it fails:** Events bubble from the child up to the parent.
✅
```jsx
<button onClick={e => { e.stopPropagation(); deleteCard(); }}>Delete</button>
```
**Explanation:** Stop propagation when a child action must not trigger the parent's handler.

## Common Mistakes
- Calling the handler instead of passing it (`onClick={fn()}`).
- Forgetting `preventDefault()` on forms and links.
- Using `onclick` / string handlers copied from HTML.
- Creating complex logic inline instead of a named handler function.
- Using `onChange` on a controlled input without updating state (input becomes read-only).

## Quick Reference
```jsx
<button onClick={handle}>A</button>
<button onClick={() => handle(id)}>B</button>
<input onChange={e => setValue(e.target.value)} />
<form onSubmit={e => { e.preventDefault(); /* ... */ }} />
<input onKeyDown={e => e.key === "Enter" && submit()} />
```
