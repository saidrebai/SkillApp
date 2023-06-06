const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ApplicationModel} = require("./ApplicationModel");

const offerSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
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
  address: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "admin",
  },
  user : [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }]
},
{ timestamps: true }
);

offerSchema.pre("remove", async function (next) {
  const offerId = this._id;
  try {
    await ApplicationModel.deleteMany({ offer: offerId });
    next();
  } catch (error) {
    next(error);
  }
});

const offerModel = mongoose.model("offerModel", offerSchema);

const validate = (data) => {
  const schema = object({
    type: string().required().label("type of the offer"),
    time: string().required().label("time"),
    name: string().required().label("name"),
    description: string().required().label("description"),
    skills: string().required().label("skills"),
    address: string().required().label("address"),
    company_name: string().required().label("company_name"),
  });
  return schema.validate(data);
};

module.exports = { offerModel, validate };
