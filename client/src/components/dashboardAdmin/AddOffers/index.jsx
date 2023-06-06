import React from "react";
import { useState } from "react";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';

const AddOffers = () => {
  const id = localStorage.getItem("id");
  const firstName = localStorage.getItem("firstName");

  const [data, setData] = useState({
    name: "",
    type: "",
    time: "",
    description: "",
    skills: "",
    address: "",
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
      window.location.reload();
    } catch (error) {
      console.log("jeeeeeeeeee");
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500 &&
        console.log("gatagata")
      ) {
        setError(error.response.data.message);
        toast.error("Adding failed!");
        console.log("frfrfr");
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
      <ToastContainer />
        <AddIcon fontSize="large" type="submit" className="Ajoutt_offerr" onClick={toggleModel}>
          add
        </AddIcon>
        {popup && (
          <div className="popup_contain" style={{ zIndex: "1" }}>            
              <div className="over" onClick={toggleModel}></div>
              <div className="popup_cont">
                <form className="add_offer_from" onSubmit={handleCreate}>
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
                            name="name"
                            required
                            onChange={handleChange}
                            value={data.name}
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
                        <select
                            className="inputt"
                            name="skills"
                            required={true}
                            value={data.skills}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Skills
                            </option>
                            <option value="Linux">Linux</option>
                            <option value="Bash">Bash</option>
                            <option value="HTML">HTML</option>
                            <option value="Docker">Docker</option>
                            <option value="MySQL">MySQL</option>
                            <option value="PHP">PHP</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Kubernetes">Kubernetes</option>
                            <option value="Laravel">Laravel</option>
                            <option value="WordPress">WordPress</option>
                          </select>
                      </div>
                    </tr>

                    <tr>
                      <div className="input_container">
                        <td>
                          <label>address : </label>
                        </td>
                        <td>
                          <input
                            type="Text"
                            name="address"
                            required
                            onChange={handleChange}
                            value={data.address}
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
                  add
                </button>
                
                </form>
              </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default AddOffers;
