import { useState } from "react";
import { faker } from "@faker-js/faker";
import useShowVisible from "./hooks/useShowVisible";
import "./styles.css";

const products = Array.from({ length: 5 }, () => {
  return {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
  };
});

const companies = Array.from({ length: 5 }, () => {
  return {
    companyName: faker.company.name(),
    phrase: faker.company.catchPhrase(),
  };
});

function ProductItem({ product }) {
  return (
    <li className="product">
      <p className="product-name">{product.productName}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </li>
  );
}

function CompanyItem({ company, defaultVisibility }) {
  const [isVisible, setIsVisisble] = useState(defaultVisibility);

  return (
    <li
      className="company"
      onMouseEnter={() => setIsVisisble(true)}
      onMouseLeave={() => setIsVisisble(false)}
    >
      <p className="company-name">{company.companyName}</p>
      {isVisible && (
        <p className="company-phrase">
          <strong>About:</strong> {company.phrase}
        </p>
      )}
    </li>
  );
}

function List({ title, items, renderItem }) {
  const { isOpen, isCollapsed, setIsCollapsed, toggleOpen } = useShowVisible();
  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {/* {isOpen && <ul className="list">{renderItem(displayItems)}</ul>} */}
      {isOpen && <ul className="list">{displayItems.map(renderItem)}</ul>}
      {/* {isOpen && (
        <ul className="list">{displayItems.map((item) => renderItem(item))}</ul>
      )} */}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List
          title="Products"
          items={products}
          renderItem={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
        <List
          title="Companies"
          items={companies}
          renderItem={(company) => (
            <CompanyItem
              key={company.companyName}
              company={company}
              defaultVisibility={true}
            />
          )}
        />
      </div>
      <div className="col-2">
        <ProductList items={products} />
        <HOCProductList
          title="Products HOC"
          items={products}
          renderItem={(product) => (
            <ProductItem key={product.productName} product={product} />
          )}
        />
      </div>
    </div>
  );
}

// LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it
function ProductList({ items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}

function HOCProductList({ title, items, renderItem }) {
  const { isOpen, isCollapsed, setIsCollapsed, toggleOpen } = useShowVisible();
  const displayItems = isCollapsed ? items.slice(0, 3) : items;

  return (
    <div className="list-container">
      <div className="heading">
        <h2>{title}</h2>
        <button onClick={toggleOpen}>
          {isOpen ? <span>&or;</span> : <span>&and;</span>}
        </button>
      </div>
      {isOpen && <ul className="list">{displayItems.map(renderItem)}</ul>}
      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}
