import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useEffect } from "react";

function AppNav() {
  console.log("appnav");
  useEffect(() => {
    console.log("appnav useEffect");
  }, []);
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
