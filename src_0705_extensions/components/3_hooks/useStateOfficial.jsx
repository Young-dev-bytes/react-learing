import React from "react";
import { useState } from "react";

function Demo() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState("");

  function createInitialTodos() {
    console.log("createInitialTodos");
    const initialTodos = [];
    for (let i = 0; i < 10; i++) {
      initialTodos.push({
        id: i,
        text: "Item" + (i + 1),
      });
    }
    return initialTodos;
  }

  return (
    <>
      {console.log("123")}
      <p>text : {text}</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          setText("");
          setTodos([{ id: todos.length, text: text }, ...todos]);
        }}
      >
        Add
      </button>
      <ul>
        {todos.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </>
  );
}

export default Demo;
