# Strings

## Introduction
Strings represent text. Modern JS provides template literals for readable string building plus a rich set of methods for searching, transforming, and splitting text.

## Subtopics
- String creation (quotes vs template literals)
- Template literals and interpolation
- Case conversion: `toUpperCase`, `toLowerCase`
- Searching: `includes`, `indexOf`, `startsWith`, `endsWith`
- Extracting: `slice`, `substring`
- Modifying: `trim`, `replace`, `replaceAll`, `padStart`, `padEnd`
- Splitting/joining: `split`, `join` (array method)
- Template literal multi-line strings

## Syntax

```js
const single = 'Hello';
const double = "World";
const template = `${single}, ${double}!`; // template literal with interpolation

// Multi-line template literal
const multiline = `Line one
Line two`;

// Case
"Hello".toUpperCase();    // "HELLO"
"Hello".toLowerCase();     // "hello"

// Searching
"Hello World".includes("World");   // true
"Hello World".indexOf("World");     // 6
"Hello".startsWith("He");             // true
"Hello".endsWith("lo");                // true

// Extracting
"Hello World".slice(0, 5);      // "Hello"
"Hello World".substring(6);      // "World"

// Modifying
"  Hi  ".trim();                        // "Hi"
"Hello".replace("l", "L");                // "HeLlo" (first match only)
"Hello".replaceAll("l", "L");               // "HeLLo" (all matches)
"5".padStart(3, "0");                         // "005"
"5".padEnd(3, "0");                            // "500"

// Split / Join
"a,b,c".split(",");        // ["a", "b", "c"]
["a", "b", "c"].join("-");  // "a-b-c"

// Length
"Hello".length;   // 5
```
- Template literals (`` ` `` backticks) allow `${expression}` interpolation and native multi-line strings without `\n`.
- `slice(start, end)` supports negative indices (counts from the end); `substring()` does not and swaps arguments if `start > end`.
- `replace()` only replaces the first match unless a global regex (`/pattern/g`) is used; `replaceAll()` replaces every match directly.

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `` ` ${} ` `` | Template literal interpolation | `` `text ${expr}` `` | `` `Hi ${name}` `` |
| `toUpperCase()`/`toLowerCase()` | Change case | `str.toUpperCase()` | `"hi".toUpperCase()` |
| `includes()` | Check substring presence | `str.includes(sub)` | `"Hi".includes("H")` |
| `slice()` | Extract substring | `str.slice(start, end)` | `"Hello".slice(1,3)` |
| `trim()` | Remove whitespace ends | `str.trim()` | `" hi ".trim()` |
| `replace()`/`replaceAll()` | Replace text | `str.replace(a, b)` | `"aa".replaceAll("a","b")` |
| `split()` | String to array | `str.split(sep)` | `"a,b".split(",")` |
| `length` | String length | `str.length` | `"abc".length // 3` |

## Common Use Cases
- **Beginner:** using a template literal to build a greeting message with a variable name.
- **DOM example:** `element.textContent.trim().toLowerCase()` to normalize user-entered search text before comparison.
- **Real-world application:** `csvLine.split(",").map(cell => cell.trim())` to parse a row of CSV data into clean array values.

## Common Errors
1. ❌
```js
const msg = "Hello, " + name + "! You are " + age + " years old.";
```
**Why it fails:** Not an error, but verbose and error-prone string concatenation compared to modern syntax.
✅
```js
const msg = `Hello, ${name}! You are ${age} years old.`;
```
**Explanation:** Template literals are clearer and less error-prone for interpolating variables.

2. ❌
```js
"Hello".replace("l", "L"); 
console.log("Hello".replace("l", "L")); // "HeLlo" but expecting all L's
```
**Why it fails:** `replace()` with a plain string only replaces the *first* match.
✅
```js
"Hello".replaceAll("l", "L"); // "HeLLo"
```
**Explanation:** Use `replaceAll()` (or a global regex) to replace every occurrence.

3. ❌
```js
let str = "Hello";
str[0] = "J"; // attempting to mutate a string directly
console.log(str); // still "Hello" — strings are immutable
```
**Why it fails:** Strings are immutable in JS; index assignment silently does nothing.
✅
```js
let str = "Hello";
str = "J" + str.slice(1); // "Jello"
```
**Explanation:** Build a new string instead of trying to mutate an existing one.

4. ❌
```js
"5" + 3; // "53" (string concatenation, not addition)
```
**Why it fails:** The `+` operator concatenates when either operand is a string.
✅
```js
Number("5") + 3; // 8
```
**Explanation:** Explicitly convert to a number before performing arithmetic.

5. ❌
```js
const name = 'It's a test'; // unescaped apostrophe breaks the string
```
**Why it fails:** The single quote inside the string ends it prematurely, causing a syntax error.
✅
```js
const name = "It's a test"; // or use a template literal / escape the quote
```
**Explanation:** Use a different quote style, escape the character (`\'`), or use template literals.

## Common Mistakes
- Using verbose `+` concatenation instead of template literals.
- Forgetting `replace()` only replaces the first match.
- Trying to mutate strings directly (they're immutable).
- Forgetting to convert strings to numbers before arithmetic.
- Mismatched quote types causing syntax errors.

## Quick Reference
```js
`${var}`               // interpolation
str.toUpperCase(); str.toLowerCase();
str.includes(x); str.indexOf(x); str.startsWith(x); str.endsWith(x);
str.slice(s,e); str.substring(s,e);
str.trim(); str.replace(a,b); str.replaceAll(a,b);
str.padStart(n,"0"); str.padEnd(n,"0");
str.split(sep); arr.join(sep);
str.length;
```
