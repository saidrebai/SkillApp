import React from "react";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import SignupAdmin from "./components/signupAdmin";
import Login from "./components/login";
import Account from "./components/Account";
import AccountAdmin from "./components/AccountAdmin";
import Offers from "./components/Offers";
import Dashboard from "./components/superAdmin/dashboard";
import DashboardA from "./components/dashboardAdmin/DashboardA";
import SignInSuperAdmin from "./components/superAdmin/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Sidebar from "./components/dashboardAdmin/global/Sidebar";
import Topbar from "./components/dashboardAdmin/global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import GetOffer from "./components/dashboardAdmin/GetOffers";

function App() {
  const SuperAdmin = localStorage.getItem("isSuperAdmin");
  const user = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  // const ids = localStorage.getItem("ids");

  console.log("isssss", isAdmin);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (<>
  {isAdmin==="true" && window.location.pathname !== "/" && (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Routes>
      <Route path="/dashboardA" exact element={<DashboardA />} />
      <Route path="/getoffers" exact element={<GetOffer />} />
      {user &&<Route path="/AccountA" exact element={<AccountAdmin />} />}
      </Routes></main></div>
      </ThemeProvider>
    </ColorModeContext.Provider>)}
    <Routes>
      <Route path="/" exact element={<Main />} />
      {!user && <Route path="/signup" exact element={<Signup />} />}
      {!user && <Route path="/signupAdmin" exact element={<SignupAdmin />} />}
      {!user && <Route path="/login" exact element={<Login />} />}
      {user && isAdmin === "false" && (
        <Route path="/Account" exact element={<Account />} />
      )}
      {/* {!user && <Route path="/Account" exact element={<Login />} />}
      {user && isAdmin === "true" && (
        <Route path="/AccountA" exact element={<AccountAdmin />} />
      )} */}
      {!user && <Route path="/AccountA" exact element={<Login />} />}
      {(isAdmin === "false" || !isAdmin) && (
        <Route path="/offers" exact element={<Offers />} />
      )}
      <Route path="//" element={<Navigate replace to="/login" />} />
      {/* {isAdmin === "true" && (
        <Route path="/dashboardA" exact element={<DashboardA />} />
      )} */}
      {SuperAdmin === "true" && (
        <Route path="/dashboard" exact element={<Dashboard />} />
      )}
      {!user && (
        <Route path="/SignInSuperAdmin" exact element={<SignInSuperAdmin />} />
      )}
      <Route path="/ForgotPassword" exact element={<ForgotPassword />} />
      <Route path="/resetpassword" exact element={<ResetPassword />} />
    </Routes></>
  );
}

export default App;
