# Forms & Inputs

## Introduction
JavaScript can read, validate, and react to form input values in real time — essential for interactive forms, live validation, and custom submit handling.

## Subtopics
- Accessing form/input values (`.value`, `.checked`)
- Form events: `submit`, `input`, `change`, `focus`, `blur`
- Preventing default form submission
- Basic client-side validation
- The `FormData` API
- Working with `<select>` and radio/checkbox groups

## Syntax

```js
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const checkbox = document.querySelector("#subscribe");
const select = document.querySelector("#country");

// Reading values
nameInput.value;             // text input's current value
checkbox.checked;              // true/false for checkbox/radio

// Listening to input changes
nameInput.addEventListener("input", (e) => {
  console.log(e.target.value); // fires on every keystroke
});

select.addEventListener("change", (e) => {
  console.log(e.target.value); // fires when selection changes
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload

  if (nameInput.value.trim() === "") {
    alert("Name is required");
    return;
  }
  console.log("Submitting:", nameInput.value);
});

// FormData API (collects all named fields at once)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(data.get("name"));
  for (const [key, value] of data.entries()) {
    console.log(key, value);
  }
});

// Focus / blur
nameInput.addEventListener("focus", () => nameInput.classList.add("active"));
nameInput.addEventListener("blur", () => nameInput.classList.remove("active"));
```
- `input` event — fires immediately as the user types/changes the value (real-time).
- `change` event — fires only after the value is committed (e.g., losing focus on a text field, or immediately for checkboxes/selects).
- `FormData` — automatically gathers all named form fields into key-value pairs, useful for sending via `fetch()`.
- `focus`/`blur` — fire when an element gains/loses keyboard focus, useful for showing/hiding hints or styling active fields.

## Important Methods & Properties

| Method/Property | Purpose | Syntax | Example |
|---|---|---|---|
| `.value` | Get/set input value | `input.value` | `input.value = "text"` |
| `.checked` | Get/set checkbox/radio state | `checkbox.checked` | `checkbox.checked = true` |
| `input` event | Fires on every keystroke | `el.addEventListener("input", fn)` | Real-time filtering |
| `change` event | Fires on committed change | `el.addEventListener("change", fn)` | Select dropdown change |
| `submit` event | Fires on form submit | `form.addEventListener("submit", fn)` | Custom validation |
| `preventDefault()` | Stop default submit/reload | `event.preventDefault()` | Inside submit handler |
| `FormData()` | Collect all form fields | `new FormData(form)` | `data.get("name")` |

## Common Use Cases
- **Beginner:** reading a text input's `.value` and displaying it in a `<p>` on button click.
- **DOM example:** live character-count display updating on every keystroke via the `input` event.
- **Real-world application:** a signup form using `FormData` to collect all fields and send them via `fetch()` as a JSON or multipart request, with `preventDefault()` stopping the native page reload.

## Common Errors
1. ❌
```js
form.addEventListener("submit", () => {
  console.log("Submitted");
}); // page still reloads/navigates
```
**Why it fails:** Without `preventDefault()`, the browser performs its default form submission (navigation/reload).
✅
```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted");
});
```
**Explanation:** Always call `preventDefault()` when handling submission manually with JavaScript.

2. ❌
```js
checkbox.value; // "on" — not what most people expect for a checked state
```
**Why it fails:** A checkbox's `.value` is its static HTML `value` attribute (defaults to `"on"`), not whether it's checked.
✅
```js
checkbox.checked; // true or false
```
**Explanation:** Use `.checked` to determine a checkbox/radio's actual selected state.

3. ❌
```js
nameInput.addEventListener("change", (e) => {
  console.log(e.target.value); // doesn't fire until blur, not real-time
});
```
**Why it fails:** `change` only fires after the field loses focus (for text inputs), not on every keystroke.
✅
```js
nameInput.addEventListener("input", (e) => {
  console.log(e.target.value); // fires immediately on each keystroke
});
```
**Explanation:** Use `input` for real-time updates; use `change` when only the final committed value matters.

4. ❌
```js
if (nameInput.value = "") { ... } // assignment instead of comparison
```
**Why it fails:** Single `=` assigns an empty string to `.value` (clearing the field) instead of comparing it.
✅
```js
if (nameInput.value === "") { ... }
```
**Explanation:** Use `===` for comparisons.

5. ❌
```js
const data = new FormData(form);
console.log(data); // logging the FormData object directly shows little useful info
```
**Why it fails:** `FormData` objects don't print their contents directly with `console.log`; their entries must be accessed explicitly.
✅
```js
for (const [key, value] of data.entries()) {
  console.log(key, value);
}
```
**Explanation:** Iterate `FormData` with `.entries()` (or `.get(name)`) to inspect its contents.

## Common Mistakes
- Forgetting `preventDefault()` on form submit handlers.
- Confusing checkbox `.value` (static attribute) with `.checked` (actual state).
- Using `change` when real-time `input` updates were intended.
- Accidentally assigning (`=`) instead of comparing (`===`) input values.
- Not knowing `FormData` requires `.entries()`/`.get()` to read its data.

## Quick Reference
```js
input.value;
checkbox.checked;

input.addEventListener("input", fn);   // real-time
select.addEventListener("change", fn); // on commit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  data.get("fieldName");
});
```
