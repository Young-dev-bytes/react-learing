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

export default Item;
