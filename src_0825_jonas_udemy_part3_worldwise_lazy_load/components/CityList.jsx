import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";

function CityList() {
  const { cities, isLoading, isFetchCities, errorMsg } = useCities();
  console.log("list cities", cities);
  console.log("isLoading", isLoading);

  useEffect(() => {
    console.log("citylist useEffect");
  }, []);

  if (isLoading || !isFetchCities) return <Spinner />;

  if (errorMsg) return <Message message={errorMsg} />;

  if (!cities.length && isFetchCities)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}

export default CityList;
