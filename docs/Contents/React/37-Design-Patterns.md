# React Design Patterns

## Introduction
Design patterns are proven ways of structuring components and logic. Today the most useful ones are **custom hooks** (reuse logic), **composition** (reuse UI), **compound components** (related components that share state) and **controlled components**. Older patterns, such as higher-order components (HOC) and render props, are still found in existing code, so you should recognize them.

## Subtopics
- Container / presentational split
- Custom hooks pattern
- Compound components
- Render props
- Higher-Order Components (HOC)
- Controlled vs uncontrolled components
- Provider pattern (Context)
- State reducer / "props getters" (overview)
- Choosing hooks over HOCs/render props

## Syntax
```jsx
// Compound components: parts share state through Context
const TabsContext = createContext(null);

function Tabs({ defaultTab, children }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext value={{ active, setActive }}><div>{children}</div></TabsContext>;
}
Tabs.List = ({ children }) => <div role="tablist">{children}</div>;
Tabs.Tab = function Tab({ id, children }) {
  const { active, setActive } = useContext(TabsContext);
  return <button role="tab" aria-selected={active === id} onClick={() => setActive(id)}>{children}</button>;
};
Tabs.Panel = function Panel({ id, children }) {
  const { active } = useContext(TabsContext);
  return active === id ? <div role="tabpanel">{children}</div> : null;
};

<Tabs defaultTab="a">
  <Tabs.List><Tabs.Tab id="a">One</Tabs.Tab><Tabs.Tab id="b">Two</Tabs.Tab></Tabs.List>
  <Tabs.Panel id="a">First</Tabs.Panel>
  <Tabs.Panel id="b">Second</Tabs.Panel>
</Tabs>
```

```jsx
// Render prop: parent decides how to render shared logic
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>{render(pos)}</div>;
}
<MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />

// HOC (legacy): function that takes a component and returns a new one
const withLoading = Component => ({ loading, ...props }) =>
  loading ? <Spinner /> : <Component {...props} />;

// Modern replacement: a custom hook
const { x, y } = useMousePosition();
```

## Important Methods & Properties
| Pattern | Idea | When to use |
|---|---|---|
| Custom hook | Reuse stateful logic | Almost always first choice |
| Composition (`children`) | Reuse layout | Wrappers, cards, modals |
| Compound components | Related parts share state | Tabs, accordions, menus |
| Render props | Pass a function as UI | Library flexibility |
| HOC | Wrap a component | Legacy code, some libraries |
| Controlled component | Parent owns value | Forms, inputs |

## Common Use Cases
- **Beginner:** splitting a page into container and presentational components.
- **Practical UI:** a `Tabs` or `Accordion` API.
- **Real-world application:** a component library with hooks for logic and compound components for UI.

## Common Errors
1. ❌
```jsx
function Page() {
  const Enhanced = withLoading(List);        // HOC created inside render
  return <Enhanced items={items} />;
}
```
**Why it fails:** A new component type is created on every render, so state in `List` is lost each time.
✅
```jsx
const EnhancedList = withLoading(List);       // created once, at module level
```
**Explanation:** Apply HOCs outside render.

2. ❌
```jsx
<Tab id="a">One</Tab>      // Tab used outside <Tabs>
```
**Why it fails:** The context is missing, so `useContext` returns `null` and destructuring crashes.
✅
```jsx
<Tabs defaultTab="a"><Tabs.Tab id="a">One</Tabs.Tab></Tabs>
```
**Explanation:** Compound parts must be rendered inside their parent.

3. ❌
```jsx
const withUser = C => props => <C {...props} user={useUser()} />;   // hook in an inline arrow
```
**Why it fails:** It hides hook rules and makes the component hard to debug.
✅
```jsx
function Profile() { const user = useUser(); /* ... */ }
```
**Explanation:** Prefer custom hooks over HOCs for reusing logic.

## Common Mistakes
- Using a pattern because it sounds advanced (not because it solves a problem).
- Creating HOCs inside components.
- Choosing render props/HOCs where a custom hook would be simpler.
- Overusing Context in compound components for tiny cases.

## Quick Reference
```text
Reuse logic        -> custom hook
Reuse layout       -> children / composition
Related UI parts   -> compound components (+ Context)
Legacy             -> HOC, render props (recognize, rarely write)
Inputs             -> controlled components
```
