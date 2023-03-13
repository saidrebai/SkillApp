import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import SignupAdmin from "./components/signupAdmin";
import Login from "./components/login";
import Account from "./components/Account";
import AccountAdmin from "./components/AccountAdmin";
import Offer from "./components/Offers";

function App() {
  const user = localStorage.getItem("token");
  const isAdmin = localStorage.getItem('isAdmin');
  console.log("isssss",isAdmin)

  return (
    <Routes>
      <Route path="/" exact element={<Main />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signupAdmin" exact element={<SignupAdmin />} />
      <Route path="/login" exact element={<Login />} />
      {user && <Route path="/Account" exact element={<Account />} />}
      {!user && <Route path="/Account" exact element={<Login />} />}
      {user && <Route path="/AccountA" exact element={<AccountAdmin />} />}
      {!user && <Route path="/AccountA" exact element={<Login />} />}
      <Route path="/offers" exact element={<Offer/>} />
      <Route path="//" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
