const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const {ApplicationModel} = require("./ApplicationModel");
const filesModel = require("./filesModels");

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
  Phone: {
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
  cv: 
		{
			type: Schema.Types.ObjectId,
			ref: 'pdfs',
		},
  status:{
    type: Boolean,
  }
},
{ timestamps: true }
);

userSchema.pre("remove", async function (next) {
  const idUser = this._id;
  try {
    await ApplicationModel.deleteMany({ user: idUser });
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("remove", async function (next) {
  const idUser = this._id;
  try {
    await filesModel.deleteMany({ user: idUser });
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "30m",
  });
  return token;
};

const User = mongoose.model("candidat", userSchema);

module.exports = { User };
