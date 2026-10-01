# Boilerplate

## Introduction

Every HTML5 document starts from a standard skeleton called the **boilerplate**. It tells the browser what kind of document it is, sets the language, character encoding, and viewport, and gives the page a title. Getting the boilerplate right is the foundation for valid, accessible, and responsive web pages.

## Subtopics

- The `<!DOCTYPE html>` declaration
- The `<html>` root element and the `lang` attribute
- The `<head>` section
- Character encoding with `<meta charset>`
- Responsive viewport meta tag
- The `<title>` element
- Linking CSS and favicons
- The `<body>` section
- Comments in HTML
- Semantic document structure (`header`, `main`, `footer`)
- Script placement (`<script>` at end of body vs. `defer`/`async`)
- Validating your HTML

## Syntax

### 1. Minimal HTML5 Boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>
```

**Line-by-line explanation:**

- `<!DOCTYPE html>` — Tells the browser to render the page using the HTML5 standard (not "quirks mode"). It is not a tag; it is a declaration and must be the very first line.
- `<html lang="en">` — The root element that wraps the whole document. The `lang` attribute declares the document's language ("en" = English), which helps screen readers and search engines.
- `<head>` — A container for metadata (information *about* the page) that is not displayed directly on the page.
- `<meta charset="UTF-8">` — Sets the character encoding to UTF-8, which supports almost every character and symbol in the world. Must appear within the first 1024 bytes of the document.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — Makes the page responsive: `width=device-width` sets the page width to match the device's screen width, and `initial-scale=1.0` sets the initial zoom level.
- `<title>Document</title>` — Sets the text shown in the browser tab and used by search engines/bookmarks.
- `<body>` — Contains everything visible to the user: text, images, links, etc.

### 2. Boilerplate with CSS and Favicon

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

</body>
</html>
```

- `<link rel="icon" ...>` — Associates a favicon (tab icon) with the page.
- `<link rel="stylesheet" href="styles.css">` — Loads an external CSS file. `rel="stylesheet"` tells the browser the relationship of the linked file.

### 3. Semantic Boilerplate (Practical Structure)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A short description of the page for SEO">
  <title>Semantic Page Structure</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Site Title</h1>
  </header>

  <main>
    <p>Main page content goes here.</p>
  </main>

  <footer>
    <p>&copy; 2026 My Company</p>
  </footer>

  <script src="script.js" defer></script>
</body>
</html>
```

- `<meta name="description" content="...">` — Provides a summary used by search engines in result snippets.
- `<header>`, `<main>`, `<footer>` — Semantic elements describing the *role* of each section rather than just its appearance.
- `<script src="script.js" defer>` — Loads JavaScript without blocking HTML parsing; `defer` runs the script only after the document is fully parsed.

### 4. HTML Comments

```html
<!-- This is a comment and is not rendered by the browser -->
<p>Visible text</p>
```

Comments start with `<!--` and end with `-->`. They are used to leave notes for developers and are ignored by the browser.

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<!DOCTYPE html>` | Declares HTML5 document type | `<!DOCTYPE html>` | `<!DOCTYPE html>` |
| `<html lang="">` | Root element + document language | `<html lang="en">` | `<html lang="fr">` |
| `<head>` | Holds document metadata | `<head>...</head>` | `<head><title>Page</title></head>` |
| `<meta charset="">` | Sets character encoding | `<meta charset="UTF-8">` | `<meta charset="UTF-8">` |
| `<meta name="viewport">` | Responsive scaling control | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Same |
| `<title>` | Browser tab / SEO title | `<title>Text</title>` | `<title>My Blog</title>` |
| `<link rel="stylesheet">` | Links external CSS | `<link rel="stylesheet" href="file.css">` | `<link rel="stylesheet" href="main.css">` |
| `<link rel="icon">` | Sets favicon | `<link rel="icon" href="icon.png">` | `<link rel="icon" href="favicon.ico">` |
| `<body>` | Visible page content | `<body>...</body>` | `<body><p>Hi</p></body>` |
| `<script defer>` | Loads JS without blocking parsing | `<script src="a.js" defer></script>` | `<script src="app.js" defer></script>` |
| `<!-- -->` | Comment | `<!-- text -->` | `<!-- TODO: fix nav -->` |

