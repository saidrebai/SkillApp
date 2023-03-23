import React from "react";
import { useState } from "react";
import "./index.css";
import axios from "axios";

const AddOffers = () => {
  const id = localStorage.getItem("id");
  const [data, setData] = useState({
    Name: "",
    type: "",
    time: "",
    description: "",
    skills: "",
    adresse: "",
    company_name: "",
    admin: id,
  });
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");

  const toggleModel = () => {
    setPopup(!popup);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/offerRouter/offers";
      const { data: res } = await axios.post(url, data);
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
            <form className="add_offer_from" onSubmit={handleCreate}>
              <div className="over" onClick={toggleModel}></div>
              <div className="popup_cont">
                <h2>Enter your offers : </h2>
                <div className="input_container">
                  <label>
                    type:
                    <input
                      type="Text"
                      name="type"
                      onChange={handleChange}
                      value={data.type}
                    />
                    <br />
                  </label>
                </div>
                <div className="input_container">
                  <label>
                    time:
                    <input
                      type="Text"
                      name="time"
                      onChange={handleChange}
                      value={data.time}
                    />
                    <br />
                  </label>
                </div>
                <div className="input_container">
                  <label>
                    Name:
                    <input
                      type="Text"
                      name="Name"
                      onChange={handleChange}
                      value={data.Name}
                    />
                    <br />
                  </label>
                </div>
                <div className="input_container">
                  <label>
                    description:
                    <input
                      type="Text"
                      name="description"
                      onChange={handleChange}
                      value={data.description}
                    />
                    <br />
                  </label>
                </div>
                <div className="input_container">
                  <label>
                    skills :
                    <input
                      type="Text"
                      name="skills"
                      onChange={handleChange}
                      value={data.skills}
                    />
                    <br />
                  </label>
                </div>
                <div className="input_container">
                  <label>
                    adresse:
                    <input
                      type="Text"
                      name="adresse"
                      onChange={handleChange}
                      value={data.adresse}
                    />
                    <br />
                  </label>
                </div>
                <div className="input_container">
                  <label>
                    company_name:
                    <input
                      type="Text"
                      name="company_name"
                      onChange={handleChange}
                      value={data.company_name}
                    />
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
                {error && <div className="error_msg">{error}</div>}
                <button className="btn_submit" type="submit">
                  send
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AddOffers;
