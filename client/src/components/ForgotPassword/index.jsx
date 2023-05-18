import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const MyUseer = localStorage.getItem("myUser");

  const handleResetClick = async (e) => {
    e.preventDefault();
    try {
      if (MyUseer === "admin") {
        const response = await axios.post(
          "http://localhost:8080/api/adminRouters/ResetPassword",
          { email }
        );
        console.log(response.data);
      } else {
        const responsee = await axios.post(
          "http://localhost:8080/api/candidatRouters/resetPassword",
          { email }
        );
        console.log(responsee.data.email);
      }
      setMessage(`Un e-mail a été envoyé à ${email}`);
      window.location.href = "/resetpassword";
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'e-mail");
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Check your Email</h1>
          </div>
          <form onSubmit={handleResetClick}>
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
