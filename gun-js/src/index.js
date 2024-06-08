import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GunProvider } from "./context/GunContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GunProvider>
      <App />
    </GunProvider>
  </React.StrictMode>
);
reportWebVitals();
