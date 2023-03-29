const mongoose = require("mongoose");
const Schema = mongoose.Schema

const offerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  time: {
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
  admin : {
    type: Schema.Types.ObjectId,
    ref: 'admin',
  },
  cv: [
		{
			type: Schema.Types.ObjectId,
			ref: 'pdfs',
		},
	],
});

const offerModel = mongoose.model("offerModel", offerSchema);

const validate = (data) => {
    const schema = object({
      type: string().required().label("type of the offer"),
      time: string().required().label("time"),
      Name: string().required().label("name"),
      description: string().required().label("description"),
      skills: string().required().label("skills"),
      adresse: string().required().label("adresse"),
      company_name: string().required().label("company_name"),
    });
    return schema.validate(data);
  };

module.exports = { offerModel, validate};
