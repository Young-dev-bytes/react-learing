import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App-Test-v1-useKey";
// import App from "./App-Test-v1-useLocalStorageState";
// import MyComponent from "./Test.jsx";
// import "./index.css";

// const Test = () => {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating maxRating={10} color="blue" setMovieRating={setMovieRating} />
//       <p>this movie was rated {movieRating} stars</p>
//     </div>
//   );
// };

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <StarRating maxRating={10} />
    <StarRating maxRating={20} size={24} color="red" defaultRating={2} />
    <StarRating messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
    <StarRating /> */}
    <App />
  </BrowserRouter>
);
