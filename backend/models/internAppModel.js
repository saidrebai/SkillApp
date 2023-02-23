const mongoose = require("mongoose");

const internApplicationSchema = new mongoose.Schema({
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
  Establishment: {
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
  level: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  motivation: {
    type: String,
  },
 /* resume: {
    type: file,
    required: true,
  },*/
});

const internModel = mongoose.model("internApp", internApplicationSchema);

const validate = (data) => {
  const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().required().label("lastName"),
    birthDate: string().required().label("birthDate"),
    gender: string().required().label("gender"),
    country: string().required().label("country"),
    adresse: string().required().label("adresse"),
    Establishment: string().required().label("Establishment"),
    town: string().required().label("town"),
    zipCode: number().required().label("zipCode"),
    tel: number().required().label("tel"),
    level: string().required().label("level"),
    degree: string().required().label("degree"),
    motivations: string().required().label("motivations"),
    //resume: file().required().label("resume"),
  });
  return schema.validate(data);
};

module.exports = { internModel, validate };
