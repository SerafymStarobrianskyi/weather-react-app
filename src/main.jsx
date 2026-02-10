import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initializeTheme } from "./store/theme.js";
import "./styles/global.css";
import App from "./App.jsx";

initializeTheme();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
