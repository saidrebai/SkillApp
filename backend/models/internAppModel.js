const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  cv: [{ type: Schema.Types.ObjectId, ref: "cv", name : "cv"}],

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
    cv: contentType().required().label("cv")
  });
  return schema.validate(data);
};

module.exports = { internModel, validate };
