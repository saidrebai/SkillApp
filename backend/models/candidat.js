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
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  age: {
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
    expiresIn: 3600,
  });
  return token;
};

const User = mongoose.model("candidat", userSchema);

module.exports = { User };
