import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/adminRouters/ResetPassword",
        { email }
      );
      setMessage(`Un e-mail a été envoyé à ${email}`);
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'e-mail");
    }
    console.log("helloooooo")
    window.location.href = "/resetpassword";
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>check your Email</h1>
          </div>
          <form>
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn_sub" onClick={handleResetClick}>
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
