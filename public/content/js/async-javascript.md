# Async JavaScript

## Introduction
JavaScript is single-threaded but handles time-consuming tasks (network requests, timers) asynchronously via the **event loop**, **Promises**, and the more readable `async`/`await` syntax built on top of them.

## Subtopics
- Synchronous vs asynchronous execution
- Callbacks (and callback hell)
- Promises: states (`pending`, `fulfilled`, `rejected`)
- `.then()`, `.catch()`, `.finally()`
- `Promise.all()`, `Promise.race()`
- `async`/`await`
- The `fetch()` API
- Error handling in async code

## Syntax

```js
// Promise basics
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Done!");
  else reject("Failed!");
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Always runs"));

// fetch() returns a Promise
fetch("https://api.example.com/users")
  .then(response => response.json())   // parses JSON body (also returns a Promise)
  .then(data => console.log(data))
  .catch(error => console.error("Fetch failed:", error));

// async/await (cleaner syntax over Promises)
async function getUsers() {
  try {
    const response = await fetch("https://api.example.com/users");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Promise.all (wait for multiple promises, all must succeed)
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetch("/users").then(r => r.json()),
    fetch("/posts").then(r => r.json())
  ]);
}

// Promise.race (resolves/rejects as soon as the first settles)
Promise.race([fetch("/fast"), fetch("/slow")]).then(res => console.log(res));
```
- A **Promise** represents a value that may not be available yet; it settles once as either `fulfilled` (resolved) or `rejected`.
- `async function` — always returns a Promise; using `await` inside it pauses execution until the awaited Promise settles, without blocking the rest of the program.
- `await` can only be used inside an `async function` (or at the top level of ES modules).
- `fetch()` — resolves with a `Response` object; the response body must be separately parsed (e.g., `.json()`), which itself returns a Promise.
- `Promise.all()` — resolves when *all* promises succeed, or rejects immediately if *any* one fails.
- `Promise.race()` — settles as soon as the *first* promise settles (success or failure).

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `new Promise()` | Create a promise | `new Promise((res, rej) => {})` | See example above |
| `.then()` | Handle fulfillment | `promise.then(fn)` | `p.then(v => ...)` |
| `.catch()` | Handle rejection | `promise.catch(fn)` | `p.catch(e => ...)` |
| `.finally()` | Run regardless of outcome | `promise.finally(fn)` | `p.finally(() => ...)` |
| `async function` | Declare an async function | `async function f() {}` | Returns a Promise |
| `await` | Pause until Promise settles | `await promise` | `const x = await fetch(url);` |
| `fetch()` | Make an HTTP request | `fetch(url, options)` | `fetch("/api/data")` |
| `Promise.all()` | Wait for all promises | `Promise.all([p1, p2])` | Parallel requests |
| `Promise.race()` | Settle on first promise | `Promise.race([p1, p2])` | Fastest response wins |

## Common Use Cases
- **Beginner:** using `fetch()` with `.then()` to log data from a public API.
- **DOM example:** an `async` function that fetches data on button click and updates a `<div>` with the result, showing a loading state while awaiting.
- **Real-world application:** `Promise.all()` to fetch a user's profile, posts, and settings in parallel on page load, rendering the dashboard only once all three resolve.

## Common Errors
1. ❌
```js
function getData() {
  const response = fetch("/api/data"); // forgot await
  console.log(response.json()); // response is a Promise, not the actual data
}
```
**Why it fails:** `fetch()` returns a Promise; without `await` (or `.then()`), `response` is the pending Promise object, not the resolved value.
✅
```js
async function getData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log(data);
}
```
**Explanation:** Use `await` (inside an `async` function) or chain `.then()` to access the resolved value.

2. ❌
```js
async function getUser() {
  const response = await fetch("/api/user/999"); // 404 response
  const data = await response.json();
  console.log(data); // runs even though the request "failed" logically
}
```
**Why it fails:** `fetch()` only rejects on network failure, not on HTTP error status codes (like 404/500); `response.ok` must be checked manually.
✅
```js
async function getUser() {
  const response = await fetch("/api/user/999");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
}
```
**Explanation:** Always check `response.ok` (or `response.status`) since `fetch` doesn't reject on HTTP error codes.

3. ❌
```js
async function load() {
  await fetch("/a");
  await fetch("/b"); // sequential, slower than necessary if independent
}
```
**Why it fails:** Not a hard error, but awaiting independent requests one after another wastes time — they could run in parallel.
✅
```js
async function load() {
  await Promise.all([fetch("/a"), fetch("/b")]);
}
```
**Explanation:** Use `Promise.all()` to run independent async operations concurrently.

4. ❌
```js
function getData() {
  try {
    fetch("/api/data").then(res => res.json());
  } catch (e) {
    console.log(e); // never catches fetch/promise rejections this way
  }
}
```
**Why it fails:** `try/catch` only catches synchronous errors (and errors from `await`ed promises); it doesn't catch rejections in a detached `.then()` chain.
✅
```js
fetch("/api/data")
  .then(res => res.json())
  .catch(e => console.log(e)); // use .catch() for promise chains
```
**Explanation:** Use `.catch()` for `.then()` chains, or `await` the promise inside a `try/catch` block.

5. ❌
```js
await fetch("/api/data"); // used outside any async function or module
```
**Why it fails:** `await` is only valid inside an `async function` (or at the top level of an ES module); using it elsewhere is a SyntaxError.
✅
```js
async function run() {
  await fetch("/api/data");
}
run();
```
**Explanation:** Wrap `await` usage inside an `async function` (unless using top-level await in a module).

## Common Mistakes
- Forgetting `await`/`.then()` and treating a Promise as its resolved value.
- Assuming `fetch()` rejects on 404/500 errors (it doesn't — check `response.ok`).
- Awaiting independent requests sequentially instead of using `Promise.all()`.
- Using `try/catch` around a detached `.then()` chain instead of around `await`.
- Using `await` outside an `async` function.

## Quick Reference
```js
async function run() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
  } catch (err) {
    console.error(err);
  }
}

Promise.all([p1, p2]).then(([r1, r2]) => {});
Promise.race([p1, p2]).then(first => {});
```
