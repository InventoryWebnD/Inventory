# Buttons & Inputs

## Introduction

Buttons and inputs are the primary controls users interact with to take action or provide data — clicking, typing, selecting, and submitting. HTML5 offers a wide variety of `<input>` types (text, email, date, range, etc.) plus dedicated button elements, each with built-in browser validation and behavior.

## Subtopics

- The `<button>` element and its `type` attribute
- The `<input>` element and its many `type` values
- Text-based inputs: `text`, `email`, `password`, `search`, `tel`, `url`
- Numeric/date inputs: `number`, `range`, `date`, `time`, `month`, `week`, `datetime-local`
- Choice inputs: `checkbox`, `radio`
- File and hidden inputs: `file`, `hidden`
- Color picker: `color`
- Common input attributes: `placeholder`, `required`, `disabled`, `readonly`, `value`, `min`, `max`, `step`, `pattern`, `maxlength`
- The `<label>` element and input association
- Accessibility considerations for buttons/inputs

## Syntax

### 1. Basic Button

```html
<button type="button">Click Me</button>
<button type="submit">Submit Form</button>
<button type="reset">Reset Form</button>
```

- `<button>` — A clickable control; can contain text, images, or other inline content.
- `type="button"` — A generic button with no default form action (used with JavaScript).
- `type="submit"` — Submits the parent `<form>` (this is the default type if omitted).
- `type="reset"` — Resets all fields in the parent `<form>` to their default values.

### 2. Text-Based Inputs

```html
<input type="text" placeholder="Enter your name">
<input type="email" placeholder="you@example.com">
<input type="password" placeholder="Enter password">
<input type="search" placeholder="Search...">
<input type="tel" placeholder="+1 555-123-4567">
<input type="url" placeholder="https://example.com">
```

- `type="text"` — Single-line free text.
- `type="email"` — Validates basic email format (must contain `@`) and shows an email-optimized mobile keyboard.
- `type="password"` — Masks characters as dots/asterisks.
- `type="search"` — Styled for search boxes; often includes a clear ("×") button.
- `type="tel"` — For phone numbers (no built-in format validation, but triggers a numeric keypad on mobile).
- `type="url"` — Validates that the value looks like a URL.

### 3. Numeric and Date/Time Inputs

```html
<input type="number" min="1" max="10" step="1" value="5">
<input type="range" min="0" max="100" value="50">
<input type="date">
<input type="time">
<input type="month">
<input type="week">
<input type="datetime-local">
```

- `type="number"` — Only accepts numeric values; `min`, `max`, and `step` constrain the allowed range and increments.
- `type="range"` — A slider control for selecting a numeric value within a range.
- `type="date" / "time" / "month" / "week" / "datetime-local"` — Native date/time pickers, rendered differently per browser/OS.

### 4. Choice Inputs

```html
<label><input type="checkbox" name="subscribe" checked> Subscribe to newsletter</label>

<label><input type="radio" name="plan" value="basic" checked> Basic</label>
<label><input type="radio" name="plan" value="pro"> Pro</label>
```

- `type="checkbox"` — Independent on/off toggle; multiple checkboxes can be checked at once.
- `type="radio"` — Mutually exclusive choice; radios sharing the same `name` form a group where only one can be selected.
- `checked` — A boolean attribute that pre-selects the checkbox/radio.

### 5. File, Hidden, and Color Inputs

```html
<input type="file" accept=".jpg,.png" multiple>
<input type="hidden" name="userId" value="12345">
<input type="color" value="#ff0000">
```

- `type="file"` — Lets the user upload one or more files; `accept` restricts allowed file types, `multiple` allows selecting several files.
- `type="hidden"` — Not shown to the user, but its value is submitted with the form (e.g., for tracking IDs).
- `type="color"` — A native color-picker widget.

### 6. Labels and Common Attributes

```html
<label for="username">Username:</label>
<input type="text" id="username" name="username" placeholder="Enter username" required maxlength="20">

<input type="text" value="Cannot edit" readonly>
<input type="text" value="Cannot use" disabled>
```

