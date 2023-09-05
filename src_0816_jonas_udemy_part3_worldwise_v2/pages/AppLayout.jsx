import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { useEffect } from "react";

function AppLayout() {
  console.log("applayout");

  useEffect(() => {
    console.log("applayout useEffect");
  }, []);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
