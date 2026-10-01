# Media

## Introduction

HTML supports embedding rich media directly into web pages: images, audio, and video, without relying on third-party plugins. Proper use of `alt` text, captions, and fallback content ensures media is accessible and performs well across devices and network conditions.

## Subtopics

- Images with `<img>`
- Responsive images: `srcset` and `sizes`
- Image maps (`<map>`, `<area>`) — brief overview
- Figures and captions: `<figure>`, `<figcaption>`
- Audio embedding with `<audio>`
- Video embedding with `<video>`
- Multiple sources with `<source>`
- Subtitles/captions with `<track>`
- Accessibility: `alt` text, captions, transcripts
- Lazy loading (`loading="lazy"`)
- Embedding external content with `<iframe>`

## Syntax

### 1. Basic Image

```html
<img src="cat.jpg" alt="A gray tabby cat sitting on a windowsill" width="400" height="300">
```

- `src` — Path/URL to the image file.
- `alt` — Alternative text describing the image, read by screen readers and shown if the image fails to load. **Required** for accessibility.
- `width` / `height` — Reserve space for the image to prevent layout shift while it loads.

### 2. Responsive Images

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Mountain landscape at sunrise">
```

- `srcset` — Lists multiple image files with their intrinsic widths (`400w` = 400 pixels wide), letting the browser pick the best one.
- `sizes` — Tells the browser how wide the image will display at different viewport widths, so it can choose the right `srcset` candidate.

### 3. Figure with Caption

```html
<figure>
  <img src="chart.png" alt="Bar chart showing quarterly revenue growth">
  <figcaption>Fig 1. Quarterly revenue growth, 2025–2026</figcaption>
</figure>
```

- `<figure>` — Groups media content with its caption as one self-contained unit.
- `<figcaption>` — Provides a caption/legend for the content inside `<figure>`.

### 4. Audio

```html
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

- `<audio controls>` — Embeds a sound file; `controls` displays play/pause/volume UI.
- `<source>` — Provides alternative file formats; the browser uses the first one it supports.
- Text between the tags — Fallback content shown only in browsers that don't support `<audio>`.

### 5. Video

```html
<video controls width="640" height="360" poster="preview.jpg">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <track kind="subtitles" src="subs-en.vtt" srclang="en" label="English">
  Your browser does not support the video tag.
</video>
```

- `poster` — An image shown before the video plays.
- `<track kind="subtitles">` — Adds a subtitle/caption file (WebVTT format).
- `srclang` / `label` — Language code and human-readable name for the track, letting users pick among multiple subtitle languages.

### 6. Video/Audio Attributes

```html
<video autoplay muted loop playsinline>
  <source src="bg.mp4" type="video/mp4">
</video>
```

- `autoplay` — Starts playback automatically (often requires `muted` to work in modern browsers).
- `muted` — Starts with sound off.
- `loop` — Replays the media automatically when it ends.
- `playsinline` — Plays inline on mobile instead of forcing fullscreen.

### 7. Lazy Loading and Iframes

```html
<img src="banner.jpg" alt="Promotional banner" loading="lazy">

<iframe src="https://www.example.com/map" title="Store location map" width="600" height="400"></iframe>
```

- `loading="lazy"` — Defers loading the image until it's near the viewport, improving page performance.
- `<iframe title="">` — Embeds another HTML page; `title` is required for accessibility to describe the embedded content's purpose.

## Important Tags & Attributes

| Tag / Attribute | Purpose | Syntax | Example |
|---|---|---|---|
| `<img src alt>` | Embed an image | `<img src="x.jpg" alt="desc">` | `<img src="dog.jpg" alt="A running dog">` |
| `srcset` / `sizes` | Responsive images | `<img srcset="..." sizes="...">` | See example above |
| `<figure>` / `<figcaption>` | Media + caption group | `<figure><img><figcaption></figcaption></figure>` | See example above |
| `<audio controls>` | Embed audio | `<audio controls><source></audio>` | `<audio controls src="a.mp3"></audio>` |
| `<video controls>` | Embed video | `<video controls><source></video>` | `<video controls src="v.mp4"></video>` |
| `<source>` | Alternate media file | `<source src type>` | `<source src="v.webm" type="video/webm">` |
| `<track>` | Subtitles/captions | `<track kind src srclang label>` | `<track kind="captions" src="c.vtt" srclang="en">` |
| `loading="lazy"` | Deferred image loading | `<img loading="lazy">` | `<img src="x.jpg" loading="lazy" alt="x">` |
| `<iframe title>` | Embed external page | `<iframe src title>` | `<iframe src="url" title="Video player"></iframe>` |

