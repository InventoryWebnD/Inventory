# Events

## Introduction
Events let JavaScript respond to user interactions (clicks, typing, scrolling) or browser actions (page load). Understanding event **bubbling** and **delegation** is key to writing efficient, scalable event-handling code.

## Subtopics
- Adding/removing listeners: `addEventListener`, `removeEventListener`
- Common event types: `click`, `input`, `change`, `submit`, `keydown`, `load`
- The event object (`event.target`, `event.type`)
- Event bubbling and capturing
- `stopPropagation()` and `preventDefault()`
- Event delegation

## Syntax

```js
const button = document.querySelector("button");

// Adding a listener
button.addEventListener("click", function (event) {
  console.log("Clicked!", event.target);
});

// Arrow function listener
button.addEventListener("click", (e) => console.log(e.type));

// Removing a listener (must reference the same named function)
function handleClick() { console.log("clicked"); }
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// Preventing default behavior (e.g., stopping form submission)
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Stopping propagation (prevents bubbling to parent listeners)
child.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Event delegation: one listener on a parent handles all children
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("List item clicked:", e.target.textContent);
  }
});
```
- `addEventListener(type, handler)` — attaches a listener without overwriting existing ones (unlike `onclick = fn`).
- `event.target` — the actual element that triggered the event (useful in delegation, since it may differ from the element the listener is attached to).
- **Bubbling** — an event fired on a child also triggers listeners on its ancestors, moving upward through the DOM tree.
- `stopPropagation()` — stops the event from bubbling further up.
- `preventDefault()` — cancels the browser's default action (e.g., a link navigating, a form submitting).
- **Event delegation** — attaching a single listener to a parent element instead of many listeners on individual children, relying on bubbling and `event.target` to identify which child was interacted with.

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `addEventListener()` | Attach event handler | `el.addEventListener(type, fn)` | `btn.addEventListener("click", fn)` |
| `removeEventListener()` | Detach event handler | `el.removeEventListener(type, fn)` | `btn.removeEventListener("click", fn)` |
| `event.target` | Element that triggered event | `event.target` | `e.target.value` |
| `event.preventDefault()` | Cancel default action | `event.preventDefault()` | Stop form submit |
| `event.stopPropagation()` | Stop bubbling | `event.stopPropagation()` | Stop parent handler |
| `event.type` | Event name | `event.type` | `"click"` |

## Common Use Cases
- **Beginner:** a button that logs a message to the console on `click`.
- **DOM example:** a search input using the `input` event to filter a list in real time as the user types.
- **Real-world application:** a dynamically generated todo list using event delegation on the parent `<ul>` so newly added `<li>` items automatically get click handling without re-attaching listeners.

## Common Errors
1. ❌
```js
button.onclick = fn1;
button.onclick = fn2; // overwrites fn1 entirely
```
**Why it fails:** Assigning directly to `onclick` replaces any previous handler; only one can exist at a time.
✅
```js
button.addEventListener("click", fn1);
button.addEventListener("click", fn2); // both run
```
**Explanation:** `addEventListener` allows multiple handlers on the same event without overwriting.

2. ❌
```js
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", handleClick); // attached to every li individually
});
// new li items added later won't have the listener
```
**Why it fails:** Listeners attached directly to individual elements don't automatically apply to elements added later.
✅
```js
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") handleClick(e);
});
```
**Explanation:** Use event delegation on a stable parent so dynamically added children are automatically covered.

3. ❌
```js
form.addEventListener("submit", () => {
  // form still submits/reloads the page unexpectedly
});
```
**Why it fails:** Without `preventDefault()`, the browser's default submit behavior (page reload/navigation) still happens.
✅
```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
```
**Explanation:** Call `preventDefault()` to stop the default browser action when handling the event manually.

4. ❌
```js
button.addEventListener("click", handleClick());  // calls immediately, passes return value
```
**Why it fails:** `handleClick()` (with parentheses) invokes the function immediately at attachment time instead of passing a reference to call later.
✅
```js
button.addEventListener("click", handleClick); // pass the function reference
```
**Explanation:** Omit the parentheses so the function is called later, on the event, not immediately.

5. ❌
```js
button.removeEventListener("click", () => console.log("hi")); 
// doesn't remove anything — different anonymous function reference
```
**Why it fails:** `removeEventListener` requires the *exact same function reference* used in `addEventListener`; anonymous functions can't be removed this way.
✅
```js
function handleClick() { console.log("hi"); }
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);
```
**Explanation:** Use a named function reference if the listener may need to be removed later.

## Common Mistakes
- Using `onclick =` instead of `addEventListener`, overwriting previous handlers.
- Attaching individual listeners to many children instead of using delegation.
- Forgetting `preventDefault()` for forms/links needing custom handling.
- Passing an invoked function (`fn()`) instead of a reference (`fn`) to `addEventListener`.
- Trying to remove anonymous function listeners.

## Quick Reference
```js
el.addEventListener("click", handler);
el.removeEventListener("click", handler);

el.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(e.target, e.type);
});

// Delegation
parent.addEventListener("click", (e) => {
  if (e.target.matches(".child")) { /* handle */ }
});
```
