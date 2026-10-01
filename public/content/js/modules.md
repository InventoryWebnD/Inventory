# Modules

## Introduction
ES Modules (ESM) let JavaScript code be split across multiple files, with explicit `import`/`export` statements controlling what's shared — improving organization, reusability, and avoiding global namespace pollution.

## Subtopics
- Named exports and imports
- Default exports and imports
- Renaming imports/exports (`as`)
- Importing everything as a namespace (`* as`)
- Combining named and default exports
- The `<script type="module">` requirement in HTML
- Module scope (each module has its own top-level scope)

## Syntax

```js
// math.js — named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// main.js — named imports
import { PI, add, subtract } from "./math.js";
console.log(add(2, 3));

// Renaming on import
import { add as addNumbers } from "./math.js";

// Default export (one per file)
// user.js
export default class User {
  constructor(name) { this.name = name; }
}

// main.js — default import (name can be anything)
import User from "./user.js";

// Combining default + named exports
// utils.js
export default function formatDate(date) { /* ... */ }
export const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

// main.js
import formatDate, { capitalize } from "./utils.js";

// Import everything as a namespace object
import * as MathUtils from "./math.js";
MathUtils.add(1, 2);
```

```html
<!-- Required in HTML to enable ES module syntax -->
<script type="module" src="main.js"></script>
```
- `export` — marks a variable, function, or class as available to other files.
- `export default` — marks the single "main" export of a module; only one default export is allowed per file, and it can be imported under any chosen name.
- Named imports must use the **exact exported name** (unless renamed with `as`); default imports can use any name.
- `<script type="module">` — required for browsers to treat the file as an ES module (enables `import`/`export`, defers execution automatically, and runs in strict mode by default).

## Important Methods & Properties

| Concept | Purpose | Syntax | Example |
|---|---|---|---|
| Named export | Export multiple named values | `export const x = 1;` | `export function add(){}` |
| Named import | Import specific named values | `import { x } from "./f.js";` | `import { add } from "./math.js";` |
| Default export | Export one main value per file | `export default value;` | `export default class User{}` |
| Default import | Import the default export | `import name from "./f.js";` | `import User from "./user.js";` |
| Rename (`as`) | Alias an import/export | `import { x as y }` | `import { add as sum }` |
| Namespace import | Import all as one object | `import * as ns from "./f.js";` | `MathUtils.add(1,2)` |

## Common Use Cases
- **Beginner:** splitting a single script into `math.js` (functions) and `main.js` (usage) with named exports/imports.
- **DOM example:** a `dom-helpers.js` module exporting reusable functions like `qs()` (a `querySelector` shorthand) imported across multiple page scripts.
- **Real-world application:** a component-based frontend where each UI component lives in its own module file with a default export (the component class/function) and named exports for related helper functions.

## Common Errors
1. ❌
```js
import { add } from "./math.js"; // math.js used `export default add`
```
**Why it fails:** Named import syntax (`{ add }`) doesn't match a default export; the module only has one default export, not a named `add`.
✅
```js
import add from "./math.js"; // matches export default
```
**Explanation:** Match the import syntax to how the value was exported (named vs default).

2. ❌
```js
<script src="main.js"></script>
<!-- main.js uses import/export -->
```
**Why it fails:** Without `type="module"`, the browser treats the file as a classic script, where `import`/`export` syntax is invalid.
✅
```html
<script type="module" src="main.js"></script>
```
**Explanation:** Always mark module-using scripts with `type="module"`.

3. ❌
```js
// math.js
export default function add() {}
export default function subtract() {} // second default export
```
**Why it fails:** A module can only have **one** default export; declaring a second causes a SyntaxError.
✅
```js
export default function add() {}
export function subtract() {} // named export instead
```
**Explanation:** Use only one `export default` per file; use named exports for additional values.

4. ❌
```js
import { PI } from "./math.js";
console.log(pi); // wrong casing — named imports are case-sensitive
```
**Why it fails:** Named imports must match the exported identifier's exact name and case.
✅
```js
import { PI } from "./math.js";
console.log(PI);
```
**Explanation:** Use the exact exported name (case-sensitive) when importing.

5. ❌
```js
// file:// direct opening in browser without a server
<script type="module" src="main.js"></script>
```
**Why it fails:** Most browsers block ES module loading over the `file://` protocol due to CORS restrictions; modules require being served via `http://`/`https://`.
✅
```
Run via a local development server (e.g., `npx serve`, Vite, or Live Server) instead of opening the HTML file directly.
```
**Explanation:** Serve module-based projects through a proper HTTP server, not the local filesystem.

## Common Mistakes
- Mismatching named vs default import/export syntax.
- Forgetting `type="module"` on the `<script>` tag.
- Declaring more than one default export in a file.
- Case-mismatching named imports.
- Opening module-based projects directly from the filesystem instead of a local server.

## Quick Reference
```js
// exporting
export const x = 1;
export function fn() {}
export default class Thing {}

// importing
import { x, fn } from "./file.js";
import Thing from "./file.js";
import * as All from "./file.js";
```
```html
<script type="module" src="main.js"></script>
```
