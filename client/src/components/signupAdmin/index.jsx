import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.modules.css";

const Signup = () => {
  const [data, setData] = useState({
    TypeOfUser: "",
    Name: "",
    country: "",
    town: "",
    adresse: "",
    Zipcode: "",
    tel: "",
    fiscalCode: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/adminRouters/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
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

  return (
    <div className="signup_admin_container">
      <div className="signup_admin_from_container">
        <div className="left-side-signup-admin">
          <h1 className="titleButton"> welcome Back</h1>
          <Link to="/login">
            <button type="button" className="green_btn">
              sign In
            </button>
          </Link>
        </div>
        <div className="right-signup-admmin">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div class="custom-select">
              <select className="container-select" name="TypeOfUser" onChange={handleChange} value={data.TypeOfUser} required>
                <option value="0" disabled selected>Type of user</option>
                <option value="1">Individuel</option>
                <option value="2">Société</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Name"
              name="Name"
              onChange={handleChange}
              value={data.Name}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="country"
              name="country"
              onChange={handleChange}
              value={data.country}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="town"
              name="town"
              onChange={handleChange}
              value={data.town}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="adresse"
              name="adresse"
              onChange={handleChange}
              value={data.adresse}
              required
              className="input"
            />
            <input
              type="number"
              placeholder="Zipcode"
              name="Zipcode"
              onChange={handleChange}
              value={data.Zipcode}
              required
              className="input"
            />
            <input
              type="number"
              placeholder="tel"
              name="tel"
              onChange={handleChange}
              value={data.tel}
              required
              className="input"
            />
            <input
              type="number"
              placeholder="fiscalCode"
              name="fiscalCode"
              onChange={handleChange}
              value={data.fiscalCode}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
