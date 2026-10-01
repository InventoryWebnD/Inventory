# Error Handling

## Introduction
Error handling lets a program gracefully respond to unexpected failures — invalid input, failed network requests, or bugs — instead of crashing entirely. JavaScript uses `try/catch/finally` and built-in `Error` objects for this.

## Subtopics
- `try` / `catch` / `finally`
- The `Error` object and its properties (`message`, `name`, `stack`)
- Throwing custom errors with `throw`
- Custom error classes (extending `Error`)
- Error handling in async code (`try/catch` with `await`)
- Common built-in error types: `TypeError`, `RangeError`, `SyntaxError`, `ReferenceError`

## Syntax

```js
// Basic try/catch
try {
  JSON.parse("invalid json");
} catch (error) {
  console.error("Failed:", error.message);
} finally {
  console.log("This always runs");
}

// Throwing custom errors
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // "Cannot divide by zero"
}

// Custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) throw new ValidationError("Age cannot be negative");
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation issue:", error.message);
  } else {
    console.log("Unknown error:", error.message);
  }
}

// Async error handling
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error.message);
  } finally {
    console.log("Request attempt finished");
  }
}
```
- `try { }` — code that might throw an error is placed here.
- `catch (error) { }` — runs only if an error was thrown inside `try`; receives the error object.
- `finally { }` — always runs, whether or not an error occurred (useful for cleanup like hiding a loading spinner).
- `throw` — manually raises an error (can throw any value, but an `Error` instance is best practice for a proper stack trace).
- Custom error classes extending `Error` let you distinguish error types with `instanceof` and add extra context.

## Important Methods & Properties

| Concept | Purpose | Syntax | Example |
|---|---|---|---|
| `try/catch` | Handle exceptions | `try{}catch(e){}` | See example above |
| `finally` | Always-run cleanup block | `finally{}` | Hide loading spinner |
| `throw` | Manually raise an error | `throw new Error(msg)` | `throw new Error("bad")` |
| `error.message` | Human-readable error text | `error.message` | `"Cannot divide by zero"` |
| `error.name` | Error type name | `error.name` | `"TypeError"` |
| `instanceof` | Check error type | `error instanceof Type` | `error instanceof TypeError` |
| Custom error class | Extend `Error` for custom types | `class X extends Error {}` | `class ValidationError extends Error{}` |

## Common Use Cases
- **Beginner:** wrapping `JSON.parse()` in `try/catch` to handle malformed input gracefully.
- **DOM example:** catching errors during form validation and displaying a friendly message in the UI instead of letting the script crash.
- **Real-world application:** a custom `ApiError` class carrying an HTTP status code, thrown when a `fetch()` response isn't `ok`, caught centrally to show different messages for 401 vs 500 errors.

## Common Errors
1. ❌
```js
try {
  riskyOperation();
}
// missing catch or finally entirely
```
**Why it fails:** A `try` block must be followed by at least a `catch` or `finally` block, or it's a SyntaxError.
✅
```js
try {
  riskyOperation();
} catch (error) {
  console.error(error);
}
```
**Explanation:** Always pair `try` with at least one of `catch`/`finally`.

2. ❌
```js
async function load() {
  fetch("/api/data").then(res => res.json()); // errors not caught anywhere
}
```
**Why it fails:** Errors inside a detached `.then()` chain aren't caught by a `try/catch` wrapping the outer function unless awaited.
✅
```js
async function load() {
  try {
    const res = await fetch("/api/data");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
```
**Explanation:** Use `await` inside `try/catch` so rejected promises are actually caught.

3. ❌
```js
throw "Something broke"; // throwing a plain string
```
**Why it fails:** Throwing a raw string loses useful debugging info like a stack trace, and `error.message` won't exist on it.
✅
```js
throw new Error("Something broke");
```
**Explanation:** Always throw an `Error` instance (or subclass) for consistent, debuggable error objects.

4. ❌
```js
try {
  doSomething();
} catch (error) {
  // silently swallowing the error with no logging or handling
}
```
**Why it fails:** Not a syntax error, but silently ignoring errors hides real bugs and makes debugging very difficult.
✅
```js
try {
  doSomething();
} catch (error) {
  console.error("doSomething failed:", error);
  // optionally re-throw or handle appropriately
}
```
**Explanation:** Always at least log caught errors, even if full recovery isn't possible.

5. ❌
```js
class ValidationError extends Error {
  constructor(message) {
    this.name = "ValidationError"; // used `this` before calling super()
  }
}
```
**Why it fails:** In a subclass constructor, `this` cannot be used before calling `super()`, which initializes the parent `Error` class; this throws a ReferenceError.
✅
```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```
**Explanation:** Always call `super(message)` first in a custom error class's constructor.

## Common Mistakes
- Omitting `catch`/`finally` after a `try` block.
- Not awaiting promises inside `try/catch`, missing thrown errors.
- Throwing plain strings/values instead of `Error` instances.
- Silently swallowing errors without logging.
- Forgetting `super()` before using `this` in a custom error class.

## Quick Reference
```js
try {
  // risky code
} catch (error) {
  console.error(error.message);
} finally {
  // always runs
}

throw new Error("message");

class MyError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "MyError";
  }
}
```
