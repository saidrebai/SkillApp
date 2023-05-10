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
  const [phoneNumber, setPhoneNumber] = useState("");
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
    axios
      .post("http://localhost:8080/api/contactRouter/sendMessageToAdmin", {
        Name: name,
        email,
        phoneNumber,
        message,
      })
      .then((response) => {
        console.log(response.data);
        //Afficher un message de confirmation
      })
      .catch((error) => {
        console.log(error);
        //Afficher un message d'erreur
      });
  };

  return (
    <>
      <div className="maiin_container">
        <div className="main_content">
          {/* <h1>SkillApp</h1> */}
          <div id="home">
            <h2>Home : </h2>
            <p>
              Welcome, <br /> We are delighted to welcome you on our website !{" "}
              <br />
              We hope you find all the information you need and that you will
              spend <br />a pleasant time browsing our site.
            </p>
            <img src={myImg} alt="" />
          </div>
          <div id="aboutus">
            <h2>About us : </h2>
            <img src={ImgAu} alt="" />
          </div>
          <div id="contact">
            <h2>Contact : </h2>
            <form className="Form_contact" onSubmit={handleSubmit}>
              <div>
                <div>
                  <label htmlFor="name" className="label_contact">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input_contact"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label_contact">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input_contact"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="label_contact">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="input_contact"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label_contact">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="input_contact"
                  />
                </div>
              </div>
              <button type="submit" className="btn_send">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
