import React from "react";
import "./index.css";

// pizza data
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header footer">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <>
          <p>Authentic Italian cuisine</p>
          <ul className="pizzas">
            {pizzas.map((item) => {
              return <Pizza pizzaObj={item} key={item.name} />;
            })}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu,, please come back later.</p>
      )}
    </main>
  );
}

function Pizza(props) {
  const { name, ingredients, photoName, price, soldOut } = props.pizzaObj;
  console.log("123", photoName);

  // if (soldOut) return null;
  return (
    // <li className={soldOut ? "pizza sold-out" : "pizza"}>
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      {soldOut ? <span>SOLD OUT</span> : <span>{price}</span>}
      {/* <span>{soldOut ? "SOLD OUT" : price}</span> */}
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 2;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  //   if (hour >= openHour && hour <= closeHour) alert("We're currently open!!!");
  //   else alert("Sorry, We're closed");

  if (!isOpen) return <p>CLOSED</p>;

  return (
    <footer className="footer">
      {/* {new Date().toLocaleDateString()} - we're currently open. */}
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          we're happy to welcome to you between {openHour}:00 and {closeHour}:00
          !!!
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  const { closeHour } = props;
  return (
    <div className="order">
      <p>We're open util {closeHour}:00. Come to visit us.</p>
      <button className="btn">Order</button>
    </div>
  );
}

export default App;
