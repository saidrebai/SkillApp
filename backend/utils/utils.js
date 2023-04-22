const { Admin } = require("../models/adminModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email_address",
    pass: "your_email_password",
  },
});

module.exports = function randomString(
  len = 10,
  charStr = "abcdefghijklmnopqrstuvwxyz0123456789"
) {
  const chars = [...`${charStr}`];
  return [...Array(len)]
    .map((i) => chars[(Math.random() * chars.length) | 0])
    .join("");
};

module.exports = function sendPasswordToEmployee(dataEmail, password) {
  // Envoi de l'e-mail de réinitialisation de mot de passe
  const mailOptions = {
    from: "rebaisaid6@gmail.com", // Votre adresse e-mail
    to: dataEmail, // Adresse e-mail de l'utilisateur
    subject: "Your new password",
    html: `<p>Your new password is ${password}</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = function checkDuplicateEmail(dataEmail, callback) {
  Admin.findOne({ email: dataEmail }, function (err, admin) {
    if (err) {
      console.error(err);
      if (typeof callback === "function") {
        callback(false);
      }
    } else if (admin) {
      if (typeof callback === "function") {
        callback(true); // email already in use
      }
    } else {
      if (typeof callback === "function") {
        callback(false); // email not in use
      }
    }
  });
  const mailOptions = {
    from: "rebaisaid6@gmail.com",
    to: dataEmail,
    subject: "Duplicate email address",
    html: "<p>Your email address has already been used. Please contact an administrator if you believe this is an error.</p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
