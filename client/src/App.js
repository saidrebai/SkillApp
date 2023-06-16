import React from "react";
import { useState,useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import SignupAdmin from "./components/signupAdmin";
import Login from "./components/login";
import Account from "./components/Account";
import AccountAdmin from "./components/AccountAdmin";
import Offers from "./components/Offers";
import DashboardA from "./components/dashboardAdmin/DashboardA";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Sidebar from "./components/dashboardAdmin/global/Sidebar";
import Topbar from "./components/dashboardAdmin/global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Offer from "./components/dashboardAdmin/Offer";
import Quiz from "./components/Quiz/";
import Applications from "./components/dashboardAdmin/Applications";
import Calendar from "./components/dashboardAdmin/Calendar";
import Candidacy from "./components/Candidacy";
import Recrutments from "./components/dashboardAdmin/Recrutments";
import checkTokenExpiration from "./VerifyTokenExpiration";
import Error from "./components/Error";


function App() {

  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  console.log("isssss", isAdmin);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (<>
  {isAdmin==="true" && window.location.pathname !== "/" && window.location.pathname !== "/resetpassword"  && window.location.pathname !== "/ForgotPassword"
  && window.location.pathname !== "/login" && window.location.pathname !== "/signup" && window.location.pathname !== "/signupAdmin" &&
  window.location.pathname !== "/Account" && window.location.pathname !== "/candidacy" && window.location.pathname !== "/offers" &&
  window.location.pathname !== "/answerquiz" && window.location.pathname !== "/Error" &&
  (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      <Routes>
      <Route path="/dashboardA" exact element={<DashboardA />} />
      <Route path="/getoffers" exact element={<Offer />} />
      <Route path="/application" exact element={<Applications />} />
      <Route path="/recrutments" exact element={<Recrutments />} />
      <Route path="/calendar" exact element={<Calendar />} />
      <Route path="/AccountA" exact element={<AccountAdmin />} />
      </Routes></main></div>
      </ThemeProvider>
    </ColorModeContext.Provider>)}
    <Routes>
      {(isAdmin === "false" || !token) &&<Route path="/" exact element={<Main />} />}
      {!token && <Route path="/signup" exact element={<Signup />} />}
      {!token && <Route path="/signupAdmin" exact element={<SignupAdmin />} />}
      {!token && <Route path="/login" exact element={<Login />} />}
      {!token && <Route path="/AccountA" exact element={<Login />} />}
      {!token && <Route path="/Account" exact element={<Login />} />}
      {!token && <Route path="/ForgotPassword" exact element={<ForgotPassword />} />}
      {!token &&<Route path="/resetpassword" exact element={<ResetPassword />} />}
      {token && isAdmin === "false" && (
        <Route path="/Account" exact element={<Account />} />
      )}
      {token && isAdmin === "false" && (
        <Route path="/candidacy" exact element={<Candidacy />} />
      )}
     
      {(isAdmin === "false" || !isAdmin) && (
        <Route path="/offers" exact element={<Offers />} />
      )}
      <Route path="//" element={<Navigate replace to="/login" />} />  
      {isAdmin === "false"&& <Route path="/answerquiz" exact element={<Quiz />} />}

      <Route path="/Error" exact element={<Error />} />
      <Route path="/offers" exact element={<Error />} />
      <Route path="/signup" exact element={<Error />} />
      <Route path="/signupAdmin" exact element={<Error />} />
      <Route path="/login" exact element={<Error />} />
      <Route path="/candidacy" exact element={<Error />} />
      <Route path="/answerquiz" exact element={<Error />} />
      {(!token || isAdmin === "false") && (<Route path="/dashboardA" exact element={<Error />} />)}
      {(!token || isAdmin === "false") && (<Route path="/getoffers" exact element={<Error />} />)}
      {(!token || isAdmin === "false" )&& (<Route path="/application" exact element={<Error />} />)}
      {(!token || isAdmin === "false" )&& (<Route path="/recrutments" exact element={<Error />} />)}
      {(!token || isAdmin === "false" )&& (<Route path="/calendar" exact element={<Error />} />)}
      {(!token || isAdmin === "false") && (<Route path="/AccountA" exact element={<Error />} />)}
      {isAdmin ==="true" && <Route path="/Account" exact element={<Error />} />}
      {/* {token && <Route path="/ForgotPassword" exact element={<Error />} />}
      {token && <Route path="/resetpassword" exact element={<Error />} />} */}
    
    </Routes></>
  );
}

export default App;
