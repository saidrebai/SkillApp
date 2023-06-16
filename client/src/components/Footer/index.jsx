// import React from 'react';
import "./index.css";

import React from "react";
import { CDBLink, CDBModalFooter, CDBBtn, CDBIcon, CDBBox } from "cdbreact";
import { Navigate } from "react-router-dom";
import image from "../images/DALL·E 2023-05-16 00.46.57 - a statup logo with the letters S and K.png";

const handleOffersClick = () => {
  window.location.href = "/offers";
};
const handleLoginClick = () => {
  window.location.href = "/login";
};
const handleHomeClick = () => {
  window.location.href = "/";
  const homeSection = document.getElementById("home");
  homeSection.scrollIntoView({ behavior: "smooth" });
};
const handleAboutusClick = () => {
  const aboutusSection = document.getElementById("aboutus");
  aboutusSection.scrollIntoView({ behavior: "smooth" });
};
const handleContactClick = () => {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
};
const token = localStorage.getItem("token");

function Footer() {
  return (
    <footer>
      <CDBModalFooter className="shadow">
        <CDBBox
          display="flex"
          flex="column"
          className="mx-auto py-5"
          style={{ width: "90%" }}
        >
          <CDBBox display="flex" justifyContent="between" className="flex-wrap">
            <CDBBox alignSelf="center">
              <a href="/" className="d-flex align-items-center p-0 text-dark">
                <img alt="logo" src={image} width="80px" />
                {/* <h2 className="ms-3 h5 font-weight-bold">Skills</h2> */}
              </a>
              <CDBBox className="mt-5" display="flex">
                <CDBBtn flat color="dark" className="p-2">
                  <CDBIcon fab icon="facebook-f" />
                </CDBBtn>
                <CDBBtn flat color="dark" className="mx-3 p-2">
                  <CDBIcon fab icon="twitter" />
                </CDBBtn>
                <CDBBtn flat color="dark" className="p-2">
                  <CDBIcon fab icon="instagram" />
                </CDBBtn>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: "600" }}>
                Skills
              </p>
              <CDBBox
                display="flex"
                flex="column"
                style={{ cursor: "pointer" }}
              >
                <p key="Home" onClick={handleHomeClick} href="#home">
                  Home
                </p>
                <p key="Aboutus" onClick={handleAboutusClick} href="#About_us">
                  About Us
                </p>
                <p key="Contact" onClick={handleContactClick} href="#Contact">
                  Contact
                </p>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: "600" }}>
                Products
              </p>
              <CDBBox
                display="flex"
                flex="column"
                style={{ cursor: "pointer" }}
              >
                <p onClick={handleOffersClick}>Offers</p>
              </CDBBox>
            </CDBBox>
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: "600" }}>
                Help
              </p>
              <CDBBox
                display="flex"
                flex="column"
                style={{ cursor: "pointer" }}
              >
                {!token && <p onClick={handleLoginClick}>Sign Up</p>}
                {!token && <p onClick={handleLoginClick}>Sign In</p>}
              </CDBBox>
            </CDBBox>
          </CDBBox>
          <small className="text-center mt-5">
            &copy; Skills, 2023. All rights reserved.
          </small>
        </CDBBox>
      </CDBModalFooter>
    </footer>
  );
}

export default Footer;
