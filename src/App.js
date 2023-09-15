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

function List({ title, items }) {
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
      {isOpen && (
        <ul className="list">
          {displayItems.map((product) => (
            <ProductItem key={product.productName} product={product} />
          ))}
        </ul>
      )}

      <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
        {isCollapsed ? `Show all ${items.length}` : "Show less"}
      </button>
    </div>
  );
}

// function CompaniesList({ title, items }) {
//   const { isOpen, isCollapsed, setIsCollapsed, toggleOpen } = useShowVisible();
//   const displayItems = isCollapsed ? items.slice(0, 3) : items;

//   return (
//     <div className="list-container">
//       <div className="heading">
//         <h2>{title}</h2>
//         <button onClick={toggleOpen}>
//           {isOpen ? <span>&or;</span> : <span>&and;</span>}
//         </button>
//       </div>
//       {isOpen && (
//         <ul className="list">
//           {displayItems.map((company) => (
//             <CompanyItem key={company.companyName} company={company} />
//           ))}
//         </ul>
//       )}

//       <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
//         {isCollapsed ? `Show all ${items.length}` : "Show less"}
//       </button>
//     </div>
//   );
// }

export default function App() {
  return (
    <div>
      <h1>Render Props Demo</h1>

      <div className="col-2">
        <List title="Products" items={products} />
        {/* <CompaniesList title="Companies" items={companies} /> */}
      </div>
    </div>
  );
}

// LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it
function ProductList({ title, items }) {
  return (
    <ul className="list">
      {items.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  );
}
