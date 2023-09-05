import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initialState;
  });

  console.log("useLocalStorageState", value);

  useEffect(() => {
    console.log("useLocalStorageState - effect");
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
