const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const jobApplicationSchema = new Schema({
  firstName: {
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
  tel: {
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
  cv: [{ type: Schema.Types.ObjectId, ref: "cv", name : "cv"}],

});

const jobApp = mongoose.model("JobApp", jobApplicationSchema);

const validate = (data) => {
  const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().required().label("lastName"),
    birthDate: string().required().label("birthDate"),
    gender: string().required().label("gender"),
    country: string().required().label("country"),
    adresse: string().required().label("adresse"),
    jobPosition: string().required().label("jobPosition"),
    town: string().required().label("town"),
    zipCode: number().required().label("zipCode"),
    tel: number().required().label("tel"),
    yearsExperience: string().required().label("yearsExperience"),
    yourMotivations: string().required().label("yourMotivations"),
    cv: contentType().required().label("cv")
   
  });
  return schema.validate(data);
};

module.exports = { jobApp, validate };
