# DOM Introduction

## Introduction
The DOM (Document Object Model) is a live tree representation of an HTML page that JavaScript can read and modify — enabling dynamic content, styling, and structure changes without reloading the page.

## Subtopics
- Selecting elements: `getElementById`, `querySelector`, `querySelectorAll`
- Reading/modifying content: `textContent`, `innerHTML`, `innerText`
- Modifying attributes: `getAttribute`, `setAttribute`, `removeAttribute`
- Modifying classes: `classList.add/remove/toggle/contains`
- Modifying styles directly (`element.style`)
- Creating/removing elements: `createElement`, `appendChild`, `remove`
- Traversing the DOM: `parentElement`, `children`, `nextElementSibling`

## Syntax

```js
// Selecting
const byId = document.getElementById("header");
const single = document.querySelector(".card");        // first match
const all = document.querySelectorAll(".card");          // NodeList of all matches

// Reading/modifying content
byId.textContent = "New Title";     // safe, treats content as plain text
byId.innerHTML = "<b>Bold</b>";       // parses as HTML (careful with user input — XSS risk)

// Attributes
single.getAttribute("data-id");
single.setAttribute("data-id", "42");
single.removeAttribute("data-id");

// Classes
single.classList.add("active");
single.classList.remove("active");
single.classList.toggle("active");     // adds if absent, removes if present
single.classList.contains("active");    // true/false

// Inline styles
single.style.color = "red";
single.style.backgroundColor = "black"; // camelCase for hyphenated CSS props

// Creating & inserting elements
const newDiv = document.createElement("div");
newDiv.textContent = "I'm new";
document.body.appendChild(newDiv);
newDiv.remove(); // removes it from the DOM

// Traversing
single.parentElement;
single.children;               // HTMLCollection of child elements
single.nextElementSibling;
```
- `querySelector`/`querySelectorAll` accept any valid CSS selector, making them more flexible than `getElementById`/`getElementsByClassName`.
- `textContent` sets/reads plain text (safe); `innerHTML` parses/generates actual HTML markup (powerful but risky with untrusted input).
- `querySelectorAll` returns a static `NodeList` (a snapshot, not live); `getElementsByClassName` returns a **live** `HTMLCollection` that updates automatically.

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `querySelector()` | Select first match | `document.querySelector(sel)` | `document.querySelector(".btn")` |
| `querySelectorAll()` | Select all matches | `document.querySelectorAll(sel)` | `document.querySelectorAll("li")` |
| `textContent` | Get/set plain text | `el.textContent = "text"` | `el.textContent` |
| `innerHTML` | Get/set HTML content | `el.innerHTML = "<b>x</b>"` | `el.innerHTML` |
| `classList.add/remove/toggle` | Manage CSS classes | `el.classList.add("x")` | `el.classList.toggle("open")` |
| `setAttribute()` | Set an attribute | `el.setAttribute(name, val)` | `el.setAttribute("src", "a.png")` |
| `createElement()` | Create new element | `document.createElement(tag)` | `document.createElement("div")` |
| `appendChild()` | Insert element as child | `parent.appendChild(child)` | `body.appendChild(div)` |

## Common Use Cases
- **Beginner:** selecting a `<h1>` and changing its `textContent` on button click.
- **DOM example:** toggling a `.active` class on a navigation menu item with `classList.toggle()`.
- **Real-world application:** dynamically rendering a list of items by looping over data, creating a `<li>` per item with `createElement`, and appending them to a `<ul>`.

## Common Errors
1. ❌
```js
document.querySelector(".missing").textContent = "Hi"; // element doesn't exist
```
**Why it fails:** `querySelector` returns `null` if nothing matches; calling `.textContent` on `null` throws a TypeError.
✅
```js
const el = document.querySelector(".missing");
if (el) el.textContent = "Hi";
```
**Explanation:** Always check that the selected element exists before using it.

2. ❌
```js
el.innerHTML = userInput; // directly injecting untrusted input as HTML
```
**Why it fails:** This opens an XSS (Cross-Site Scripting) vulnerability if `userInput` contains malicious script tags.
✅
```js
el.textContent = userInput; // treats it as plain text, not parsed HTML
```
**Explanation:** Use `textContent` for untrusted or plain text content; only use `innerHTML` with trusted, sanitized markup.

3. ❌
```js
const items = document.querySelectorAll(".item");
items.push(newItem); // NodeList has no push method
```
**Why it fails:** `querySelectorAll()` returns a `NodeList`, not a real array — it lacks array methods like `push`, `map`, etc. (though it does support `forEach`).
✅
```js
const itemsArray = Array.from(document.querySelectorAll(".item"));
itemsArray.push(newItem);
```
**Explanation:** Convert to a real array with `Array.from()` to use full array methods.

4. ❌
```js
el.style.background-color = "red"; // invalid JS property name
```
**Why it fails:** Hyphenated CSS properties must be written in camelCase in JS.
✅
```js
el.style.backgroundColor = "red";
```
**Explanation:** Use camelCase (`backgroundColor`) instead of the CSS hyphenated form.

5. ❌
```js
document.getElementById("header").class = "active"; // wrong property name
```
**Why it fails:** `class` is a reserved word in JS; the DOM property is `className`, or classes should be managed via `classList`.
✅
```js
document.getElementById("header").classList.add("active");
```
**Explanation:** Use `classList` methods rather than trying to set `class` directly.

## Common Mistakes
- Forgetting to check if `querySelector` returned `null`.
- Using `innerHTML` with untrusted user input (XSS risk).
- Treating `NodeList` as a full array without converting via `Array.from()`.
- Writing CSS property names with hyphens instead of camelCase in `element.style`.
- Confusing `className`/`class` with `classList`.

## Quick Reference
```js
document.getElementById("id");
document.querySelector(".class");
document.querySelectorAll("li");

el.textContent = "text";
el.innerHTML = "<b>html</b>";
el.setAttribute("name", "val");
el.classList.add/remove/toggle("class");
el.style.color = "red";

const el2 = document.createElement("div");
parent.appendChild(el2);
el2.remove();
```
