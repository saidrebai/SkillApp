import React from "react";
import { useState } from "react";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddOffers = () => {
  const id = localStorage.getItem("id");
  const firstName = localStorage.getItem("firstName");

  const [data, setData] = useState({
    Name: "",
    type: "",
    time: "",
    description: "",
    skills: "",
    adresse: "",
    company_name: firstName,
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
      toast.success("Adding successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error("Adding failed!");
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
        <button type="submit" className="Ajoutt_offerr" onClick={toggleModel}>
          ajoute
        </button>
        {popup && (
          <div className="popup_contain" style={{ zIndex: "1" }}>
            <form className="add_offer_from" onSubmit={handleCreate}>
              <div className="over" onClick={toggleModel}></div>
              <div className="popup_cont">
                <h2>Enter your offers : </h2>

                <table className="table">
                  <table>
                    <tr>
                      <div className="input_container">
                        <td>
                          <label>Type : </label>
                        </td>
                        <td>
                          <select
                            className="inputt"
                            name="type"
                            onChange={handleChange}
                            value={data.type}
                            required
                          >
                            <option value="" disabled selected>
                              Type
                            </option>
                            <option value="Job">Job</option>
                            <option value="Internship">Internship</option>
                            <option value="Alternation">Alternation</option>
                          </select>
                        </td>
                      </div>
                    </tr>

                    <tr>
                      <div className="input_container">
                        <td>
                          <label>Time : </label>
                        </td>
                        <td>
                          <select
                            className="inputt"
                            name="time"
                            onChange={handleChange}
                            value={data.time}
                            required
                          >
                            <option value="" disabled selected>
                              Time
                            </option>
                            <option value="Full Time Job">Full Time Job</option>
                            <option value="Part Time Job">Part Time Job</option>
                          </select>
                        </td>
                      </div>
                    </tr>

                    <tr>
                      <div className="input_container">
                        <td>
                          <label>Name: </label>
                        </td>
                        <td>
                          <input
                            type="Text"
                            name="Name"
                            required
                            onChange={handleChange}
                            value={data.Name}
                            className="inputt"
                          />
                        </td>
                      </div>
                    </tr>
                  </table>

                  <table>
                    <tr>
                      <div className="input_container">
                        <td>
                          <label>Description: </label>
                        </td>
                        <td>
                          <input
                            type="Text"
                            name="description"
                            required
                            onChange={handleChange}
                            value={data.description}
                            className="inputt"
                          />
                        </td>
                      </div>
                    </tr>

                    <tr>
                      <div className="input_container">
                        <td>
                          <label> skills : </label>
                        </td>
                        <td>
                          <input
                            type="Text"
                            name="skills"
                            required
                            onChange={handleChange}
                            value={data.skills}
                            className="inputt"
                          />
                        </td>
                      </div>
                    </tr>

                    <tr>
                      <div className="input_container">
                        <td>
                          <label>adresse : </label>
                        </td>
                        <td>
                          <input
                            type="Text"
                            name="adresse"
                            required
                            onChange={handleChange}
                            value={data.adresse}
                            className="inputt"
                          />
                        </td>
                      </div>
                    </tr>
                  </table>
                </table>

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
                <ToastContainer />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AddOffers;
