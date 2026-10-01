# Arrays

## Introduction
Arrays store ordered lists of values. ES6+ provides powerful functional methods (`map`, `filter`, `reduce`) for transforming array data without manual loops.

## Subtopics
- Creating arrays, accessing/modifying elements
- Mutating methods: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`
- Non-mutating methods: `map`, `filter`, `reduce`, `slice`, `concat`
- Search methods: `find`, `findIndex`, `includes`, `indexOf`
- Iteration: `forEach`, `for...of`
- Spread/rest with arrays
- Destructuring arrays

## Syntax

```js
const arr = [1, 2, 3];

// Mutating
arr.push(4);        // [1,2,3,4] - adds to end
arr.pop();            // [1,2,3] - removes from end
arr.unshift(0);        // [0,1,2,3] - adds to start
arr.shift();            // [1,2,3] - removes from start
arr.splice(1, 1, "x"); // removes 1 item at index 1, inserts "x"
arr.sort((a, b) => a - b); // numeric ascending sort
arr.reverse();          // reverses in place

// Non-mutating (return new array/value)
const doubled = arr.map(n => n * 2);
const evens = arr.filter(n => n % 2 === 0);
const total = arr.reduce((sum, n) => sum + n, 0);
const part = arr.slice(1, 3);   // extracts without modifying original
const combined = arr.concat([4, 5]);

// Search
arr.find(n => n > 1);        // first matching element
arr.findIndex(n => n > 1);    // index of first match
arr.includes(2);                // true/false
arr.indexOf(2);                  // index or -1

// Iteration
arr.forEach(n => console.log(n));
for (const n of arr) console.log(n);

// Destructuring
const [first, second, ...rest] = [10, 20, 30, 40];
```
- `map()` — transforms each element, returns a **new array** of the same length.
- `filter()` — returns a **new array** with only elements passing the test.
- `reduce(fn, initial)` — accumulates array elements into a single value.
- `splice(start, deleteCount, ...items)` — mutates the array in place (add/remove/replace).
- `slice(start, end)` — returns a shallow copy of a portion, without mutating the original.

## Important Methods & Properties

| Method | Purpose | Syntax | Example |
|---|---|---|---|
| `push()`/`pop()` | Add/remove at end | `arr.push(x)` | `[1,2].push(3)` |
| `shift()`/`unshift()` | Remove/add at start | `arr.unshift(x)` | `[2].unshift(1)` |
| `map()` | Transform each element | `arr.map(fn)` | `[1,2].map(n=>n*2)` |
| `filter()` | Keep matching elements | `arr.filter(fn)` | `[1,2,3].filter(n=>n>1)` |
| `reduce()` | Accumulate to single value | `arr.reduce(fn, init)` | `[1,2].reduce((a,b)=>a+b,0)` |
| `find()` | First matching element | `arr.find(fn)` | `[1,2].find(n=>n>1)` |
| `includes()` | Check value presence | `arr.includes(x)` | `[1,2].includes(2)` |
| `sort()` | Sort in place | `arr.sort(fn)` | `[3,1].sort((a,b)=>a-b)` |
| `length` | Array size | `arr.length` | `[1,2,3].length // 3` |

## Common Use Cases
- **Beginner:** using `map()` to double every number in a list.
- **DOM example:** `Array.from(document.querySelectorAll("li")).map(li => li.textContent)` to collect all list item text.
- **Real-world application:** `data.filter(item => item.active).map(item => item.name)` to derive a display list from an API response.

## Common Errors
1. ❌
```js
const nums = [10, 2, 33];
nums.sort(); // [10, 2, 33] sorted as strings: [10, 2, 33] -> ["10","2","33"] -> [10, 2, 33]
console.log(nums); // [10, 2, 33] (wrong numeric order)
```
**Why it fails:** `sort()` without a comparator sorts elements as strings by default, giving incorrect results for numbers.
✅
```js
nums.sort((a, b) => a - b);
```
**Explanation:** Always pass a comparator function for numeric sorting.

2. ❌
```js
const result = arr.map(n => n * 2);
console.log(arr); // expecting arr itself to change
```
**Why it fails:** `map()` doesn't mutate the original array; it returns a new one that must be captured.
✅
```js
const doubled = arr.map(n => n * 2);
console.log(doubled);
```
**Explanation:** Use the returned value from non-mutating methods like `map`/`filter`/`slice`.

3. ❌
```js
arr.splice(1, 0, "new"); // meant to remove, accidentally inserts
```
**Why it fails:** The second argument is `deleteCount`; passing `0` here means "delete nothing," so it only inserts.
✅
```js
arr.splice(1, 1); // removes 1 element at index 1
```
**Explanation:** Double-check `splice()`'s second argument if the goal is removal.

4. ❌
```js
if (arr.indexOf(value) == true) { ... }
```
**Why it fails:** `indexOf()` returns a number (index or `-1`), not a boolean; comparing to `true` is almost always wrong.
✅
```js
if (arr.indexOf(value) !== -1) { ... }
// or more clearly:
if (arr.includes(value)) { ... }
```
**Explanation:** Use `includes()` for a clear boolean presence check.

5. ❌
```js
const total = arr.reduce((sum, n) => sum + n);
// throws or misbehaves on an empty array (no initial value)
```
**Why it fails:** Without an initial value, `reduce()` uses the first element as the accumulator, which fails/returns `undefined` behavior on empty arrays.
✅
```js
const total = arr.reduce((sum, n) => sum + n, 0);
```
**Explanation:** Always provide an initial value to `reduce()` for predictable results.

## Common Mistakes
- Forgetting `sort()` needs a comparator for numbers.
- Expecting `map`/`filter`/`slice` to mutate the original array.
- Misusing `splice()`'s arguments (delete count vs items to insert).
- Comparing `indexOf()` result to a boolean instead of `-1`.
- Omitting the initial value in `reduce()`.

## Quick Reference
```js
arr.push(x); arr.pop(); arr.shift(); arr.unshift(x);
arr.map(fn); arr.filter(fn); arr.reduce(fn, init);
arr.find(fn); arr.findIndex(fn); arr.includes(x); arr.indexOf(x);
arr.slice(s,e); arr.splice(s,d,...items); arr.concat(other);
arr.sort((a,b)=>a-b); arr.reverse();
arr.forEach(fn);
const [a, b, ...rest] = arr;
```
