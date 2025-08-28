import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

import { App } from "./router/App.tsx";

import "@/app/assets/styles/global.scss";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
