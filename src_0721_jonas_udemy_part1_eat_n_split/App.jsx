import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
const App = () => {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriends = (friend) => {
    setFriendsList((pre) => [friend, ...pre]);
    setShowAddFriend(false);
  };

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((pre) => {
      return pre?.id === friend?.id ? null : friend;
    });
    setShowAddFriend(false);
  };

  const handleSplitBill = (balanceValue) => {
    setFriendsList((pre) => {
      // return pre.map((item) => {
      //   if (item.id === selectedFriend.id) {
      //     return { ...item, balance: selectedFriend.balance + balanceValue };
      //   }
      //   return item;
      // });
      return pre.map((item) =>
        item.id === selectedFriend.id
          ? { ...item, balance: selectedFriend.balance + balanceValue }
          : item
      );
    });
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          onHandleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriends onAddFriends={handleAddFriends} />}
        <Button handleButton={() => setShowAddFriend((pre) => !pre)}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onHandleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

const FriendsList = ({
  friendsList,
  onHandleSelectedFriend,
  selectedFriend,
}) => {
  return (
    <div>
      <ul>
        {friendsList.map((friend, i) => {
          return (
            <Friend
              friend={friend}
              key={i}
              onHandleSelectedFriend={onHandleSelectedFriend}
              selectedFriend={selectedFriend}
            />
          );
        })}
      </ul>
    </div>
  );
};

const Friend = ({ friend, onHandleSelectedFriend, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend?.id;
  const hanleButton = () => {
    onHandleSelectedFriend(friend);
  };
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {Math.abs(friend.balance)} $
        </p>
      )}

      {friend.balance === 0 && <p> you and {friend.name} are even</p>}

      <Button handleButton={hanleButton}>
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
};

const Button = ({ children, handleButton }) => {
  return (
    <button className="button" onClick={handleButton}>
      {children}
    </button>
  );
};

const FormAddFriends = ({ onAddFriends }) => {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("https://i.pravatar.cc/48");

  const handleAddFriends = (event) => {
    event.preventDefault();

    if (!name || !imgUrl) return;

    const id = Date.now();
    const newFriend = {
      id: id,
      name,
      image: `${imgUrl}?u=${id}`,
      balance: 0,
    };
    onAddFriends(newFriend);
    setName("");
    setImgUrl("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleAddFriends}>
      <label>👨‍👨‍👧‍👧 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label>🗾 Image Url</label>
      <input
        type="text"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onHandleSplitBill }) => {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [whoIsPaid, setWhoIsPaid] = useState("user");

  const paidByFriend = bill ? bill - expense : "";

  const handleSubmit = (event) => {
    event.preventDefault();
    onHandleSplitBill(whoIsPaid === "user" ? paidByFriend : -paidByFriend);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(event) => setBill(Number(event.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={expense}
        onChange={(event) =>
          setExpense(
            Number(event.target.value) > bill
              ? expense
              : Number(event.target.value)
          )
        }
      />

      <label>👯‍♀️ {selectedFriend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>👀 Who is paying the bill?</label>
      <select
        value={whoIsPaid}
        onChange={(event) => setWhoIsPaid(event.target.value)}
      >
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
