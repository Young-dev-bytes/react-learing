import { useState } from "react";

function useShowVisible() {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  //   const displayItems = isCollapsed ? items.slice(0, 3) : items;

  function toggleOpen() {
    setIsOpen((isOpen) => !isOpen);
    setIsCollapsed(false);
  }
  return { isOpen, isCollapsed, setIsCollapsed, toggleOpen };
}

export default useShowVisible;
