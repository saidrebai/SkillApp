import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./styles.modules.css";
import "react-toastify/dist/ReactToastify.css";


const Account = () => {
  const [newData, setNewData] = useState({});
  const id = localStorage.getItem("id");
  const [updatedData, setUpdatedData] = useState({
    firstName: ""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/candidatRouters/getinfo/${id}`)
      .then((response) => {
        setNewData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  useEffect(() => {
    console.log("data is herrrrrrrrrre", newData);
  }, [newData]);



  function handleUpdate(event) {
    event.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/candidatRouters/Updateinfo/${id}`,
        updatedData
      )
      .then((response) => {
        // update the newData state with the updated data
        setNewData(updatedData);
        console.log("reeeeeeeeeeeeeeees", response);
        toast.success("Updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update failed!");
      });
    console.log("yess", updatedData);
  }
  useEffect(() => { newData ? setUpdatedData(newData) : setUpdatedData({ Name: "" }); console.log("Data---------------------", newData); }, [newData])
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
                  <label className="title-style">First_Name</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="text"
                  name="firstName"
                  value={updatedData.firstName}
                  onChange={(e) =>{
                    setUpdatedData({
                      ...updatedData,
                      firstName: e.target.value,
                    })}
                  }
                  className="style-input"
                />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Last_Name</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="text"
                  name="lastName"
                  value={updatedData.lastName}
                  onChange={(e) =>{
                    setUpdatedData({
                      ...updatedData,
                      lastName: e.target.value,
                    })}
                  }
                  className="style-input"
                />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Tel</label>
                </div>
              </div>
              <div className="input-style">
                <input
                  type="number"
                  name="Tel"
                  value={updatedData.tel}
                  onChange={(e) =>{
                    setUpdatedData({
                      ...updatedData,
                      tel: e.target.value,
                    })}
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
                  value={updatedData.adresse || newData.adresse}
                  onChange={(e) =>{
                    setUpdatedData({
                      ...updatedData,
                      adresse: e.target.value,
                    })}
                  }
                  className="style-input"
                />
              </div>
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

export default Account;
