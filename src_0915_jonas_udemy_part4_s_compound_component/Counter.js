import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

// ! 1 CreateContext
const CounterContext = createContext();

// ! 2 Create parent component
export function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);
  console.log("children", children);
  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <div>{children}</div>
    </CounterContext.Provider>
  );
}

// ! 3 Create child components to help implementing the common task
function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);

  return <button onClick={increase}>{icon}</button>;
}
function Label({ children }) {
  return <span>{children}</span>;
}

// ! 4 Add child components as properties to parent component
Counter.Count = Count;
Counter.Decrease = Decrease;
Counter.Increase = Increase;
Counter.Label = Label;
