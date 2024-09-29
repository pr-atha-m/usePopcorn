import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import AppV1 from "./AppV1";
import reportWebVitals from "./reportWebVitals";
import Stars from "./Stars";

function MovieRating() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <Stars color="blue" setMovieRating={setMovieRating} />
      <p>This movie is rated {movieRating} stars</p>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Stars maxStars={10} />
    <Stars
      maxStars={5}
      messages={["Very bad", "Bad", "Okay", "Good", "Amazing"]}
    />
    <Stars color="Purple" />
    <MovieRating /> */}
    <AppV1 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
