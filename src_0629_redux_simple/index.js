import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";

ReactDOM.render(
  <BrowserRouter>
    {" "}
    <App />{" "}
  </BrowserRouter>,
  document.getElementById("root")
);

store.subscribe(() => {
  ReactDOM.render(
    <BrowserRouter>
      {" "}
      <App />{" "}
    </BrowserRouter>,
    document.getElementById("root")
  );
});
