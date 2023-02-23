const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
});

const offerModel = mongoose.model("offerModel", offerSchema);

const validate = (data) => {
    const schema = object({
      type: string().required().label("type of the offer"),
      term: string().required().label("term"),
      Name: string().required().label("name"),
      description: string().required().label("description"),
      skills: string().required().label("skills"),
      adresse: string().required().label("adresse"),
      company_name: string().required().label("company_name"),
    });
    return schema.validate(data);
  };

module.exports = { offerModel,validate};