## Common Use Cases

- **Beginner example:** A blank HTML5 page with just a title, ready to add content.
- **Practical website example:** A boilerplate with a linked stylesheet, favicon, and a semantic `header`/`main`/`footer` layout used as the starting template for every new page on a site.
- **Real-world implementation:** A production boilerplate that also includes a meta description for SEO, Open Graph meta tags for social sharing, and a deferred script tag so the page becomes interactive without blocking initial render — commonly generated automatically by tools like Vite or Create React App.

## Common Errors

1. ❌
```html
<html>
<head>
<title>Page</title>
</head>
<body></body>
</html>
```
**Why it's wrong:** Missing `<!DOCTYPE html>`. Without it, browsers may render the page in "quirks mode," causing inconsistent CSS behavior.
✅
```html
<!DOCTYPE html>
<html>
<head>
<title>Page</title>
</head>
<body></body>
</html>
```
**Explanation:** Adding the doctype forces standards mode rendering across all browsers.

2. ❌
```html
<meta charset="UTF-8">
<!DOCTYPE html>
<html></html>
```
**Why it's wrong:** `<!DOCTYPE html>` must be the very first line of the document, before any other tag, including `<meta>`.
✅
```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
</html>
```
**Explanation:** The doctype declaration must precede all markup for the browser to correctly detect the document type first.

3. ❌
```html
<html>
<head></head>
<body></body>
</html>
```
**Why it's wrong:** Missing the `lang` attribute on `<html>`. This hurts accessibility (screen readers can't determine pronunciation rules) and SEO.
✅
```html
<html lang="en">
<head></head>
<body></body>
</html>
```
**Explanation:** `lang="en"` tells assistive technology and browsers the document's language.

4. ❌
```html
<head>
<title>My Page</title>
<meta charset="UTF-8">
</head>
```
**Why it's wrong:** `<meta charset>` should appear as early as possible (ideally the first child of `<head>`), before `<title>`, to avoid encoding issues with special characters used in the title.
✅
```html
<head>
<meta charset="UTF-8">
<title>My Page</title>
</head>
```
**Explanation:** Declaring the encoding first ensures every subsequent character (including in the title) is interpreted correctly.

5. ❌
```html
<head>
<title>My Site</title>
</head>
```
**Why it's wrong:** Missing the viewport meta tag makes the page unresponsive on mobile devices — it will render at desktop width and appear tiny/zoomed out.
✅
```html
<head>
<title>My Site</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```
**Explanation:** The viewport tag scales the page to the device's actual screen width.

6. ❌
```html
<Html>
<Head></Head>
<BODY></BODY>
</Html>
```
**Why it's wrong:** While HTML tag names are case-insensitive, mixing cases is bad practice, reduces readability, and can cause tooling/linting errors.
✅
```html
<html>
<head></head>
<body></body>
</html>
```
**Explanation:** Always use lowercase tag names by convention for consistency and easier maintenance.

## Common Mistakes

- Forgetting `<!DOCTYPE html>` entirely or misplacing it.
- Omitting the `lang` attribute, hurting accessibility.
- Placing the viewport meta tag after external stylesheets or scripts instead of early in `<head>`.
- Not closing the `<head>` tag before starting `<body>`.
- Putting visible content directly inside `<head>` (only metadata belongs there).
- Loading heavy scripts in `<head>` without `defer`/`async`, blocking page rendering.
- Using multiple `<title>` or multiple `<html>`/`<body>` tags in one document (only one of each is valid).

## Quick Reference

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="icon" href="favicon.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header></header>
  <main></main>
  <footer></footer>
  <script src="script.js" defer></script>
</body>
</html>
```

| Element | Required? | Purpose |
|---|---|---|
| `<!DOCTYPE html>` | Yes | HTML5 mode |
| `<html lang="">` | Yes | Root + language |
| `<meta charset>` | Yes | Encoding |
| `<meta viewport>` | Recommended | Responsiveness |
| `<title>` | Yes | Tab/SEO title |
| `<body>` | Yes | Visible content |
