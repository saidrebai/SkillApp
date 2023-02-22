const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  adresse: {
    type: String,
    required: true,
  },
  jobPosition: {
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
  yearsExperience: {
    type: String,
    required: true,
  },
  yourMotivations: {
    type: String,
    required: true,
  },
  //   resume :{ type: , required: true },
});

const jobApp = mongoose.model("jobApp", jobApplicationSchema);

const validate = (data) => {
  const schema = object({
    userName: string().required().label("First Name"),
    lastName: string().lastName().required().label("lastName"),
    birthDate: string().required().label("birthDate"),
    gender: string().required().label("gender"),
    country: string().required().label("country"),
    adresse: string().required().label("adresse"),
    jobPosition: string().required().label("jobPosition"),
    town: string().required().label("town"),
    zipCode: number().required().label("zipCode"),
    yearsExperience: string().required().label("yearsExperience"),
    yourMotivations: string().required().label("yourMotivations"),
    //resume: .required().label("resume"),
  });
  return schema.validate(data);
};

module.exports = { jobApp, validate };
