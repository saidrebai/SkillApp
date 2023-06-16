import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/Menu/menu";
import Footer from "./components/Footer/index";


  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    {((token && isAdmin === "false"||!token)) &&
    (window.location.pathname !== "/login" &&
      window.location.pathname !== "/signupAdmin" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/dashboardA" &&
      window.location.pathname !== "/getoffers" &&
      window.location.pathname !== "/application" &&
      window.location.pathname !== "/recrutments" &&
      window.location.pathname !== "/calendar" &&
      window.location.pathname !== "/ForgotPassword" &&
      window.location.pathname !== "/resetpassword" &&
      window.location.pathname !== "/Error" &&
      // (!token && window.location.pathname !== "/answerquiz" )&&
      // (!token && window.location.pathname !== "/candidacy" )&&
      // (!token && window.location.pathname !== "/Account" )&&
      window.location.pathname !== "/AccountA") && <ResponsiveAppBar />}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {((token && isAdmin === "false"||!token)) &&
     (window.location.pathname !== "/login" &&
      window.location.pathname !== "/signupAdmin" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/dashboardA" &&
      window.location.pathname !== "/getoffers" &&
      window.location.pathname !== "/application" &&
      window.location.pathname !== "/recrutments" &&
      window.location.pathname !== "/calendar" &&
      window.location.pathname !== "/ForgotPassword" &&
      window.location.pathname !== "/resetpassword" &&
      window.location.pathname !== "/Error" &&
      // (!token && window.location.pathname !== "/answerquiz" )&&
      // (!token && window.location.pathname !== "/candidacy" )&&
      // (!token && window.location.pathname !== "/Account" )&&
      window.location.pathname !== "/AccountA") && <Footer />}
  </BrowserRouter>
);
