# Operators

## Introduction
Operators perform actions on values: arithmetic, comparison, logical, assignment, and more. ES6+ adds convenient operators like optional chaining and nullish coalescing.

## Subtopics
- Arithmetic operators
- Assignment operators (including compound)
- Comparison operators (`==`, `===`, `<`, `>`, etc.)
- Logical operators (`&&`, `||`, `!`)
- Ternary operator
- Nullish coalescing (`??`)
- Optional chaining (`?.`)
- Spread (`...`) and rest (`...`) operators
- typeof / instanceof

## Syntax

```js
// Arithmetic
let sum = 5 + 2;        // 7
let mod = 5 % 2;          // 1 (remainder)
let power = 2 ** 3;         // 8 (exponentiation)

// Assignment
let x = 10;
x += 5;   // x = x + 5
x *= 2;    // x = x * 2

// Comparison
5 === "5";   // false (strict, no coercion)
5 == "5";     // true (loose, coerces)

// Logical
true && false;  // false
true || false;   // true
!true;             // false

// Ternary
let status = age >= 18 ? "adult" : "minor";

// Nullish coalescing (only null/undefined trigger fallback)
let name = userName ?? "Guest";

// Optional chaining (safe property access)
let city = user?.address?.city;

// Spread (expand array/object)
let arr2 = [...arr1, 4, 5];
let obj2 = { ...obj1, extra: true };

// Rest (collect remaining args)
function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
```
- `??` — returns the right side only if the left side is `null`/`undefined` (unlike `||`, which also triggers on `0`, `""`, `false`).
- `?.` — short-circuits to `undefined` instead of throwing if a property in the chain is `null`/`undefined`.
- `...` — spreads iterable elements when building arrays/objects; collects arguments into an array when used in a function parameter list.

## Important Methods & Properties

| Operator | Purpose | Syntax | Example |
|---|---|---|---|
| `===` / `!==` | Strict (in)equality | `a === b` | `1 === 1 // true` |
| `&&` / `\|\|` / `!` | Logical AND/OR/NOT | `a && b` | `true && false // false` |
| `?:` | Ternary conditional | `cond ? a : b` | `age >= 18 ? "yes" : "no"` |
| `??` | Nullish coalescing | `a ?? b` | `null ?? "default"` |
| `?.` | Optional chaining | `a?.b` | `user?.name` |
| `...` | Spread/rest | `[...arr]` / `(...args)` | `[...[1,2], 3]` |

## Common Use Cases
- **Beginner:** ternary operator for a simple if/else one-liner.
- **DOM example:** `element?.classList.add("active")` to safely act only if the element exists.
- **Real-world application:** `const port = process.env.PORT ?? 3000;` to fall back only when the value is truly unset.

## Common Errors
1. ❌ `let count = userCount || 10;` when `userCount` is legitimately `0` → ✅ `let count = userCount ?? 10;` — `??` doesn't trigger on falsy-but-valid values like `0`.
2. ❌ `if (a = 5) {}` (assignment instead of comparison) → ✅ `if (a === 5) {}`.
3. ❌ `user.address.city` throwing when `address` is undefined → ✅ `user?.address?.city` to safely short-circuit.
4. ❌ `function sum(a, ...rest, b)` (rest parameter not last) → ✅ rest parameter must be the last parameter: `function sum(a, b, ...rest)`.
5. ❌ `5 == "5"` assumed to always be safe → ✅ prefer `===` to avoid unintended type coercion bugs.

## Common Mistakes
- Confusing `??` with `||` for default values.
- Using `==` instead of `===` habitually.
- Forgetting rest parameters must be last in the parameter list.
- Chaining `?.` but still expecting a thrown error for debugging (it silently returns `undefined`).

## Quick Reference
```js
a + b, a - b, a * b, a / b, a % b, a ** b
a === b, a !== b, a > b, a <= b
a && b, a || b, !a
cond ? x : y
a ?? b
a?.b?.c
[...arr], {...obj}
function f(...args) {}
```
