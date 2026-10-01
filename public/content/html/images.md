# Images and Media Embedding

Visual media is embedded in HTML primarily through the `<img>` element and responsive `<picture>` containers.

## What It Is

The `<img>` tag is a self-closing void element that embeds an image file onto a web page via the `src` attribute. To ensure accessible web standards, providing an accurate `alt` description is mandatory.

## Basic Syntax

```html
<img 
  src="/images/diagram.png" 
  alt="Architecture diagram showing the separation between metadata and markdown content"
  width="800"
  height="450"
  loading="lazy"
/>
```

## Advanced Syntax: Responsive Picture

```html
<figure>
  <picture>
    <source srcset="/images/hero-dark.webp" media="(prefers-color-scheme: dark)" type="image/webp" />
    <source srcset="/images/hero-light.webp" type="image/webp" />
    <img src="/images/hero-fallback.jpg" alt="Antigravity learning hub interface" width="1200" height="600" />
  </picture>
  <figcaption>Figure 1: Antigravity modern learning hub layout.</figcaption>
</figure>
```

## Key Attributes

- `alt`: Alternate text read by screen readers and displayed if the image fails to load.
- `width` and `height`: Provide intrinsic aspect ratios so browsers reserve layout space, preventing Cumulative Layout Shift (CLS).
- `loading="lazy"`: Defers offscreen image loading until the user scrolls near them, speeding up initial page performance.

## Common Mistakes

- Omitting `alt` attributes or filling them with redundant words like "image of" or "picture of".
- Leaving decorative background graphics inside `<img>` tags without `alt=""`.
