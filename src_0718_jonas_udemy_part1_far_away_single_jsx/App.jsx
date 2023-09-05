import { useState } from "react";

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

// logo component
const Logo = () => {
  return <h1> 🌴 Far Away 🧳</h1>;
};

// formdata component
const Form = ({ handleAddItems }) => {
  // test codes
  // const handleFormChange = (event) => {
  //   console.log("handleFormChange", event.target.value);
  //   setQuantity(event.target.value);
  // };

  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    if (!description) return;
    handleAddItems(newItem);
    setQuantity(1);
    setDescription("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(event.target.value * 1)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>

      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>ADD</button>
    </form>
  );
};

// packingList component
const PackingList = ({
  items,
  onHandleToggleItems,
  onHandleDeleteItems,
  onHandleClearList,
}) => {
  console.log("==>", items);

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onHandleToggleItems={onHandleToggleItems}
            onHandleDeleteItems={onHandleDeleteItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="input">Sorted by input order </option>
          <option value="description">Sorted by description</option>
          <option value="packed">Sorted by packed</option>
        </select>
        {"      "}
        <button onClick={() => onHandleClearList()}>clear list</button>
      </div>
    </div>
  );
};

// item component
const Item = ({ item, onHandleToggleItems, onHandleDeleteItems }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={(event) => {
          console.log(event.target.checked);
          onHandleToggleItems(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} - {item.description}
      </span>
      <button
        onClick={() => {
          onHandleDeleteItems(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items your packing list 🚀</em>
      </footer>
    );
  }

  // computed already packed items
  const count = items.length;
  const packedCount = items.filter((item) => item.packed).length;
  const packedCountPercentage = Math.round((packedCount / count) * 100);

  return (
    <footer className="stats">
      <em>
        {packedCountPercentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${count} items on your list, and you already packed 
        ${packedCount} (${packedCountPercentage}%)`}
      </em>
    </footer>
  );
};

export default App;
