import List from "./List";
import Row from "./Row";
import { products } from "./data";
import "./styles.css";

function App() {
  return (
    <List
      items={products}
      renderItem={(product, isHighlighted) => {
        return (
          <Row
            key={product.id}
            title={product.title}
            isHighlighted={isHighlighted}
          />
        );
      }}
    />
  );
}

export default App;
