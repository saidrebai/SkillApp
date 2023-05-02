// import React, { useState } from "react";
// import axios from "axios";
// import "./index.css";

// function ForgotPassword() {

// const [admin, setAdmin] = useState({ email: "" });
// const [message, setMessage] = useState("");

// const handleResetClick = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/adminRouters/ResetPassword",
//       { email: admin.email }
//     );
//     setMessage(`Un e-mail a été envoyé à ${admin.email}`);
//     console.log(response.data);
//     window.location.href = "/resetpassword";
//   } catch (error) {
//     setMessage("Erreur lors de l'envoi de l'e-mail");
//     console.error(error);
//   }
// };

//   return (
//     <>
//       <section>
//         <div className="form_data">
//           <div className="form_heading">
//             <h1>check your Email</h1>
//           </div>
//           <form onSubmit={handleResetClick}>
//             <label>Email :</label>
//             <input
//               type="email"
//               value={admin.email}
//               onChange={(e) => setAdmin({ email: e.target.value })}
//             />
//             <button type="submit"className="btn_sub" >
//               Reset
//             </button>
//             {message && <p>{message}</p>}
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default ForgotPassword;

import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function ForgotPassword() {
  const [userType, setUserType] = useState(""); // par défaut, on suppose que c'est un candidat
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetClick = async (e) => {
    e.preventDefault();
    try {
      let resetEndpoint;
      if (userType === "admin") {
        resetEndpoint = "http://localhost:8080/api/adminRouters/ResetPassword";
      } else {
        resetEndpoint =
          "http://localhost:8080/api/candidatRouters/ResetPassword";
      }
      const response = await axios.post(resetEndpoint, { email });
      setMessage(`Un e-mail a été envoyé à ${email}`);
      console.log(response.data);
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
            <div className="radio_group">
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
            </div>
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
