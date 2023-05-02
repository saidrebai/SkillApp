import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/Menu/menu";
import Footer from "./components/Footer/index";
import ResponsiveApp from "./components/MenuSupAdmin/menu";



const root = ReactDOM.createRoot(document.getElementById("root"));
// const isAdmin = localStorage.getItem("isAdmin");
const isSuperAdmin = localStorage.getItem("isSuperAdmin");
// const token = localStorage.getItem("token");
// const isVisit = localStorage.getItem("isvisit");

root.render(
  <BrowserRouter>
    {isSuperAdmin && <ResponsiveApp />}
    {(window.location.pathname !== "/login" &&
      window.location.pathname !== "/signupAdmin" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/dashboardA" &&
      window.location.pathname !== "/getoffers" &&
      window.location.pathname !== "/AccountA") && <ResponsiveAppBar />}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {(window.location.pathname !== "/login" &&
      window.location.pathname !== "/signupAdmin" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/dashboardA" &&
      window.location.pathname !== "/getoffers" &&
      window.location.pathname !== "/AccountA") && <Footer />}
  </BrowserRouter>
);
