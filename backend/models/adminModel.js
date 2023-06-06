const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {offerModel} = require("./offersModel")

const adminSchema = new mongoose.Schema(
  {
    typeOfUser: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
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
  },
  { timestamps: true }
);


adminSchema.pre("remove", async function (next) {
  const idAdmin = this._id;
  try {
    await offerModel.deleteMany({ admin: idAdmin });
    next();
  } catch (error) {
    next(error);
  }
});


adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: 60,
  });
  return token;
};

const Admin = mongoose.model("admin", adminSchema);



module.exports = { Admin };
