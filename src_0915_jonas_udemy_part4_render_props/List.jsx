import { useState } from "react";

function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHightlighted = index === selectedIndex;
        return renderItem(item, isHightlighted);
      })}
      <hr />
      <button
        onClick={() => {
          setSelectedIndex((i) => (i + 1) % items.length);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default List;
