import React from "react";
import "./styles.modules.css";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import myImg from "../images/Capture.PNG";
import ImgAu from "../images/about-us-page-1.png";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Main = () => {
  const token = localStorage.getItem("token");

  const [pageviews, setPageviews] = useState();
  const [visits, setVisits] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(false);
  // const [text, setText] = useState("");
  const text =
    "Welcome to our cutting-edge web application," +
    "where recruiters and candidates meet effortlessly. Our platform simplifies the recruitment process,"+
    " connecting recruiters with top talent and helping candidates discover exciting job opportunities."+
    " With streamlined job listings, easy application management, and objective assessment tools,"+
    " our application transforms the way hiring happens. Join us today and experience the future of recruitment.";

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
        name: name,
        email,
        phoneNumber,
        message,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Email sent successfully");
        //Afficher un message de confirmation
      })
      .catch((error) => {
        console.log(error);
        toast.error("Network error!");
        //Afficher un message d'erreur
      });
  };
  const handleLoginClick = () => {
    window.location.href = "/login";
  };
  const generateMaxLetters = () => {
    if (message.length > 200) {
      setMessage(message.slice(0, 200));
    }
  };

  return (
    <>
      <div className="maiin_container">
        <div className="main_content">
          <div id="home">
            <div className="home-left">
              <h1 className="h1_main">HOME : </h1>
              <p>
                Discover limitless possibilities at SkillsApp !  <br /> 
                Connect, grow, and succeed in our thriving online community. Whether you're a professional, a talent, or just curious, <br /> 
                we've got you covered. Join us now and unlock your potential!

              </p>
              {!token &&<button
                type="button"
                className="sign_up_button"
                onClick={handleLoginClick}
              >
                SIGN UP
              </button>}
            </div>
            <div className="home-right">
              <img src={myImg} alt="" class="logo" />
            </div>
          </div>
          <div id="aboutus">
            <div className="aboutus-left">
              <h1 className="h1_main">ABOUT US : </h1>

              <img src={ImgAu} alt="" class="image_overlay" />
            </div>
            <div className="aboutus-right">
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
          </div>
          <div id="contact">
            <div className="contact-right">
              <h1 className="h1_main">Contact Us: </h1>
              <form className="Form_contact" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input_contact"
                  placeholder="Name"
                />

                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input_contact"
                  placeholder="Business email"
                />

                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={8}
                  pattern="\d{8}"
                  required
                  className="input_contact"
                  placeholder="Phone Number"
                />
                <textarea
                  type="text"
                  id="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    generateMaxLetters();
                  }}
                  required
                  className="input_message"
                  placeholder="Message...."
                ></textarea>
                <button type="submit" className="btn_send">
                  Send Message
                </button>
                {/* </div> */}
              </form>
            </div>
            <div className="contact_left">
              <div className="contact-info">
                <div className="infoo">
                  <div className="icon_container">
                    <EmailIcon sx={{ marginRight: 2 }} />
                  </div>{" "}
                  <p class="ova_text">
                    <a href="mailto:info@arsela.co">info@arsela.co</a>
                  </p>
                </div>
                <div className="infoo">
                  <div className="icon_container">
                    <PhoneIcon sx={{ marginRight: 2 }} />
                  </div>
                  <p class="ova_text">
                    <a href="tel:53107042"> (+216) 53 107 042</a>
                  </p>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
