import { useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

const App = () => {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: true },
    { id: 2, description: "Socks", quantity: 3, packed: false },
  ]);

  // add items
  const handleAddItems = (newItem) => {
    setItems((preItems) => [newItem, ...preItems]);
  };

  // toggle Items
  const handleToggleItems = (id) => {
    setItems((preItems) =>
      preItems.map((preItem) =>
        preItem.id === id ? { ...preItem, packed: !preItem.packed } : preItem
      )
    );
  };

  // delete Items
  const handleDeleteItems = (id) => {
    console.log("handleDeleteItems", id);
    setItems((preItems) => preItems.filter((item) => item.id !== id));
  };

  // clear list
  const handleClearList = () => {
    const confirmed = window.confirm("Are you sure you clear all list !!!");
    if (confirmed) setItems([]);
  };

  return (
    <div>
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onHandleToggleItems={handleToggleItems}
        onHandleDeleteItems={handleDeleteItems}
        onHandleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
