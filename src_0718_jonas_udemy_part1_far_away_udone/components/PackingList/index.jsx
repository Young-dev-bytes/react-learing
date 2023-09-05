import { useState } from "react";
import Item from "./Item";

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

export default PackingList;
