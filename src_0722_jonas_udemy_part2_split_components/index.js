import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";

// import App from "./App";
// import "./index.css";
import StarRating from "./starRating";

const Test = ({ defaultRating = 0 }) => {
  const [movieRating, setMovieRating] = useState(0);
  // const handleMovieRating = (movieRateValue) => {
  //   return setMovieRating(movieRateValue);
  // };
  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        onHandleMovieRating={(movieRateValue) => setMovieRating(movieRateValue)}
      />
      <p>This movie was rated {movieRating} Stars </p>
    </div>
  );
};
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StarRating
      maxRating={5}
      messages={["terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={10} className="test" defaultRating={5} />
    <StarRating maxRating={10} color="red" size={30} />
    <Test />
  </BrowserRouter>
);
