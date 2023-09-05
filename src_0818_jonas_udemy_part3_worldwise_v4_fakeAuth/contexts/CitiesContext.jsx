import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  errorMsg: "",
  currentCity: {},
  isFetchCities: false,
};

const reducer = (state, action) => {
  console.log("action.type", action);
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, errorMsg: "" };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        isFetchCities: true,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, errorMsg: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

function CitiesProvider({ children }) {
  console.log("CitiesProvider");
  const [
    { cities, isLoading, errorMsg, currentCity, isFetchCities },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log("context cities", cities);

  useEffect(() => {
    console.log("CitiesProvider useEffect");
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "❗️ there is a error in loading fetchCities data",
        });
      }
    }
    fetchCities();
    return () => {
      console.log("clean citiesprovider ");
    };
  }, []);

  // get special city
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const currentCity = await res.json();
      dispatch({ type: "city/loaded", payload: currentCity });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: " ❗️ there is a error in loading getCity data!",
      });
    }
  }

  // create new city
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "❗️ there is a error in creating new city",
      });
    }
  }

  // delete a city
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "❗️ there is a error in delete a city!",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        isFetchCities,
        currentCity,
        errorMsg,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// define custom hooks
function useCities() {
  const citiesContext = useContext(CitiesContext);
  if (citiesContext === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return citiesContext;
}

export { CitiesProvider, useCities };
