import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const {
    id,
    cityName,
    date,
    emoji,
    position: { lat, lng },
  } = city;
  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(id);
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={(e) => handleClick(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default CityItem;
