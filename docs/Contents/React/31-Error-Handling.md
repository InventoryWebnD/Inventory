# Error Handling

## Introduction

Robust React applications handle errors from user input, network requests, parsing, components and external services. Errors should produce useful recovery UI rather than blank screens.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Try/catch
- Promise errors
- HTTP errors
- Validation errors
- Error boundaries
- Fallback UI
- Retry
- Logging
- User-safe messages
- Abort errors

## Syntax / Core Pattern

```jsx
async function saveProduct(product) {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (!response.ok) throw new Error("Unable to save product");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| `try/catch` | Handle thrown synchronous/awaited errors | API action |
| Error boundary | Catch render-time errors in subtree | Fallback screen |
| Fallback | Recovery UI | Retry button |
| HTTP check | Detect non-2xx | `response.ok` |

## Common Use Cases

- **Beginner:** API failure state.
- **Practical UI:** Invalid form submission.
- **Real-world:** Broken third-party widget.

## Common Errors

1. ❌ **Catching and ignoring**

```jsx
User gets no feedback
```
**Why it is a problem:** Set visible error state.

2. ❌ **Showing raw stack traces**

```jsx
Leaks implementation details
```
**Why it is a problem:** Show safe message.

3. ❌ **Thinking error boundaries catch async errors**

```jsx
They primarily handle render/lifecycle errors in their subtree
```
**Why it is a problem:** Handle async operations separately.

## Common Mistakes

- Using one generic error message for all failures.
- Logging sensitive data.
- No retry path for transient failures.

## Quick Reference

```text
Operation
 ├── success → UI
 └── failure → safe message + recovery
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
