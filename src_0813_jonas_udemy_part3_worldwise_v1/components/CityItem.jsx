import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

function CityItem({ city }) {
  console.log("city", city);
  const {
    id,
    cityName,
    date,
    emoji,
    position: { lat, lng },
  } = city;
  console.log(city);
  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
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
