import { createContext, useContext, useReducer } from "react";

const FakeAuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...initialState };
    default:
      throw new Error("Unknow action type");
  }
};

function FakeAuthProvier({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

const useFakeAuth = () => {
  const text = useContext(FakeAuthContext);
  if (text === undefined)
    throw new Error("FakeAuthContext was used outside the FakeAuthProvider");
  return text;
};

export { FakeAuthProvier, useFakeAuth };