- `<label for="id">` — Associates descriptive text with an input sharing the same `id`; clicking the label focuses/activates the input, crucial for accessibility.
- `required` — Prevents form submission until the field has a value.
- `readonly` — The field is visible and its value is submitted, but the user cannot edit it.
- `disabled` — The field is grayed out, not editable, and **not submitted** with the form.
- `maxlength` — Maximum number of characters allowed.

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<button type="">` | Clickable control | `<button type="submit">Text</button>` | `<button type="button">OK</button>` |
| `<input type="text">` | Single-line text | `<input type="text">` | `<input type="text" placeholder="Name">` |
| `<input type="email">` | Email input w/ validation | `<input type="email">` | `<input type="email" required>` |
| `<input type="checkbox">` | Toggle option | `<input type="checkbox">` | `<input type="checkbox" checked>` |
| `<input type="radio">` | Single choice in group | `<input type="radio" name="">` | `<input type="radio" name="size" value="M">` |
| `<input type="range">` | Slider | `<input type="range" min max>` | `<input type="range" min="0" max="10">` |
| `<input type="file">` | File upload | `<input type="file" accept>` | `<input type="file" accept="image/*">` |
| `<label for="">` | Input label | `<label for="id">Text</label>` | `<label for="email">Email</label>` |
| `required` | Mandatory field | `<input required>` | `<input type="text" required>` |
| `disabled` | Disables field | `<input disabled>` | `<input type="text" disabled>` |
| `placeholder` | Hint text | `<input placeholder="">` | `<input placeholder="Search">` |

## Common Use Cases

- **Beginner example:** A single text input with a label asking for the user's name, plus a submit button.
- **Practical website example:** A newsletter signup with an `email` input (validated), a `checkbox` for consent, and a `submit` button.
- **Real-world implementation:** A checkout form combining `text`, `email`, `tel`, `radio` (payment method), `number` (quantity with `min`/`max`/`step`), a `file` input for uploading a receipt, and `required`/`pattern` validation across fields before allowing submission.

## Common Errors

1. ❌
```html
<input type="text" name="username">
```
with no visible label at all.
**Why it's wrong:** Missing an associated `<label>` means screen reader users don't know what the field is for.
✅
```html
<label for="username">Username:</label>
<input type="text" id="username" name="username">
```
**Explanation:** Always pair inputs with a `<label>` connected via matching `for`/`id`.

2. ❌
```html
<button>Submit</button>
```
inside a form intended to just trigger a JavaScript action, not submit the form.
**Why it's wrong:** Without `type="button"`, a `<button>` inside a `<form>` defaults to `type="submit"`, which will unexpectedly submit/reload the form.
✅
```html
<button type="button" onclick="doSomething()">Submit</button>
```
**Explanation:** Explicitly set `type="button"` for buttons that shouldn't submit a form.

3. ❌
```html
<input type="radio" name="size1" value="S">
<input type="radio" name="size2" value="M">
```
**Why it's wrong:** Each radio button uses a different `name`, so they are treated as separate groups, allowing both to be selected simultaneously instead of being mutually exclusive.
✅
```html
<input type="radio" name="size" value="S">
<input type="radio" name="size" value="M">
```
**Explanation:** All radio buttons in the same group must share the identical `name` attribute.

4. ❌
```html
<input type="number" min="10" max="5">
```
**Why it's wrong:** `min` is greater than `max`, creating an impossible/invalid range that confuses validation.
✅
```html
<input type="number" min="5" max="10">
```
**Explanation:** Ensure `min` is always less than or equal to `max`.

5. ❌
```html
<input type="checkbox" value="true" required disabled>
```
**Why it's wrong:** Combining `required` and `disabled` is contradictory — a disabled field is excluded from form submission entirely, so `required` can never be validated or satisfied.
✅
```html
<input type="checkbox" value="true" required>
```
**Explanation:** Don't apply `required` to a field that is also `disabled`.

6. ❌
```html
<label>Email
<input type="email">
</label>
<input type="email">
```
(duplicate ids or missing ids causing ambiguous labeling in larger forms)
**Why it's wrong:** Relying only on wrapping without an explicit `id`/`for` pair becomes error-prone in larger forms, and duplicate `id` values across a page are invalid and break label association entirely.
✅
```html
<label for="email">Email</label>
<input type="email" id="email" name="email">
```
**Explanation:** Prefer explicit `for`/`id` pairing with unique IDs, especially in complex forms.

## Common Mistakes

- Leaving inputs without an associated `<label>`.
- Forgetting `type="button"` on non-submitting buttons inside forms.
- Using mismatched `name` attributes on grouped radio buttons.
- Using `disabled` when `readonly` was actually intended (disabled fields aren't submitted at all).
- Not setting `min`/`max`/`step` on numeric inputs, allowing invalid values.
- Forgetting `accept` on file inputs, allowing any file type when only specific ones are wanted.
- Using generic `placeholder` text as a replacement for a real `<label>` (placeholders disappear once typing starts and aren't a substitute for labels).

## Quick Reference

```html
<label for="name">Name:</label>
<input type="text" id="name" name="name" placeholder="Jane Doe" required>

<input type="email" required>
<input type="checkbox" checked> 
<input type="radio" name="group" value="a">
<input type="number" min="1" max="10" step="1">
<input type="range" min="0" max="100">
<input type="date">
<input type="file" accept="image/*" multiple>
<input type="color" value="#000000">

<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="button">Action</button>
```

| Attribute | Meaning |
|---|---|
| `required` | Must be filled before submit |
| `disabled` | Not editable, not submitted |
| `readonly` | Not editable, but submitted |
| `placeholder` | Hint text (not a label) |
| `min`/`max`/`step` | Numeric/range/date constraints |
| `checked` | Pre-selected checkbox/radio |
| `pattern` | Custom regex validation |
