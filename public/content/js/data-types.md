# Data Types

## Introduction

JavaScript has two categories of data types: **primitive** types (stored by value) and **reference** types (stored by reference). Understanding type coercion and equality checking is essential to avoiding subtle bugs.

## Subtopics

- Primitive types: `string`, `number`, `boolean`, `undefined`, `null`, `bigint`, `symbol`
- Reference types: `object`, `array`, `function`
- `typeof` operator
- Type coercion (implicit conversion)
- Type conversion (explicit conversion)
- Equality: `==` vs `===`
- `NaN` and numeric edge cases

## Syntax

### 1. Primitive Types

```js
let str = "Hello";          // string
let num = 42;                // number
let float = 3.14;            // number (no separate float type)
let bool = true;             // boolean
let notAssigned;              // undefined
let empty = null;            // null (intentional absence of value)
let big = 123n;               // bigint (for very large integers)
let sym = Symbol("id");      // symbol (unique identifier)
```

### 2. Reference Types

```js
let obj = { name: "Alice" };      // object
let arr = [1, 2, 3];               // array (a special type of object)
function greet() {}                 // function (also a callable object)
```

### 3. Checking Types

```js
typeof "hello";     // "string"
typeof 42;           // "number"
typeof true;          // "boolean"
typeof undefined;      // "undefined"
typeof null;            // "object" (a long-standing JS quirk/bug)
typeof {};                // "object"
typeof [];                 // "object" (use Array.isArray() to distinguish)
typeof function(){};        // "function"
```

### 4. Type Coercion vs Conversion

```js
// Implicit coercion
"5" + 1;      // "51" (number coerced to string)
"5" - 1;       // 4   (string coerced to number)
true + 1;       // 2   (boolean coerced to number)

// Explicit conversion
Number("42");    // 42
String(42);       // "42"
Boolean(0);        // false
Boolean("");        // false
Boolean("text");     // true
```

### 5. Equality Comparisons

```js
0 == "0";     // true  (coerces types before comparing)
0 === "0";     // false (no coercion, different types)
null == undefined;   // true
null === undefined;   // false
NaN === NaN;           // false (NaN is never equal to itself)
Number.isNaN(NaN);      // true (correct way to check for NaN)
```

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `typeof` | Get a value's type | `typeof value` | `typeof "x" // "string"` |
| `Number()` | Convert to number | `Number(value)` | `Number("10") // 10` |
| `String()` | Convert to string | `String(value)` | `String(10) // "10"` |
| `Boolean()` | Convert to boolean | `Boolean(value)` | `Boolean(1) // true` |
| `Array.isArray()` | Check if value is array | `Array.isArray(value)` | `Array.isArray([]) // true` |
| `Number.isNaN()` | Safely check for NaN | `Number.isNaN(value)` | `Number.isNaN(NaN) // true` |
| `===` / `!==` | Strict equality/inequality | `a === b` | `1 === 1 // true` |

## Common Use Cases

- **Beginner:** checking a form field's `typeof` before processing it.
- **DOM example:** converting a text input's string value to a `Number()` before doing math with it.
- **Real-world application:** validating API response data types before rendering (e.g., `Array.isArray(data.items)` to guard against malformed JSON).

## Common Errors

1. ❌
```js
let price = "10" + 5;
console.log(price); // "105" — unintended string concatenation
```
**Why it fails:** The `+` operator coerces the number to a string when one operand is already a string.
✅
```js
let price = Number("10") + 5;
console.log(price); // 15
```
**Explanation:** Explicitly convert types before performing arithmetic to avoid accidental concatenation.

2. ❌
```js
if (userInput == null) { ... }
```
relying on loose equality broadly.
**Why it fails:** `== null` also matches `undefined` due to coercion, which can hide bugs if only `null` was intended.
✅
```js
if (userInput === null) { ... }
```
**Explanation:** Use `===` for predictable, coercion-free comparisons unless loose equality is intentionally desired.

3. ❌
```js
console.log(typeof null); // "object"
if (typeof value === "object" && value) { /* assume object */ }
```
**Why it fails:** `typeof null` returns `"object"` (a known language quirk), so type-checking with `typeof` alone can misclassify `null` as an object.
✅
```js
if (value !== null && typeof value === "object") { /* safely an object */ }
```
**Explanation:** Explicitly exclude `null` when checking for objects with `typeof`.

4. ❌
```js
let result = NaN === NaN;
console.log(result); // false
```
**Why it fails:** `NaN` is defined to never equal itself under `==` or `===`.
✅
```js
let result = Number.isNaN(NaN);
console.log(result); // true
```
**Explanation:** Use `Number.isNaN()` to reliably check for `NaN`.

5. ❌
```js
let items = "not an array";
if (typeof items === "array") { ... } // this condition never runs
```
**Why it fails:** `typeof` never returns `"array"` — arrays report as `"object"`.
✅
```js
if (Array.isArray(items)) { ... }
```
**Explanation:** Use `Array.isArray()` to check specifically for arrays.

## Common Mistakes

- Relying on `==` instead of `===`, causing unexpected coercion bugs.
- Forgetting `typeof null` is `"object"`, not `"null"`.
- Using `typeof` to detect arrays instead of `Array.isArray()`.
- Comparing `NaN` with `==`/`===` instead of `Number.isNaN()`.
- Mixing strings and numbers in arithmetic without explicit conversion.

## Quick Reference

```js
typeof "x"        // "string"
typeof 1          // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" (quirk)
typeof {}         // "object"
typeof []         // "object"
typeof function(){} // "function"

Number("5")       // 5
String(5)         // "5"
Boolean(0)        // false
Array.isArray([]) // true
Number.isNaN(NaN) // true

a === b  // strict equality (no coercion)
a == b   // loose equality (coercion)
```
