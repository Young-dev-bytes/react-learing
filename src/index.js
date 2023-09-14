import { createRoot } from "react-dom/client";

import App from "./App-v4";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
