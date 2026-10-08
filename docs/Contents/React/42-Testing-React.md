# Testing React Applications

## Introduction

React testing focuses on user-visible behavior: rendering components, interacting with controls and verifying the resulting UI. A typical modern stack uses a test runner such as Vitest/Jest with React Testing Library.

> **WebnD Inventory Focus:** This file is designed for practical React evaluation. A student should be able to explain the concept, recognize incorrect implementations, and use it inside a small working React feature.

## Subtopics

- Unit tests
- Component tests
- Integration tests
- React Testing Library
- User interactions
- Queries
- Async UI
- Mocking API calls
- Testable components
- Snapshot testing basics

## Syntax / Core Pattern

```jsx
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("shows product name", () => {
  render(<ProductCard product={{ id: 1, name: "Keyboard" }} />);
  expect(screen.getByText("Keyboard")).toBeInTheDocument();
});
```

## Important Concepts

| Topic | Purpose | Example |
|---|---|---|
| Render | Mount component in test | `render(<App />)` |
| Query | Find UI element | `getByRole`, `getByText` |
| Interaction | Simulate user behavior | Click/type |
| Assertion | Verify expected result | `expect(...)` |

## Common Use Cases

- **Beginner:** Testing forms.
- **Practical UI:** Testing loading/error states.
- **Real-world:** Testing add-to-cart behavior.

## Common Errors

1. ❌ **Testing implementation details**

```jsx
Brittle tests
```
**Why it is a problem:** Prefer accessible/user-facing behavior.

2. ❌ **Wrong query**

```jsx
Can't find element
```
**Why it is a problem:** Use role/name/label where appropriate.

3. ❌ **Ignoring async**

```jsx
Assertion runs before UI updates
```
**Why it is a problem:** Use async queries/waits appropriately.

## Common Mistakes

- Testing private component state directly.
- Making snapshots the only tests.
- Mocking everything so heavily that behavior is no longer realistic.

## Quick Reference

```text
Arrange
  ↓
Act
  ↓
Assert
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
