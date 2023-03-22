import React from "react";
import { useState } from "react";
import './index.css';

const AjouteOffers = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [popup, setPopup] = useState(false);

  const toggleModel = () => {
    setPopup(!popup);
    console.log("gggg", popup);
  };

  if (popup) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  return (
    <>
      <div className="ajoute_offer_container">
        <button type="submit" onClick={toggleModel}>
          ajoute
        </button>
        {popup && (
          <div className="popup_contain">
            <div className="over" onClick={toggleModel}></div>
            <div className="popup_cont">
              <h2>Enter your offers : </h2>
              <div className="input_container">
                <label>
                  type: 
                  <input type="Text" />
                  <br />
                </label>
              </div>
              <div className="input_container">
                <label>
                  time:
                  <input type="Text" />
                  <br />
                </label>
              </div>
              <div className="input_container">
                <label>
                  Name:
                  <input type="Text" />
                  <br />
                </label>
              </div>
              <div className="input_container">
                <label>
                  description:
                  <input type="Text" />
                  <br />
                </label>
              </div>
              <div className="input_container">
                <label>
                  skills :
                  <input type="Text" />
                  <br />
                </label>
              </div>
              <div className="input_container">
                <label>
                  adresse:
                  <input type="Text" />
                  <br />
                </label>
              </div>
              <div className="input_container">
                <label>
                  company_name:
                  <input type="Text" />
                  <br />
                </label>
              </div>

              <button
                className="cls_popup"
                type="button"
                onClick={toggleModel}
              >
                close
              </button>
              <button className="btn_submit" type="submit">send</button>
             
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AjouteOffers;
