# Functions

## Introduction
Functions are reusable blocks of logic. Modern JS adds arrow functions, default/rest parameters, and closures — a powerful mechanism where a function "remembers" variables from its defining scope.

## Subtopics
- Function declarations vs expressions
- Arrow functions
- Parameters: default values, rest parameters
- Return values
- Closures
- The `this` keyword (regular vs arrow functions)
- IIFE (Immediately Invoked Function Expression)
- Higher-order functions & callbacks

## Syntax

```js
// Function declaration (hoisted, callable before definition)
function add(a, b) {
  return a + b;
}

// Function expression (not hoisted the same way)
const subtract = function (a, b) {
  return a - b;
};

// Arrow function (shorter syntax, lexical `this`)
const multiply = (a, b) => a * b;
const square = x => x * x;          // single param, no parens needed
const noArgs = () => "hello";

// Default parameters
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

// Rest parameters
function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}

// Closures
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const increment = counter();
increment(); // 1
increment(); // 2 (remembers `count` between calls)

// this in regular vs arrow functions
const obj = {
  value: 42,
  regular: function () { return this.value; },   // `this` = obj
  arrow: () => { return this.value; }              // `this` = outer scope, not obj
};

// IIFE
(function () {
  console.log("Runs immediately");
})();
```
- **Closures** — an inner function retains access to its outer function's variables even after the outer function has finished executing; commonly used for private state (like the `counter` example).
- **`this` in regular functions** — depends on *how* the function is called (its calling context).
- **`this` in arrow functions** — lexically inherited from the surrounding scope; arrows don't have their own `this`.
- **Higher-order function** — a function that takes another function as an argument or returns one (e.g., `map`, `setTimeout`, the `counter()` example).

## Important Methods & Properties

| Concept | Purpose | Syntax | Example |
|---|---|---|---|
| Function declaration | Named, hoisted function | `function name() {}` | `function add(a,b){}` |
| Arrow function | Concise function, lexical `this` | `(args) => expr` | `x => x * 2` |
| Default parameter | Fallback if arg omitted | `function f(a = val) {}` | `function f(a=1){}` |
| Rest parameter | Collect remaining args | `function f(...args) {}` | `function f(...nums){}` |
| Closure | Retain outer scope access | inner function referencing outer vars | See counter example |
| `this` | Execution context reference | `this` | `obj.method` → `this`=`obj` |

## Common Use Cases
- **Beginner:** an arrow function to double a number: `const double = n => n * 2;`.
- **DOM example:** a closure-based click counter that increments and displays a count each time a button is clicked.
- **Real-world application:** a `debounce(fn, delay)` higher-order function using a closure to track a timer ID between calls, commonly used for search-input handlers.

## Common Errors
1. ❌
```js
const obj = {
  value: 10,
  getValue: () => this.value // arrow function loses obj's `this`
};
console.log(obj.getValue()); // undefined
```
**Why it fails:** Arrow functions don't bind their own `this`; they inherit it from the enclosing (often global) scope, not the object.
✅
```js
const obj = {
  value: 10,
  getValue() { return this.value; } // regular method shorthand
};
console.log(obj.getValue()); // 10
```
**Explanation:** Use regular functions (or method shorthand) for object methods that need `this` to refer to the object.

2. ❌
```js
function sum(...nums, last) {} // rest parameter not last
```
**Why it fails:** Rest parameters must be the final parameter in the list; JS throws a SyntaxError otherwise.
✅
```js
function sum(first, ...rest) {}
```
**Explanation:** Place any non-rest parameters before the rest parameter.

3. ❌
```js
greet(); // called before declaration
const greet = function () { console.log("hi"); };
```
**Why it fails:** Function *expressions* (assigned to a variable) are not hoisted the same way as declarations; calling before assignment throws.
✅
```js
const greet = function () { console.log("hi"); };
greet();
```
**Explanation:** Function expressions must be defined before they're called, unlike function declarations.

4. ❌
```js
function outer() {
  let x = 10;
}
console.log(x); // ReferenceError, x is scoped to outer()
```
**Why it fails:** Variables declared inside a function are not accessible outside it.
✅
```js
function outer() {
  let x = 10;
  return x;
}
console.log(outer()); // 10
```
**Explanation:** Return the value if it's needed outside the function's scope.

5. ❌
```js
function counter() {
  let count = 0;
  count++;
  return count;
}
console.log(counter()); // 1
console.log(counter()); // 1 again, not 2 — no persistent state
```
**Why it fails:** Without returning a closure, each call creates a fresh `count` — state isn't retained between calls.
✅
```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```
**Explanation:** Return an inner function to create a true closure that persists state across calls.

## Common Mistakes
- Using arrow functions for object methods that rely on `this`.
- Forgetting rest parameters must come last.
- Calling function expressions before they're defined.
- Not realizing each function call creates fresh local variables unless a closure is deliberately created.

## Quick Reference
```js
function name(a, b) { return a + b; }
const fn = (a, b) => a + b;
function greet(name = "Guest") {}
function sum(...nums) {}

function makeCounter() {
  let n = 0;
  return () => ++n;
}
(function () { /* IIFE */ })();
```
