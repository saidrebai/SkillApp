import React from "react";
import "./styles.modules.css";
import { useState, useEffect } from "react";
import axios from "axios";
import myImg from "../images/img.png";
import ImgAu from "../images/about-us-page-1.png";
import logogmail from "../images/logogmail.png";
import logoPhone from "../images/logoPhone.jpg";

const Main = () => {
  const [pageviews, setPageviews] = useState();
  const [visits, setVisits] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(false);
  // const [text, setText] = useState("");
  const text =
    "Our web application is dedicated to the design and production of high quality professional application files. We understand the crucial importance of a well-presented application file in attracting the attention of recruiters and increasing the chances of success when looking for a job.";

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
          <div id="home">
            <h1 className="h1_main">HOME : </h1>
            <p>
              Welcome, <br /> We are delighted to welcome you on our website !{" "}
              <br />
              We hope you find all the information you need and that you will
              spend <br />a pleasant time browsing our site.
            </p>
            <img src={myImg} alt="" class="logo" />
          </div>
          <div id="aboutus">
            <h1 className="h1_main">ABOUT US : </h1>

            <img src={ImgAu} alt="" class="image_overlay" />

            <h6 class="text-overlay">
              {showMore ? text : `${text.substring(0, 250)}`}
              <button
                className="btn_more"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </h6>
          </div>
          <div id="contact">
            <h1 className="h1_main">CONTACT : </h1>
            <form className="Form_contact" onSubmit={handleSubmit}>
              <div className="left_for_contact">
                <table>
                  {/* <label htmlFor="name" className="label_contact">
                    Name:
                  </label> */}
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input_contact"
                    placeholder="Name"
                  />

                  {/* <label htmlFor="email" className="label_contact">
                    Email:
                  </label> */}
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input_contact"
                    placeholder="Business email"
                  />

                  {/* <label htmlFor="phoneNumber" className="label_contact">
                    Phone Number:
                  </label> */}
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="input_contact"
                    placeholder="Phone Number"
                  />

                  {/* <label htmlFor="message" className="label_contact">
                    Message:
                  </label> */}
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="input_contact"
                    placeholder="Message"
                    cols="23"
                    rows="10"
                  />
                  <button type="submit" className="btn_send">
                    Send Message
                  </button>
                </table>
              </div>
              <div>
                <table>
                  <img src={logogmail} alt="" class="logo_gmail" />
                  <div>
                    <p class="ova_text">
                      <a href="mailto:info@arsela.co"> info@arsela.co</a>
                    </p>
                  </div>
                  <div>
                    <img src={logoPhone} alt="" class="logo_Phone" />
                    <p class="ova_text">
                      <a href="tel:53107042"> (+216) 53 107 042</a>
                    </p>
                  </div>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
