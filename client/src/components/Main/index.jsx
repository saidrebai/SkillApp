import React from "react";
import "./styles.modules.css";
import { useState, useEffect } from "react";
import axios from "axios";
import myImg from "../images/img.png";
import ImgAu from "../images/about-us-page-1.png";

const Main = () => {
  const [pageviews, setPageviews] = useState();
  const [visits, setVisits] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");



  function updateCounter() {
    const type =
      sessionStorage.getItem("visit") === null
        ? "type=visit-pageview"
        : "type=pageview";

    fetch("http://localhost:8080/api?" + type)
      .then((res) => res.json())
      .then((data) => {
        setPageviews(data.pageviews);
        setVisits(data.visits);
        sessionStorage.setItem("visit", data.visits);
        sessionStorage.setItem("pageviews", data.pageviews);
        console.log("data", data);
      });
  }

  useEffect(() => {
    updateCounter();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api?/send-message", {
      name,
      email,
      tel,
      message,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <>
      <div className="maiin_container">
        <div className="maiin_content">
          {/* <h1>SkillApp</h1> */}
          <div id="home">
           
            <h2>Home : </h2>
            
            
            <p>
              Welcome, <br/>  We are delighted to welcome you on our website ! <br/>
               We hope you find all the information you need and that you will spend <br/>
               a pleasant time browsing our site.
            </p>
           
           
              <img src={myImg} alt="" />
           
          </div>
          <div id="aboutus">
            <h2>About us : </h2>
            
              <img src={ImgAu} alt="" />
            
          </div>
          <div id="contact">
      <h2>Contact : </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Name : </label>
        <input
          type="text"
          id="nom"
          name="user_nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="tel">Phone number : </label>
        <input
          type="tel"
          id="tel"
          name="user_tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="message">Message : </label>
        <input
          type="text"
          id="message"
          name="user_message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <br />

        <button type="submit" className="btn_send">
          Send
        </button>
      </form>
    </div>

        </div>
      </div>
    </>
  );
};

export default Main;
