import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useEffect } from "react";

function Logo() {
  console.log("logo");
  useEffect(() => {
    console.log("logo useEffect");
  }, []);
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
