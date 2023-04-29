import React, { useState } from "react";
import "./index.css";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Envoyer le nouveau mot de passe à l'API pour enregistrer le nouveau mot de passe
    window.location.href = "/login";
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>check your new password in your Email</h1>
          </div>
          <h2> Réinitialiser le mot de passe </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password">Nouveau mot de passe:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn_sub" type="submit">
              Enregistrer
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
