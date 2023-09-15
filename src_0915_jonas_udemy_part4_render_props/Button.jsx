import useShowVisible from "./hooks/useShowVisible";

function Button({ items }) {
  const { isCollapsed, setIsCollapsed } = useShowVisible();

  return (
    <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
      {isCollapsed ? `Show all ${items.length}` : "Show less"}
    </button>
  );
}

export default Button;
