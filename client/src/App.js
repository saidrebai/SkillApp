import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import SignupAdmin from "./components/signupAdmin";
import Login from "./components/login";
import Account from "./components/Account";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signupAdmin" exact element={<SignupAdmin />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/Account" exact element={<Account />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
