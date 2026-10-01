# HTML Headings

HTML provides six structural heading levels, from `<h1>` to `<h6>`, allowing you to create an intuitive content hierarchy that browsers, search engines, and screen readers depend on.

## What It Is

Headings establish the outline of a document. Rather than styling regular text to appear large and bold, using semantic heading tags communicates document architecture and topical importance.

## Basic Syntax

```html
<h1>Page Primary Topic</h1>
<h2>Key Section Subject</h2>
<h3>Subsection Heading</h3>
<h4>Detailed Point</h4>
<h5>Minor Notice</h5>
<h6>Subordinate Footnote</h6>
```

## Example

```html
<article>
  <h1>Guide to Modern CSS Grid</h1>
  <p>Learn how grid layout simplifies responsive web design.</p>

  <h2>Grid Terminology</h2>
  <h3>Columns and Rows</h3>
  <p>Track definitions allow fluid column distribution.</p>

  <h2>Practical Examples</h2>
  <h3>Two Column Layout</h3>
  <p>A classic layout pattern using fr units.</p>
</article>
```

## Best Practices

- Use only one `<h1>` per page representing the overall document topic.
- Maintain a strict hierarchy without skipping levels (for instance, avoid jumping from `<h2>` directly to `<h4>`).
- Use headings for structure, not for cosmetic font sizing. Use CSS for visual styles.

## Common Mistakes

- Choosing heading levels based on appearance rather than document importance.
- Using multiple `<h1>` elements across standard web documents, which muddles SEO and accessibility bookmarks.