## Common Use Cases

- **Beginner example:** A profile picture using `<img>` with a descriptive `alt`.
- **Practical website example:** A photo gallery using `<figure>`/`<figcaption>` for each image with `srcset` for responsive delivery across phone/tablet/desktop.
- **Real-world implementation:** A streaming platform's video player using `<video>` with multiple `<source>` formats for browser compatibility, a `<track>` for closed captions to meet accessibility requirements, and `loading="lazy"` on thumbnail images across the homepage to speed up initial load.

## Common Errors

1. ❌
```html
<img src="photo.jpg">
```
**Why it's wrong:** Missing the `alt` attribute; screen reader users get no description, and broken images show nothing useful.
✅
```html
<img src="photo.jpg" alt="Sunset over the ocean">
```
**Explanation:** Always include descriptive `alt` text (or `alt=""` if the image is purely decorative).

2. ❌
```html
<video>
  <source src="movie.mp4">
</video>
```
**Why it's wrong:** Missing `controls` attribute means users have no way to play/pause the video, and no `type` attribute on `<source>` forces the browser to guess the format.
✅
```html
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>
```
**Explanation:** Add `controls` for usability and always specify `type` so browsers can quickly determine compatibility.

3. ❌
```html
<audio src="song.mp3" controls>
</audio src>
```
**Why it's wrong:** `</audio src>` is an invalid closing tag; closing tags never include attributes.
✅
```html
<audio src="song.mp3" controls></audio>
```
**Explanation:** Closing tags only need the tag name preceded by a forward slash, e.g. `</audio>`.

4. ❌
```html
<img alt="A photo of a beach" src=beach.jpg>
```
**Why it's wrong:** The `src` value isn't wrapped in quotes; while some browsers tolerate this for simple paths, it's invalid HTML and breaks with paths containing spaces or special characters.
✅
```html
<img alt="A photo of a beach" src="beach.jpg">
```
**Explanation:** Always wrap attribute values in quotes.

5. ❌
```html
<iframe src="https://example.com"></iframe>
```
**Why it's wrong:** Missing the `title` attribute, which screen readers need to announce the purpose of the embedded frame.
✅
```html
<iframe src="https://example.com" title="Company location map"></iframe>
```
**Explanation:** Always provide a descriptive `title` on every `<iframe>`.

6. ❌
```html
<img src="logo.png" alt="image">
```
**Why it's wrong:** The `alt` text is meaningless/generic ("image") and provides no real information about the picture's content.
✅
```html
<img src="logo.png" alt="Company logo: a blue mountain silhouette">
```
**Explanation:** `alt` text must describe *what the image actually shows or represents*, not just restate that it's an image.

## Common Mistakes

- Omitting or writing meaningless `alt` text.
- Forgetting `type` on `<source>` elements, slowing browser format detection.
- Using `autoplay` with sound (blocked by most browsers unless `muted` is also set).
- Not specifying `width`/`height` on images, causing layout shift (bad for Core Web Vitals).
- Forgetting `title` on `<iframe>` elements.
- Relying on a single image format/resolution instead of `srcset` for responsive design.
- Not providing captions/subtitles (`<track>`) for video content, hurting accessibility.

## Quick Reference

```html
<img src="pic.jpg" alt="Description" width="400" height="300" loading="lazy">

<figure>
  <img src="chart.png" alt="Chart description">
  <figcaption>Caption text</figcaption>
</figure>

<audio controls>
  <source src="a.mp3" type="audio/mpeg">
</audio>

<video controls width="640" height="360" poster="thumb.jpg">
  <source src="v.mp4" type="video/mp4">
  <track kind="subtitles" src="en.vtt" srclang="en" label="English">
</video>

<iframe src="url" title="Description"></iframe>
```

| Tag/Attr | Meaning |
|---|---|
| `img` + `alt` | Image + accessible description |
| `srcset`/`sizes` | Responsive image sources |
| `figure`/`figcaption` | Media + caption |
| `audio`/`video` + `controls` | Playable media with UI |
| `source` + `type` | Alternate format |
| `track` | Subtitles/captions |
| `loading="lazy"` | Deferred loading |
