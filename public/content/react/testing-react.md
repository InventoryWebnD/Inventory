# Testing React

## Introduction
Tests prove that components behave correctly and keep working after changes. The modern approach uses **Vitest** (or Jest) as the test runner and **React Testing Library** to render components and interact with them the way a user does: find by text or role, click, type, and check what appears on screen. Test behaviour, not implementation details.

## Subtopics
- Test runner (Vitest/Jest) and `jsdom`
- React Testing Library: `render`, `screen`
- Queries: `getBy`, `queryBy`, `findBy` (by role/text/label)
- `userEvent` for interaction
- Assertions with `jest-dom` (`toBeInTheDocument`)
- Testing async UI (`findBy`, `waitFor`)
- Mocking API calls (`vi.fn`, MSW)
- Testing hooks and context
- What to test and what not to test
- End-to-end tests (Playwright/Cypress) overview

## Syntax
```bash
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

```jsx
// Counter.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Counter from "./Counter";

describe("Counter", () => {
  it("increments when the button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /increment/i }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

```jsx
// Async UI + mocked fetch
it("shows users after loading", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, name: "Asha" }],
  });

  render(<Users />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByText("Asha")).toBeInTheDocument();   // waits
});
```

## Important Methods & Properties
| API | Purpose | Example |
|---|---|---|
| `render(<C />)` | Mount a component in jsdom | `render(<App />)` |
| `screen.getByRole` | Find like a user (best choice) | `getByRole("button", { name: /save/i })` |
| `getBy` / `queryBy` / `findBy` | Must exist / may be absent / wait for it | `queryByText("Error")` |
| `userEvent` | Simulate typing/clicking | `await user.type(input, "hello")` |
| `expect(...).toBeInTheDocument()` | Assertion from jest-dom | `expect(el).toBeInTheDocument()` |
| `vi.fn()` / `vi.spyOn` | Mock functions/APIs | `const onSave = vi.fn()` |

## Common Use Cases
- **Beginner:** test that a button click changes text.
- **Practical UI:** test that a form shows an error for invalid email.
- **Real-world application:** test critical flows (login, checkout) with mocked network and one end-to-end test.

## Common Errors
1. ❌
```jsx
user.click(button);                         // not awaited
expect(screen.getByText("Count: 1")).toBeInTheDocument();
```
**Why it fails:** `userEvent` actions are async; the assertion runs before the UI updates.
✅
```jsx
await user.click(button);
expect(screen.getByText("Count: 1")).toBeInTheDocument();
```
**Explanation:** `await` user events.

2. ❌
```jsx
expect(screen.getByText("Asha")).toBeInTheDocument();    // data not loaded yet
```
**Why it fails:** `getBy` fails immediately if the element is not there yet.
✅
```jsx
expect(await screen.findByText("Asha")).toBeInTheDocument();
```
**Explanation:** Use `findBy` for content that appears asynchronously.

3. ❌
```jsx
expect(wrapper.state("count")).toBe(1);               // tests internal state
```
**Why it fails:** Tests tied to implementation break when you refactor even though the behaviour is the same.
✅
```jsx
expect(screen.getByText("Count: 1")).toBeInTheDocument();
```
**Explanation:** Assert what the user sees.

4. ❌
```jsx
expect(screen.getByText("Error")).not.toBeInTheDocument();   // getBy throws if missing
```
**Why it fails:** `getBy` throws when nothing is found, so the test errors instead of passing.
✅
```jsx
expect(screen.queryByText("Error")).not.toBeInTheDocument();
```
**Explanation:** Use `queryBy` to assert something is absent.

## Common Mistakes
- Testing implementation details (state, internal functions).
- Using `container.querySelector` instead of accessible queries.
- Real network calls in unit tests.
- Forgetting `await` with async queries and user events.
- Chasing 100% coverage instead of testing important behaviour.

## Quick Reference
```jsx
render(<Comp />);
screen.getByRole("button", { name: /text/i });   // exists now
screen.queryByText("x");                          // null if missing
await screen.findByText("x");                     // appears later
await userEvent.setup().click(el);
expect(el).toBeInTheDocument();
```
