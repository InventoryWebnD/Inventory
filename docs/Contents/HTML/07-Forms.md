# Forms

## Introduction

The `<form>` element is the container that ties inputs, buttons, and other controls together so users can submit data to a server (or to JavaScript). Forms handle grouping, validation, submission method, and structure — turning individual inputs into a complete, working data-collection unit.

## Subtopics

- The `<form>` element and its core attributes (`action`, `method`)
- Grouping controls with `<fieldset>` and `<legend>`
- Dropdowns with `<select>`, `<option>`, `<optgroup>`
- Multi-line text with `<textarea>`
- Native browser validation (`required`, `pattern`, `minlength`, `maxlength`, `min`, `max`)
- Autocomplete and datalists (`<datalist>`)
- Form submission methods: GET vs POST
- Encoding types (`enctype`) for file uploads
- Associating inputs outside a form with `form` attribute
- Accessibility of form structure

## Syntax

### 1. Basic Form Structure

```html
<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <button type="submit">Send</button>
</form>
```

- `<form>` — Wraps all related controls into one submittable unit.
- `action="/submit"` — The URL the form data is sent to when submitted.
- `method="post"` — The HTTP method used to send data; `POST` sends data in the request body (used for sensitive/large data), while `GET` appends data to the URL as a query string (used for simple searches/filters).

### 2. Fieldset and Legend

```html
<form action="/register" method="post">
  <fieldset>
    <legend>Personal Information</legend>
    <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname" required>

    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="lname" required>
  </fieldset>
</form>
```

- `<fieldset>` — Visually and semantically groups related form controls (rendered with a default border).
- `<legend>` — Provides a caption/title for the `<fieldset>`, announced by screen readers before reading the grouped fields.

### 3. Select Dropdown

```html
<label for="country">Country:</label>
<select id="country" name="country">
  <option value="">-- Select a country --</option>
  <optgroup label="North America">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="fr">France</option>
    <option value="de" selected>Germany</option>
  </optgroup>
</select>
```

- `<select>` — Creates a dropdown control.
- `<option value="">` — Each selectable choice; `value` is what's actually submitted (may differ from the displayed text).
- `<optgroup label="">` — Groups related `<option>`s under a labeled heading within the dropdown.
- `selected` — Pre-selects that option.

### 4. Multi-line Text Area

```html
<label for="message">Message:</label>
<textarea id="message" name="message" rows="5" cols="40" placeholder="Type your message here..."></textarea>
```

- `<textarea>` — A resizable, multi-line text input (unlike `<input>`, it uses an opening and closing tag with content between them as its default value).
- `rows` / `cols` — Set the visible height (in lines) and width (in characters).

### 5. Validation Attributes

```html
<input type="text" name="username" required minlength="3" maxlength="15" pattern="[A-Za-z0-9_]+" title="Letters, numbers, and underscores only">

<input type="password" name="password" required minlength="8">
```

- `pattern` — A regular expression the value must match to be considered valid.
- `title` — Text shown in the browser's validation tooltip explaining the expected format.
- `minlength` / `maxlength` — Minimum/maximum number of characters allowed.

### 6. Datalist (Autocomplete Suggestions)

```html
<label for="browser">Choose a browser:</label>
<input list="browsers" id="browser" name="browser">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>
```

- `<datalist>` — Provides a list of predefined autocomplete suggestions for a text input.
- `list="browsers"` — Connects the `<input>` to the `<datalist>` sharing the same `id`.

### 7. File Upload Encoding

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="resume">Upload Resume:</label>
  <input type="file" id="resume" name="resume" accept=".pdf,.docx" required>
  <button type="submit">Upload</button>
</form>
```

- `enctype="multipart/form-data"` — **Required** whenever a form includes a file upload (`type="file"`); it tells the server the request body contains binary file data rather than plain text.

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<form action method>` | Form container + destination | `<form action="url" method="post">` | `<form action="/login" method="post">` |
| `<fieldset>` / `<legend>` | Group + label controls | `<fieldset><legend>Text</legend></fieldset>` | See example above |
| `<select>` / `<option>` | Dropdown menu | `<select><option value=""></option></select>` | `<select><option value="us">USA</option></select>` |
| `<optgroup label="">` | Grouped options | `<optgroup label="Group">` | `<optgroup label="Fruits">` |
| `<textarea rows cols>` | Multi-line text | `<textarea rows="4" cols="30"></textarea>` | `<textarea rows="5"></textarea>` |
| `<datalist>` | Autocomplete list | `<datalist id="x"><option></datalist>` | See example above |
| `pattern` | Regex validation | `<input pattern="regex">` | `<input pattern="[0-9]{5}">` |
| `enctype` | Encoding for submission | `<form enctype="multipart/form-data">` | Needed for file uploads |
| `required` / `minlength` / `maxlength` | Validation constraints | `<input required minlength="3">` | `<input required maxlength="10">` |

