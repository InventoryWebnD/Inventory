# Component Communication

## Introduction
React components talk to each other in a few well-defined ways. Data goes **down** from parent to child through props, and information goes **up** through callback functions that the parent passes in. Siblings communicate through their shared parent, and distant components can share data through Context or a store.

## Subtopics
- Parent to child: props
- Child to parent: callback props
- Sibling communication via the parent
- Passing `children` and render content
- Context for far-apart components
- Refs for imperative actions (focus, scroll)
- Events vs state flow
- Choosing the simplest option

## Syntax
```jsx
// Parent -> Child (props) and Child -> Parent (callback)
function Parent() {
  const [message, setMessage] = useState("");
  return (
    <>
      <p>Child said: {message}</p>
      <Child name="Asha" onSend={setMessage} />
    </>
  );
}

function Child({ name, onSend }) {
  return <button onClick={() => onSend(`Hello from ${name}`)}>Say hi</button>;
}
```

```jsx
// Siblings through a parent
function Page() {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Sidebar onSelect={setSelectedId} />
      <Details id={selectedId} />
    </>
  );
}
```

## Important Methods & Properties
| Direction | Tool | Example |
|---|---|---|
| Parent to child | Props | `<Child title="Hi" />` |
| Child to parent | Callback prop | `<Child onSave={handleSave} />` |
| Sibling to sibling | Lift state to parent | `Parent` holds `selectedId` |
| Any depth | Context | `useContext(ThemeContext)` |
| Parent to child (imperative) | Ref | `inputRef.current.focus()` |
| Slot content | `children` | `<Card><p>...</p></Card>` |

## Common Use Cases
- **Beginner:** a child button that tells the parent to add one to a counter.
- **Practical UI:** a filter panel that changes the list in another component.
- **Real-world application:** a table row action ("Edit") that opens a modal owned by the page.

## Common Errors
1. ❌
```jsx
function Child() {
  parentSetCount(5);      // global/undefined function from the parent
}
```
**Why it fails:** A child cannot reach into the parent's variables; they are not in scope.
✅
```jsx
function Child({ onSetCount }) {
  return <button onClick={() => onSetCount(5)}>Set</button>;
}
```
**Explanation:** The parent passes a callback; the child calls it.

2. ❌
```jsx
function Sidebar() { const [selected, setSelected] = useState(null); /* ... */ }
function Details() { /* needs selected from Sidebar */ }
```
**Why it fails:** Siblings cannot read each other's state.
✅
```jsx
function Page() {
  const [selected, setSelected] = useState(null);
  return <><Sidebar onSelect={setSelected} /><Details id={selected} /></>;
}
```
**Explanation:** Lift the shared state to the common parent.

3. ❌
```jsx
<Level1 user={user}>
  <Level2 user={user}>
    <Level3 user={user}>  // only Level3 needs user
```
**Why it fails:** Props are passed through components that do not use them (prop drilling), making code hard to change.
✅
```jsx
<UserProvider><Level1 /></UserProvider>
// Level3: const { user } = useUser();
```
**Explanation:** Use Context (or composition with `children`) to skip the middle layers.

## Common Mistakes
- Trying to share state between siblings without a parent.
- Overusing Context for data that is only needed one level down.
- Passing too many props instead of grouping or using composition.
- Having the child call a function with a different shape than the parent expects.

## Quick Reference
```jsx
<Child data={value} onAction={handler} />          // down + up
function Child({ data, onAction }) { onAction(data); }
<Layout><Page /></Layout>                          // children
const val = useContext(MyContext);                 // far away
```
