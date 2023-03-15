import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.modules.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if ( document.querySelector('input[name="option"]:checked').value ==="option1"){
        setIsAdmin(true)
        const { data: res } = await axios.post("http://localhost:8080/api/adminRouters/signin", data);
        localStorage.setItem("token", res.data);
        localStorage.setItem("id", res._id);
        localStorage.setItem("isAdmin", true);

      } else {
        const { data: res } = await axios.post("http://localhost:8080/api/candidatRouters/signin", data);
        setIsAdmin(false)
        localStorage.setItem("token", res.data);
      localStorage.setItem("id", res.userId);
      localStorage.setItem("isAdmin", false);

      }
  
      
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
useEffect(() => {
console.log("isadminn",isAdmin)
}, [isAdmin])

  return (
    <>
      <div className="login_container">
        <div className="login_from_container">
          <div className="left">
            <form className="from_container" onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <div className="radio_group">
              <label>
                <input type="radio" name="option" value="option1" />
                Admin
              </label>
              <br />
              <label>
                <input type="radio" name="option" value="option2" />
                User
              </label></div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="input"
              />
              {error && <div className="error_msg">{error}</div>}
              <button type="submit" className="green_btn">
                Sign In
              </button>
            </form>
          </div>
          <div className="right">
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className="white_btn">
                Sign Up
              </button>
            </Link>
            <br />
            <h1>Professional account : </h1>
            <Link to="/signupAdmin">
              <button type="button" className="white_btn">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