## Common Use Cases

- **Beginner example:** A basic contact form with name, email, and a submit button.
- **Practical website example:** A registration form using `<fieldset>` to group "Account Info" and "Address" sections, a `<select>` for country, and validation attributes ensuring correct input before submission.
- **Real-world implementation:** A job application form combining `<fieldset>`/`<legend>` grouping, a `<datalist>` for suggested job titles, a `<textarea>` for a cover letter, `pattern`-validated phone numbers, and a file upload field with `enctype="multipart/form-data"` for resume submission — all validated natively by the browser before hitting the server.

## Common Errors

1. ❌
```html
<form>
  <input type="file" name="resume">
</form>
```
**Why it's wrong:** Missing `enctype="multipart/form-data"`; file contents will not be transmitted correctly to the server.
✅
```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="resume">
</form>
```
**Explanation:** Always set `enctype="multipart/form-data"` when a form contains a file input.

2. ❌
```html
<select>
  Chrome
  Firefox
</select>
```
**Why it's wrong:** Options are written as plain text instead of `<option>` elements, which is invalid and won't render as selectable choices.
✅
```html
<select>
  <option value="chrome">Chrome</option>
  <option value="firefox">Firefox</option>
</select>
```
**Explanation:** Every choice inside `<select>` must be wrapped in an `<option>` tag.

3. ❌
```html
<fieldset>
  <input type="text" name="name">
  <legend>Personal Info</legend>
</fieldset>
```
**Why it's wrong:** `<legend>` must be the *first* child of `<fieldset>`; placing it after other controls is invalid and breaks the expected screen-reader announcement order.
✅
```html
<fieldset>
  <legend>Personal Info</legend>
  <input type="text" name="name">
</fieldset>
```
**Explanation:** Always place `<legend>` immediately after the opening `<fieldset>` tag.

4. ❌
```html
<form action="/search" method="post">
  <input type="text" name="q">
</form>
```
for a public search page meant to be bookmarkable.
**Why it's wrong:** Using `POST` for simple, non-sensitive search queries prevents the results URL from being bookmarked or shared (since the query isn't in the URL).
✅
```html
<form action="/search" method="get">
  <input type="text" name="q">
</form>
```
**Explanation:** Use `GET` for simple, shareable, non-sensitive data like search queries; use `POST` for sensitive or large data (like login credentials or file uploads).

5. ❌
```html
<textarea name="message" value="Default text"></textarea>
```
**Why it's wrong:** `<textarea>` does not support a `value` attribute; its default content must be placed *between* the opening and closing tags.
✅
```html
<textarea name="message">Default text</textarea>
```
**Explanation:** Unlike `<input>`, `<textarea>`'s initial value is its inner text content, not a `value` attribute.

6. ❌
```html
<input list="browsers" name="browser">
<datalist id="browser-list">
  <option value="Chrome">
</datalist>
```
**Why it's wrong:** The `list` attribute (`"browsers"`) does not match the `<datalist>`'s `id` (`"browser-list"`), so the autocomplete suggestions never connect to the input.
✅
```html
<input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Chrome">
</datalist>
```
**Explanation:** The `list` attribute value must exactly match the target `<datalist>`'s `id`.

## Common Mistakes

- Forgetting `enctype="multipart/form-data"` on file-upload forms.
- Writing raw text inside `<select>` instead of using `<option>`.
- Placing `<legend>` anywhere other than first inside `<fieldset>`.
- Using `POST` for simple shareable searches, or `GET` for sensitive data like passwords.
- Giving `<textarea>` a `value` attribute instead of inline default text.
- Mismatching `list`/`id` between an input and its `<datalist>`.
- Omitting `name` attributes on form controls (unnamed fields are not submitted at all).
- Relying solely on native validation without also validating on the server (client-side validation can be bypassed).

## Quick Reference

```html
<form action="/submit" method="post" enctype="multipart/form-data">
  <fieldset>
    <legend>Section Title</legend>

    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required minlength="2">

    <label for="country">Country:</label>
    <select id="country" name="country">
      <option value="us">USA</option>
    </select>

    <label for="bio">Bio:</label>
    <textarea id="bio" name="bio" rows="4"></textarea>

    <input list="suggestions" name="tool">
    <datalist id="suggestions">
      <option value="Git">
    </datalist>

    <button type="submit">Submit</button>
  </fieldset>
</form>
```

| Tag/Attr | Meaning |
|---|---|
| `form` + `action`/`method` | Container + destination + HTTP method |
| `fieldset`/`legend` | Group controls with a caption |
| `select`/`option`/`optgroup` | Dropdown menu |
| `textarea` | Multi-line text |
| `datalist` + `list` | Autocomplete suggestions |
| `enctype="multipart/form-data"` | Required for file uploads |
| `required`, `pattern`, `minlength`, `maxlength` | Native validation |
