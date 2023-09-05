import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QuizProvider } from "./contexts/QuizContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
);
