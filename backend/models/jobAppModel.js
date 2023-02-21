const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const jobApplicationSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  adresse: { type: String, required: true },
  jobPosition: { type: String, required: true },
  town: { type: String, required: true },
  zipCode: { type: Number, required: true },
  yearsExperience: { type: String, required: true },
  yourMotivations: { type: String, required: true },
  //   resume :{ type: , required: true },
});
