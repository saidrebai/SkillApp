import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./styles.modules.css";
import { toast, ToastContainer } from "react-toastify";
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Login = () => {
  const user = localStorage.getItem("token");
  // const history = useHistory();

  const [type, setType] = useState("password");
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
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
          localStorage.setItem("firstName", res.name);
          window.location = "/dashboardA";
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
          window.location = "/";
        }

        // window.location = "/";
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500 
          // toast.error("Network error")
        ) {
          setError(error.response.data.message);
        }
        // toast.error("Network error")
      }
    } else {
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
  const handleForgotPassword = (event) => {
    event.preventDefault(); // Prevents the default navigation behavior

    // Check if the required fields are filled
    const isFormValidate = document
      .querySelector(".from_container")
      .checkValidity();

    if (isFormValidate) {
      window.location = "/ForgotPassword";
    } else {
      const requiredMessage = document.createElement("p");
      requiredMessage.textContent = "Please fill in the required fields of an administrator or a user.";
      requiredMessage.style.color = "red";

      const formContainer = document.querySelector(".from_container");
      formContainer.appendChild(requiredMessage);
    }
  };

  return (
    <>
      <div className="login_container">
        <ToastContainer/>
        <div className="login_from_container">
          <div className="left">
            <form className="from_container" onSubmit={handleSubmit}>
              <h1 className="login">Login to your account</h1>
              <div className="radio_group">
              <BusinessCenterOutlinedIcon />
                <label>
                  <input
                    type="radio"
                    className="radio_button"
                    name="option"
                    value="option1"
                    required
                    onClick={() => {
                      localStorage.setItem("myUser", "admin");
                    }}
                  />
                  Recruter
                </label>
                <PersonOutlinedIcon sx={{marginLeft : 2}}/>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="option2"
                    className="radio_button"
                    required
                    onClick={() => {
                      localStorage.setItem("myUser", "user");
                    }}
                  />
                  Candidat
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

              <div className="show-password">
                <input type="checkbox" onClick={handleToggle} />
                Show password
              </div>

              {error && <div className="error_msg">{error}</div>}

              <button type="submit" className="green_btn">
                Sign In
              </button>
              <div className="ForgotPass">
                <p>
                  Forgot Password
                  <NavLink onClick={handleForgotPassword}> Click Here</NavLink>
                </p>
              </div>
            </form>
          </div>
          <div className="right">
            <h1 className="login">Get started</h1>
            <div className="radio_group">
              <label>
                <BusinessCenterOutlinedIcon />
                <input className="radio_button" type="radio" name="opt" value="opt1" />
                Recruter
              </label>
              <label>
                <PersonOutlinedIcon sx={{marginLeft : 2}}/>
                <input className="radio_button" type="radio" name="opt" value="opt2" />
                Candidat
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
