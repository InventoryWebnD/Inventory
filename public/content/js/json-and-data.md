# JSON & Data

## Introduction
JSON (JavaScript Object Notation) is a lightweight, text-based data format used to exchange data between a client and server. JS provides built-in methods to convert between JSON text and JavaScript objects.

## Subtopics
- JSON syntax rules
- `JSON.stringify()` — object to JSON string
- `JSON.parse()` — JSON string to object
- Handling nested JSON data
- Common JSON + `fetch()` pattern
- `JSON.stringify()` formatting options (indentation)

## Syntax

```js
const user = {
  name: "Alice",
  age: 30,
  active: true,
  hobbies: ["reading", "coding"]
};

// Object -> JSON string
const jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"Alice","age":30,"active":true,"hobbies":["reading","coding"]}'

// Pretty-printed JSON (indent with 2 spaces)
console.log(JSON.stringify(user, null, 2));

// JSON string -> Object
const jsonText = '{"name":"Bob","age":25}';
const parsed = JSON.parse(jsonText);
console.log(parsed.name); // "Bob"

// Nested data
const data = { users: [{ id: 1, name: "A" }, { id: 2, name: "B" }] };
JSON.stringify(data);
data.users[0].name; // "A"

// Typical fetch + JSON pattern
async function getUsers() {
  const response = await fetch("/api/users");
  const users = await response.json(); // parses JSON response body automatically
  return users;
}

// Sending JSON in a request
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Carol" })
});
```
- `JSON.stringify(value, replacer, space)` — the `space` argument (a number or string) adds indentation for readability.
- `JSON.parse(text)` — throws a `SyntaxError` if the string isn't valid JSON.
- JSON syntax requires **double-quoted** keys and string values; it does not support trailing commas, comments, `undefined`, or functions.
- `response.json()` (from `fetch`) combines reading the response body and calling `JSON.parse()` internally, returning a Promise.

## Important Methods & Properties

| Method | Purpose | Syntax | Example |
|---|---|---|---|
| `JSON.stringify()` | Convert object/array to JSON text | `JSON.stringify(value)` | `JSON.stringify({a:1})` |
| `JSON.stringify(v, null, n)` | Pretty-print with indentation | `JSON.stringify(v, null, 2)` | Readable output |
| `JSON.parse()` | Convert JSON text to object/array | `JSON.parse(text)` | `JSON.parse('{"a":1}')` |
| `response.json()` | Parse fetch response body as JSON | `await response.json()` | Inside async function |

## Common Use Cases
- **Beginner:** converting a simple object to a JSON string to log or store it.
- **DOM example:** parsing a JSON string retrieved from `localStorage` and rendering it as a list in the DOM.
- **Real-world application:** sending form data as JSON in a `fetch()` POST request and parsing the JSON response to update the UI.

## Common Errors
1. ❌
```js
JSON.parse("{name: 'Bob'}"); // unquoted key, single-quoted value
```
**Why it fails:** JSON requires **double quotes** around both keys and string values; single quotes and unquoted keys are invalid JSON syntax.
✅
```js
JSON.parse('{"name": "Bob"}');
```
**Explanation:** Always use double quotes for JSON keys and string values.

2. ❌
```js
const obj = { name: "Alice", greet: function() {} };
console.log(JSON.stringify(obj)); // '{"name":"Alice"}' — function silently dropped
```
**Why it fails:** `JSON.stringify()` omits functions, `undefined` values, and symbols entirely — not an error, but a common surprise.
✅
```js
// Only include serializable data in objects meant for JSON conversion
const obj = { name: "Alice" };
console.log(JSON.stringify(obj));
```
**Explanation:** Keep JSON-bound objects limited to plain data (strings, numbers, booleans, arrays, nested objects, `null`).

3. ❌
```js
const response = await fetch("/api/data");
const data = response.json(); // forgot await
console.log(data.name); // data is a Promise, not the actual object
```
**Why it fails:** `response.json()` returns a Promise that must be awaited (or handled with `.then()`).
✅
```js
const data = await response.json();
console.log(data.name);
```
**Explanation:** Always `await` (or chain `.then()` on) `response.json()`.

4. ❌
```js
JSON.parse('{"items": [1, 2, 3,]}'); // trailing comma
```
**Why it fails:** JSON does not permit trailing commas after the last item in arrays/objects, unlike some JS object literals.
✅
```js
JSON.parse('{"items": [1, 2, 3]}');
```
**Explanation:** Remove trailing commas — JSON syntax is stricter than JS object literal syntax.

5. ❌
```js
const jsonStr = JSON.stringify(circularObj); // throws TypeError on circular reference
```
**Why it fails:** `JSON.stringify()` cannot serialize objects with circular references (an object referencing itself), throwing a `TypeError: Converting circular structure to JSON`.
✅
```js
// Remove/break the circular reference before stringifying,
// or use a custom replacer function to omit the circular property.
```
**Explanation:** Ensure the object graph doesn't contain circular references before calling `JSON.stringify()`.

## Common Mistakes
- Using single quotes or unquoted keys in JSON strings.
- Assuming functions/`undefined` survive `JSON.stringify()`.
- Forgetting to `await` `response.json()`.
- Leaving trailing commas in hand-written JSON.
- Attempting to stringify objects with circular references.

## Quick Reference
```js
JSON.stringify(obj);              // object -> JSON string
JSON.stringify(obj, null, 2);      // pretty-printed
JSON.parse(jsonString);             // JSON string -> object

const data = await (await fetch(url)).json(); // fetch + parse in one line
```
