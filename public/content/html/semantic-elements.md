# Semantic HTML Elements

Semantic HTML uses tags that convey the meaning of the content enclosed rather than just describing its visual presentation.

## What It Is

HTML5 introduced specialized container elements that clearly describe their purpose to browsers, developers, and assistive tech. Rather than wrapping everything in generic `<div>` tags, semantic elements outline the major regions of a webpage.

## Key Semantic Elements

- `<header>`: Introductory content or navigational aids, usually at the top of a page or article.
- `<nav>`: Major navigational sections containing links to primary pages or subsections.
- `<main>`: The dominant, central topic content unique to the document (only one `<main>` per page).
- `<article>`: Self-contained, independently distributable composition (such as a blog post, comment, or card).
- `<section>`: A standalone section of functionality or content with an associated heading.
- `<aside>`: Content tangentially related to surrounding copy (such as sidebars, callouts, or glossaries).
- `<footer>`: Closing content for a section or document, often containing copyright and author details.

## Basic Syntax

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Semantic Page Architecture</title>
  </head>
  <body>
    <header>
      <h1>Web Development Inventory</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/learn">Learn</a>
      </nav>
    </header>

    <main>
      <article>
        <h2>Modern Web Standards</h2>
        <p>Semantic tags dramatically improve SEO and accessibility.</p>
      </article>

      <aside>
        <h3>Related Resources</h3>
        <p>Check out our HTML Boilerplate guide.</p>
      </aside>
    </main>

    <footer>
      <p>&copy; 2026 WebnD Inventory</p>
    </footer>
  </body>
</html>
```

## Why Semantics Matter

1. **Accessibility**: Screen readers can navigate directly between landmarks (e.g. jumping straight to `<main>`).
2. **SEO**: Search engine crawlers can prioritize important article content over repeated headers and footers.
3. **Maintainability**: Clear developer comprehension when reading and maintaining markup.

## Common Mistakes

- "Div Soup": Wrapping all content in nested generic `<div>` tags without semantic significance.
- Using multiple `<main>` tags on the same rendered page.
