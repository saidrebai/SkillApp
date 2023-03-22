import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import SignupAdmin from "./components/signupAdmin";
import Login from "./components/login";
import Account from "./components/Account";
import AccountAdmin from "./components/AccountAdmin";
import Offer from "./components/Offers";
import Dashboard from "./components/superAdmin/dashboard";
import Offers from "./components/dashboardAdmin/offer";
import AjouteOffers from"./components/dashboardAdmin/AjouteOffers";

function App() {
  const user = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");
  console.log("isssss", isAdmin);

  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signupAdmin" exact element={<SignupAdmin />} />
      {!user && <Route path="/login" exact element={<Login />} />}
      {user && <Route path="/Account" exact element={<Account />} />}
      {!user && <Route path="/Account" exact element={<Login />} />}
      {user && <Route path="/AccountA" exact element={<AccountAdmin />} />}
      {!user && <Route path="/AccountA" exact element={<Login />} />}
      {(isAdmin === "false" || !isAdmin)  &&<Route path="/offers" exact element={<Offer />} />}
      <Route path="//" element={<Navigate replace to="/login" />} />
      {isAdmin === "true" && <Route path="/dashboard" exact element={<Dashboard />} />}
      <Route path="/dashboardAdmin" exact element={<Offers />} />
      <Route path="/AjouteOffers" exact element={<AjouteOffers />} />
    </Routes>
  );
}

export default App;
