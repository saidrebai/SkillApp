import React, { useState } from "react";
import axios from "axios";
import "./index.css";
// import { useHistory } from "react-router-dom";

function ForgotPassword() {
  // const [userType, setUserType] = useState(""); // par défaut, on suppose que c'est un candidat
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [IsAdmin, setIsAdmin] = useState("");

  const user = localStorage.getItem("token");

  const handleResetClick = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        const response = await axios.post(
          "http://localhost:8080/api/adminRouters/ResetPassword",
          { email }
        );
        // localStorage.getItem("isAdmin", IsAdmin);
        setIsAdmin(true);
        localStorage.setItem("id", response.data._id);
        localStorage.setItem("isAdmin", true);
        console.log(response.data);
      } else {
        const responsee = await axios.post(
          "http://localhost:8080/api/candidatRouters/ResetPassword",
          { email }
        );
        console.log(responsee.data);
        localStorage.setItem("id", responsee.data.userId);
        localStorage.setItem("isAdmin", false);
        setIsAdmin(false);
      }

      // const response = await axios.post(resetEndpoint, { email });
      setMessage(`Un e-mail a été envoyé à ${email}`);
      // console.log(response.data);
      window.location.href = "/resetpassword";
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'e-mail");
      console.error(error);
    }
  };

  // const handleResetClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (IsAdmin) {
  //       const response = await axios.post(
  //         "http://localhost:8080/api/adminRouters/ResetPassword",
  //         email
  //       );
  //       console.log(response.data);
  //       setIsAdmin(true);
  //       localStorage.setItem("isAdmin", true);
  //       setMessage(`Un e-mail a été envoyé à ${email}`);
  //     } else {
  //       const responsee = await axios.post(
  //         "http://localhost:8080/api/candidatRouters/ResetPassword",
  //         email
  //       );
  //       console.log(responsee.data);
  //       localStorage.setItem("isAdmin", false);
  //       setIsAdmin(false);
  //       setMessage(`Un e-mail a été envoyé à ${email}`);
  //     }
  //     window.location.href = "/resetpassword";
  //   } catch (error) {
  //     setMessage("Erreur lors de l'envoi de l'e-mail");
  //     console.error(error);
  //   }
  // };

  // function ForgotPassword() {
  //   // const history = useHistory();
  //   const user = localStorage.getItem("token");

  //   const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState("");
  //   const [IsAdmin, setIsAdmin] = useState("");

  //   const handleResetClick = async (e) => {
  //     e.preventDefault();
  //     try {
  //       if (!user) {
  //         const resetAdmin = await axios.post("http://localhost:8080/api/adminRouters/ResetPassword" ,
  //         email
  //         );
  //         setIsAdmin(true);
  //         localStorage.setItem("token", resetAdmin);
  //         // localStorage.getItem("isAdmin");
  //         console.log(resetAdmin.data);
  //         setMessage(`Un e-mail a été envoyé à ${email}`);
  //       } else {
  //         const resetUser = await axios.post("http://localhost:8080/api/candidatRouters/ResetPassword",
  //         email
  //         );
  //         console.log(resetUser.data);
  //         setMessage(`Un e-mail a été envoyé à ${email}`);
  //       }
  //       window.location.href = "/resetpassword";
  //     } catch (error) {
  //       setMessage("Erreur lors de l'envoi de l'e-mail");
  //       console.error(error);
  //     }

  //   };
  //   useEffect(() => {
  //     console.log("isadminn", IsAdmin);
  //   }, [IsAdmin]);

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Check your Email</h1>
          </div>
          <form onSubmit={handleResetClick}>
            {/* <div className="radio_group">
              <label>
                I'm :
                <input
                  type="radio"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Admin
                <input
                  type="radio"
                  name="userType"
                  value="candidat"
                  checked={userType === "candidat"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                User
              </label>
            </div> */}
            <br />
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn_sub">
              Reset
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
