import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

import "./index.css";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  console.log("path", location.pathname);

  useEffect(() => {
    console.log("App useEffect");
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        console.log("data", data);
        setCities(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();

    return () => {
      console.log("clean App ");
    };
  }, [location]);
  return (
    <Routes>
      <Route index element={<Homepage />} />
      {/* <Route index element={<Homepage />} /> == 
      <Route path="/" element={<Homepage />} /> */}
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Navigate replace to="cities" />} />
        <Route
          path="cities"
          element={<CityList cities={cities} isLoading={isLoading} />}
        />
        <Route
          path="cities/:id"
          element={<City cities={cities} isLoading={isLoading} />}
        />
        <Route
          path="countries"
          element={<CountryList cities={cities} isLoading={isLoading} />}
        />
        <Route path="form" element={<Form />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
