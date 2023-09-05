import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Home() {
  console.log("render home");
  useEffect(() => {
    console.log("Home useEffect");
    return () => {
      console.log("clean Home");
    };
  }, []);

  return (
    <div>
      <PageNav />
      <AppNav />

      <h1 className="test">worldwise</h1>
      <Link to="/app">go to app</Link>
    </div>
  );
}

export default Home;
