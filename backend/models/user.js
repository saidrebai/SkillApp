const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  tel: {
    type: Number,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  Establishment: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "30m",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
