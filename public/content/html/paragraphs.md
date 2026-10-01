# Paragraphs and Text Formatting

Paragraphs and inline formatting elements give rhythm and structural meaning to continuous narrative text in HTML.

## What It Is

The `<p>` tag is a block-level element representing a paragraph of text. Browsers automatically separate adjacent paragraphs with vertical margins. Within paragraphs, inline tags convey subtle shifts in tone, importance, and emphasis.

## Basic Syntax

```html
<p>
  This is a foundational paragraph demonstrating <strong>strong importance</strong> 
  and <em>emphatic stress</em> within body copy.
</p>
```

## Inline Text Semantics

- `<strong>`: Indicates strong importance or urgency (typically rendered in bold).
- `<em>`: Indicates conversational stress emphasis (typically rendered in italic).
- `<mark>`: Represents highlighted or referenced text.
- `<code>`: Formats inline code keywords or snippets in monospace font.
- `<br>`: Produces a line break inside a paragraph (use sparingly, e.g., in poetry or physical addresses).

## Example

```html
<p>
  Antigravity is an <strong>agentic AI coding assistant</strong>. 
  When working with web projects, ensure you always inspect the 
  <code>package.json</code> file before starting.
</p>

<address>
  100 Infinite Loop<br />
  Cupertino, CA 95014
</address>
```

## Common Mistakes

- Using empty `<p></p>` or multiple `<br>` tags to generate visual vertical space; always use CSS margins or padding instead.
- Confusing stylistic `<b>` and `<i>` tags with semantic `<strong>` and `<em>` tags.
