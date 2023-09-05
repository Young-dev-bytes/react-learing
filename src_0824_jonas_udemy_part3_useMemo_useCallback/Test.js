import { useEffect, useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 1_000 }, () => "WORD");

  console.log("slow");

  useEffect(() => {
    console.log("slow effect");
  }, []);
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  console.log("counter");

  useEffect(() => {
    console.log("counter effect");
  }, []);

  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  console.log("test");
  const [countT, setCountT] = useState(0);

  return (
    <div>
      <h1>Slow counter?!?</h1>
      <span>{countT}</span>
      <button onClick={() => setCountT((pre) => pre + 1)}>count</button>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
