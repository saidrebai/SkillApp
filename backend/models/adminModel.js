const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {offerModel} = require("./offersModel")
const {ApplicationModel} = require("./ApplicationModel");

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


// adminSchema.pre("remove", async function (next) {
//   const idAdmin = this._id;
//   try {
//     await offerModel.deleteMany({ admin: idAdmin });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
adminSchema.pre("remove", async function (next) {
  const adminId = this._id;
  try {
    // Find offers associated with the admin
    const adminOffers = await offerModel.find({ admin: adminId });
    console.log("offers",adminOffers);
    const offerIds = adminOffers.map((offer) => offer._id);
    console.log("ids",offerIds);
    // Delete offers associated with the admin
    await offerModel.deleteMany({ admin: adminId });

    // Delete applications associated with the admin's offers
    await ApplicationModel.deleteMany({ offer: { $in: offerIds } });

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
