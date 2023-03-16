import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.modules.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    adresse: "",
    email: "",
    password: "",
    town:"",
    birthDate: "",
    country: "",
    gender: "",
    zipCode:"",
    Establishment: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  useEffect(()=>{console.log("===>",data);},[data])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/candidatRouters/signup";
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
    <div className="signup_container">
      <div className="signup_from_container">
        <div className="left">
          <h1 className="titleButton"> welcome Back</h1>
          <Link to="/login">
            <button type="button" className="green_btn">
              sign In
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="firstName"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="lastName"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
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
              placeholder="tel"
              name="tel"
              onChange={handleChange}
              value={data.tel}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="birthDate"
              name="birthDate"
              onChange={handleChange}
              value={data.birthDate}
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
              placeholder="country"
              name="country"
              onChange={handleChange}
              value={data.country}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="gender"
              name="gender"
              onChange={handleChange}
              value={data.gender}
              required
              className="input"
            />
             <input
              type="text"
              placeholder="zipCode"
              name="zipCode"
              onChange={handleChange}
              value={data.zipCode}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Establishment"
              name="Establishment"
              onChange={handleChange}
              value={data.Establishment}
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
