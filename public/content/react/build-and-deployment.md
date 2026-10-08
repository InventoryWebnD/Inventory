# Build and Deployment

## Introduction

A React development server is not the same as the production build. The project must be built, configured for its deployment environment and served with the correct routing and asset behavior.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- `npm run dev`
- Production build
- `npm run build`
- Preview
- Environment variables
- Static hosting
- Vercel/Netlify concepts
- SPA routing
- Build errors
- Asset paths

## Syntax / Core Pattern

```bash
npm install
npm run dev

npm run build
npm run preview
```

A typical deployment flow:

```text
GitHub
  ↓
Build service
  ↓
npm run build
  ↓
dist/
  ↓
Hosting
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Dev server | Fast local development | `npm run dev` |
| Build | Production bundle | `npm run build` |
| Preview | Test production build locally | `npm run preview` |
| Hosting | Serve built application | Vercel/Netlify/static host |

## Common Use Cases

- **Beginner:** Deploying an inventory frontend.
- **Practical UI:** Previewing production behavior.
- **Real-world:** Connecting production API URL.

## Common Errors

1. ❌ **Build passes locally but deployment fails**

```jsx
Environment/config mismatch
```
**Why it is a problem:** Check variables and build logs.

2. ❌ **Refresh on nested route gives 404**

```jsx
Host doesn't route SPA paths
```
**Why it is a problem:** Configure fallback/rewrite.

3. ❌ **Hardcoded localhost API**

```jsx
Works only locally
```
**Why it is a problem:** Use deployment configuration.

## Common Mistakes

- Deploying only source files without build configuration.
- Forgetting production environment variables.
- Assuming client routing works automatically on every host.

## Quick Reference

```text
Source
 ↓
Build
 ↓
Production assets
 ↓
Host
 ↓
Browser
```

## Inventory Checkpoints

A strong candidate should be able to:

1. **Explain** the concept in simple words.
2. **Write** a working implementation without blindly copying a tutorial.
3. **Debug** at least one common mistake.
4. **Combine** this topic with previously learned React concepts.
5. **Recognize** when the concept should *not* be used.

## Practical Challenge Ideas

- Build a small feature using this topic from scratch.
- Modify an existing component so the topic becomes necessary.
- Debug a deliberately broken implementation.
- Combine this topic with state, props, events and API data where appropriate.
