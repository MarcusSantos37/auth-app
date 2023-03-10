import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import GlobalContext from "./contexts";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./pages/Routes";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <Routes />
    </GlobalContext>
    <ToastContainer />
  </React.StrictMode>
);
