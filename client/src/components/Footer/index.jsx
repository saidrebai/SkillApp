// import React from 'react';
import './index.css';

import React from 'react';
import {CDBLink, CDBModalFooter, CDBBtn, CDBIcon,CDBBox } from 'cdbreact';
import { Navigate } from 'react-router-dom';
import image from "../images/DALL·E 2023-05-16 00.46.57 - a statup logo with the letters S and K.png"


  const handleOffersClick = () => {
    window.location.href = "/offers";
  };
  const handleSkillsClick = () => {
    window.location.href = "/";
  };
  const handleLoginClick = () => {
    window.location.href = "/login";
  };
function Footer() {
  return (
    <footer>
       <CDBModalFooter className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox alignSelf="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt="logo" src={image} width="80px" />
              <h2 className="ms-3 h5 font-weight-bold">Skills</h2>
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
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Skills
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <p onClick={handleSkillsClick}>Home</p>
              <p onClick={handleSkillsClick}>About Us</p>
              <p onClick={handleSkillsClick}>Contact</p>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Products
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <p onClick={handleOffersClick}>Offers</p>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Help
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <p onClick={handleLoginClick}>Sign Up</p>
              <p onClick={handleLoginClick}>Sign In</p>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">&copy; Skills, 2023. All rights reserved.</small>
      </CDBBox>
    </CDBModalFooter>
    </footer>
  );
}

export default Footer;
