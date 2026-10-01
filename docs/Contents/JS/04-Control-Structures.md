# Control Structures

## Introduction
Control structures direct the flow of execution — deciding which code runs and how many times, via conditionals and loops.

## Subtopics
- `if` / `else if` / `else`
- `switch`
- `for` loop
- `while` and `do...while` loops
- `for...of` (iterables) and `for...in` (object keys)
- `break` and `continue`

## Syntax

```js
// if / else
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else {
  console.log("C");
}

// switch
switch (day) {
  case "Mon":
    console.log("Start of week");
    break;
  case "Fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Midweek");
}

// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while loop
let n = 0;
while (n < 3) {
  console.log(n);
  n++;
}

// do...while (always runs at least once)
let m = 0;
do {
  console.log(m);
  m++;
} while (m < 3);

// for...of (values of an iterable: array, string, etc.)
for (const value of [10, 20, 30]) {
  console.log(value);
}

// for...in (enumerable keys of an object)
for (const key in { a: 1, b: 2 }) {
  console.log(key);
}

// break / continue
for (let i = 0; i < 10; i++) {
  if (i === 5) break;      // exits the loop entirely
  if (i % 2 === 0) continue; // skips to next iteration
  console.log(i);
}
```
- `switch` uses strict comparison (`===`) against `case` values; `break` prevents "fall-through" into the next case.
- `for...of` iterates over **values** (arrays, strings, maps, sets); `for...in` iterates over **enumerable property keys** (best for plain objects, not arrays).

## Important Methods & Properties

| Structure | Purpose | Syntax | Example |
|---|---|---|---|
| `if/else` | Conditional branching | `if (cond) {} else {}` | `if (x > 0) {}` |
| `switch` | Multi-branch by value | `switch(x){case v:}` | `switch(day){case "Mon":}` |
| `for` | Counted loop | `for(init;cond;step){}` | `for(let i=0;i<5;i++){}` |
| `while` | Condition-first loop | `while(cond){}` | `while(n<5){}` |
| `do...while` | Runs at least once | `do{}while(cond);` | `do{}while(n<5);` |
| `for...of` | Iterate values | `for(const v of iter){}` | `for(const v of arr){}` |
| `for...in` | Iterate object keys | `for(const k in obj){}` | `for(const k in obj){}` |

## Common Use Cases
- **Beginner:** an `if/else` grading script based on score ranges.
- **DOM example:** `for...of` looping through `document.querySelectorAll(".item")` to attach a click listener to each.
- **Real-world application:** a `switch` statement routing different UI states (`loading`, `success`, `error`) to different render functions.

## Common Errors
1. ❌
```js
switch (day) {
  case "Mon":
    console.log("Monday");
  case "Tue":
    console.log("Tuesday");
}
```
**Why it fails:** Missing `break` causes fall-through — both cases run even if only "Mon" matched.
✅
```js
switch (day) {
  case "Mon":
    console.log("Monday");
    break;
  case "Tue":
    console.log("Tuesday");
    break;
}
```
**Explanation:** Add `break` after each case unless fall-through is intentional.

2. ❌
```js
for (let i = 0; i < arr.length; i++) {} // fine, but common typo below:
for (let i = 0; i < arr.length; ) {}    // missing increment — infinite loop
```
**Why it fails:** Without incrementing `i`, the condition never becomes false, causing an infinite loop.
✅
```js
for (let i = 0; i < arr.length; i++) {}
```
**Explanation:** Always include all three parts of a `for` loop: initialization, condition, and increment.

3. ❌
```js
for (const key in [10, 20, 30]) {
  console.log(key); // logs "0","1","2" (indices as strings), not the values
}
```
**Why it fails:** `for...in` iterates enumerable keys (indices for arrays), not values, and isn't ideal for arrays.
✅
```js
for (const value of [10, 20, 30]) {
  console.log(value); // logs 10, 20, 30
}
```
**Explanation:** Use `for...of` for array values; reserve `for...in` for plain object keys.

4. ❌
```js
if (x = 5) { ... }
```
**Why it fails:** Single `=` performs assignment, not comparison, so the condition is always truthy (assigns 5, which is truthy).
✅
```js
if (x === 5) { ... }
```
**Explanation:** Use `===` for comparisons inside conditions.

5. ❌
```js
while (true) {
  console.log("looping");
  // no break condition
}
```
**Why it fails:** No exit condition or `break`, causing an infinite loop that freezes execution.
✅
```js
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
```
**Explanation:** Always ensure loops have a reachable exit condition.

## Common Mistakes
- Forgetting `break` in `switch` statements.
- Using `for...in` on arrays instead of `for...of`.
- Writing infinite loops by forgetting to update the loop variable.
- Confusing assignment (`=`) with comparison (`===`) in conditions.

## Quick Reference
```js
if (cond) {} else if (cond2) {} else {}
switch (x) { case v: /*...*/ break; default: /*...*/ }
for (let i = 0; i < n; i++) {}
while (cond) {}
do {} while (cond);
for (const v of arr) {}
for (const k in obj) {}
break; continue;
```
