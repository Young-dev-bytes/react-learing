import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  console.log("CitiesProvider");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentCity, setCurrentCity] = useState({});
  console.log("cities", cities);

  useEffect(() => {
    console.log("CitiesProvider useEffect");
    async function fetchCities() {
      console.log("async CitiesProvider");
      try {
        setIsLoading(true);
        setErrorMsg("");
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log("fetchCities data", data);
        setCities(data);
      } catch (error) {
        setErrorMsg(" ❗️ there is a error in loading fetchCities data!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
    return () => {
      console.log("clean citiesprovider ");
    };
  }, []);

  // get special city
  async function getCity(id) {
    try {
      setErrorMsg("");
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const currentCity = await res.json();
      setCurrentCity(currentCity);
    } catch (error) {
      setErrorMsg(" ❗️ there is a error in loading getCity data!");
    } finally {
      setIsLoading(false);
    }
  }

  // create new city
  async function createCity(newCity) {
    try {
      setErrorMsg("");
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("==", data);
      setCities((pre) => [...pre, data]);
    } catch (error) {
      setErrorMsg(" ❗️ there is a error in creating new city!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, errorMsg, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// define custom hooks
function useCities() {
  const citiesContext = useContext(CitiesContext);
  return citiesContext;
}

export { CitiesProvider, useCities };
