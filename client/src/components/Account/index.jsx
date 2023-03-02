import React, { useState } from "react";
import axios from "axios";
import "./styles.modules.css";

const Account = () => {
  const url = "localhost:8080/api/adminRouters/signin"
  const [data, setData] = useState({
    First_Name:"",
    Last_Name:"",
    Job:"",
    Email:"",
    Password:"",
    Tel:"",
    Adresse:""
  })
  .then(res=>{
    console.log(res.data)
  })

  function Update(e){
     e.preventDefault()
     axios.post(url,{
      First_Name: data.First_Name,
      Last_Name:data.Last_Name,
      Job:data.Job,
      Email:data.Email,
      Password:data.Password,
      Tel:data.Tel,
      Adresse:data.Adresse
     })
  }
  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)

  }

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
                  <label className="title-style">First_Name</label>
                </div>
              </div>
              <div className="input-style">
                <input onchange={(e) => handle(e)} id ="firstName" value={data.First_Name} type={"text"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Last_Name</label>
                </div>
              </div>
              <div className="input-style">
                <input onchange={(e) => handle(e)} id ="lastName" value={data.Last_Name} type={"text"} name="text" className="style-input" />
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
                <input onchange={(e) => handle(e)} id ="Email" value={data.Email} type={"text"} name="text"  className="style-input"/>
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Password</label>
                </div>
              </div>
              <div className="input-style">
                <input onchange={(e) => handle(e)} id ="Password" value={data.Password} type={"password"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Tel</label>
                </div>
              </div>
              <div className="input-style">
                <input onchange={(e) => handle(e)} id ="Tel" value={data.Tel} type={"text"} name="text" className="style-input" />
              </div>
            </div>

            <div className="form-input-container">
              <div className="title-input-style">
                <div className="containertext-input">
                  <label className="title-style">Adresse</label>
                </div>
              </div>
              <div className="input-style">
                <input onchange={(e) => handle(e)} id ="Adresse" value={data.Adresse} type={"text"} name="text" className="style-input" />
              </div>
            </div>

          </div>

          <div>
            <div className="btn-container">
              <button onTimeUpdate={(e)=> Update(e)} className="style-button">Update</button>
              <button className="style-button">register</button>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Account;
