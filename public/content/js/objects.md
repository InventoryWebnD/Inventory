# Objects

## Introduction
Objects store data as key-value pairs and are the core building block for structuring complex data in JavaScript, alongside methods for creating, copying, and inspecting them.

## Subtopics
- Object literals, dot vs bracket notation
- Adding/updating/deleting properties
- Object methods: `Object.keys`, `Object.values`, `Object.entries`
- Object destructuring
- Spread with objects (shallow copy/merge)
- `Object.freeze` / `Object.assign`
- Shorthand property/method syntax
- Computed property names
- `this` inside object methods (recap)

## Syntax

```js
const person = {
  name: "Alice",
  age: 30,
  greet() {                 // method shorthand
    return `Hi, I'm ${this.name}`;
  }
};

// Access
person.name;         // dot notation
person["age"];         // bracket notation (needed for dynamic/variable keys)

// Add / update / delete
person.city = "NYC";
person.age = 31;
delete person.city;

// Object.keys / values / entries
Object.keys(person);      // ["name", "age", "greet"]
Object.values(person);     // ["Alice", 31, function]
Object.entries(person);     // [["name","Alice"], ["age",31], ...]

// Destructuring
const { name, age } = person;
const { name: fullName } = person; // rename while destructuring

// Spread (shallow copy/merge)
const updated = { ...person, age: 32 };

// Object.assign
const merged = Object.assign({}, person, { country: "USA" });

// Object.freeze (prevents modification)
const frozen = Object.freeze({ a: 1 });
frozen.a = 2; // silently fails (or throws in strict mode)

// Computed property names
const key = "dynamicKey";
const obj = { [key]: "value" };
```
- Dot notation requires a known, valid identifier key; bracket notation allows dynamic or non-identifier keys (e.g., `"first-name"`).
- `Object.keys/values/entries` return arrays for iteration, since plain objects aren't directly iterable with `for...of`.
- Spread (`{...obj}`) and `Object.assign()` both create **shallow** copies — nested objects are still shared by reference.
- `Object.freeze()` prevents adding, removing, or changing top-level properties (not a deep freeze).

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `Object.keys()` | List property names | `Object.keys(obj)` | `Object.keys({a:1}) // ["a"]` |
| `Object.values()` | List property values | `Object.values(obj)` | `Object.values({a:1}) // [1]` |
| `Object.entries()` | List [key,value] pairs | `Object.entries(obj)` | `[["a",1]]` |
| `Object.assign()` | Merge objects (shallow) | `Object.assign({}, a, b)` | Merge two objects |
| `Object.freeze()` | Make immutable (shallow) | `Object.freeze(obj)` | Prevents changes |
| `hasOwnProperty()` | Check own property exists | `obj.hasOwnProperty(k)` | `obj.hasOwnProperty("a")` |
| `delete` | Remove a property | `delete obj.key` | `delete person.city` |

## Common Use Cases
- **Beginner:** an object literal representing a user's profile with a few properties.
- **DOM example:** destructuring `const { value, checked } = event.target;` inside an input event handler.
- **Real-world application:** merging default settings with user-provided options via `{ ...defaults, ...userOptions }`.

## Common Errors
1. ❌
```js
const key = "age";
person.key; // undefined — looks for a literal property named "key"
```
**Why it fails:** Dot notation treats `key` literally, not as a variable to evaluate.
✅
```js
person[key]; // looks up person["age"]
```
**Explanation:** Use bracket notation when the key comes from a variable.

2. ❌
```js
const frozen = Object.freeze({ inner: { a: 1 } });
frozen.inner.a = 2; // succeeds! nested object is NOT frozen
```
**Why it fails:** `Object.freeze()` is shallow — it only protects top-level properties, not nested objects.
✅
```js
Object.freeze(frozen.inner); // freeze nested objects separately if needed
```
**Explanation:** For deep immutability, recursively freeze nested objects or use a dedicated utility.

3. ❌
```js
const merged = { ...obj1 };
obj1.nested.value = "changed";
console.log(merged.nested.value); // also changed! shared reference
```
**Why it fails:** Spread creates a shallow copy; nested objects are still shared by reference between original and copy.
✅
```js
const merged = structuredClone(obj1); // deep clone (modern browsers/Node 17+)
```
**Explanation:** Use a deep clone method when nested objects must be fully independent.

4. ❌
```js
for (const key in obj) {
  console.log(obj[key]); // works, but may include inherited properties
}
```
**Why it fails:** `for...in` iterates inherited enumerable properties too, not just the object's own; can cause unexpected keys in more complex objects.
✅
```js
Object.keys(obj).forEach(key => console.log(obj[key]));
```
**Explanation:** `Object.keys()` returns only the object's own enumerable properties.

5. ❌
```js
const obj = {
  value: 10,
  getValue: () => this.value // arrow loses object context
};
```
**Why it fails:** Arrow functions don't bind their own `this`; here it refers to the outer (often global) scope, not `obj`.
✅
```js
const obj = {
  value: 10,
  getValue() { return this.value; }
};
```
**Explanation:** Use regular method shorthand so `this` correctly refers to the object.

## Common Mistakes
- Using dot notation with a dynamic key instead of bracket notation.
- Assuming `Object.freeze()`/spread create deep copies (they're shallow).
- Using `for...in` on objects with inherited properties without filtering.
- Using arrow functions for object methods needing `this`.
- Forgetting `delete` only removes own properties, not inherited ones.

## Quick Reference
```js
const obj = { a: 1, b: 2, method() {} };
obj.a; obj["a"];
delete obj.a;
Object.keys(obj); Object.values(obj); Object.entries(obj);
const { a, b } = obj;
const copy = { ...obj };
Object.freeze(obj);
Object.assign({}, obj1, obj2);
```
