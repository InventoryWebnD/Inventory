# Hyperlinks and Anchors

Hyperlinks, created with the anchor tag `<a>`, form the connective tissue of the World Wide Web by linking pages, documents, and external resources.

## What It Is

The `<a>` element creates a hyperlink to web pages, files, email addresses, locations within the same page, or any URL using the `href` attribute.

## Basic Syntax

```html
<!-- External Link -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Docs
</a>

<!-- Internal Relative Link -->
<a href="/learn/html/headings">Go to Headings</a>

<!-- In-page Anchor Link -->
<a href="#syntax">Jump to Syntax Section</a>
```

## Security Best Practices

When linking to external sites with `target="_blank"`, always include `rel="noopener noreferrer"`. This prevents the opened page from accessing your `window.opener` object, guarding against tab-nabbing vulnerabilities.

## Common Mistakes

- Using generic link descriptions such as "click here" or "read more". Always describe the link destination clearly for screen reader accessibility (e.g., "Read the HTML Headings guide").
- Creating anchor tags without an `href` attribute or using `href="#"` when a `<button>` element was actually intended.
