import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import "./styles.modules.css";

const Login = () => {

  const user = localStorage.getItem("token");

  const [type, setType] = useState("password");
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user){
    try {
      if (
        document.querySelector('input[name="option"]:checked').value ===
        "option1"
      ) {
        const { data: res } = await axios.post(
          "http://localhost:8080/api/adminRouters/signin",
          data
        );
        setIsAdmin(true);
        localStorage.setItem("token", res.data);
        localStorage.setItem("id", res._id);
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("firstName", res.Name);
      } else {
        const { data: res } = await axios.post(
          "http://localhost:8080/api/candidatRouters/signin",
          data
        );
        setIsAdmin(false);
        localStorage.setItem("token", res.data);
        localStorage.setItem("id", res.userId);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("firstName", res.firstName);
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
    }}else{
      alert("you are already connected");
    }
  };
  useEffect(() => {
    console.log("isadminn", isAdmin);
  }, [isAdmin]);

  const handleClick = async () => {
    const selectedOption = document.querySelector(
      'input[name="opt"]:checked'
    ).value;
    try {
      if (selectedOption === "opt1") {
        window.location = "/signupAdmin";
      } else {
        window.location = "/signup";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

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

                <label>
                  <input type="radio" name="option" value="option2" />
                  User
                </label>
              </div>
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
                type={type}
                // type='password'
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="input"
              />

              <div className=" afficher">
                <input type="checkbox" onClick={handleToggle} />
                show password
              </div>

              {error && <div className="error_msg">{error}</div>}

              <button type="submit" className="green_btn">
                Sign In
              </button>
            </form>
          </div>
          <div className="right">
            <h1>New here ?</h1>
            <div className="radio_grp">
              <label>
                <input type="radio" name="opt" value="opt1" />
                Admin
              </label>
              <label>
                <input type="radio" name="opt" value="opt2" />
                User
              </label>
            </div>
            <div>
              <button
                onClick={handleClick}
                type="button"
                className="whitee_btn"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
