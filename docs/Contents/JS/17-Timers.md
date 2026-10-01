# Timers

## Introduction
Timers let JavaScript schedule code to run after a delay or repeatedly at intervals, powering things like debounced search, auto-save, slideshows, and countdowns.

## Subtopics
- `setTimeout()` — run once after a delay
- `clearTimeout()` — cancel a pending timeout
- `setInterval()` — run repeatedly at an interval
- `clearInterval()` — stop a running interval
- Timers and closures (capturing loop variables)
- Timers and the event loop (non-blocking behavior)

## Syntax

```js
// setTimeout - runs once after the delay (in ms)
const timeoutId = setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);

// Cancel before it fires
clearTimeout(timeoutId);

// setInterval - runs repeatedly every N ms until stopped
const intervalId = setInterval(() => {
  console.log("Runs every second");
}, 1000);

// Stop the interval
clearInterval(intervalId);

// Passing arguments to the callback
setTimeout((name) => console.log(`Hello ${name}`), 1000, "Alice");

// Common pattern: debounce using setTimeout
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const debouncedSearch = debounce((query) => console.log("Searching:", query), 300);
```
- `setTimeout(callback, delay)` — schedules `callback` to run **once** after at least `delay` milliseconds (not exact, due to the single-threaded event loop).
- `clearTimeout(id)` — cancels a timeout before it fires, using the ID returned by `setTimeout()`.
- `setInterval(callback, delay)` — repeatedly runs `callback` every `delay` milliseconds until explicitly stopped.
- `clearInterval(id)` — stops a running interval using its ID.
- Timers are asynchronous: the JS engine continues running other code and only executes the callback once the call stack is clear and the delay has elapsed.

## Important Methods & Properties

| Method | Purpose | Syntax | Example |
|---|---|---|---|
| `setTimeout()` | Run once after a delay | `setTimeout(fn, ms)` | `setTimeout(fn, 1000)` |
| `clearTimeout()` | Cancel a pending timeout | `clearTimeout(id)` | `clearTimeout(timeoutId)` |
| `setInterval()` | Run repeatedly at an interval | `setInterval(fn, ms)` | `setInterval(fn, 1000)` |
| `clearInterval()` | Stop a running interval | `clearInterval(id)` | `clearInterval(intervalId)` |

## Common Use Cases
- **Beginner:** a `setTimeout()` that shows a "Welcome!" message 3 seconds after page load.
- **DOM example:** an auto-advancing image carousel using `setInterval()` to change the displayed image every 5 seconds.
- **Real-world application:** a debounced search input using `setTimeout`/`clearTimeout` to delay firing an API request until the user stops typing for 300ms.

## Common Errors
1. ❌
```js
setInterval(() => {
  console.log("tick");
}, 1000);
// never stopped, keeps running even after the component/page no longer needs it
```
**Why it fails:** Not a syntax error, but forgetting to store the interval ID and call `clearInterval()` when it's no longer needed causes memory leaks/unwanted behavior.
✅
```js
const id = setInterval(() => console.log("tick"), 1000);
// later, when done:
clearInterval(id);
```
**Explanation:** Always store the ID returned by `setInterval()` so it can be cleared later.

2. ❌
```js
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// logs 4, 4, 4 instead of 1, 2, 3
```
**Why it fails:** `var` is function-scoped, so all three callbacks share the same `i`, which equals 4 by the time the timeouts fire.
✅
```js
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// logs 1, 2, 3
```
**Explanation:** Use `let` so each loop iteration captures its own separate `i` in the closure.

3. ❌
```js
setTimeout(myFunction(), 1000); // calls myFunction immediately, passes its return value
```
**Why it fails:** The parentheses invoke `myFunction` right away instead of passing a reference for `setTimeout` to call later.
✅
```js
setTimeout(myFunction, 1000); // pass the function reference
```
**Explanation:** Omit parentheses so the function executes only when the timer fires.

4. ❌
```js
setTimeout(() => { console.log("done"); }, "1000"); // string delay (works but bad practice)
```
**Why it fails:** Not strictly an error since JS coerces `"1000"` to a number, but relying on implicit coercion is fragile and unclear.
✅
```js
setTimeout(() => { console.log("done"); }, 1000);
```
**Explanation:** Always pass the delay as an actual number.

5. ❌
```js
clearTimeout(); // forgot to pass the actual timeout ID
```
**Why it fails:** Without the correct ID, `clearTimeout()` does nothing meaningful — it silently no-ops if given an invalid or missing ID.
✅
```js
const id = setTimeout(fn, 1000);
clearTimeout(id);
```
**Explanation:** Always capture and pass the exact ID returned from `setTimeout`/`setInterval` to cancel it.

## Common Mistakes
- Forgetting to clear intervals, causing them to run indefinitely.
- Using `var` in loops with timers, causing shared-variable bugs (use `let`).
- Passing an invoked function (`fn()`) instead of a reference (`fn`) to `setTimeout`.
- Assuming `setTimeout`'s delay is exact (it's a *minimum* delay, not guaranteed).
- Losing track of timer IDs needed for cancellation.

## Quick Reference
```js
const t = setTimeout(() => {}, 1000);
clearTimeout(t);

const i = setInterval(() => {}, 1000);
clearInterval(i);

// Debounce pattern
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```
