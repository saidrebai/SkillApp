import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./styles.modules.css";
import "react-toastify/dist/ReactToastify.css";
const AccountAdmin = () => {
  const [Data, setData] = useState({});
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/adminRouters/getinfoAdmin/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    console.log("data is herrrrrrrrrre",Data);
  }, [Data]);

  const [updatedData, setUpdatedData] = useState({});

  function handleUpdate(event) {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/adminRouters/updateinfoAdmin/${id}`,
        updatedData
      )
      .then((response) => {
        // update the Data state with the updated data
        setData(response.data.data);
        toast.success("Updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update failed!");
      });
    console.log("yess", updatedData);
  }

  return (
    <>
      <div className="center-content">
        <div className="content-container">
          <div className="content-full">
            <img
              className="full"
              src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
              alt=""
            />
          </div>

          <h2>My Account</h2>

          <div className="form-container">
            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Name</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="text"
                  name="Name"
                  value={updatedData.Name || Data.Name}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      Name: e.target.value,
                    })
                  }
                  className="style-input"
                />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">country</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="text"
                  name="country"
                  value={updatedData.country || Data.country}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      country: e.target.value,
                    })
                  }
                  className="style-input"
                />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">town</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="text"
                  name="town"
                  value={updatedData.town || Data.town}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      town: e.target.value,
                    })
                  }
                  className="style-input"
                />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Adresse</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="text"
                  name="Adresse"
                  value={updatedData.adresse || Data.adresse}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      adresse: e.target.value,
                    })
                  }
                  className="style-input"
                />
              </div>
            </div>
          </div>

          <div className="form-input-container">
            <div className="title-input-style">
              <div className="containertext-input">
                <label className="title-style">Zipcode</label>
              </div>
            </div>
            <div className="input-style">
              <input
                type="Number"
                name="Zipcode"
                value={updatedData.Zipcode || Data.Zipcode}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    Zipcode: e.target.value,
                  })
                }
                className="style-input"
              />
            </div>
          </div>

          <div className="form-input-container">
            <div className="title-input-style">
              <div className="containertext-input">
                <label className="title-style">tel</label>
              </div>
            </div>
            <div className="input-style">
              <input
                type="Number"
                name="tel"
                value={updatedData.tel || Data.tel}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    tel: e.target.value,
                  })
                }
                className="style-input"
              />
            </div>
          </div>

          <div className="form-input-container">
            <div className="title-input-style">
              <div className="containertext-input">
                <label className="title-style">fiscalCode</label>
              </div>
            </div>
            <div className="input-style">
              <input
                type="Number"
                name="fiscalCode"
                value={updatedData.fiscalCode || Data.fiscalCode}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    fiscalCode: e.target.value,
                  })
                }
                className="style-input"
              />
            </div>
          </div>

          <div>
            <div className="btn-container">
              <button onClick={handleUpdate} className="style-button">
                Update
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountAdmin;