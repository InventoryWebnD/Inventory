# Fundamentals

## Introduction

JavaScript is the programming language of the web, enabling interactivity, logic, and dynamic behavior in browsers (and beyond, via Node.js). This chapter covers how JS code is written, how variables are declared, and two of its most misunderstood core mechanics: **hoisting** and **scope**.

## Subtopics

- Statements, expressions, and comments
- Variable declarations: `var`, `let`, `const`
- Scope: global, function, block scope
- Hoisting
- The Temporal Dead Zone (TDZ)
- Strict mode (`"use strict"`)
- Closures (introductory concept)
- The `this` keyword (introductory concept)

## Syntax

### 1. Declarations

```js
var oldWay = "function-scoped";     // legacy, avoid in modern code
let mutable = "block-scoped";       // can be reassigned
const fixed = "block-scoped";       // cannot be reassigned
```
- `var` — function-scoped, hoisted with an `undefined` initial value.
- `let` — block-scoped, hoisted but not initialized (TDZ applies).
- `const` — block-scoped, must be initialized at declaration, cannot be reassigned (though object/array *contents* can still be mutated).

### 2. Scope

```js
let globalVar = "I'm global";

function outer() {
  let functionVar = "I'm function-scoped";
  if (true) {
    let blockVar = "I'm block-scoped";
    console.log(blockVar); // accessible here
  }
  // console.log(blockVar); // ReferenceError: not accessible outside the block
}
```
- **Global scope** — declared outside any function/block; accessible everywhere.
- **Function scope** — `var` variables are scoped to the nearest enclosing function.
- **Block scope** — `let`/`const` are scoped to the nearest `{ }` block (if, for, while, etc.).

### 3. Hoisting

```js
console.log(hoistedVar); // undefined (not an error)
var hoistedVar = "value";

console.log(hoistedLet); // ReferenceError (Temporal Dead Zone)
let hoistedLet = "value";
```
- Hoisting moves declarations (not initializations) to the top of their scope during compilation.
- `var` declarations are hoisted and initialized to `undefined`.
- `let`/`const` are hoisted too, but remain uninitialized until their line runs — accessing them earlier throws a `ReferenceError` (the **Temporal Dead Zone**).
- Function declarations are fully hoisted (including their body), so they can be called before their definition in source order.

### 4. Strict Mode

```js
"use strict";

x = 10; // throws ReferenceError instead of silently creating a global
```
- `"use strict"` — enables stricter parsing/error handling, catching common mistakes like undeclared variables.

## Important Methods & Properties

| Keyword/Concept | Purpose | Syntax | Example |
|---|---|---|---|
| `var` | Function-scoped variable | `var name = value;` | `var x = 1;` |
| `let` | Block-scoped, reassignable | `let name = value;` | `let y = 2;` |
| `const` | Block-scoped, constant binding | `const name = value;` | `const z = 3;` |
| Hoisting | Declarations moved to scope top | N/A (behavior) | `console.log(a); var a=1;` → `undefined` |
| `"use strict"` | Enable strict parsing | `"use strict";` | Top of file/function |
| `typeof` | Check a variable's type | `typeof value` | `typeof 5 // "number"` |

## Common Use Cases

- **Beginner:** declaring a `const` for a value that never changes (like a config constant).
- **DOM example:** using `let` inside a `for` loop to correctly capture each iteration's value in an event listener (block scoping fixes the classic `var` closure bug).
- **Real-world application:** structuring a module with clear global constants (`const API_URL = "..."`) and function-scoped helper variables to avoid naming collisions across a large codebase.

## Common Errors

1. ❌
```js
console.log(count);
let count = 5;
```
**Why it fails:** `let` is hoisted but not initialized; accessing it before its declaration throws a `ReferenceError` due to the Temporal Dead Zone.
✅
```js
let count = 5;
console.log(count);
```
**Explanation:** Declare and initialize `let`/`const` before using them.

2. ❌
```js
const total = 10;
total = 20;
```
**Why it fails:** `const` bindings cannot be reassigned after initialization.
✅
```js
let total = 10;
total = 20;
```
**Explanation:** Use `let` if the variable needs to change; use `const` only for values that stay bound.

3. ❌
```js
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // works, but often unintended
}
```
**Why it fails:** Not technically an error, but a common misunderstanding — `var` ignores block scope, leaking out of the `if` block, which can cause bugs in larger functions.
✅
```js
function test() {
  if (true) {
    let x = 10;
    console.log(x);
  }
  // x is not accessible here, as intended
}
```
**Explanation:** Use `let`/`const` for predictable block scoping instead of relying on `var`'s function-scope leakage.

4. ❌
```js
"use strict";
y = 5; // undeclared variable
```
**Why it fails:** In strict mode, assigning to an undeclared variable throws a `ReferenceError` instead of silently creating a global.
✅
```js
"use strict";
let y = 5;
```
**Explanation:** Always declare variables explicitly with `let`/`const`/`var`.

5. ❌
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// logs 3, 3, 3 instead of 0, 1, 2
```
**Why it fails:** `var` is function-scoped, so all callbacks share the same single `i`, which equals 3 by the time the timeouts run.
✅
```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// logs 0, 1, 2
```
**Explanation:** `let` creates a new binding per loop iteration, so each closure captures its own `i`.

## Common Mistakes

- Using `var` out of habit instead of `let`/`const`, leading to scope leakage bugs.
- Forgetting `const` bindings can't be reassigned (but their contents, like array/object properties, *can* be mutated).
- Not understanding hoisting, leading to confusing `undefined` vs `ReferenceError` behavior.
- Omitting `"use strict"` (or not using ES modules, which are strict by default), allowing accidental global variables.

## Quick Reference

```js
var a = 1;     // function-scoped, hoisted as undefined
let b = 2;     // block-scoped, TDZ before declaration
const c = 3;   // block-scoped, constant binding

"use strict";  // enables strict parsing

typeof c;      // "number"
```
Hoisting: `var` → `undefined` before assignment. `let`/`const` → `ReferenceError` before declaration (TDZ). Functions declarations → fully hoisted.
