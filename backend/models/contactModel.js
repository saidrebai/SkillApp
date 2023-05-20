const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const contactSchema = new mongoose.Schema({
  Name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    // required: true,
  },
  message: {
    type: String,
    // required: true,
  },
  score: {
    type: Number,
    // required: true,
  },
  offer: {
    type: String,
    // required: true,
  },
  adminEmail: {
    type: String,
    // required: true,
  },
});

const ContactModel = mongoose.model("contactModel", contactSchema);
module.exports = { ContactModel };
