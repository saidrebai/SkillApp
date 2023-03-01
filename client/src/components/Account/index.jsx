import React from "react";
import "./styles.modules.css";
const Account = () => {
  return (
    <>
      <div className="center-content">
        <div className="content-container">
          <div style={{backgroundColor:"white",borderRadius:"100%",marginBottom:"15px"}}>
            <img
              className="full" src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt=""/>
          </div>

          <label className="Account">My Account</label>

          <div className="form-container">

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">First Name</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"text"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Last Name</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"text"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Job</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"text"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Email</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"text"} name="text"  className="style-input"/>
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Password</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"password"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Tel</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"text"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Adresse</label>
                </div>
              </div>
              <div className="input-style">
                <input type={"text"} name="text" className="style-input" />
              </div>
            </div>

          </div>

          <div>
            <div className="btn-container">
              <button className="style-button">Update</button>
              <button className="style-button">register</button>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Account;
