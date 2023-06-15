const nodemailer = require("nodemailer");
module.exports = function randomString(
  len = 16,
  charStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{};':\"\\|,.<>/?"
) {
  const chars = [...`${charStr}`];
  return [...Array(len)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USERNAME, // generated ethereal user

    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendEmail = (to, subject, text) => {
  transporter.sendEmail({
    from: process.env.MAIL_USERNAME, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  });
};

const checkDuplicateEmail = (error, callback) => {
  if (error.name === "MongoError" && error.code === 11000) {
    const field = error.message.split("index: ")[1].split(" ")[0];
    if (field === "email") {
      callback(true);
    } else {
      callback(false);
    }
  } else {
    callback(false);
  }
};
