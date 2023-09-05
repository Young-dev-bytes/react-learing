import { useState } from "react";

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

export default Form;
